/* W115S w115s.js (IGE site). On-device only: nothing is sent anywhere and nothing is stored; the free-of list this device saved
 (localStorage "ige-freeof-v1") is only READ, never written. No money amounts, no menu facts added or changed; allergen words stay estimates.
 W115S-001 /menu/ phones (<=700 px) with the Filters panel CLOSED: the allergen note (#malgNote, shown when something is left out) folds to ONE
  line with a 44 px "More" button (aria-expanded, aria-controls); "Less" folds it again. Only the look is clipped: a screen reader still reads
  the whole warning and its call link; keyboard focus on the link unfolds it. Open panel, wide windows and no-JS: unchanged. The CSS is one
  <style id=w115sCss> this script adds (no page HTML changed); it adds the button and the w115s-f class.
 W115S-002 section pages, Popular and the 4 diet guides, after W106S 'Show all' and a hand tick that changed the saved list: W111S's row says
  'You changed your saved free-of list here: it is now <list>.' with 'Leave out <list>' even when those boxes are already ticked and NOTHING
  on the page is hidden (W114S covers the hidden case). In exactly that state the row (role=status) adds 'All N dishes shown.' and the
  do-nothing button is hidden. Before any other tick, click or storage change, W111S's own words and button are put back; then this re-checks
  (1.4 s / 2.0 s, after W111S/W113S/W114S). One capture listener per event, finite timers, no observer, no interval. Not on ?free= / ?fits. */
(function(w,d){
if(!d||w.W115S)return;w.W115S=1;
var L=w.location,P=L.pathname;
function ready(f){if(d.readyState==="loading")d.addEventListener("DOMContentLoaded",f);else f()}
/* ---- W115S-001 ---- */
if(/^\/menu\/?$/.test(P))ready(function(){
 var note=d.getElementById("malgNote");if(!note||d.getElementById("w115sMore"))return;
 if(!d.getElementById("w115sCss")){var st=d.createElement("style");st.id="w115sCss";st.textContent=".w115s-more{display:none}@media (max-width:700px){.mbar.w94s-on.w94s-c .malgnote.w115s-f{flex:1 1 0;flex-basis:0;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin:0}.mbar.w94s-on.w94s-c .malgnote.w115s-f a{pointer-events:none}.mbar.w94s-on .w115s-more:not([hidden]){display:inline-flex;align-items:center;justify-content:center;flex:0 0 auto;min-height:44px;min-width:64px;padding:0 12px;margin:0;font:inherit;font-size:14px;font-weight:600;color:var(--head);background:var(--card);border:1px solid var(--line);border-radius:10px;cursor:pointer}}";d.head.appendChild(st)}
 var bar=note.closest(".mbar"),mq=w.matchMedia?w.matchMedia("(max-width:700px)"):null,open=false;
 var b=d.createElement("button");b.type="button";b.id="w115sMore";b.className="w115s-more";b.setAttribute("aria-controls","malgNote");
 note.parentNode.insertBefore(b,note.nextSibling);
 function at(e,k,v){if(e.getAttribute(k)!==v)e.setAttribute(k,v)}
 function sync(){var fold=!!(bar&&mq&&mq.matches&&bar.classList.contains("w94s-on")&&bar.classList.contains("w94s-c")&&!note.hidden),t=open?"Less":"More";
  if(b.hidden!==!fold)b.hidden=!fold;if(note.classList.contains("w115s-f")!==(fold&&!open))note.classList.toggle("w115s-f",fold&&!open);
  at(b,"aria-expanded",open?"true":"false");if(b.textContent!==t)b.textContent=t;at(b,"aria-label",t+" about allergen estimates")}
 b.addEventListener("click",function(){open=!open;sync()});
 note.addEventListener("focusin",function(){if(note.classList.contains("w115s-f")){open=true;sync()}});
 function soon(){setTimeout(sync,0);setTimeout(sync,350)}
 d.addEventListener("change",soon,true);d.addEventListener("click",function(x){if(!(x.target&&x.target.closest&&x.target.closest("#w115sMore")))soon()},true);
 w.addEventListener("storage",soon,true);w.addEventListener("resize",soon);if(mq&&mq.addEventListener)mq.addEventListener("change",soon);
 sync();setTimeout(sync,600);setTimeout(sync,1500)});
/* ---- W115S-002 ---- */
if(/[?&](free|fits)(=|&|$)/.test(L.search))return;
if(!/^\/menu\/(s\/[a-z0-9-]+|popular|vegetarian|vegan|gluten-free|high-protein)\/?$/.test(P))return;
var N={dairy:"dairy",gluten:"gluten","tree-nuts":"tree nuts",peanuts:"peanuts",egg:"egg",soy:"soy",fish:"fish",shellfish:"shellfish"};
var RC=/^You changed your saved free-of list here: it is now (.+)\. $/,tm=0,tm2=0,mine=null;
function list(){try{var a=JSON.parse(w.localStorage.getItem("ige-freeof-v1")||"[]");return Array.isArray(a)?a.filter(function(v){return Object.prototype.hasOwnProperty.call(N,v)}):[]}catch(e){return[]}}
function names(a){return a.map(function(v){return N[v]}).join(", ")}
function ticked(a){var cs=[].slice.call(d.querySelectorAll("#leaveOut input[type=checkbox]"));return cs.length&&!a.some(function(v){return !cs.some(function(k){return k.value===v&&k.checked})})}
function els(){return{p:d.getElementById("w106sAll"),st:d.getElementById("w106sSt"),bt:d.getElementById("w106sBtn")}}
function back(){if(!mine)return;var e=els(),m=mine;mine=null;if(!e.p||!e.st||!e.bt)return;
 if(e.st.textContent!==m.st)return;e.st.textContent=m.o.st;e.bt.hidden=m.o.hid}
function fix(){var e=els(),p=e.p,st=e.st,bt=e.bt;if(!p||!st||!bt||p.hidden||mine)return;
 var a=list(),n=names(a),m=RC.exec(st.textContent||"");
 if(!m||!a.length||m[1]!==n||bt.hidden||bt.textContent!=="Leave out "+n||!ticked(a))return;
 var r=[].slice.call(d.querySelectorAll("main li.dish")).filter(function(li){return !li.closest("#mlItems,#hhPicksList,#mlsItems")}),T=r.length,H=r.filter(function(li){return !li.getClientRects().length}).length;
 if(!T||H)return;
 var o={st:st.textContent,hid:bt.hidden};
 st.textContent=o.st+(T>1?"All "+T+" dishes shown.":"The dish is shown.");bt.hidden=true;
 mine={st:st.textContent,o:o}}
function soon2(){clearTimeout(tm);clearTimeout(tm2);tm=setTimeout(fix,1400);tm2=setTimeout(fix,2000)}
function ev(){back();soon2()}
ready(function(){d.addEventListener("change",ev,true);d.addEventListener("click",ev,true);w.addEventListener("storage",ev,true)});
})(typeof window!="undefined"?window:undefined,typeof document!="undefined"?document:undefined);
