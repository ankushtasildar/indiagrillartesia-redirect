/* W99S w99s.js (IGE site). On-device only: nothing is sent anywhere, nothing stored. No money amounts, no menu facts added.
 W99S-002 /menu/allergens/free-of/: when the built list has 2+ sections, a 44 px 'Back to sections' link after each section that jumps to the existing
 W39S 'Jump to a menu section' chip row (#w39sJump); rebuilt on every change, gone with 0-1 sections; hidden in print.
 W99S-003 Escape closes an open page QR panel (dish pages #w42q, section/diet/free-of guides #w43q) through its own button, focus back to it, polite 'QR code closed.'.
 /menu/ is W98S-002's; left alone after another handler used Escape or while a dialog is open. */
(function(w,d){
if(!d||w.W99S)return;w.W99S=1;
var P=location.pathname;
function css(t){var s=d.createElement('style');s.textContent=t;d.head.appendChild(s)}
function status(){var s=d.getElementById('w99sSt');if(!s){s=d.createElement('p');s.id='w99sSt';s.className='vh';s.setAttribute('role','status');s.setAttribute('aria-live','polite');(d.querySelector('main')||d.body).appendChild(s)}return s}
function builder(){
 var out=d.getElementById('foOut');if(!out||out.getAttribute('data-w99s'))return;out.setAttribute('data-w99s','1');
 css('/* W99S-002 */#w39sJump{scroll-margin-top:8px}.w99s-back{margin:.4rem 0 1.4rem}.w99s-back a{display:inline-flex;align-items:center;gap:.35rem;min-height:44px;padding:0 .25rem;font-weight:600}@media print{.w99s-back{display:none}}');
 var busy=false;
 function paint(){if(busy)return;busy=true;try{
  var old=out.querySelectorAll('.w99s-back');for(var i=0;i<old.length;i++)old[i].parentNode.removeChild(old[i]);
  var hs=out.querySelectorAll('h2');if(hs.length<2)return;
  for(var j=0;j<hs.length;j++){var ul=hs[j].nextElementSibling;if(!ul||ul.tagName!=='UL')continue;
   var p=d.createElement('p');p.className='w99s-back';var b=d.createElement('a');b.href='#w39sJump';var ar=d.createElement('span');ar.setAttribute('aria-hidden','true');ar.textContent='\u2191 ';b.appendChild(ar);b.appendChild(d.createTextNode('Back to sections'));p.appendChild(b);ul.parentNode.insertBefore(p,ul.nextSibling)}
 }finally{mo.takeRecords();busy=false}}
 var mo=new MutationObserver(paint);mo.observe(out,{childList:true});paint();
}
if(/^\/menu\/allergens\/free-of\/$/.test(P))builder();
if(P!=='/menu/'&&P!=='/menu/index.html')d.addEventListener('keydown',function(e){
 if(e.key!=='Escape'||e.defaultPrevented||d.querySelector('dialog[open]'))return;
 var L=[['w43q','w43qb'],['w42q','w42qb']];
 for(var i=0;i<L.length;i++){var q=d.getElementById(L[i][0]),b=d.getElementById(L[i][1]);
  if(q&&b&&!q.hidden){b.click();if(!q.hidden)q.hidden=true;b.setAttribute('aria-expanded','false');b.focus();var s=status();s.textContent='';setTimeout(function(){s.textContent='QR code closed.'},30);e.preventDefault();return}}
});
})(typeof window!='undefined'?window:{},typeof document!='undefined'?document:undefined);
