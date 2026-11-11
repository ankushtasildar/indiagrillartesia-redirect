/* W100S w100s.js (IGE site). On-device only: nothing is sent anywhere, nothing stored. No money amounts, no menu facts added.
 W100S-001 'section in view': on pages with an in-page chip row (every link #section: diet guides, /menu/popular/, free-of-* guides, the builder's
 W39S jump row) the chip of the section on screen gets aria-current="location" and a filled look (W97S look); above the first section the last marked chip
 stays marked, so 'Back to sections' lands on a row that shows where you were. /menu/ is W97S-002's: left alone.
 W100S-002 /menu/allergens/free-of/: the page title names the ticked allergens ('Free of dairy and gluten (estimated) · Build a free-of list · ...');
 the original title comes back when nothing is ticked. */
(function(w,d){
if(!d||w.W100S)return;w.W100S=1;
var P=location.pathname.replace(/index\.html$/,'');
function css(t){var s=d.createElement('style');s.textContent=t;d.head.appendChild(s)}
if(P==='/menu/allergens/free-of/'){
 var T0=d.title,cnt=d.getElementById('foCount');
 var title=function(){var ls=d.querySelectorAll('label.fob'),nm=[];
  for(var i=0;i<ls.length;i++){var c=ls[i].querySelector('input');if(c&&c.checked)nm.push(ls[i].textContent.replace(/\s+/g,' ').trim().toLowerCase())}
  if(!nm.length){if(d.title!==T0)d.title=T0;return}
  var s=nm.length===1?nm[0]:nm.slice(0,-1).join(', ')+' and '+nm[nm.length-1];
  var t='Free of '+s+' (estimated) \u00b7 Build a free-of list \u00b7 India Grill Express, Artesia';if(d.title!==t)d.title=t};
 d.addEventListener('change',function(e){if(e.target&&e.target.closest&&e.target.closest('label.fob'))setTimeout(title,0)});
 if(cnt&&w.MutationObserver)new MutationObserver(title).observe(cnt,{childList:true,characterData:true,subtree:true});
 title();
}
if(P==='/menu/')return;
css('/* W100S-001 */nav a.w100s-cur{background:var(--head);color:var(--card);border-color:var(--head)}nav a.w100s-cur span{color:inherit}');
function rows(){var o=[],ns=d.querySelectorAll('nav');
 for(var i=0;i<ns.length;i++){var all=ns[i].querySelectorAll('a'),it=[];if(all.length<2)continue;
  for(var j=0;j<all.length;j++){var h=all[j].getAttribute('href')||'';if(h.charAt(0)!=='#'||h.length<2){it=null;break}
   var t=d.getElementById(decodeURIComponent(h.slice(1)));if(!t){it=null;break}it.push([all[j],t])}
  if(it)o.push([ns[i],it])}return o}
var last={},calm=w.matchMedia&&w.matchMedia('(prefers-reduced-motion: reduce)').matches,q=0;
function mark(){q=0;var R=rows(),line=Math.max(120,w.innerHeight*0.3),end=w.innerHeight+w.pageYOffset>=d.documentElement.scrollHeight-4;
 for(var r=0;r<R.length;r++){var it=R[r][1],cur=-1;
  for(var k=0,best=-1e9;k<it.length;k++){var top=it[k][1].getBoundingClientRect().top;if((top<=line||(end&&top<w.innerHeight))&&top>=best){best=top;cur=k}}
  var key=R[r][0].id||R[r][0].getAttribute('aria-label')||'n'+r;
  if(cur<0){if(R[r][0].querySelector('.w100s-cur'))continue;for(var z=0;z<it.length;z++)if(it[z][0].getAttribute('href')===last[key])cur=z;if(cur<0)continue}
  last[key]=it[cur][0].getAttribute('href');
  for(var m=0;m<it.length;m++){var a=it[m][0];
   if(m===cur){if(a.getAttribute('aria-current')!=='location'){a.setAttribute('aria-current','location');a.classList.add('w100s-cur');
     var n=R[r][0];if(n.scrollWidth>n.clientWidth+4){var ar=a.getBoundingClientRect(),nr=n.getBoundingClientRect();
      if(ar.left<nr.left+8||ar.right>nr.right-8){var x=n.scrollLeft+(ar.left-nr.left)-16;if(n.scrollTo)n.scrollTo({left:x,behavior:calm?'auto':'smooth'});else n.scrollLeft=x}}}}
   else if(a.classList.contains('w100s-cur')){a.classList.remove('w100s-cur');a.removeAttribute('aria-current')}}}}
var tl=0;function soon(){if(!q){q=1;(w.requestAnimationFrame||setTimeout)(mark)}clearTimeout(tl);tl=setTimeout(mark,220)}
w.addEventListener('scroll',soon,{passive:true});w.addEventListener('resize',soon);w.addEventListener('hashchange',soon);w.addEventListener('load',soon);
var fo=d.getElementById('foOut');if(fo&&w.MutationObserver)new MutationObserver(soon).observe(fo,{childList:true});
soon();
})(typeof window!='undefined'?window:{},typeof document!='undefined'?document:undefined);
