/* W97S-001 /menu/ on phones (<=700 px), CLOSED Filters row: the 'Open this list in the IGE app' block (w39s.js) folds behind the Filters panel (CSS in the
   W97S-001 block); a short line 'Leaving out dairy, tree nuts (estimated).' shows under the closed row instead, and describes the Filters button for
   screen readers (aria-describedby). The allergen estimate note is never hidden. Open panel, desktop and no-JS: unchanged.
   W97S-002 /menu/ current section: the section chip for the part of the menu on screen gets aria-current="location" and a filled look; on phones the
   chip row slides sideways to keep it in view. Chip words and links unchanged. w94s.js, w95s.js, w96s.js and w39s.js are untouched. */
(function () {
  var bar = document.querySelector('.mbar'), tools = bar && bar.querySelector('.mtools'), fb = document.getElementById('w94sFb');
  if (bar && tools && fb && !document.getElementById('w97sLo')) {
    var lo = document.createElement('p');
    lo.id = 'w97sLo'; lo.className = 'small w97s-lo'; lo.hidden = true;
    var note = document.getElementById('malgNote');
    tools.insertBefore(lo, note && note.parentNode === tools ? note : null);
    var paint = function () {
      var v = [].map.call(tools.querySelectorAll('.malg input:checked'), function (x) { return (x.parentNode.textContent || '').trim().toLowerCase(); });
      var t = v.length ? 'Leaving out ' + v.join(', ') + ' (estimated).' : '';
      if (lo.textContent !== t) lo.textContent = t;
      lo.hidden = !v.length;
      if (v.length) fb.setAttribute('aria-describedby', 'w97sLo'); else fb.removeAttribute('aria-describedby');
    };
    tools.addEventListener('change', function () { setTimeout(paint, 0); });
    window.addEventListener('load', paint);
    setTimeout(paint, 900); setTimeout(paint, 1900);
    paint();
  }
  var chips = document.getElementById('chips');
  if (bar && chips && 'IntersectionObserver' in window && !chips.getAttribute('data-w97s')) {
    chips.setAttribute('data-w97s', '1');
    var map = {}, ids = [], vis = {}, cur = null;
    [].forEach.call(chips.querySelectorAll('a[href^="#"]'), function (a) {
      var id = a.getAttribute('href').slice(1), s = id && document.getElementById(id);
      if (s && !map[id]) { map[id] = a; ids.push(id); }
    });
    var calm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var set = function (id) {
      if (cur === id) return;
      if (cur && map[cur]) { map[cur].removeAttribute('aria-current'); map[cur].classList.remove('w97s-cur'); }
      cur = id; var a = map[id]; if (!a) return;
      a.setAttribute('aria-current', 'location'); a.classList.add('w97s-cur');
      if (!bar.classList.contains('w94s-on')) return;
      var r = a.getBoundingClientRect(), n = chips.getBoundingClientRect();
      if (r.width && (r.left < n.left + 8 || r.right > n.right - 8)) {
        var x = chips.scrollLeft + (r.left - n.left) - 16;
        if (chips.scrollTo) chips.scrollTo({ left: x, behavior: calm ? 'auto' : 'smooth' }); else chips.scrollLeft = x;
      }
    };
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { vis[e.target.id] = e.isIntersecting; });
      for (var i = 0; i < ids.length; i++) { if (vis[ids[i]]) { set(ids[i]); break; } }
    }, { rootMargin: '-45% 0px -50% 0px' });
    ids.forEach(function (id) { io.observe(document.getElementById(id)); });
  }
})();
