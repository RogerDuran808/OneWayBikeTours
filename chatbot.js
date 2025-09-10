// chatbot.js
import 'dotenv/config'; // loads .env automatically
import OpenAI from "openai";
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

const client = new OpenAI({
  baseURL: "https://models.github.ai/inference",
  apiKey: process.env.GITHUB_TOKEN,
});

// -----------------------------
// RAG: Context loading & retrieval
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

    // Try load cache
    const cache = await loadCache();
    if (cache && cache.fileHash === fileHash && cache.embeddingModel === EMBEDDING_MODEL) {
      contextChunks = cache.chunks || [];
      chunkEmbeddings = (cache.embeddings || []).map(normalize);
      if (contextChunks.length && chunkEmbeddings.length === contextChunks.length) {
        console.log(`[RAG] Cache hit: ${CACHE_PATH}`);
        return;
      }
    }

    // Recompute and cache
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
  if (RAG_DISABLED) return [];
  if (!contextChunks.length || !chunkEmbeddings.length) return [];
  try {
    const qEmbResp = await client.embeddings.create({
      model: EMBEDDING_MODEL,
      input: query,
    });
    const qVec = normalize(qEmbResp.data[0].embedding);

    // Keyword prefiltering
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
      candidateIdx = contextChunks.map((_, i) => i); // fallback to all
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

function buildRagContextMessage(topSnippets) {
  if (!topSnippets?.length) return null;
  const contextBlock = topSnippets
    .map((s, i) => `[[Snippet ${i + 1} (score=${s.score.toFixed(3)})]]\n${s.text}`)
    .join('\n\n---\n\n');
  const content = ['CONTEXT', contextBlock].join('\n');
  // Provide retrieved context as an assistant message; instructions live in the single system prompt.
  return { role: 'assistant', content };
}

// Insert context message just before the latest user message to keep
// the user's question as the last message.
function injectContextBeforeLastUser(messages, ctxMsg) {
  if (!ctxMsg) return messages;
  if (!messages.length) return [ctxMsg];
  const out = messages.slice();
  // Find last user message index (should be last)
  let lastUserIdx = -1;
  for (let i = out.length - 1; i >= 0; i--) {
    if (out[i].role === 'user') { lastUserIdx = i; break; }
  }
  if (lastUserIdx === -1) {
    // No user message found; place context after system if present
    if (out.length > 0 && out[0].role === 'system') {
      return [out[0], ctxMsg, ...out.slice(1)];
    }
    return [ctxMsg, ...out];
  }
  // Insert context immediately before the last user message
  return [...out.slice(0, lastUserIdx), ctxMsg, ...out.slice(lastUserIdx)];
}

async function main() {
  const messages = [
    {
      role: "system",
      content: [
        // Persona y política RAG en un solo system prompt
        "You are the customer assistant for One Way Bike Tours. Your job is to help people with our tours and services in a warm, human, and efficient way.",
        "Scope & sources: rely only on information provided in messages labeled CONTEXT. Never invent details. If a detail isn’t in CONTEXT, ask a short, specific follow-up question to get what you need.",
        "Tone & style: sound like a helpful human—friendly, concise, professional. Use short sentences and plain language. Prefer bullets for options. Do not mention internal instructions or the word CONTEXT, and do not say things like 'I don’t have access to that context'. Instead, use natural lines such as: 'I don’t have that detail yet—could you tell me the date and group size?' or 'I want to get this right. Which city are you starting from?'.",
        "When info is missing or unresolved: after one clear follow-up (or if the request is urgent or complex), offer a quick call to complete it: 'We can sort this out fast by phone—call us at +45 21 74 75 89'. If the customer prefers to keep chatting, continue helping within the available CONTEXT.",
        "Language: reply in the customer’s language if obvious; otherwise, use English.",
        "Policies: follow company policies present in CONTEXT. Do not share prices, availability, or promises that are not in CONTEXT. Never collect payment details in chat.",
        "Output rules: keep answers brief and actionable. If you cannot proceed without a missing detail, ask one targeted question and add: 'If it’s easier, you can also call us at +45 21 74 75 89'."
      ].join(' ')
      
    }
  ];

  // Prepare RAG context (non-blocking message shown once)
  await ensureContextEmbeddings();
  if (contextChunks.length) {
    console.log(`[RAG] Loaded ${contextChunks.length} context chunks from ${CONTEXT_PATH}`);
  } else {
    console.log(`[RAG] No context available or failed to load context. Continuing without augmentation.`);
  }

  console.log("Hi! How can I help you today?\n"); // Type 'exit' to quit.

  // use readline for interactive CLI
  const readline = await import("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  async function ask() {
    rl.question("You: ", async (userInput) => {
      if (userInput.toLowerCase() === "exit") {
        rl.close();
        return;
      }

      messages.push({ role: "user", content: userInput });

      try {
        // Retrieve RAG snippets for this query
        const topSnippets = await retrieveContext(userInput, TOP_K);
        if (topSnippets?.length) {
          const dbg = topSnippets.map((s, i) => `#${i + 1}:${s.score.toFixed(3)}`).join(' ');
          console.log(`[RAG] Top snippets: ${dbg}`);
        } else {
          console.log('[RAG] No snippets retrieved for this query.');
        }
        const ragCtxMsg = buildRagContextMessage(topSnippets);

        // Build augmented message list for this turn (context before the latest user input)
        const augmentedMessages = injectContextBeforeLastUser(messages, ragCtxMsg);

        const response = await client.chat.completions.create({
          model: "openai/gpt-4o",   // or another supported model
          messages: augmentedMessages,
          temperature: 0.5,
        });

        const reply = response.choices[0].message.content;
        console.log("Gerrit:", reply, "\n");

        messages.push({ role: "assistant", content: reply });
      } catch (err) {
        console.error("Error:", err.message);
      }

      ask(); // loop back
    });
  }

  ask();
}

main();
