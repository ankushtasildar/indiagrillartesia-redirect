/* W95S-001 /menu/ on phones (<=700 px): a 'Clear filters' button inside the W94S-001 Filters panel.
   One tap unticks every diet + leave-out (estimated) box through the same inputs (each fires its normal change event), keeps the search words and moves focus to the Filters button.
   Hidden when nothing is ticked and while the panel is closed; desktop and no-JS unchanged (no button). */
(function () {
  var bar = document.querySelector('.mbar'), tools = bar && bar.querySelector('.mtools'), fb = document.getElementById('w94sFb');
  var alg = tools && tools.querySelector('.malg');
  if (!fb || !alg || document.getElementById('w95sClr')) return;
  var wrap = document.createElement('p'); wrap.className = 'w95s-clr';
  var b = document.createElement('button'); b.type = 'button'; b.id = 'w95sClr'; b.textContent = 'Clear filters';
  wrap.appendChild(b); alg.parentNode.insertBefore(wrap, alg.nextSibling);
  function ticked() { return [].slice.call(tools.querySelectorAll('.mdiet input:checked,.malg input:checked')); }
  function paint() { wrap.hidden = ticked().length === 0; }
  b.addEventListener('click', function () {
    ticked().forEach(function (c) { c.checked = false; c.dispatchEvent(new Event('change', { bubbles: true })); });
    paint(); fb.focus();
  });
  tools.addEventListener('change', paint);
  window.addEventListener('load', paint);
  paint();
})();
