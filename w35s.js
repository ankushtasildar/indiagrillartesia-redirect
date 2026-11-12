/* W35S w35s.js (IGE site). Uses ONLY what is already on the page, the link's own address and the free-of list this device already saved (localStorage "ige-freeof-v1", read only; nothing is written or sent anywhere). All allergen info is estimated from each recipe.
W35S-001 "?fits" link (e.g. /menu/?fits): opens the page with the Leave out (estimated) filter set to your saved free-of list and says how many dishes are shown.
W35S-002 "Copy link to this view": a link that opens the page leaving out the same allergens (?free=dairy,gluten). Opening one changes the view only; your saved list stays as it was.
W35S-003 Phones: a "Top" button after you scroll down a long menu page, back to search and filters.
W35S-004 Desktop /menu/: press / to jump to search; Esc clears it. */
(function(){if(window.__w35s)return;window.__w35s=1;var K="ige-freeof-v1",N={dairy:"dairy",gluten:"gluten","tree-nuts":"tree nuts",peanuts:"peanuts",egg:"egg",soy:"soy",fish:"fish",shellfish:"shellfish"},
CALL="Estimated from each recipe, not lab-tested; shared equipment. Call (562) 991-4320 first if you have an allergy.",P=location.pathname,S=location.search,$=function(i){return document.getElementById(i)},MENU=/^\/menu\/?$/.test(P);
function ok(v){return Object.prototype.hasOwnProperty.call(N,v)}
function get(){try{var a=JSON.parse(localStorage.getItem(K)||"[]");return Array.isArray(a)?a.filter(ok):[]}catch(e){return[]}}
function names(a){return a.map(function(v){return N[v]}).join(", ")}
function mk(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x)e.textContent=x;return e}
function ev(el,n){var e;try{e=new Event(n||"change",{bubbles:true})}catch(x){e=document.createEvent("Event");e.initEvent(n||"change",true,true)}el.dispatchEvent(e)}
var st=mk("style");st.id="w35sCss";st.textContent=".w35s-bar{display:flex;flex-wrap:wrap;gap:.5rem;align-items:center;margin:.5rem 0}.w35s-btn{min-height:44px}.w35s-st{flex-basis:100%;font-size:var(--fs-sm,14px)}.w35s-in{flex:1 1 14rem;min-height:44px;font-size:var(--fs-sm,14px)}.w35s-note{margin:.5rem 0;padding:.6rem .8rem;font-size:var(--fs-sm,14px)}.w35s-top{position:fixed;right:12px;bottom:calc(76px + env(safe-area-inset-bottom,0px));z-index:21;min-height:44px;min-width:44px;padding:0 .9rem;border-radius:999px;border:1px solid var(--line,#ccc);background:var(--bg,#fff);color:inherit;box-shadow:0 2px 10px rgba(0,0,0,.15);font-size:var(--fs-sm,14px);font-weight:600}.w35s-kbd{font-size:var(--fs-xs,12px)}@media (min-width:761px){.w35s-top{display:none!important}}@media (max-width:899px),(pointer:coarse){.w35s-kbd{display:none!important}}";document.head.appendChild(st);
/* the Leave out (estimated) checkboxes on this page: /menu/ fieldset.malg, list pages #leaveOut */
function box(){return document.querySelector("fieldset.malg")||$("leaveOut")}
function cbs(){var b=box();return b?[].slice.call(b.querySelectorAll("input[type=checkbox]")).filter(function(c){return ok(c.value)}):[]}
function on(){return cbs().filter(function(c){return c.checked}).map(function(c){return c.value})}
function shown(){var r=[].slice.call(document.querySelectorAll("main li.dish")),n=0;r.forEach(function(li){if(li.getClientRects().length)n++});return [n,r.length]}
function setTo(a){cbs().forEach(function(c){var w=a.indexOf(c.value)>=0;if(c.checked!==w){c.checked=w;ev(c)}});var b=$("leaveOut");if(b&&a.length)b.open=true}
/* W35S-001 + W35S-002 (arriving) */
function param(){var m=/[?&]free=([a-z,-]*)/.exec(S);if(!m)return null;return m[1].split(",").filter(function(v,i,x){return ok(v)&&x.indexOf(v)===i})}
var note=null;function say(t){var b=box();if(!b)return;if(!note){note=mk("p","card w35s-note");note.id="w35sNote";note.setAttribute("role","status");b.parentNode.insertBefore(note,b)}note.textContent=t}
function arrive(){if(!cbs().length)return;var a=param(),fits=/[?&]fits(=|&|$)/.test(S),mine=get();
 if(a&&a.length){setTo(a);setTimeout(function(){var c=shown();say("This link leaves out "+names(a)+" (estimated): "+c[0]+" of "+c[1]+" dishes shown."+(mine.length?" Your saved list ("+names(mine)+") is unchanged.":"")+" "+CALL)},60)}
 else if(fits){if(!mine.length){say("No free-of list is saved on this device yet. Tick what to leave out below; it is remembered on this device only. "+CALL);return}setTo(mine);setTimeout(function(){var c=shown();say("Showing what fits your saved free-of list ("+names(mine)+") by estimate: "+c[0]+" of "+c[1]+" dishes. "+CALL)},60)}
 else return;var b=box();if(b&&b.scrollIntoView)setTimeout(function(){b.scrollIntoView({block:"start"})},90)}
/* W35S-002 (copy) */
function share(){var b=box();if(!b||$("w35sShare"))return;var bar=mk("div","w35s-bar");bar.id="w35sShare";var btn=mk("button","w35s-btn","Copy link to this view");btn.type="button";var s=mk("span","w35s-st");s.setAttribute("role","status");bar.appendChild(btn);bar.appendChild(s);
 var lo=$("loStatus");if(lo&&lo.parentNode===b)b.appendChild(bar);else b.parentNode.insertBefore(bar,b.nextSibling);
 function link(){return location.origin+P+"?free="+on().join(",")}
 function paint(){var a=on();bar.hidden=!a.length;btn.setAttribute("aria-label","Copy a link that opens this page leaving out "+names(a)+" (estimated)")}
 cbs().forEach(function(c){c.addEventListener("change",function(){setTimeout(paint,0)})});paint();
 btn.addEventListener("click",function(){var u=link(),a=on(),m="Link copied: it opens this page leaving out "+names(a)+" (estimated). You share it yourself; nothing was sent.";
  function fall(){var i=bar.querySelector(".w35s-in");if(!i){i=mk("input","w35s-in");i.readOnly=true;i.setAttribute("aria-label","Link to this view");bar.insertBefore(i,s)}i.value=u;i.focus();i.select();s.textContent="Copy this link: it opens this page leaving out "+names(a)+" (estimated). Nothing was sent."}
  try{if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(u).then(function(){s.textContent=m},fall);else fall()}catch(e){fall()}})}
/* W35S-003 */
var LONG=MENU||/^\/menu\/(s\/[a-z0-9-]+|popular|vegetarian|vegan|gluten-free|high-protein)\/?$/.test(P);
function top(){if(!LONG||$("w35sTop"))return;var b=mk("button","w35s-top","\u2191 Top");b.id="w35sTop";b.type="button";b.hidden=true;b.setAttribute("aria-label","Back to the top: search and filters");document.body.appendChild(b);
 var t=0;function chk(){t=0;b.hidden=!(window.innerWidth<=760&&(window.pageYOffset||document.documentElement.scrollTop)>window.innerHeight*1.5)}
 window.addEventListener("scroll",function(){if(!t)t=setTimeout(chk,120)},{passive:true});window.addEventListener("resize",function(){if(!t)t=setTimeout(chk,120)});
 b.addEventListener("click",function(){window.scrollTo(0,0);var h=document.querySelector("main h1")||document.querySelector("h1");if(h){if(!h.hasAttribute("tabindex"))h.setAttribute("tabindex","-1");try{h.focus({preventScroll:true})}catch(e){h.focus()}}b.hidden=true})}
/* W35S-004 */
function keys(){if(!MENU)return;var q=$("q");if(!q)return;var lab=q.closest?q.closest("label"):null,h=mk("span","w35s-kbd small muted","Press / to search, Esc to clear");h.id="w35sKbd";if(lab&&lab.parentNode&&!$("w35sKbd"))lab.parentNode.insertBefore(h,lab.nextSibling);
 document.addEventListener("keydown",function(e){if(e.defaultPrevented||e.ctrlKey||e.metaKey||e.altKey)return;var a=document.activeElement,tg=a&&a.tagName;
  if(e.key==="/"&&!(tg==="INPUT"||tg==="TEXTAREA"||tg==="SELECT"||(a&&a.isContentEditable))){e.preventDefault();q.focus();try{q.select()}catch(x){}}
  else if(e.key==="Escape"&&a===q&&q.value){e.preventDefault();q.value="";ev(q,"input")}})}
function go(){share();arrive();top();keys()}
if(document.readyState==="complete")setTimeout(go,0);else window.addEventListener("load",function(){setTimeout(go,30)})})();
