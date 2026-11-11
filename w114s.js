/* W114S w114s.js (IGE site). On-device only: nothing is sent anywhere and nothing is stored; the free-of list this device saved
 (localStorage "ige-freeof-v1") is only READ, never written. No money amounts, no menu facts added or changed; allergen words stay estimates.
 W114S-002 section pages, Popular and the 4 diet guides, after W106S 'Show all N dishes' and a hand tick that changed the saved list: W111S's row
  says 'You changed your saved free-of list here: it is now <list>.' with a 'Leave out <list>' button even when those boxes are already ticked
  and dishes are already hidden. Now, in exactly that state (W111S's words, the list they name is the saved list, every saved box ticked,
  at least one dish hidden), the row (role=status, so a screen reader hears it) adds 'S of N dishes shown.' and the button is W106S's own 44 px
  'Show all N dishes' (a tap is W106S's Show all; the saved list stays as it is), as the dish pages do (W112S-001). Before any other tick, click
  or storage change reaches W111S, its own words are put back, so W111S goes on working as before; then this re-checks after W111S/W113S
  (1.3 s / 1.9 s). One capture listener per event, finite timers, no observer, no interval. Not on ?free= / ?fits. */
(function(w,d){
if(!d||w.W114S)return;w.W114S=1;
var L=w.location,P=L.pathname,N={dairy:"dairy",gluten:"gluten","tree-nuts":"tree nuts",peanuts:"peanuts",egg:"egg",soy:"soy",fish:"fish",shellfish:"shellfish"};
if(/[?&](free|fits)(=|&|$)/.test(L.search))return;
if(!/^\/menu\/(s\/[a-z0-9-]+|popular|vegetarian|vegan|gluten-free|high-protein)\/?$/.test(P))return;
var RC=/^You changed your saved free-of list here: it is now (.+)\. $/,tm=0,tm2=0,mine=null;
function list(){try{var a=JSON.parse(w.localStorage.getItem("ige-freeof-v1")||"[]");return Array.isArray(a)?a.filter(function(v){return Object.prototype.hasOwnProperty.call(N,v)}):[]}catch(e){return[]}}
function names(a){return a.map(function(v){return N[v]}).join(", ")}
function ticked(a){var cs=[].slice.call(d.querySelectorAll("#leaveOut input[type=checkbox]"));return cs.length&&!a.some(function(v){return !cs.some(function(k){return k.value===v&&k.checked})})}
function els(){return{p:d.getElementById("w106sAll"),st:d.getElementById("w106sSt"),bt:d.getElementById("w106sBtn")}}
function back(){if(!mine)return;var e=els(),m=mine;mine=null;if(!e.p||!e.st||!e.bt)return;
 if(e.st.textContent!==m.st||e.bt.textContent!==m.bt)return;
 e.st.textContent=m.o.st;e.bt.textContent=m.o.bt;if(m.o.act===null)e.bt.removeAttribute("data-act");else e.bt.setAttribute("data-act",m.o.act);e.bt.className=m.o.cls}
function fix(){var e=els(),p=e.p,st=e.st,bt=e.bt;if(!p||!st||!bt||p.hidden||mine)return;
 var a=list(),n=names(a),m=RC.exec(st.textContent||"");
 if(!m||!a.length||m[1]!==n||bt.textContent!=="Leave out "+n||!ticked(a))return;
 var r=[].slice.call(d.querySelectorAll("main li.dish")).filter(function(li){return !li.closest("#mlItems,#hhPicksList,#mlsItems")}),T=r.length,H=r.filter(function(li){return !li.getClientRects().length}).length;
 if(!T||!H)return;
 var o={st:st.textContent,bt:bt.textContent,act:bt.getAttribute("data-act"),cls:bt.className};
 st.textContent=o.st+(T-H)+" of "+T+(T>1?" dishes":" dish")+" shown. ";
 bt.setAttribute("data-act","all");bt.className="btn w106s-btn";bt.textContent=T>1?"Show all "+T+" dishes":"Show the dish";
 mine={st:st.textContent,bt:bt.textContent,o:o}}
function soon(){clearTimeout(tm);clearTimeout(tm2);tm=setTimeout(fix,1300);tm2=setTimeout(fix,1900)}
function ev(x){var t=x&&x.target;if(!(x.type==="click"&&t&&t.closest&&t.closest("#w106sBtn")))back();else mine=null;soon()}
function start(){d.addEventListener("change",ev,true);d.addEventListener("click",ev,true);w.addEventListener("storage",ev,true)}
if(d.readyState==="loading")d.addEventListener("DOMContentLoaded",start);else start();
})(typeof window!="undefined"?window:undefined,typeof document!="undefined"?document:undefined);
