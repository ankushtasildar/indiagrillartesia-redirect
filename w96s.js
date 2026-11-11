/* W96S-001 /menu/ on phones (<=700 px): a small 'Clear' button (screen reader: 'Clear filters') right after the CLOSED 'Filters · N on' button.
   One tap unticks every diet + leave-out (estimated) box through the same inputs (each fires its normal change event, so the list, the Filters label
   update as by hand), keeps the search words, moves focus to the Filters button and a polite status line says 'Filters cleared. All dishes shown.' (or 'Your search words are kept.') Hidden when nothing is ticked
   and while the panel is open (the W95S-001 'Clear filters' sits inside it). Desktop and no-JS: unchanged (no button).
   W96S-002 /menu/ on phones: Escape closes the open Filters panel and returns focus to the Filters button (only when focus is in the menu bar).
   w94s.js and w95s.js are untouched. */
(function () {
  var bar = document.querySelector('.mbar'), tools = bar && bar.querySelector('.mtools'), fb = document.getElementById('w94sFb');
  if (tools && fb && !document.getElementById('w96sClr')) {
    var c = document.createElement('button');
    c.type = 'button'; c.id = 'w96sClr'; c.className = 'w96s-clr'; c.textContent = 'Clear';
    c.setAttribute('aria-label', 'Clear filters');
    fb.parentNode.insertBefore(c, fb.nextSibling);
    var say = document.createElement('p'); say.className = 'vh'; say.id = 'w96sSay'; say.setAttribute('role', 'status'); say.setAttribute('aria-live', 'polite');
    bar.appendChild(say);
    var srch = tools.querySelector('.msearch input,input.msearch,input[type="search"]');
    var ticked = function () { return [].slice.call(tools.querySelectorAll('.mdiet input:checked,.malg input:checked')); };
    var paint = function () { c.hidden = ticked().length === 0 || fb.getAttribute('aria-expanded') === 'true'; };
    c.addEventListener('click', function () {
      ticked().forEach(function (x) { x.checked = false; x.dispatchEvent(new Event('change', { bubbles: true })); });
      paint(); fb.focus();
      say.textContent = '';
      setTimeout(function () { say.textContent = srch && srch.value ? 'Filters cleared. Your search words are kept.' : 'Filters cleared. All dishes shown.'; }, 120);
    });
    tools.addEventListener('change', paint);
    fb.addEventListener('click', paint);
    window.addEventListener('load', paint);
    paint();
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape' && e.key !== 'Esc') return;
      if (!bar.classList.contains('w94s-on') || fb.getAttribute('aria-expanded') !== 'true') return;
      var t = e.target;
      if (t && t !== document.body && !bar.contains(t)) return;
      e.preventDefault(); fb.click(); fb.focus();
    });
  }
})();
