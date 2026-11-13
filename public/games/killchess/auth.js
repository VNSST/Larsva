// Generated from the killchess repo by scripts/export-larsva.js. Edit the original, not this copy.
/* Kill Chess account UI, shared by the game and the leaderboard page.
   - Renders a "Sign up" button (or the signed-in player's name + points) into any [data-kc-auth] element.
   - Sign up (name, email, password) / Log in (email or player ID + password) / Your account pop-up.
   - The player ({ id, name, token, points, rank }) is remembered on this device in localStorage;
     `token` is this device's session (the password itself is never stored on the device).
   Exposes window.KCAuth = { player, update, logout, signIn, open, onChange, refresh }. */
(() => {
  const KEY = 'kc_player';
  const KC_API = window.KC_API || '';   // API location (see index.html)
  const listeners = [];
  const esc = t => String(t).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  function player() {
    try { const p = JSON.parse(localStorage.getItem(KEY) || 'null'); return p && p.id && p.token ? p : null; } catch { return null; }
  }
  function store(p) {
    try { p ? localStorage.setItem(KEY, JSON.stringify(p)) : localStorage.removeItem(KEY); } catch {}
    renderSlots();
    listeners.forEach(f => { try { f(player()); } catch {} });
  }
  const update = changes => { const p = player(); if (p) store({ ...p, ...changes }); };
  const logout = () => store(null);

  // ---------- styles ----------
  const style = document.createElement('style');
  style.textContent = `
    .kc-signup{background:var(--accent);color:#fff;border:0;border-radius:10px;padding:8px 14px;font-size:.9rem;font-weight:700;cursor:pointer;font-family:inherit}
    .kc-chip{background:var(--panel2);color:var(--text);border:0;border-radius:10px;padding:8px 12px;font-size:.88rem;cursor:pointer;font-family:inherit;display:inline-flex;align-items:center;gap:5px;max-width:190px}
    .kc-chip .kc-nm{font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:96px}
    .kc-chip b{color:var(--accent2);font-variant-numeric:tabular-nums}
    .kc-ov{position:fixed;inset:0;background:rgba(10,8,14,.72);display:none;align-items:center;justify-content:center;z-index:80;padding:18px}
    .kc-ov.show{display:flex}
    .kc-modal{position:relative;background:var(--panel);color:var(--text);border-radius:18px;max-width:400px;width:100%;padding:22px 20px 20px;box-shadow:0 20px 50px rgba(0,0,0,.5);text-align:left}
    .kc-x{position:absolute;top:8px;right:10px;background:none;border:0;color:var(--muted);font-size:1.6rem;line-height:1;cursor:pointer;padding:4px 8px}
    .kc-modal h2{margin:0 0 6px;font-size:1.3rem;padding-right:24px}
    .kc-modal p{color:var(--muted);margin:0 0 14px;line-height:1.45;font-size:.92rem}
    .kc-modal p b{color:var(--text)}
    .kc-tabs{display:flex;background:var(--panel2);border-radius:12px;padding:3px;gap:3px;margin-bottom:14px}
    .kc-tabs button{flex:1;background:transparent;color:var(--muted);border:0;border-radius:9px;padding:8px;font-weight:700;cursor:pointer;font-family:inherit;font-size:.9rem}
    .kc-tabs button.on{background:var(--accent);color:#fff}
    .kc-form{display:flex;flex-direction:column;gap:9px}
    .kc-field{background:var(--panel2);color:var(--text);border:1px solid transparent;border-radius:12px;padding:11px 12px;font-size:16px;font-family:inherit;width:100%}
    .kc-field:focus{outline:none;border-color:var(--accent2)}
    .kc-link{background:none;border:0;padding:0;color:var(--accent2);font:inherit;font-weight:700;cursor:pointer}
    .kc-pw{position:relative}
    .kc-pw .kc-field{padding-right:64px}
    .kc-eye{position:absolute;right:6px;top:50%;transform:translateY(-50%);background:none;border:0;color:var(--muted);font-weight:700;font-size:.8rem;cursor:pointer;padding:8px;font-family:inherit}
    .kc-go{background:var(--accent);color:#fff;border:0;border-radius:12px;padding:12px;font-size:1rem;font-weight:700;cursor:pointer;font-family:inherit}
    .kc-go:disabled{opacity:.6;cursor:default}
    .kc-ghost{background:var(--panel2);color:var(--text);border:0;border-radius:12px;padding:11px;font-size:.95rem;font-weight:600;cursor:pointer;font-family:inherit}
    .kc-err{color:var(--accent);font-size:.85rem;min-height:1.1em;margin:0}
    .kc-small{font-size:.78rem!important;margin:10px 0 0!important}
    .kc-stats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin:0 0 14px}
    .kc-stats div{background:var(--panel2);border-radius:10px;padding:10px;text-align:center}
    .kc-stats b{display:block;font-size:1.25rem;font-variant-numeric:tabular-nums}
    .kc-stats span{color:var(--muted);font-size:.75rem}
    .kc-row{display:flex;gap:8px;margin-top:6px}.kc-row>*{flex:1}`;
  document.head.appendChild(style);

  // ---------- pop-up ----------
  const ov = document.createElement('div');
  ov.className = 'kc-ov';
  ov.innerHTML = '<div class="kc-modal" role="dialog" aria-modal="true" aria-labelledby="kcTitle"><button class="kc-x" type="button" aria-label="Close">×</button><div id="kcBody"></div></div>';
  document.body.appendChild(ov);
  const body = ov.querySelector('#kcBody');
  let state = { view: 'signup', opts: {} };
  const close = () => ov.classList.remove('show');
  ov.querySelector('.kc-x').onclick = close;
  ov.addEventListener('click', e => { if (e.target === ov) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && ov.classList.contains('show')) close(); });

  function open(view, opts) {
    state = { view: view || (player() ? 'account' : 'signup'), opts: opts || {} };
    draw();
    ov.classList.add('show');
    const first = body.querySelector('input'); if (first) setTimeout(() => first.focus(), 50);
  }

  function draw() {
    const { view, opts } = state, p = player();
    if (view === 'account' && p) {
      body.innerHTML = `
        <h2 id="kcTitle">${esc(p.name)}</h2>
        <p>Player ID <b>${p.id}</b></p>
        <div class="kc-stats">
          <div><b>${p.points || 0}</b><span>Points</span></div>
          <div><b>${p.rank ? '#' + p.rank : '—'}</b><span>Rank</span></div>
          <div><b>${p.games || 0}</b><span>Games played</span></div>
        </div>
        <p class="kc-small">Log in on any device with your email or player ID <b>${p.id}</b> and your password.</p>
        <div class="kc-row" style="margin-top:14px"><a class="kc-ghost" href="/games/killchess/leaderboard" style="text-align:center;text-decoration:none">🏆 Leaderboard</a><button class="kc-ghost" type="button" id="kcOut">Log out</button></div>`;
      body.querySelector('#kcOut').onclick = () => {
        fetch(KC_API + '/api/logout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token: p.token }), keepalive: true }).catch(() => {});
        logout(); close();
      };
      return;
    }
    if (view === 'welcome' && p) {
      body.innerHTML = `
        <h2 id="kcTitle">You’re in, ${esc(p.name)}! 🎉</h2>
        <p>Your player ID is <b>${p.id}</b>. Beat the computer to earn points: <b>Very easy +1 · Easy +2 · Medium +5 · Hard +10</b>.</p>
        <p>Log in on any device with your <b>email or player ID ${p.id}</b> and your password.</p>
        <button class="kc-go" type="button" id="kcDone" style="width:100%;margin-top:4px">Let’s play 😈</button>`;
      body.querySelector('#kcDone').onclick = close;
      return;
    }
    if (view === 'forgot') {
      body.innerHTML = `
        <h2 id="kcTitle">Forgot your password?</h2>
        <p>Enter the email you signed up with. We’ll send you a link to choose a new password.</p>
        <form class="kc-form" novalidate>
          <input class="kc-field" name="email" type="email" placeholder="Email" maxlength="254" autocomplete="email" required>
          <p class="kc-err" aria-live="polite"></p>
          <button class="kc-go" type="submit">Send reset link</button>
        </form>
        <p class="kc-small"><button type="button" class="kc-link" id="kcBack">← Back to log in</button></p>`;
      body.querySelector('#kcBack').onclick = () => { state.view = 'login'; draw(); };
      const form = body.querySelector('form');
      form.onsubmit = async e => {
        e.preventDefault();
        const err = form.querySelector('.kc-err'), btn = form.querySelector('.kc-go');
        err.textContent = ''; btn.disabled = true; btn.textContent = 'Sending…';
        try {
          const r = await fetch(KC_API + '/api/forgot', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: form.email.value }) });
          const d = await r.json().catch(() => ({}));
          if (!r.ok) { err.textContent = d.error || 'Something went wrong. Try again.'; return; }
          body.innerHTML = `<h2 id="kcTitle">Check your email 📬</h2><p>${esc(d.message)}</p>
            <button class="kc-go" type="button" id="kcOk" style="width:100%">OK</button>`;
          body.querySelector('#kcOk').onclick = close;
        } catch { err.textContent = 'Can’t reach the server. Check your connection.'; }
        finally { if (btn.isConnected) { btn.disabled = false; btn.textContent = 'Send reset link'; } }
      };
      return;
    }
    const login = view === 'login';
    const title = opts.title || (login ? 'Welcome back' : 'Join the leaderboard');
    const text = opts.text || (login ? 'Log in with your email or player ID and your password.'
      : 'Beat the computer to earn points: <b>Very easy +1 · Easy +2 · Medium +5 · Hard +10</b>.');
    body.innerHTML = `
      <h2 id="kcTitle">${esc(title)}</h2>
      <p>${text}</p>
      <div class="kc-tabs"><button type="button" data-v="signup" class="${login ? '' : 'on'}">Sign up</button><button type="button" data-v="login" class="${login ? 'on' : ''}">Log in</button></div>
      <form class="kc-form" novalidate>
        ${login
          ? '<input class="kc-field" name="login" placeholder="Email or player ID" maxlength="254" autocomplete="username" autocapitalize="off" spellcheck="false" required>'
          : `<input class="kc-field" name="name" placeholder="Your name" maxlength="20" autocomplete="nickname" required>
             <input class="kc-field" name="email" type="email" placeholder="Email" maxlength="254" autocomplete="email" required>`}
        <div class="kc-pw">
          <input class="kc-field" name="password" type="password" placeholder="${login ? 'Password' : 'Password (8+ characters)'}" maxlength="128"
            autocomplete="${login ? 'current-password' : 'new-password'}" required>
          <button type="button" class="kc-eye" aria-label="Show password">Show</button>
        </div>
        <p class="kc-err" aria-live="polite"></p>
        <button class="kc-go" type="submit">${login ? 'Log in' : 'Sign up & compete'}</button>
      </form>
      <p class="kc-small">${login
        ? '<button type="button" class="kc-link" id="kcForgot">Forgot password?</button>'
        : 'Your email stays private and is never shown on the leaderboard.'}</p>`;
    if (login) body.querySelector('#kcForgot').onclick = () => { state.view = 'forgot'; draw(); body.querySelector('input').focus(); };
    const eye = body.querySelector('.kc-eye'), pw = body.querySelector('[name=password]');
    eye.onclick = () => { const show = pw.type === 'password'; pw.type = show ? 'text' : 'password'; eye.textContent = show ? 'Hide' : 'Show'; eye.setAttribute('aria-label', show ? 'Hide password' : 'Show password'); };
    body.querySelectorAll('.kc-tabs button').forEach(b => b.onclick = () => { state.view = b.dataset.v; draw(); const f = body.querySelector('input'); if (f) f.focus(); });
    const form = body.querySelector('form');
    form.onsubmit = async e => {
      e.preventDefault();
      const err = form.querySelector('.kc-err'), btn = form.querySelector('.kc-go');
      const data = Object.fromEntries(new FormData(form));
      if (!login && String(data.password || '').length < 8) { err.textContent = 'Password must be at least 8 characters.'; return; }
      err.textContent = ''; btn.disabled = true; btn.textContent = login ? 'Logging in…' : 'Signing up…';
      try {
        const r = await fetch(KC_API + (login ? '/api/login' : '/api/register'), { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
        const d = await r.json().catch(() => ({}));
        if (!r.ok) { err.textContent = d.error || 'Something went wrong. Try again.'; return; }
        store({ id: d.id, name: d.name, token: d.token, points: d.points || 0, level: d.level || null, rank: null });
        refresh();
        if (login) close(); else { state.view = 'welcome'; draw(); }
      } catch { err.textContent = 'Can’t reach the server. Check your connection.'; }
      finally { btn.disabled = false; btn.textContent = login ? 'Log in' : 'Sign up & compete'; }
    };
  }

  // ---------- header slot ----------
  function renderSlots() {
    const p = player();
    document.querySelectorAll('[data-kc-auth]').forEach(el => {
      el.innerHTML = p
        ? `<button class="kc-chip" type="button" aria-label="Your account">👤 <span class="kc-nm">${esc(p.name)}</span> · <b>${p.points || 0}</b></button>`
        : '<button class="kc-signup" type="button">Sign up</button>';
      el.firstElementChild.onclick = () => open(p ? 'account' : 'signup');
    });
  }

  // Pull the latest points/rank; forget the player if the server no longer knows them.
  function refresh() {
    const p = player(); if (!p) return Promise.resolve(null);
    return fetch(KC_API + '/api/leaderboard?me=' + encodeURIComponent(p.id), { cache: 'no-store' })
      .then(r => r.ok ? r.json() : null)
      .then(d => {
        if (!d || !player() || player().id !== p.id) return null;
        if (!d.me) { logout(); return null; }
        update({ points: d.me.points, games: d.me.games, rank: d.me.rank, name: d.me.name, level: d.me.level });
        return d;
      })
      .catch(() => null);
  }

  const signIn = p => store({ id: p.id, name: p.name, token: p.token, points: p.points || 0, level: p.level || null, rank: null });
  window.KCAuth = { player, update, logout, signIn, open, onChange: f => listeners.push(f), refresh };
  renderSlots();
  refresh();
})();
