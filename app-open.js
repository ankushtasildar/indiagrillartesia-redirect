/* CLK-001 (W16SA): "Open in the IGE app" is an ige:// link. With no app installed Safari shows "cannot open the page"
   and the page just sits there. If the page is still visible ~1.5 s after the tap, say so honestly with a working call
   link. The link itself is left alone so the app opens normally where it is installed. W260S-905: the app is public now (App Store id 6826927017), so the note ends with a store link. */
(function () {
  var NOTE = 'The IGE app isn\'t on this phone yet. To order, call ', STORE = 'https://apps.apple.com/us/app/india-grill-express/id6826927017';
  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a[href^="ige:"]') : null;
    if (!a) return;
    var note = a.nextElementSibling && a.nextElementSibling.classList.contains('appnote') ? a.nextElementSibling : null;
    if (!note) {
      note = document.createElement('p');
      note.className = 'appnote';
      note.setAttribute('aria-live', 'polite');
      a.insertAdjacentElement('afterend', note);
    }
    var gone = false, mark = function () { gone = true; };
    document.addEventListener('visibilitychange', function v() { if (document.visibilityState === 'hidden') mark(); document.removeEventListener('visibilitychange', v); });
    window.addEventListener('pagehide', mark, { once: true });
    setTimeout(function () {
      if (gone || document.visibilityState !== 'visible') return;
      note.textContent = a.getAttribute('data-appnote') || NOTE;
      var t = document.createElement('a');
      t.href = 'tel:+15629914320'; t.textContent = '(562) 991-4320';
      note.appendChild(t); note.appendChild(document.createTextNode('. '));
      var s = document.createElement('a');
      s.href = STORE; s.rel = 'noopener'; s.textContent = 'Get the iPhone app'; s.className = 'btn appstore'; s.textContent = 'Download on the App Store'; /* W272S-001 */
      note.appendChild(s); note.appendChild(document.createTextNode(' on the App Store.'));
      note.insertBefore(document.createTextNode('Or get the free iPhone app: '), s); note.removeChild(s.nextSibling); /* W272S-001 (W272SF): the button ends the note; the W260S-905 line above stays byte-identical */ }, 1500);
  });
})();

/* W69S-002: /parties/ only, a "Share party details" button under The house rules: Web Share, or copy, of the rules list's own lines (the catering payment line is left out) and this page's own link. Nothing is fetched, stored or sent by the page; sharing is the visitor's own tap. */
(function () {
  try {
    if (!/^\/parties\/?$/.test(location.pathname)) return;
    var ul = document.querySelector('ul.rules');
    if (!ul || document.getElementById('w69pp')) return;
    var ps = [].map.call(ul.querySelectorAll('li'), function (li) { return li.textContent.replace(/\s+/g, ' ').trim(); })
      .filter(function (t) { return t && t.toLowerCase().indexOf('catering') < 0; });
    if (!ps.length) return;
    var w = document.createElement('div'); w.id = 'w69pp'; w.className = 'acts w69pp';
    var b = document.createElement('button'); b.type = 'button'; b.className = 'btn alt'; b.textContent = 'Share party details';
    var st = document.createElement('p'); st.className = 'muted small'; st.setAttribute('role', 'status'); st.setAttribute('aria-live', 'polite');
    var say = function (m) { st.textContent = ''; setTimeout(function () { st.textContent = m; }, 30); };
    var text = 'Parties at India Grill Express: ' + ps.join(' '), url = location.origin + '/parties/';
    b.addEventListener('click', function () {
      if (navigator.share) { navigator.share({ title: 'Parties at India Grill Express', text: text, url: url }).catch(function () {}); return; }
      if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(text + '\n' + url).then(function () { say('Party details copied. Paste them into your group chat.'); }, function () { say('Couldn\u2019t copy here. ' + url); }); return; }
      say(url);
    });
    var sty = document.createElement('style'); sty.textContent = '';
    document.head.appendChild(sty);
    w.appendChild(b); w.appendChild(st); ul.parentNode.insertBefore(w, ul.nextSibling);
  } catch (e) {}
})();
