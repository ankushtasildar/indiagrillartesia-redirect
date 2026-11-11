/* W107S w107s.js (IGE site). On-device only: nothing is sent anywhere and nothing is stored; the free-of list this device saved
 (localStorage "ige-freeof-v1") is only READ, never written (script ticks fire untrusted change events, which W30S/W31S do not remember).
 No money amounts, no menu facts added or changed; allergen words stay estimates.
 W107S-001 dish pages (/menu/d/*) on a device WITH a saved free-of list whose ticks hide dishes in the page's own lists ('Goes great with',
  'More in <section>'): one 44 px 'Show all N dishes' button right under the Leave out box's 'N of M dishes shown' line. It unticks the Leave out
  (estimated) boxes on THIS page only and says 'Showing all N dishes: nothing left out on this page. Your saved free-of list (...) is unchanged.';
  the same button then reads 'Leave out <list> again' (re-ticks only the saved list's boxes). Same approach as W106S (one debounced change
  listener, a few finite timers, no observer, no interval). Not on ?free= / ?fits arrivals.
 W107S-002 /menu/ phones: after the W96S 'Clear' tap on a device WITH a saved list, a line under the closed Filters row says the saved list is
  unchanged and comes back next visit, with a 44 px 'Leave out <list> again' button (re-ticks the saved items through the same boxes, focus back
  to the Filters button). Any hand tick hides the line. Clear itself is unchanged (it never wrote the saved list). */
