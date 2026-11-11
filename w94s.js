/* W94S-001 /menu/ on phones (<=700 px): the sticky bar becomes the search field + one Filters button, then the section chips.
   The 4 diet and 8 leave-out (estimated) checkboxes sit behind the button: the same inputs, labels, words and filtering.
   The button says how many filters are on; the allergen note is never hidden by it (the leave-out 'remembered on this device' line and the 'Copy link / QR code for this view' buttons sit with the checkboxes). Desktop and no-JS: unchanged. */
(function () {
  var bar = document.querySelector('.mbar'), tools = bar && bar.querySelector('.mtools');
  var srch = tools && tools.querySelector('.msearch'), diet = tools && tools.querySelector('.mdiet'), alg = tools && tools.querySelector('.malg');
  if (!srch || !diet || !alg || !window.matchMedia || document.getElementById('w94sFb')) return;
  if (!diet.id) diet.id = 'w94sDiet';
  if (!alg.id) alg.id = 'w94sAlg';
  var b = document.createElement('button');
  b.type = 'button'; b.id = 'w94sFb'; b.className = 'w94s-fb';
  b.setAttribute('aria-controls', diet.id + ' ' + alg.id);
  srch.parentNode.insertBefore(b, srch.nextSibling);
  var mq = window.matchMedia('(max-width:700px)'), open = false;
  function on() { return tools.querySelectorAll('.mdiet input:checked,.malg input:checked').length; }
  function tag() { [].forEach.call(tools.querySelectorAll('.w35s-bar'), function (e) { e.classList.add('w94s-fp'); }); }
  function paint() {
    tag();
    var k = on();
    b.textContent = k ? 'Filters \u00b7 ' + k + ' on' : 'Filters';
    b.classList.toggle('w94s-n', k > 0);
    b.setAttribute('aria-expanded', open ? 'true' : 'false');
    bar.classList.toggle('w94s-c', !open);
  }
  function mode() { bar.classList.toggle('w94s-on', mq.matches); paint(); }
  b.addEventListener('click', function () { open = !open; paint(); });
  tools.addEventListener('change', paint);
  if (mq.addEventListener) mq.addEventListener('change', mode); else if (mq.addListener) mq.addListener(mode);
  window.addEventListener('load', paint);
  mode();
})();
