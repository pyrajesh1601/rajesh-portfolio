(() => {
  'use strict';
  const launcher = document.createElement('button');
  launcher.type = 'button';
  launcher.className = 'chat-launcher';
  launcher.setAttribute('aria-expanded', 'false');
  launcher.setAttribute('aria-controls', 'portfolio-chat');
  launcher.setAttribute('aria-label', 'Ask about Rajesh');
  launcher.innerHTML = '<span class="chat-launch-icon"><svg aria-hidden="true"><use href="#spark"/></svg></span><span>Ask about Rajesh</span>';
  const panel = document.createElement('section');
  panel.id = 'portfolio-chat';
  panel.className = 'portfolio-chat';
  panel.hidden = true;
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-label', 'Rajesh’s portfolio assistant');
  panel.setAttribute('data-lenis-prevent', '');
  panel.innerHTML = `<div class="chat-header"><img class="chat-avatar" src="assets/rajesh-noir-v2.png" alt=""><div class="chat-header-info"><h2>Meet Rajesh’s assistant</h2><p>Portfolio knowledge · Gemini AI</p></div><button class="chat-icon-button chat-reset" type="button" aria-label="Start a new chat" title="Start a new chat">↺</button><button class="chat-icon-button chat-close" type="button" aria-label="Close assistant"><svg aria-hidden="true"><use href="#close"/></svg></button></div><div class="chat-log" role="log" aria-live="polite" aria-relevant="additions" aria-label="Conversation" tabindex="0"></div><div class="chat-privacy">Answers use Rajesh’s résumé. Questions are sent to Google Gemini.</div><form class="chat-compose"><label class="chat-sr-only" for="chat-question">Your question about Rajesh</label><div class="chat-input-row"><textarea id="chat-question" name="question" rows="1" maxlength="1200" placeholder="What would you like to know?" required></textarea><button class="chat-send" type="submit" aria-label="Send message"><svg aria-hidden="true"><use href="#up"/></svg></button></div><div class="chat-compose-note"><span>AI can make mistakes.</span><a href="mailto:py.rajesh16@gmail.com">Contact Rajesh ↗</a></div></form>`;
  document.body.append(panel, launcher);
  const log = panel.querySelector('.chat-log'), form = panel.querySelector('form'), input = panel.querySelector('textarea'), send = panel.querySelector('.chat-send'), reset = panel.querySelector('.chat-reset');
  let history = [], controller = null, busy = false;
  const allowedLinks = new Set(['https://github.com/pyrajesh1601', 'https://www.linkedin.com/in/k-rajesh16', 'mailto:py.rajesh16@gmail.com', '/Rajesh-Resume.pdf', '#works', '#skills', '#about']);
  function appendLinks(element, text) {
    // Never interpret user/model text as HTML. Link only verified profile destinations.
    const pattern = /(https:\/\/[^\s<>\[\]()]+|mailto:py\.rajesh16@gmail\.com|\/Rajesh-Resume\.pdf|#works|#skills|#about)/g;
    let offset = 0;
    for (const match of text.matchAll(pattern)) {
      element.append(document.createTextNode(text.slice(offset, match.index)));
      const href = match[0].replace(/[.,;!]+$/, '');
      if (allowedLinks.has(href)) {
        const a = document.createElement('a'); a.href = href; a.textContent = href;
        if (href.startsWith('https:')) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
        element.append(a, document.createTextNode(match[0].slice(href.length)));
      } else element.append(document.createTextNode(match[0]));
      offset = match.index + match[0].length;
    }
    element.append(document.createTextNode(text.slice(offset)));
  }
  function appendText(element, text) {
    for (const part of text.split(/(\*\*[^*\n]+\*\*)/g)) {
      if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
        const strong = document.createElement('strong'); strong.textContent = part.slice(2, -2); element.append(strong);
      } else appendLinks(element, part);
    }
  }
  function message(role, text, isError = false) {
    const wrapper = document.createElement('div'); wrapper.className = 'chat-message ' + role + (isError ? ' error' : '');
    const label = document.createElement('p'); label.className = 'chat-message-label'; label.textContent = role === 'user' ? 'You' : 'Portfolio assistant';
    const body = document.createElement('div'); body.className = 'chat-message-body'; appendText(body, text);
    wrapper.append(label, body); log.append(wrapper); log.scrollTop = log.scrollHeight;
    return wrapper;
  }
  function suggestions() {
    const wrap = document.createElement('div'); wrap.className = 'chat-suggestions';
    for (const [label, question] of [['Projects ↗', 'Tell me about Rajesh’s projects.'], ['Technical skills', 'What technologies does Rajesh use?'], ['Education', 'What is Rajesh’s educational background?'], ['Why work with him?', 'What strengths would Rajesh bring to a full stack developer role?']]) {
      const button = document.createElement('button'); button.type = 'button'; button.textContent = label; button.addEventListener('click', () => { if (!busy) { input.value = question; form.requestSubmit(); } }); wrap.append(button);
    }
    log.append(wrap);
  }
  function welcome() { message('assistant', 'Hi! I’m Rajesh’s AI portfolio assistant. Ask me about his projects, technical skills, education, or leadership experience.\n\nI’ll stick to what he’s shared and let you know when a detail isn’t available.'); suggestions(); }
  function setOpen(open) { panel.hidden = !open; launcher.setAttribute('aria-expanded', String(open)); if (open) input.focus({ preventScroll: true }); else launcher.focus({ preventScroll: true }); }
  launcher.addEventListener('click', () => setOpen(panel.hidden));
  panel.querySelector('.chat-close').addEventListener('click', () => setOpen(false));
  panel.addEventListener('keydown', event => { if (event.key === 'Escape') { event.preventDefault(); setOpen(false); } });
  function setBusy(value) { busy = value; send.disabled = value; input.readOnly = value; panel.querySelectorAll('.chat-suggestions button').forEach(button => button.disabled = value); }
  reset.addEventListener('click', () => { controller?.abort(); controller = null; setBusy(false); history = []; log.replaceChildren(); welcome(); input.value = ''; input.focus(); });
  input.addEventListener('keydown', event => { if (event.key === 'Enter' && !event.shiftKey && !event.isComposing) { event.preventDefault(); if (!busy) form.requestSubmit(); } });
  form.addEventListener('submit', async event => {
    event.preventDefault();
    const question = input.value.trim();
    if (busy || !question || question.length > 1200) return;
    const previous = history.slice(-12); // Six complete turns; the server receives bounded context.
    const pendingHistory = [...previous, { role: 'user', content: question }];
    message('user', question); input.value = ''; setBusy(true);
    const waiting = document.createElement('div'); waiting.className = 'chat-wait'; waiting.setAttribute('role', 'status'); waiting.textContent = 'Thinking'; log.append(waiting); log.scrollTop = log.scrollHeight;
    const request = new AbortController(); controller = request;
    const timer = setTimeout(() => request.abort('timeout'), 35000);
    try {
      const response = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: pendingHistory }), signal: request.signal });
      let data; try { data = await response.json(); } catch { throw new Error('The chat server is not available. Run this project with npm run dev, or contact Rajesh directly.'); }
      if (!response.ok) throw new Error(data.error || 'The assistant is unavailable. Please try again.');
      if (typeof data.answer !== 'string' || !data.answer.trim()) throw new Error('No answer came back. Please try another question.');
      if (controller !== request) return;
      history = [...pendingHistory, { role: 'assistant', content: data.answer }];
      message('assistant', data.answer);
    } catch (error) {
      if (controller !== request) return;
      const text = request.signal.aborted ? 'That answer took too long. Please try again.' : error.message;
      message('assistant', text, true);
      const retry = document.createElement('div'); retry.className = 'chat-suggestions';
      const button = document.createElement('button'); button.type = 'button'; button.textContent = 'Try that question again'; button.addEventListener('click', () => { if (!busy) { input.value = question; form.requestSubmit(); } }); retry.append(button); log.append(retry);
    } finally {
      clearTimeout(timer); waiting.remove();
      if (controller === request) { controller = null; setBusy(false); log.scrollTop = log.scrollHeight; if (!panel.hidden) input.focus({ preventScroll: true }); }
    }
  });
  welcome();
})();
