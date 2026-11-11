/* W103S w103s.js (IGE site). On-device only: nothing is sent anywhere, nothing stored. No money amounts, no menu facts added or changed; allergen words stay estimates.
 W103S-002 diet guides (W40S caption 'Nothing fits by estimate in: ...'): each named section links to its existing /menu/s/<section>/ page.
 W103S-003 free-of builder (/menu/allergens/free-of/, W39S line 'No dish fits by estimate in: ...'): the same links; the line sits right after the
  W39S chip row instead of inside its nav, so the nav holds only # chips and the W100S-W102S section marks keep working.
 Only the 16 section pages that exist are linked (names = each page's own title); Catering stays plain text (catering is off and unlinked).
 The caption words do not change: only the section names become links, re-made each time W40S/W39S rewrite the line as ticks change. */
(function(w,d){
if(!d||w.W103S)return;w.W103S=1;
var NM={"Appetizers": "appetizers", "Biryani & Rice": "biryani-rice", "Breads": "breads", "Chaat, Rolls & Momos": "street-food", "Chicken": "chicken", "Combos & Plates": "combos", "Desserts & Sweets": "desserts", "Drinks": "drinks", "Grocery": "grocery", "Indo-Chinese": "indo-chinese", "Lamb & Goat": "lamb-goat", "Seafood": "seafood", "Sides & Extras": "sides", "South Indian": "south-indian", "Tandoor & Grill": "tandoor-grill", "Vegetarian": "vegetarian"};
var s=d.createElement('style');s.textContent='/* W103S-002 */a.w103s-sec{padding:.55em 0;text-decoration:underline;text-underline-offset:2px}@media print{p.w103s-out{display:none!important}}';d.head.appendChild(s);
var KS=Object.keys(NM).sort(function(a,b){return b.length-a.length});
function piece(f,seg){var i=0,last=0;
 function plain(e){if(e>last)f.appendChild(d.createTextNode(seg.slice(last,e)))}
 while(i<seg.length){var hit=null;if(i===0||seg.slice(i-2,i)===', ')for(var k=0;k<KS.length;k++){var n=KS[k],e=i+n.length;if(seg.substr(i,n.length)===n&&(e===seg.length||seg.charAt(e)===','||seg.charAt(e)==='.'||seg.charAt(e)===' ')){hit=n;break}}
  if(hit){plain(i);var a=d.createElement('a');a.className='w103s-sec';a.href='/menu/s/'+NM[hit]+'/';a.textContent=hit;a.setAttribute('aria-label',hit+': open the full section page');f.appendChild(a);i+=hit.length;last=i}else i++}
 plain(seg.length)}
function link(p,pre,stop){if(!p)return;var t=p.textContent;if(p.getAttribute('data-w103s')===t&&(p.childNodes.length>1||t.indexOf(pre)<0))return;var i=t.indexOf(pre);if(i<0){p.setAttribute('data-w103s',t);return}
 var a=i+pre.length,b=t.indexOf(stop,a);if(b<0)b=t.length;var f=d.createDocumentFragment();
 f.appendChild(d.createTextNode(t.slice(0,a)));piece(f,t.slice(a,b));f.appendChild(d.createTextNode(t.slice(b)));
 p.textContent='';p.appendChild(f);p.setAttribute('data-w103s',p.textContent)}
var busy=0,q=0;function run(){q=0;if(busy)return;busy=1;try{
 /* W103S-002 */var c=d.querySelectorAll('p.w40cap');for(var i=0;i<c.length;i++)link(c[i],'Nothing fits by estimate in: ','.');
 /* W103S-003 the line moves from inside the chip row's nav to right after it (same place on screen), so the nav keeps only its # chips (W100S-W102S marks) */
 var J=d.getElementById('w39sJump'),o=d.querySelectorAll('p.w103s-out'),n=J&&!J.hidden?J.querySelector('p.w39s-none'):null,ul=J&&J.querySelector('ul');
 /* a moved line stays while W39S has not rebuilt the row since (same list element); a rebuild or a hidden row drops it */
 for(var j=0;j<o.length;j++){var keep=!n&&J&&!J.hidden&&ul&&o[j].w103ul===ul&&o[j].previousElementSibling===J;if(keep){n=o[j];link(n,'No dish fits by estimate in: ',' (every dish');continue}if(o[j]!==n)o[j].parentNode.removeChild(o[j])}
 if(n&&n.parentNode===J){n.classList.add('w103s-out');n.w103ul=ul;J.parentNode.insertBefore(n,J.nextSibling);link(n,'No dish fits by estimate in: ',' (every dish')}
 }finally{if(mo)mo.takeRecords();busy=0}}
var tl=0;function soon(){if(!q){q=1;setTimeout(run,0)}clearTimeout(tl);tl=setTimeout(run,90)}
var mo=w.MutationObserver?new MutationObserver(function(){if(!busy)soon()}):null;
function go(){var m=d.body||d.documentElement;if(mo&&m)mo.observe(m,{childList:true,subtree:true,characterData:true});run()}
d.addEventListener('change',function(){setTimeout(run,120)});
if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',go);else go();setTimeout(run,900);setTimeout(run,2000);
})(typeof window!='undefined'?window:{},typeof document!='undefined'?document:undefined);
