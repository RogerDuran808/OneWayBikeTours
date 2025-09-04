// server.js
import 'dotenv/config';
import express from 'express';
import OpenAI from 'openai';
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

const app = express();
const PORT = process.env.PORT || 3000;

// Body parsing
app.use(express.json({ limit: '1mb' }));

// Static files
const PUBLIC_DIR = path.join(process.cwd(), 'public');
app.use(express.static(PUBLIC_DIR));

// OpenAI (GitHub Models) client
const client = new OpenAI({
  baseURL: 'https://models.github.ai/inference',
  apiKey: process.env.GITHUB_TOKEN,
});

// -----------------------------
// RAG: Context loading & retrieval (same logic as chatbot.js)
// -----------------------------
const CONTEXT_PATH = path.join(process.cwd(), 'context', 'context.md');
const CACHE_PATH = path.join(process.cwd(), 'context', 'context.md.cache.json');
const EMBEDDING_MODEL = 'openai/text-embedding-3-small';
const TOP_K = 5;

let contextChunks = [];
let chunkEmbeddings = [];

function normalize(vec) {
  const norm = Math.sqrt(vec.reduce((acc, v) => acc + v * v, 0)) || 1;
  return vec.map(v => v / norm);
}

function cosineSim(a, b) {
  let sum = 0;
  for (let i = 0; i < a.length && i < b.length; i++) sum += a[i] * b[i];
  return sum;
}

function chunkTextByParagraphs(text, maxChars = 800) {
  const paras = text
    .split(/\n\s*\n/g)
    .map(p => p.trim())
    .filter(Boolean);
  const chunks = [];
  let buf = '';
  for (const p of paras) {
    if ((buf + '\n\n' + p).trim().length <= maxChars) {
      buf = (buf ? buf + '\n\n' : '') + p;
    } else {
      if (buf) chunks.push(buf);
      if (p.length <= maxChars) {
        buf = p;
      } else {
        for (let i = 0; i < p.length; i += maxChars) {
          chunks.push(p.slice(i, i + maxChars));
        }
        buf = '';
      }
    }
  }
  if (buf) chunks.push(buf);
  return chunks;
}

function sha256(text) {
  return crypto.createHash('sha256').update(text, 'utf8').digest('hex');
}

