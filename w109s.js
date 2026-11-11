/* W109S w109s.js (IGE site). On-device only: nothing is sent anywhere and nothing is stored; the free-of list this device saved
 (localStorage "ige-freeof-v1") is only READ, never written. No money amounts, no menu facts added or changed; allergen words stay estimates.
 W109S-001 Popular, the 4 diet guides and section pages: while a saved list exists and the page's Leave out ticks are not exactly that list
  (after W106S 'Show all N dishes', or different hand ticks), the W32S section-heading counts ('. N of M fit your list (est.)', counted against
  the saved list) are hidden, so headings read like the chips above them; they come back the moment the ticks equal the saved list again.
 W109S-002 the W36S 'Share what fits (est.)' button's screen-reader name says '1 dish ... that fits' instead of '1 dishes ... that fit'.
 One debounced change/click/storage listener, finite timers, no observer, no interval. Not on ?free= / ?fits (W104S/W105S own those). */
(function(w,d){
if(!d||w.W109S)return;w.W109S=1;
var L=w.location,P=L.pathname,N={dairy:"dairy",gluten:"gluten","tree-nuts":"tree nuts",peanuts:"peanuts",egg:"egg",soy:"soy",fish:"fish",shellfish:"shellfish"};
if(/[?&](free|fits)(=|&|$)/.test(L.search))return;
if(!/^\/menu\/(s\/[a-z0-9-]+|popular|vegetarian|vegan|gluten-free|high-protein)\/?$/.test(P))return;
function list(){try{var a=JSON.parse(w.localStorage.getItem("ige-freeof-v1")||"[]");return Array.isArray(a)?a.filter(function(v){return Object.prototype.hasOwnProperty.call(N,v)}):[]}catch(e){return[]}}
function start(){
 var tm=0,tm2=0,de=d.documentElement,st=d.createElement("style");
 st.textContent=".w109s-off .w32s-hc{display:none!important}";d.head.appendChild(st);
 /* W109S-001 */
 function off(){var a=list(),b=d.getElementById("leaveOut");if(!a.length||!b)return false;
  var on=[].slice.call(b.querySelectorAll("input[type=checkbox]:checked")).map(function(k){return k.value});
  return !(on.length===a.length&&on.every(function(v){return a.indexOf(v)>=0}))}
 /* W109S-002 */
 function one(){var b=d.getElementById("w36sShare");if(!b)return;var l=b.getAttribute("aria-label")||"",r=/^Share the 1 dishes on this page that fit,/;
  if(r.test(l))b.setAttribute("aria-label",l.replace(r,"Share the 1 dish on this page that fits,"))}
 function render(){var o=off();if(de.classList.contains("w109s-off")!==o)de.classList.toggle("w109s-off",o);one()}
 function soon(){clearTimeout(tm);clearTimeout(tm2);tm=setTimeout(render,450);tm2=setTimeout(render,1300)}
 d.addEventListener("change",soon);d.addEventListener("click",soon);w.addEventListener("storage",soon);render();setTimeout(render,1300)}
if(d.readyState==="loading")d.addEventListener("DOMContentLoaded",function(){setTimeout(start,600)});else setTimeout(start,600);
})(typeof window!="undefined"?window:undefined,typeof document!="undefined"?document:undefined);
