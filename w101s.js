/* W101S w101s.js (IGE site). On-device only: nothing is sent anywhere, nothing stored. No money amounts, no menu facts added.
 W101S-001 'Back to sections' lands on the section you came from: the chip of the section just above the tapped Back link (W98S/W99S/W100S) keeps
 aria-current="location" with the W100S filled look and the sideways chip row slides it into view; the hold ends once you scroll about a third of a
 screen away, then W100S-001's tracking takes over again. /menu/ is W97S-002's: left alone.
 W101S-002 single-allergen free-of guides: the 'Printable free-of lists' chip of this page gets aria-current="page", an outlined bold look, and is slid
 into view on load. */
(function(w,d){
if(!d||w.W101S)return;w.W101S=1;
var P=location.pathname.replace(/index\.html$/,'');
if(P==='/menu/')return;
var calm=w.matchMedia&&w.matchMedia('(prefers-reduced-motion: reduce)').matches;
var s=d.createElement('style');s.textContent='/* W101S-001/002 */nav a.w100s-cur{background:var(--head);color:var(--card);border-color:var(--head)}nav a.w100s-cur span{color:inherit}nav.agjump a.w101s-pg{font-weight:700;border:2px solid var(--head);color:var(--head)}';d.head.appendChild(s);
function slide(n,a,smooth){if(!n||!a||n.scrollWidth<=n.clientWidth+4)return;var ar=a.getBoundingClientRect(),nr=n.getBoundingClientRect();
 if(ar.left>=nr.left+8&&ar.right<=nr.right-8)return;var x=Math.max(0,n.scrollLeft+(ar.left-nr.left)-Math.max(16,(nr.width-ar.width)/2));
 if(n.scrollTo)n.scrollTo({left:x,behavior:smooth&&!calm?'smooth':'auto'});else n.scrollLeft=x}
/* W101S-002 */
var ag=d.querySelector('nav.agjump');
if(ag&&!ag.querySelector('a[aria-current]')){var gl=ag.querySelectorAll('a');for(var i=0;i<gl.length;i++){var pa=(gl[i].pathname||'').replace(/index\.html$/,'');
 if(pa===P){gl[i].setAttribute('aria-current','page');gl[i].classList.add('w101s-pg');slide(ag,gl[i],false);break}}}
/* W101S-001 */
function rows(){var o=[],ns=d.querySelectorAll('nav');
 for(var i=0;i<ns.length;i++){var all=ns[i].querySelectorAll('a'),it=[];if(all.length<2)continue;
  for(var j=0;j<all.length;j++){var h=all[j].getAttribute('href')||'';if(h.charAt(0)!=='#'||h.length<2){it=null;break}
   var t=d.getElementById(decodeURIComponent(h.slice(1)));if(!t){it=null;break}it.push([all[j],t])}
  if(it)o.push([ns[i],it])}return o}
var hold=null;
function apply(){if(!hold)return;var y=w.pageYOffset;
 if(Date.now()-hold.t<800)hold.y=y;else if(Math.abs(y-hold.y)>w.innerHeight*0.33){hold=null;return}
 var R=rows(),n=null,sel=null;
 for(var r=0;r<R.length&&!sel;r++){if(hold.id&&R[r][0].id!==hold.id)continue;for(var k=0;k<R[r][1].length;k++)if(R[r][1][k][0].getAttribute('href')===hold.h){n=R[r][0];sel=R[r][1][k][0];break}}
 if(!sel)return;var it=n.querySelectorAll('a');
 for(var k2=0;k2<it.length;k2++){var a=it[k2];if(a===sel){if(a.getAttribute('aria-current')!=='location')a.setAttribute('aria-current','location');a.classList.add('w100s-cur')}
  else if(a.classList.contains('w100s-cur')||a.getAttribute('aria-current')==='location'){a.classList.remove('w100s-cur');a.removeAttribute('aria-current')}}
 slide(n,sel,false)}
d.addEventListener('click',function(e){var b=e.target&&e.target.closest?e.target.closest('a'):null;if(!b)return;
 var p=b.parentElement,ok=0;for(var u=0;u<2&&p;u++,p=p.parentElement)if(/(^|\s)w\d+s-back(\s|$)/.test(p.className||''))ok=1;
 var h=b.getAttribute('href')||'';if(!ok||h.charAt(0)!=='#')return;
 var R=rows(),by=b.getBoundingClientRect().top,sel=null,best=-1e9;
 for(var r=0;r<R.length;r++)for(var k=0;k<R[r][1].length;k++){var tp=R[r][1][k][1].getBoundingClientRect().top;if(tp<=by&&tp>best){best=tp;sel=[R[r][0],R[r][1][k][0]]}}
 if(!sel){hold=null;return}hold={id:sel[0].id||'',h:sel[1].getAttribute('href'),t:Date.now(),y:0};
 setTimeout(apply,0);setTimeout(apply,300);setTimeout(apply,600)},true);
var q=0,tl=0;function soon(){if(!hold)return;if(!q){q=1;(w.requestAnimationFrame||setTimeout)(function(){q=0;apply()})}clearTimeout(tl);tl=setTimeout(apply,260)}
w.addEventListener('scroll',soon,{passive:true});w.addEventListener('hashchange',soon);
})(typeof window!='undefined'?window:{},typeof document!='undefined'?document:undefined);
