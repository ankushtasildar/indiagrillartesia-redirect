/* W102S w102s.js (IGE site). On-device only: nothing is sent anywhere, nothing stored. No money amounts, no menu facts added or changed.
 W102S-001 filtered views (Leave out ticks or a shared ?free= link): a chip-row 'section in view' mark (W100S-001) or a Back hold (W101S-001) never stays
 on a chip hidden by the filter (W40S): it moves to the visible chip of the section on screen, so the row always shows where you are.
 W102S-002 a 'Back to sections' link (W98S/W99S/W100S) right after a section the filter hides is hidden with it, and returns when the ticks change.
 Pages with nothing hidden: nothing changes. /menu/ is W97S-002's: left alone. */
(function(w,d){
if(!d||w.W102S)return;w.W102S=1;
var P=location.pathname.replace(/index\.html$/,'');if(P==='/menu/')return;
var s=d.createElement('style');s.textContent='/* W102S-002 */.w102s-off{display:none!important}';d.head.appendChild(s);
function shown(e){return !!(e&&!e.hidden&&e.getClientRects().length&&e.offsetHeight>0)}
function rows(){var o=[],ns=d.querySelectorAll('nav');
 for(var i=0;i<ns.length;i++){var all=ns[i].querySelectorAll('a'),it=[];if(all.length<2)continue;
  for(var j=0;j<all.length;j++){var h=all[j].getAttribute('href')||'';if(h.charAt(0)!=='#'||h.length<2){it=null;break}
   var t=d.getElementById(decodeURIComponent(h.slice(1)));if(!t){it=null;break}it.push([all[j],t])}
  if(it)o.push([ns[i],it])}return o}
/* W102S-002 */
function backs(){var ps=d.querySelectorAll('p.w99s-back,p.w98s-back,p.w100s-back,.w98s-back,.w100s-back');
 for(var i=0;i<ps.length;i++){var p=ps[i],sec=p.previousElementSibling;while(sec&&sec.tagName!=='SECTION'&&/back/.test(sec.className||''))sec=sec.previousElementSibling;
  if(!sec||sec.tagName!=='SECTION'){p.classList.remove('w102s-off');continue}
  var off=!(sec.hidden?false:sec.getClientRects().length&&sec.offsetHeight>0);p.classList.toggle('w102s-off',off)}}
/* W102S-001 */
function fix(){var R=rows(),line=Math.max(120,w.innerHeight*0.3),end=w.innerHeight+w.pageYOffset>=d.documentElement.scrollHeight-4;
 for(var r=0;r<R.length;r++){var it=R[r][1],bad=null;
  for(var k=0;k<it.length;k++){var a=it[k][0];if(a.getAttribute('aria-current')==='location'&&(!shown(a)||!shown(it[k][1])))bad=a}
  if(!bad)continue;var cur=-1,best=-1e9;
  for(var m=0;m<it.length;m++){if(!shown(it[m][0])||!shown(it[m][1]))continue;var top=it[m][1].getBoundingClientRect().top;
   if((top<=line||(end&&top<w.innerHeight))&&top>=best){best=top;cur=m}}
  if(cur<0)for(var f=0;f<it.length;f++)if(shown(it[f][0])&&shown(it[f][1])){cur=f;break}
  bad.classList.remove('w100s-cur');bad.removeAttribute('aria-current');
  if(cur>=0){var g=it[cur][0];g.setAttribute('aria-current','location');g.classList.add('w100s-cur');
   var n=R[r][0];if(n.scrollWidth>n.clientWidth+4){var ar=g.getBoundingClientRect(),nr=n.getBoundingClientRect();
    if(ar.left<nr.left+8||ar.right>nr.right-8)n.scrollLeft=Math.max(0,n.scrollLeft+(ar.left-nr.left)-16)}}}}
var q=0,tl=0,busy=0;function run(){q=0;if(busy)return;busy=1;try{backs();fix()}finally{busy=0}}
function soon(){if(!q){q=1;(w.requestAnimationFrame||setTimeout)(run)}clearTimeout(tl);tl=setTimeout(run,340)}
w.addEventListener('scroll',soon,{passive:true});w.addEventListener('resize',soon);w.addEventListener('hashchange',soon);w.addEventListener('load',soon);
d.addEventListener('change',soon);d.addEventListener('click',function(){setTimeout(run,0);setTimeout(run,320);setTimeout(run,650)},true);
if(w.MutationObserver){var mo=new MutationObserver(function(){if(!busy)soon()});mo.observe(d.body||d.documentElement,{attributes:true,attributeFilter:['hidden','aria-current'],subtree:true})}
soon();
})(typeof window!='undefined'?window:{},typeof document!='undefined'?document:undefined);