async function loadCache() {
  try {
    const raw = await fs.readFile(CACHE_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function saveCache(payload) {
  try {
    await fs.writeFile(CACHE_PATH, JSON.stringify(payload, null, 2), 'utf-8');
  } catch (e) {
    console.warn('[RAG] Failed to write cache:', e?.message || e);
  }
}

async function ensureContextEmbeddings() {
  if (chunkEmbeddings.length && contextChunks.length) return; // already prepared
  try {
    const raw = await fs.readFile(CONTEXT_PATH, 'utf-8');
    const fileHash = sha256(raw);

    const cache = await loadCache();
    if (cache && cache.fileHash === fileHash && cache.embeddingModel === EMBEDDING_MODEL) {
      contextChunks = cache.chunks || [];
      chunkEmbeddings = (cache.embeddings || []).map(normalize);
      if (contextChunks.length && chunkEmbeddings.length === contextChunks.length) {
        console.log(`[RAG] Cache hit: ${CACHE_PATH}`);
        return;
      }
    }

    contextChunks = chunkTextByParagraphs(raw);
    if (contextChunks.length === 0) return;
    const embResp = await client.embeddings.create({
      model: EMBEDDING_MODEL,
      input: contextChunks,
    });
    chunkEmbeddings = embResp.data.map(d => normalize(d.embedding));
    await saveCache({
      version: 1,
      embeddingModel: EMBEDDING_MODEL,
      fileHash,
      chunks: contextChunks,
      embeddings: embResp.data.map(d => d.embedding),
    });
  } catch (e) {
    console.warn('RAG initialization warning:', e?.message || e);
    contextChunks = [];
    chunkEmbeddings = [];
  }
}

const STOPWORDS = new Set([
  'the','and','for','are','but','with','that','this','from','into','over','your','you','our','can','will','have','has','was','were','not','all','any','about','how','what','when','where','why','which','who','whom','is','to','in','on','of','it','as','at','by','be','or','an','a'
]);

function keywordSet(text) {
  const tokens = (text.toLowerCase().match(/[\p{L}\p{N}]+/gu) || []).filter(t => t.length > 2 && !STOPWORDS.has(t));
  return new Set(tokens);
}

async function retrieveContext(query, k = TOP_K) {
  if (!contextChunks.length || !chunkEmbeddings.length) return [];
  try {
    const qEmbResp = await client.embeddings.create({
      model: EMBEDDING_MODEL,
      input: query,
    });
    const qVec = normalize(qEmbResp.data[0].embedding);

    const kws = keywordSet(query);
    let candidateIdx = [];
    if (kws.size) {
      const kwArr = Array.from(kws);
      for (let i = 0; i < contextChunks.length; i++) {
        const lc = contextChunks[i].toLowerCase();
        if (kwArr.some(w => lc.includes(w))) candidateIdx.push(i);
      }
    }
    if (candidateIdx.length === 0) {
      candidateIdx = contextChunks.map((_, i) => i);
    }

    const scored = candidateIdx.map(idx => ({ idx, score: cosineSim(chunkEmbeddings[idx], qVec) }));
    scored.sort((a, b) => b.score - a.score);
    const top = scored.slice(0, Math.min(k, scored.length));
    return top.map(({ idx, score }) => ({ score, text: contextChunks[idx] }));
  } catch (e) {
    console.warn('RAG retrieval warning:', e?.message || e);
    return [];
  }
}

function buildRagSystemMessage(topSnippets) {
  if (!topSnippets.length) return null;
  const contextBlock = topSnippets.map((s, i) => `[[Snippet ${i + 1} (score=${s.score.toFixed(3)})]]\n${s.text}`).join('\n\n---\n\n');
  const instruction = [
    'You are a helpful assistant for One Way Bike Tours. Use ONLY the information in the CONTEXT below to answer. If the answer is not in the context, say you do not know and ask for clarification. Keep answers brief, clear, and aligned with company policies. If the issue remains unresolved, offer a phone call.',
    '',
    'CONTEXT:',
    contextBlock,
  ].join('\n');
  return { role: 'system', content: instruction };
}

// Warm-up RAG embeddings at startup (non-blocking)
ensureContextEmbeddings().then(() => {
  if (contextChunks.length) {
    console.log(`[RAG] Loaded ${contextChunks.length} context chunks from ${CONTEXT_PATH}`);
  } else {
    console.log(`[RAG] No context available or failed to load context. Continuing without augmentation.`);
  }
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body || {};
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Missing message' });
    }

    // Build base messages: system + (optional) history + user message
    const messages = [
      { role: 'system', content: "You are the CEO of a company, responsible for answering clients' questions about the products or services your company provides." },
      ...(Array.isArray(history) ? history : []),
      { role: 'user', content: message },
    ];

    // RAG augmentation
    const topSnippets = await retrieveContext(message, TOP_K);
    const ragSystem = buildRagSystemMessage(topSnippets);
    const augmentedMessages = ragSystem ? [...messages, ragSystem] : messages;

    const response = await client.chat.completions.create({
      model: 'openai/gpt-4o',
      messages: augmentedMessages,
      temperature: 0.5,
    });

    const reply = response.choices?.[0]?.message?.content || '';

    res.json({ reply, snippets: topSnippets });
  } catch (err) {
    console.error('Chat error:', err?.message || err);
    res.status(500).json({ error: 'Server error', detail: err?.message || String(err) });
  }
});

app.listen(PORT, () => {
  console.log(`Web chat server running at http://localhost:${PORT}`);
});
