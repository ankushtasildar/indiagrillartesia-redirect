/* W104S w104s.js (IGE site). On-device only: nothing is sent anywhere, nothing stored. No money amounts, no menu facts added or changed; allergen words stay estimates.
 W104S-002 a shared leave-out link (W35S-002, e.g. /menu/s/breads/?free=dairy,gluten) whose note says fewer dishes are shown than exist
  ('This link leaves out ... (estimated): 0 of 8 dishes shown.') gets one 'Show all 8 dishes' link right after that note: the same page without the
  ?free= part (nothing left out; the visitor's saved list stays as it was, as W35S says). The note, Copy link and the filters are unchanged.
  Placed once after the note appears: a few finite timers, no observer, so the page never keeps writing (see W104S-001 loop audit). */
(function(w,d){
if(!d||w.W104S)return;w.W104S=1;
var L=w.location,tries=0;
if(!/[?&]free=/.test(L.search))return;
function place(){
 if(d.getElementById("w104sAll"))return;
 var n=d.getElementById("w35sNote");
 if(!n){if(++tries<8)setTimeout(place,250*tries);return}
 var m=/^This link leaves out .*?: (\d+) of (\d+) dishes shown\./.exec(n.textContent||"");
 if(!m){if(++tries<8)setTimeout(place,250*tries);return}
 var a=+m[1],t=+m[2];if(!(t>0&&a<t))return;
 var p=d.createElement("p");p.id="w104sAll";p.className="w104s-all";p.style.margin="4px 0 12px";
 var k=d.createElement("a");k.href=L.pathname;k.textContent=t>1?"Show all "+t+" dishes":"Show the dish";
 k.style.display="inline-block";k.style.minHeight="44px";k.style.lineHeight="44px";k.style.padding="0 4px";
 p.appendChild(k);n.parentNode.insertBefore(p,n.nextSibling)}
if(d.readyState==="loading")d.addEventListener("DOMContentLoaded",function(){setTimeout(place,150)});else setTimeout(place,150)
})(typeof window!="undefined"?window:{},typeof document!="undefined"?document:undefined);
