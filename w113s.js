/* W113S w113s.js (IGE site). On-device only: nothing is sent anywhere and nothing is stored; the free-of list this device saved
 (localStorage "ige-freeof-v1") is only READ, never written. No money amounts, no menu facts added or changed; allergen words stay estimates.
 W113S-002 section pages, Popular and the 4 diet guides, after W106S 'Show all N dishes': a hand tick away from the saved list and a tick back
  to it (W111S) gave back W106S's Show-all words 'Showing all N dishes: nothing left out on this page. Your saved free-of list (...) is
  unchanged.' while the boxes were ticked again and dishes were hidden. Now, in exactly that state (row visible, those words, the saved list
  is the one they name, every saved box ticked, at least one dish hidden), the row (role=status, so a screen reader hears it) says W106S's own
  words for it, 'Leaving out <list> again: S of N dishes shown.', with W106S's own 44 px 'Show all N dishes' button (a tap is W106S's Show all).
  A later tick that changes the list again hands the row back to W106S's Show-all words, which W111S then turns into its 'You changed
  your saved free-of list here' row, as before. The dish pages already say this (W112S-001). One debounced change/click/storage listener, finite timers, no observer, no interval.
  Not on ?free= / ?fits. */
(function(w,d){
if(!d||w.W113S)return;w.W113S=1;
var L=w.location,P=L.pathname,N={dairy:"dairy",gluten:"gluten","tree-nuts":"tree nuts",peanuts:"peanuts",egg:"egg",soy:"soy",fish:"fish",shellfish:"shellfish"};
if(/[?&](free|fits)(=|&|$)/.test(L.search))return;
if(!/^\/menu\/(s\/[a-z0-9-]+|popular|vegetarian|vegan|gluten-free|high-protein)\/?$/.test(P))return;
var RA=/^Showing all \d+ dish(?:es)?: nothing left out on this page\. Your saved free-of list \((.+)\) is unchanged\./,tm=0,tm2=0,mine=null;
function list(){try{var a=JSON.parse(w.localStorage.getItem("ige-freeof-v1")||"[]");return Array.isArray(a)?a.filter(function(v){return Object.prototype.hasOwnProperty.call(N,v)}):[]}catch(e){return[]}}
function names(a){return a.map(function(v){return N[v]}).join(", ")}
function ticked(a){var cs=[].slice.call(d.querySelectorAll("#leaveOut input[type=checkbox]"));return cs.length&&!a.some(function(v){return !cs.some(function(k){return k.value===v&&k.checked})})}
function fix(){var p=d.getElementById("w106sAll"),st=d.getElementById("w106sSt"),bt=d.getElementById("w106sBtn");if(!p||!st||!bt)return;
 var a=list(),n=names(a);
 if(mine){if(p.hidden||st.textContent!==mine.st||bt.textContent!==mine.bt){mine=null;return}
  if(n===mine.q&&ticked(a))return;
  st.textContent=mine.o.st;bt.textContent=mine.o.bt;bt.setAttribute("data-act",mine.o.act);bt.className=mine.o.cls;mine=null;return}
 if(p.hidden)return;
 var m=RA.exec(st.textContent||"");if(!m||!a.length||m[1]!==n||!ticked(a))return;
 var r=[].slice.call(d.querySelectorAll("main li.dish")).filter(function(li){return !li.closest("#mlItems,#hhPicksList,#mlsItems")}),T=r.length,H=r.filter(function(li){return !li.getClientRects().length}).length;
 if(!T||!H)return;
 var o={st:st.textContent,bt:bt.textContent,act:bt.getAttribute("data-act"),cls:bt.className};
 st.textContent="Leaving out "+n+" again: "+(T-H)+" of "+T+(T>1?" dishes":" dish")+" shown. ";
 bt.setAttribute("data-act","all");bt.className="btn w106s-btn";bt.textContent=T>1?"Show all "+T+" dishes":"Show the dish";
 mine={st:st.textContent,bt:bt.textContent,q:n,o:o}}
function soon(){clearTimeout(tm);clearTimeout(tm2);tm=setTimeout(fix,700);tm2=setTimeout(fix,1500)}
function start(){d.addEventListener("change",soon);d.addEventListener("click",soon);w.addEventListener("storage",soon)}
if(d.readyState==="loading")d.addEventListener("DOMContentLoaded",start);else start();
})(typeof window!="undefined"?window:undefined,typeof document!="undefined"?document:undefined);
