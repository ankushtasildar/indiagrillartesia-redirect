/* W98S-001 /menu/ on phones (<=700 px), CLOSED Filters row: a small 'Edit' button (screen reader: 'Edit what you leave out') at the end of the W97S
   'Leaving out ... (estimated).' line; it (or a tap on the line) opens the Filters panel and puts focus on the first ticked leave-out box. Hidden when nothing
   is left out and while the panel is open. Desktop, no-JS and the open panel: unchanged.
   W98S-002 /menu/: Escape closes an open QR panel ('QR code for this view', 'QR for my list', a shared list's QR) before anything else and puts focus back
   on its button; left alone while typing in a text box or while the dish sheet (a native dialog, closes itself) is open.
   w94s.js, w95s.js, w96s.js, w97s.js, w44s.js and w45s.js are untouched. No storage, no network. */
(function () {
  var bar = document.querySelector('.mbar'), tools = bar && bar.querySelector('.mtools'), fb = document.getElementById('w94sFb');
  var lo = document.getElementById('w97sLo');
  if (bar && tools && fb && lo && !document.getElementById('w98sEd')) {
    var row = document.createElement('div'); row.className = 'w98s-row';
    lo.parentNode.insertBefore(row, lo); row.appendChild(lo);
    var ed = document.createElement('button');
    ed.type = 'button'; ed.id = 'w98sEd'; ed.className = 'w98s-ed'; ed.textContent = 'Edit'; ed.hidden = true;
    ed.setAttribute('aria-label', 'Edit what you leave out');
    row.appendChild(ed);
    var go = function () {
      if (fb.getAttribute('aria-expanded') !== 'true') fb.click();
      var g = tools.querySelector('.malg'), c = g && (g.querySelector('input:checked') || g.querySelector('input'));
      if (!c) return;
      setTimeout(function () {
        try { c.focus({ preventScroll: true }); } catch (e) { c.focus(); }
        var r = c.getBoundingClientRect();
        if (r.top < 0 || r.bottom > window.innerHeight) c.scrollIntoView({ block: 'center' });
      }, 0);
    };
    ed.addEventListener('click', go);
    lo.addEventListener('click', go);
    var paint = function () {
      var on = !lo.hidden && fb.getAttribute('aria-expanded') !== 'true';
      ed.hidden = !on; row.classList.toggle('w98s-has', on);
    };
    if ('MutationObserver' in window) {
      new MutationObserver(paint).observe(lo, { attributes: true, attributeFilter: ['hidden'] });
      new MutationObserver(paint).observe(fb, { attributes: true, attributeFilter: ['aria-expanded'] });
    }
    tools.addEventListener('change', function () { setTimeout(paint, 0); });
    window.addEventListener('load', paint);
    paint();
  }
  var QR = [['w44frq', 'w44fr'], ['w44mlq', 'w44ml'], ['w45slq', 'w45sl']], say = null;
  window.addEventListener('keydown', function (e) {
    if ((e.key !== 'Escape' && e.key !== 'Esc') || e.defaultPrevented) return;
    if (document.querySelector('dialog[open]')) return;
    var a = document.activeElement, pick = null;
    for (var i = 0; i < QR.length; i++) {
      var p = document.getElementById(QR[i][0]), b = document.getElementById(QR[i][1]);
      if (!p || !b || !p.getClientRects().length) continue;
      if (!pick || (a && (p.contains(a) || a === b))) pick = [p, b];
    }
    if (!pick) return;
    if (a && /^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName) && !pick[0].contains(a) && a.type !== 'checkbox') return;
    e.preventDefault(); e.stopImmediatePropagation();
    pick[0].remove(); pick[1].setAttribute('aria-expanded', 'false'); pick[1].focus();
    if (!say) { say = document.createElement('p'); say.className = 'vh'; say.id = 'w98sSay'; say.setAttribute('role', 'status'); say.setAttribute('aria-live', 'polite'); document.body.appendChild(say); }
    say.textContent = ''; setTimeout(function () { say.textContent = 'QR code closed.'; }, 120);
  }, true);
})();
