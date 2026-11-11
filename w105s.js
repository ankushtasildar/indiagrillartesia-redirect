/* W105S w105s.js (IGE site). On-device only: nothing is sent anywhere and nothing is stored; the free-of list this device saved
 (localStorage "ige-freeof-v1") is only READ, never written (script ticks fire untrusted change events, which W30S/W31S do not remember).
 No money amounts, no menu facts added or changed; allergen words stay estimates.
 W105S-001 a '?fits' arrival (W35S-001, e.g. /menu/s/breads/?fits) whose note says fewer dishes are shown than exist
  ('Showing what fits your saved free-of list (...) by estimate: 3 of 8 dishes.') gets one 'Show all 8 dishes' button right after that note.
  It unticks the Leave out (estimated) boxes on THIS page only and the note then says all dishes are shown and the saved list is unchanged.
  (A link to the page without ?fits would not show all: W30S/W31S pre-tick the saved list on every page.)
 W105S-002 a '?fits' arrival with NO saved free-of list on this device ('No free-of list is saved on this device yet. ...') gets one
  'Build your free-of list' link to the existing builder page /menu/allergens/free-of/ right after that note.
 W105S-003 the W104S-002 'Show all N dishes' link after a shared ?free= note: on a device that HAS a saved free-of list, the plain page it opens is
  pre-ticked with that list, so it would not show all; there the same tap shows all on this page instead (W105S-001 behaviour). Without a saved list
  the W104S link works exactly as before.
  Placed once after the note appears: a few finite timers, no observer, so the page never keeps writing (W104S-001 loop audit). */
(function(w,d){
if(!d||w.W105S)return;w.W105S=1;
var L=w.location,tries=0,FREE=/[?&]free=/.test(L.search),FITS=/[?&]fits(=|&|$)/.test(L.search);
if(!FREE&&!FITS)return;
function saved(){try{var a=JSON.parse(w.localStorage.getItem("ige-freeof-v1")||"[]");return Array.isArray(a)?a.length:0}catch(e){return 0}}
function box(){return d.querySelector("fieldset.malg")||d.getElementById("leaveOut")}
function ev(c){var e;try{e=new Event("change",{bubbles:true})}catch(x){e=d.createEvent("Event");e.initEvent("change",true,true)}c.dispatchEvent(e)}
function showAll(n,t,hold){var b=box();if(!b)return;[].slice.call(b.querySelectorAll("input[type=checkbox]")).forEach(function(c){if(c.checked){c.checked=false;ev(c)}});
 var k=/(Estimated from each recipe[\s\S]*)$/.exec(n.textContent||""),m=/saved free-of list \(([^)]*)\)|Your saved list \(([^)]*)\)/.exec(n.textContent||"");
 n.textContent="Showing all "+t+(t>1?" dishes":" dish")+": nothing left out on this page."+(m?" Your saved free-of list ("+(m[1]||m[2])+") is unchanged.":"")+(k?" "+k[1]:"");
 if(hold&&hold.parentNode)hold.parentNode.removeChild(hold);n.setAttribute("tabindex","-1");try{n.focus({preventScroll:true})}catch(e){n.focus()}}
function wrap(id,n){var p=d.createElement("p");p.id=id;p.className="w105s-link";p.style.margin="4px 0 12px";n.parentNode.insertBefore(p,n.nextSibling);return p}
function tap(k){k.style.display="inline-block";k.style.minHeight="44px";k.style.lineHeight="44px";k.style.padding=k.tagName==="BUTTON"?"0 18px":"0 4px";return k}
function place(){
 if(d.getElementById("w105sAll")||d.getElementById("w105sMake")||d.getElementById("w105sHook"))return;
 var n=d.getElementById("w35sNote"),t=n&&(n.textContent||"");
 if(!t){if(++tries<8)setTimeout(place,250*tries);return}
 if(FREE){var a4=d.querySelector("#w104sAll a");if(!a4){if(++tries<8)setTimeout(place,250*tries);return}
  var mm=/: (\d+) of (\d+) dishes shown\./.exec(t);if(!mm||!saved())return;var tot=+mm[2];a4.id="w105sHook";
  a4.addEventListener("click",function(e){if(!saved())return;e.preventDefault();showAll(n,tot,d.getElementById("w104sAll"))});return}
 if(/^No free-of list is saved on this device yet\./.test(t)){var p=wrap("w105sMake",n),k=d.createElement("a");k.href="/menu/allergens/free-of/";k.textContent="Build your free-of list";p.appendChild(tap(k));return}
 var m=/^Showing what fits your saved free-of list .*? by estimate: (\d+) of (\d+) dishes\./.exec(t);
 if(!m){if(++tries<8)setTimeout(place,250*tries);return}
 var a=+m[1],c=+m[2];if(!(c>0&&a<c))return;
 var q=wrap("w105sAll",n),bt=d.createElement("button");bt.type="button";bt.className="btn w105s-all";bt.textContent=c>1?"Show all "+c+" dishes":"Show the dish";
 bt.addEventListener("click",function(){showAll(n,c,q)});q.appendChild(tap(bt))}
if(d.readyState==="loading")d.addEventListener("DOMContentLoaded",function(){setTimeout(place,150)});else setTimeout(place,150)
})(typeof window!="undefined"?window:{},typeof document!="undefined"?document:undefined);
