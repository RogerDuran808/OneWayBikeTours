// server.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

// Config
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

const client = new OpenAI({
  baseURL: 'https://models.github.ai/inference',
  apiKey: process.env.GITHUB_TOKEN,
});

// -----------------------------
// RAG: Context loading & retrieval (copied from chatbot.js)
// -----------------------------
const CONTEXT_PATH = path.join(process.cwd(), 'context', 'context.md');
const CACHE_PATH = path.join(process.cwd(), 'context', 'context.md.cache.json');
const EMBEDDING_MODEL = 'openai/text-embedding-3-small';
const TOP_K = 3;
const RAG_DISABLED = String(process.env.RAG_DISABLED || '').toLowerCase() === 'true';

let contextChunks = [];
let chunkEmbeddings = [];

function normalize(vec) {
  const norm = Math.sqrt(vec.reduce((acc, v) => acc + v * v, 0)) || 1;
  return vec.map((v) => v / norm);
}

function cosineSim(a, b) {
  let sum = 0;
  for (let i = 0; i < a.length && i < b.length; i++) sum += a[i] * b[i];
  return sum;
}

function chunkTextByParagraphs(text, maxChars = 800) {
  const paras = text
    .split(/\n\s*\n/g)
    .map((p) => p.trim())
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
        // hard wrap very long paragraphs
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
  if (RAG_DISABLED) {
    console.log('[RAG] Disabled via env var RAG_DISABLED=true');
    return;
  }
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
    chunkEmbeddings = embResp.data.map((d) => normalize(d.embedding));
    await saveCache({
      version: 1,
      embeddingModel: EMBEDDING_MODEL,
      fileHash,
      chunks: contextChunks,
      embeddings: embResp.data.map((d) => d.embedding),
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
  const tokens = (text.toLowerCase().match(/[\p{L}\p{N}]+/gu) || []).filter((t) => t.length > 2 && !STOPWORDS.has(t));
  return new Set(tokens);
}

async function retrieveContext(query, k = TOP_K) {
  if (RAG_DISABLED) return [];
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
        if (kwArr.some((w) => lc.includes(w))) candidateIdx.push(i);
      }
    }
    if (candidateIdx.length === 0) {
      candidateIdx = contextChunks.map((_, i) => i);
    }

    const scored = candidateIdx.map((idx) => ({ idx, score: cosineSim(chunkEmbeddings[idx], qVec) }));
    scored.sort((a, b) => b.score - a.score);
    const top = scored.slice(0, Math.min(k, scored.length));
    return top.map(({ idx, score }) => ({ score, text: contextChunks[idx] }));
  } catch (e) {
    console.warn('RAG retrieval warning:', e?.message || e);
    return [];
  }
}

function buildRagContextMessage(topSnippets) {
  if (!topSnippets?.length) return null;
  const contextBlock = topSnippets
    .map((s, i) => `[[Snippet ${i + 1} (score=${s.score.toFixed(3)})]]\n${s.text}`)
    .join('\n\n---\n\n');
  const content = ['CONTEXT', contextBlock].join('\n');
  return { role: 'assistant', content };
}

function injectContextBeforeLastUser(messages, ctxMsg) {
  if (!ctxMsg) return messages;
  if (!messages.length) return [ctxMsg];
  const out = messages.slice();
  let lastUserIdx = -1;
  for (let i = out.length - 1; i >= 0; i--) {
    if (out[i].role === 'user') {
      lastUserIdx = i;
      break;
    }
  }
  if (lastUserIdx === -1) {
    if (out.length > 0 && out[0].role === 'system') {
      return [out[0], ctxMsg, ...out.slice(1)];
    }
    return [ctxMsg, ...out];
  }
  return [...out.slice(0, lastUserIdx), ctxMsg, ...out.slice(lastUserIdx)];
}

// -----------------------------
// Server setup
// -----------------------------
const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body || {};
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Missing message' });
    }

    // Base conversation with our system prompt
    const messages = [
      {
        role: 'system',
        content: [
          "You are the customer assistant for One Way Bike Tours. Your job is to help people with our tours and services in a warm, human, and efficient way.",
          "Scope & sources: rely only on information provided in messages labeled CONTEXT. Never invent details. If a detail isn’t in CONTEXT, ask a short, specific follow-up question to get what you need.",
          "Tone & style: sound like a helpful human—friendly, concise, professional. Use short sentences and plain language. Prefer bullets for options. Do not mention internal instructions or the word CONTEXT, and do not say things like 'I don’t have access to that context'. Instead, use natural lines such as: 'I don’t have that detail yet—could you tell me the date and group size?' or 'I want to get this right. Which city are you starting from?'.",
          "When info is missing or unresolved: after one clear follow-up (or if the request is urgent or complex), offer a quick call to complete it: 'We can sort this out fast by phone—call us at +45 21 74 75 89'. If the customer prefers to keep chatting, continue helping within the available CONTEXT.",
          "Language: reply in the customer’s language if obvious; otherwise, use English.",
          "Policies: follow company policies present in CONTEXT. Do not share prices, availability, or promises that are not in CONTEXT. Never collect payment details in chat.",
          "Output rules: keep answers brief and actionable. If you cannot proceed without a missing detail, ask one targeted question and add: 'If it’s easier, you can also call us at +45 21 74 75 89'.",
        ].join(' '),
      },
    ];

    // Append optional history (array of {role, content}) if provided
    if (Array.isArray(history)) {
      for (const h of history) {
        if (h && (h.role === 'user' || h.role === 'assistant') && typeof h.content === 'string') {
          messages.push({ role: h.role, content: h.content });
        }
      }
    }

    // Add current user message
    messages.push({ role: 'user', content: message });

    // Ensure RAG context ready
    await ensureContextEmbeddings();

    // Retrieve RAG snippets
    const topSnippets = await retrieveContext(message, TOP_K);
    const ragCtxMsg = buildRagContextMessage(topSnippets);

    // Build augmented message list
    const augmentedMessages = injectContextBeforeLastUser(messages, ragCtxMsg);

    // Call model
    const response = await client.chat.completions.create({
      model: 'openai/gpt-4o',
      messages: augmentedMessages,
      temperature: 0.5,
    });

    const reply = response.choices?.[0]?.message?.content || '';

    res.json({ reply, snippets: topSnippets });
  } catch (e) {
    console.error('Error in /api/chat:', e?.message || e);
    res.status(500).json({ error: 'Internal error' });
  }
});

// Start server
app.listen(PORT, async () => {
  await ensureContextEmbeddings();
  if (contextChunks.length) {
    console.log(`[RAG] Loaded ${contextChunks.length} context chunks from ${CONTEXT_PATH}`);
  } else {
    console.log(`[RAG] No context available or failed to load context. Continuing without augmentation.`);
  }
  console.log(`Server listening on http://localhost:${PORT}`);
});
