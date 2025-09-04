const chatEl = document.getElementById('chat');
const formEl = document.getElementById('chat-form');
const inputEl = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');

const history = [];

function el(tag, className, text) {
  const n = document.createElement(tag);
  if (className) n.className = className;
  if (text) n.textContent = text;
  return n;
}

function addMessage(role, content) {
  const item = el('div', `msg msg--${role}`);
  const bubble = el('div', 'msg__bubble');
  bubble.textContent = content;
  item.appendChild(bubble);
  chatEl.appendChild(item);
  chatEl.scrollTop = chatEl.scrollHeight;
}

function addSnippets(snippets) {
  if (!Array.isArray(snippets) || snippets.length === 0) return;
  const wrap = el('details', 'snippets');
  const summary = el('summary', null, 'Show retrieved context');
  wrap.appendChild(summary);
  snippets.forEach((s, i) => {
    const block = el('div', 'snippet');
    const head = el('div', 'snippet__head', `Snippet ${i + 1} (score=${(s.score ?? 0).toFixed(3)})`);
    const body = el('pre', 'snippet__body');
    body.textContent = s.text || '';
    block.appendChild(head);
    block.appendChild(body);
    wrap.appendChild(block);
  });
  chatEl.appendChild(wrap);
  chatEl.scrollTop = chatEl.scrollHeight;
}

async function sendMessage(text) {
  addMessage('user', text);
  inputEl.value = '';
  inputEl.disabled = true;
  sendBtn.disabled = true;

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, history }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err?.detail || err?.error || `HTTP ${res.status}`);
    }
    const data = await res.json();
    const reply = data.reply || '';
    addMessage('assistant', reply);
    addSnippets(data.snippets);

    // update local history for context (kept client-side; server already receives these each call)
    history.push({ role: 'user', content: text });
    history.push({ role: 'assistant', content: reply });
  } catch (e) {
    console.error(e);
    addMessage('assistant', `Sorry, something went wrong: ${e.message}`);
  } finally {
    inputEl.disabled = false;
    sendBtn.disabled = false;
    inputEl.focus();
  }
}

formEl.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = inputEl.value.trim();
  if (!text) return;
  sendMessage(text);
});

// Welcome message
addMessage('assistant', 'Hello! I\'m Garrit your One Way Bike Tours assistant. How can I help you today?');
