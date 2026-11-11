/* W108S w108s.js (IGE site). On-device only: nothing is sent anywhere and nothing is stored; the free-of list this device saved
 (localStorage "ige-freeof-v1") is only READ, never written. No money amounts, no menu facts added or changed; allergen words stay estimates.
 W108S-001 dish pages (/menu/d/*): when Leave out ticks hide rows of the page's own lists ('Goes great with', 'More in <section>'), one muted line
  right after each such list (so it shows even when leaveout.js hides the whole list) names how many are hidden and why, with a 44 px
  'Show all on this page' button that runs W107S's own in-page Show all (#w107sBtn; saved list untouched). Hidden again when nothing is hidden.
 W108S-002 /menu/: while a saved list exists but nothing is ticked on the page (after Clear), the section chips' W34S '· N fit' counts (counted
  against the saved list, not the page) are hidden and each chip is named just by its section; the counts come back with any tick (W34S
  re-renders its own labels on that change). One debounced listener each (W108S-002 re-applies at 1.3 s and 2.4 s because W34S re-renders
  after W107S-002's status text), finite timers, no observer, no interval. Not on ?free= / ?fits. */
(function(w,d){
if(!d||w.W108S)return;w.W108S=1;
var L=w.location,P=L.pathname,N={dairy:"dairy",gluten:"gluten","tree-nuts":"tree nuts",peanuts:"peanuts",egg:"egg",soy:"soy",fish:"fish",shellfish:"shellfish"};
if(/[?&](free|fits)(=|&|$)/.test(L.search))return;
function list(){try{var a=JSON.parse(w.localStorage.getItem("ige-freeof-v1")||"[]");return Array.isArray(a)?a.filter(function(v){return Object.prototype.hasOwnProperty.call(N,v)}):[]}catch(e){return[]}}
function names(a){return a.map(function(v){return N[v]||v}).join(", ")}
function el(t,x){var e=d.createElement(t);if(x)e.textContent=x;return e}
function later(f,ms){if(d.readyState==="loading")d.addEventListener("DOMContentLoaded",function(){setTimeout(f,ms)});else setTimeout(f,ms)}
/* W108S-001 */
if(/^\/menu\/d\/[a-z0-9-]+\/?$/.test(P))later(function dish(){
 var tries=0,tm=0,secs=[];
 function box(){return d.getElementById("leaveOut")}
 function go(){
  var b=box();if(!b||b.hidden||!d.getElementById("loStatus")){if(++tries<8)setTimeout(go,250*tries);return}
  if(!list().length||d.querySelector(".w108s-hid"))return;
  [].forEach.call(d.querySelectorAll("main section"),function(s){var h=s.querySelector("h2"),rs=s.querySelectorAll("li.dish");if(!h||!rs.length)return;
   var p=el("p"),t=el("span"),bt=el("button","Show all on this page");p.className="small muted w108s-hid";p.hidden=true;p.style.margin="4px 0 10px";
   bt.type="button";bt.className="btn ghost w108s-btn";bt.style.display="inline-block";bt.style.minHeight="44px";bt.style.lineHeight="44px";bt.style.padding="0 18px";bt.style.marginTop="4px";
   p.appendChild(t);p.appendChild(d.createTextNode(" "));p.appendChild(bt);s.parentNode.insertBefore(p,s.nextSibling);
   bt.addEventListener("click",function(){var k=d.getElementById("w107sBtn");if(k&&k.getAttribute("data-act")==="all")k.click()});
   secs.push({s:s,h:h,rs:[].slice.call(rs),p:p,t:t,bt:bt})});
  render();b.addEventListener("change",function(){clearTimeout(tm);tm=setTimeout(render,400)})}
 function render(){var a=list(),b=box(),on=b?[].slice.call(b.querySelectorAll("input:checked")).map(function(k){return k.value}):[],k=d.getElementById("w107sBtn");
  var same=on.length===a.length&&on.every(function(v){return a.indexOf(v)>=0}),why=same?"your saved free-of list ("+names(a)+")":"Leave out ("+names(on)+")";
  secs.forEach(function(x){var n=x.rs.length,h=on.length?x.rs.filter(function(li){return li.hidden}).length:0,nm=(x.h.firstChild&&x.h.firstChild.nodeType===3?x.h.firstChild.nodeValue:x.h.textContent).trim();
   if(!h){x.p.hidden=true;return}
   x.t.textContent=nm+": "+(h===n?(n>1?"all "+n+" dishes":"the dish"):h+" of "+n)+" hidden by "+why+", by estimate.";
   x.bt.hidden=!(k&&k.getAttribute("data-act")==="all");x.p.hidden=false})}
 go()},700);
/* W108S-002 */
if(/^\/menu\/?$/.test(P))later(function menu(){
 var tm=0,tm2=0,tm3=0,de=d.documentElement,tools=d.querySelector(".mbar .mtools")||d,st=el("style");
 st.textContent=".w108s-nt .w34s-cc{display:none!important}";d.head.appendChild(st);
 function nt(){return list().length>0&&!tools.querySelectorAll(".mdiet input:checked,.malg input:checked").length}
 function render(){var on=nt();if(de.classList.contains("w108s-nt")!==on)de.classList.toggle("w108s-nt",on);if(!on)return;
  [].forEach.call(d.querySelectorAll(".w34s-cc"),function(s){var c=s.parentNode;if(!c||!c.getAttribute)return;var nm=(c.firstChild&&c.firstChild.nodeType===3?c.firstChild.nodeValue:"").trim();
   if(nm&&c.getAttribute("aria-label")!==nm)c.setAttribute("aria-label",nm);if(c.hasAttribute("title"))c.removeAttribute("title")})}
 function soon(){clearTimeout(tm);clearTimeout(tm2);clearTimeout(tm3);tm=setTimeout(render,450);tm2=setTimeout(render,1300);tm3=setTimeout(render,2400)}
 d.addEventListener("change",soon);d.addEventListener("click",soon);render()},1500);
})(typeof window!="undefined"?window:{},typeof document!="undefined"?document:undefined);