(function(w,d){
if(!d||w.W107S)return;w.W107S=1;
var L=w.location,P=L.pathname,N={dairy:"dairy",gluten:"gluten","tree-nuts":"tree nuts",peanuts:"peanuts",egg:"egg",soy:"soy",fish:"fish",shellfish:"shellfish"};
if(/[?&](free|fits)(=|&|$)/.test(L.search))return;
function list(){try{var a=JSON.parse(w.localStorage.getItem("ige-freeof-v1")||"[]");return Array.isArray(a)?a.filter(function(v){return Object.prototype.hasOwnProperty.call(N,v)}):[]}catch(e){return[]}}
function names(a){return a.map(function(v){return N[v]}).join(", ")}
function ev(c){var e;try{e=new Event("change",{bubbles:true})}catch(x){e=d.createEvent("Event");e.initEvent("change",true,true)}c.dispatchEvent(e)}
function el(t,x){var e=d.createElement(t);if(x)e.textContent=x;return e}
function tap(k){k.style.display="inline-block";k.style.minHeight="44px";k.style.lineHeight="44px";k.style.padding="0 18px";k.style.marginTop="4px";return k}
function later(f){if(d.readyState==="loading")d.addEventListener("DOMContentLoaded",function(){setTimeout(f,150)});else setTimeout(f,150)}
/* W107S-001 */
if(/^\/menu\/d\/[a-z0-9-]+\/?$/.test(P))later(function dish(){
 var tries=0,mode="",tm=0,p,st,bt;
 function box(){return d.getElementById("leaveOut")}
 function cbs(){var b=box();return b?[].slice.call(b.querySelectorAll("input[type=checkbox]")):[]}
 function counts(){var r=[].slice.call(d.querySelectorAll("main li.dish")),h=r.filter(function(li){return !li.getClientRects().length}).length;return{t:r.length,h:h}}
 function render(){var a=list(),c=counts(),cs=cbs();if(!p)return;
  if(!a.length||!c.t){p.hidden=true;return}
  if(c.h>0){if(mode==="all")st.textContent="";mode=mode==="again"?"again":"";bt.setAttribute("data-act","all");bt.className="btn w107s-btn";bt.textContent=c.t>1?"Show all "+c.t+" dishes":"Show the dish";
   if(mode==="again")st.textContent="Leaving out "+names(a)+" again: "+(c.t-c.h)+" of "+c.t+(c.t>1?" dishes":" dish")+" shown. ";p.hidden=false;return}
  var off=cs.some(function(k){return a.indexOf(k.value)>=0&&!k.checked});
  if(mode==="all"&&off){bt.setAttribute("data-act","again");bt.className="btn ghost w107s-btn";bt.textContent="Leave out "+names(a)+" again";
   st.textContent="Showing all "+c.t+(c.t>1?" dishes":" dish")+": nothing left out on this page. Your saved free-of list ("+names(a)+") is unchanged. ";p.hidden=false;return}
  mode="";st.textContent="";p.hidden=true}
 function settle(){clearTimeout(tm);tm=setTimeout(function(){render();try{st.focus({preventScroll:true})}catch(e){st.focus()}},300)}
 function go(){
  if(d.getElementById("w107sAll"))return;
  var lo=d.getElementById("loStatus"),b=box();
  if(!lo||!b||b.hidden||!lo.parentNode){if(++tries<8)setTimeout(go,250*tries);return}
  if(!list().length)return;
  p=el("p");p.id="w107sAll";p.className="w107s-all";p.style.margin="4px 0 8px";st=el("span");st.id="w107sSt";st.setAttribute("role","status");st.setAttribute("tabindex","-1");
  bt=tap(el("button"));bt.type="button";bt.id="w107sBtn";p.appendChild(st);p.appendChild(d.createTextNode(" "));p.appendChild(bt);lo.parentNode.insertBefore(p,lo.nextSibling);
  bt.addEventListener("click",function(){var a=list();if(!a.length)return;
   if(bt.getAttribute("data-act")==="all"){mode="all";cbs().forEach(function(k){if(k.checked){k.checked=false;ev(k)}})}
   else{mode="again";cbs().forEach(function(k){if(a.indexOf(k.value)>=0&&!k.checked){k.checked=true;ev(k)}})}
   settle()});
  render();
  b.addEventListener("change",function(){if(mode==="all"||mode==="again")return;clearTimeout(tm);tm=setTimeout(render,250)})}
 go()});
/* W107S-002 */
if(/^\/menu\/?$/.test(P))later(function menu(){
 var tries=0,armed=0,bar=d.querySelector(".mbar"),tools=bar&&bar.querySelector(".mtools"),clr=d.getElementById("w96sClr"),fb=d.getElementById("w94sFb");
 if(!tools||!clr||!fb){if(++tries<8)setTimeout(menu,250*tries);return}
 if(d.getElementById("w107sMn"))return;
 var ln=el("p"),tx=el("span"),bt=tap(el("button")),say=el("p");ln.id="w107sMn";ln.className="small w107s-mn";ln.hidden=true;ln.style.margin="4px 0";
 tx.id="w107sMnT";bt.type="button";bt.id="w107sAgain";bt.className="btn ghost w107s-btn";ln.appendChild(tx);ln.appendChild(d.createTextNode(" "));ln.appendChild(bt);
 say.className="vh";say.id="w107sSay";say.setAttribute("role","status");say.setAttribute("aria-live","polite");bar.appendChild(say);
 var lo=d.getElementById("w97sLo"),note=d.getElementById("malgNote");
 if(lo&&lo.parentNode===tools)tools.insertBefore(ln,lo.nextSibling);else tools.insertBefore(ln,note&&note.parentNode===tools?note:null);
 function ticked(){return tools.querySelectorAll(".mdiet input:checked,.malg input:checked").length}
 function show(){var a=list();if(!armed||!a.length||ticked()){ln.hidden=true;return}
  tx.textContent="Showing everything on this page. Your saved free-of list ("+names(a)+") is unchanged and comes back next visit.";bt.textContent="Leave out "+names(a)+" again";ln.hidden=false;
  setTimeout(function(){say.textContent="Your saved free-of list ("+names(a)+") is unchanged."},700)}
 clr.addEventListener("click",function(){if(!list().length)return;armed=1;say.textContent="";setTimeout(show,450)});
 bt.addEventListener("click",function(){var a=list();armed=0;ln.hidden=true;say.textContent="";
  [].forEach.call(tools.querySelectorAll(".malg input[type=checkbox]"),function(k){if(a.indexOf(k.value)>=0&&!k.checked){k.checked=true;ev(k)}});
  fb.focus();setTimeout(function(){say.textContent=a.length?"Leaving out "+names(a)+" again.":""},150)});
 tools.addEventListener("change",function(e){if(e.isTrusted&&armed){armed=0;ln.hidden=true}})});
})(typeof window!="undefined"?window:{},typeof document!="undefined"?document:undefined);
