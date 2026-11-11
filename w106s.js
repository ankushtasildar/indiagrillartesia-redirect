/* W106S w106s.js (IGE site). On-device only: nothing is sent anywhere and nothing is stored; the free-of list this device saved
 (localStorage "ige-freeof-v1") is only READ, never written (script ticks fire untrusted change events, which W30S/W31S do not remember).
 No money amounts, no menu facts added or changed; allergen words stay estimates.
 W106S-001 plain section pages (/menu/s/*), Popular and the 4 diet guides, on a device WITH a saved free-of list whose ticks hide dishes: one
  'Show all N dishes' button right under the W33S/W32S 'N of M ... fit your free-of list' line. It unticks the Leave out (estimated) boxes on
  THIS page only (each dish keeps its W33S estimate mark) and says 'Showing all N dishes: nothing left out on this page. Your saved free-of list
  (...) is unchanged.' Not on /menu/ (W95S/W96S Clear) and not on ?free= / ?fits arrivals (W104S/W105S own those).
 W106S-002 after Show all, a 'Leave out <list> again' button re-ticks only the saved list's boxes on this page (same untrusted ticks, list
  unchanged) and the Show all button comes back. Hand ticks work as before; the row follows them through ONE debounced change listener
  (no observer, no interval, a few finite timers), so the page never keeps writing (W104S-001 loop audit). */
(function(w,d){
if(!d||w.W106S)return;w.W106S=1;
var L=w.location,P=L.pathname,tries=0,mode="",tm=0,N={dairy:"dairy",gluten:"gluten","tree-nuts":"tree nuts",peanuts:"peanuts",egg:"egg",soy:"soy",fish:"fish",shellfish:"shellfish"};
if(/[?&](free|fits)(=|&|$)/.test(L.search))return;
if(!/^\/menu\/(s\/[a-z0-9-]+|popular|vegetarian|vegan|gluten-free|high-protein)\/?$/.test(P))return;
function list(){try{var a=JSON.parse(w.localStorage.getItem("ige-freeof-v1")||"[]");return Array.isArray(a)?a.filter(function(v){return Object.prototype.hasOwnProperty.call(N,v)}):[]}catch(e){return[]}}
function names(a){return a.map(function(v){return N[v]}).join(", ")}
function box(){return d.getElementById("leaveOut")}
function cbs(){var b=box();return b?[].slice.call(b.querySelectorAll("input[type=checkbox]")):[]}
function rows(){return [].slice.call(d.querySelectorAll("main li.dish")).filter(function(li){return !li.closest("#mlItems,#hhPicksList,#mlsItems")})}
function ev(c){var e;try{e=new Event("change",{bubbles:true})}catch(x){e=d.createEvent("Event");e.initEvent("change",true,true)}c.dispatchEvent(e)}
function tap(k){k.style.display="inline-block";k.style.minHeight="44px";k.style.lineHeight="44px";k.style.padding="0 18px";k.style.marginTop="4px";return k}
function el(t,x){var e=d.createElement(t);if(x)e.textContent=x;return e}
var p,st,bt;
function make(fit){p=el("p");p.id="w106sAll";p.className="w106s-all";p.style.margin="4px 0 12px";st=el("span");st.id="w106sSt";st.setAttribute("role","status");st.setAttribute("tabindex","-1");
 bt=tap(el("button"));bt.type="button";bt.id="w106sBtn";p.appendChild(st);p.appendChild(d.createTextNode(" "));p.appendChild(bt);fit.parentNode.insertBefore(p,fit.nextSibling);
 bt.addEventListener("click",function(){var a=list();if(!a.length)return;if(bt.getAttribute("data-act")==="all")showAll(a);else again(a)})}
function counts(){var r=rows(),h=r.filter(function(li){return !li.getClientRects().length}).length;return{t:r.length,h:h}}
function render(){var a=list(),c=counts(),cs=cbs();if(!p)return;
 if(!a.length||!c.t){p.hidden=true;return}
 if(c.h>0){if(mode==="all")st.textContent="";mode=mode==="again"?"again":"";bt.setAttribute("data-act","all");bt.className="btn w106s-btn";bt.textContent=c.t>1?"Show all "+c.t+" dishes":"Show the dish";
  if(mode==="again")st.textContent="Leaving out "+names(a)+" again: "+(c.t-c.h)+" of "+c.t+(c.t>1?" dishes":" dish")+" shown. ";p.hidden=false;return}
 var off=cs.some(function(k){return a.indexOf(k.value)>=0&&!k.checked});
 if(mode==="all"&&off){bt.setAttribute("data-act","again");bt.className="btn ghost w106s-btn";bt.textContent="Leave out "+names(a)+" again";
  st.textContent="Showing all "+c.t+(c.t>1?" dishes":" dish")+": nothing left out on this page. Your saved free-of list ("+names(a)+") is unchanged. ";p.hidden=false;return}
 mode="";st.textContent="";p.hidden=true}
function settle(){clearTimeout(tm);tm=setTimeout(function(){render();try{st.focus({preventScroll:true})}catch(e){st.focus()}},300)}
function showAll(a){mode="all";cbs().forEach(function(k){if(k.checked){k.checked=false;ev(k)}});settle()}
function again(a){mode="again";cbs().forEach(function(k){if(a.indexOf(k.value)>=0&&!k.checked){k.checked=true;ev(k)}});settle()}
function place(){
 if(d.getElementById("w106sAll"))return;
 var fit=d.getElementById("w33sFit")||d.getElementById("w32sFit"),b=box();
 if(!fit||!b||!fit.parentNode){if(++tries<8)setTimeout(place,250*tries);return}
 if(!list().length)return;
 make(fit);render();
 b.addEventListener("change",function(){if(mode==="all"||mode==="again")return;clearTimeout(tm);tm=setTimeout(render,250)})}
if(d.readyState==="loading")d.addEventListener("DOMContentLoaded",function(){setTimeout(place,150)});else setTimeout(place,150)
})(typeof window!="undefined"?window:{},typeof document!="undefined"?document:undefined);
