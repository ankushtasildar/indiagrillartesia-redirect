/* W110S w110s.js (IGE site). On-device only: nothing is sent anywhere and nothing is stored; the free-of list this device saved
 (localStorage "ige-freeof-v1") is only READ, never written. No money amounts, no menu facts added or changed; allergen words stay estimates.
 W110S-001 section pages, Popular and the 4 diet guides: while a saved list exists and NO Leave out box is ticked on the page (after W106S
  'Show all N dishes'; W36S then shares by the saved list), the W36S share button says so: visible 'Share what fits your saved list (est.)',
  screen-reader name 'Share the N dishes on this page that fit your saved free-of list, leaving out ... (estimated)'. Anything ticked again:
  the button reads exactly as before. One debounced change/click/storage listener, finite timers, no observer, no interval.
  Not on ?free= / ?fits (W104S/W105S own those). */
(function(w,d){
if(!d||w.W110S)return;w.W110S=1;
var L=w.location,P=L.pathname,N={dairy:"dairy",gluten:"gluten","tree-nuts":"tree nuts",peanuts:"peanuts",egg:"egg",soy:"soy",fish:"fish",shellfish:"shellfish"};
if(/[?&](free|fits)(=|&|$)/.test(L.search))return;
if(!/^\/menu\/(s\/[a-z0-9-]+|popular|vegetarian|vegan|gluten-free|high-protein)\/?$/.test(P))return;
var T0="Share what fits (est.)",T1="Share what fits your saved list (est.)",R=/^Share the (\d+) dish(?:es)? on this page that fits?, leaving out (.+) \(estimated\)$/;
function list(){try{var a=JSON.parse(w.localStorage.getItem("ige-freeof-v1")||"[]");return Array.isArray(a)?a.filter(function(v){return Object.prototype.hasOwnProperty.call(N,v)}):[]}catch(e){return[]}}
function start(){
 var tm=0,tm2=0,base=null;
 function render(){var b=d.getElementById("w36sShare"),lo=d.getElementById("leaveOut");if(!b||!lo)return;
  var none=!lo.querySelector("input[type=checkbox]:checked"),use=none&&list().length>0,l=b.getAttribute("aria-label")||"",m=R.exec(l);
  if(use&&m&&+m[1]>0){base=l;var n=+m[1];
   b.setAttribute("aria-label","Share the "+n+(n===1?" dish on this page that fits":" dishes on this page that fit")+" your saved free-of list, leaving out "+m[2]+" (estimated)");
   if(b.textContent===T0)b.textContent=T1}
  else if(!use){if(b.textContent===T1)b.textContent=T0;if(base!==null&&/ your saved free-of list, /.test(l)){b.setAttribute("aria-label",base.replace(/^Share the 1 dishes on this page that fit,/,"Share the 1 dish on this page that fits,"));}base=null}}
 function soon(){clearTimeout(tm);clearTimeout(tm2);tm=setTimeout(render,500);tm2=setTimeout(render,1400)}
 d.addEventListener("change",soon);d.addEventListener("click",soon);w.addEventListener("storage",soon);render();setTimeout(render,1400)}
if(d.readyState==="loading")d.addEventListener("DOMContentLoaded",function(){setTimeout(start,700)});else setTimeout(start,700);
})(typeof window!="undefined"?window:undefined,typeof document!="undefined"?document:undefined);
