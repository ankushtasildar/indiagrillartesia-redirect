/* W84S w84s.js (IGE site). On-device only: nothing is sent anywhere; every word shown comes from the page itself.
W84S-001 Larger text on What's On (/whatson/) and invitations (/e/): those pages write their content after they load, which dropped the site's own "Larger text" switch (W40S). This puts the same button back under the title after each render (same saved choice on this device; w83s.js keeps headings bigger than text). Words unchanged.
W84S-003 Parties page: a "Today" line under the house rules names today's weekday in Artesia and quotes the one posted rule that applies (Sunday: the list's own Sunday line; Monday to Saturday: its own Reservations line). Nothing is retyped or changed. */
(function(){if(window.__w84s)return;window.__w84s=1;
var KT="ige-textsize-v1",R=document.documentElement,main=document.querySelector("main");
function big(){try{return localStorage.getItem(KT)==="lg"}catch(e){return false}}
function sv(on){try{if(on)localStorage.setItem(KT,"lg");else localStorage.removeItem(KT)}catch(e){}}
function apply(){R.classList.toggle("w40lg",big());[].forEach.call(document.querySelectorAll(".w40ts"),function(b){b.setAttribute("aria-pressed",big()?"true":"false")})}
/* W84S-001 */
if(main&&main.id==="app"){
 if(!window.__w83s){var j=document.createElement("script");j.src="/w83s.js";document.head.appendChild(j)}
 var ts=function(){var h1=main.querySelector("h1");if(!h1||document.querySelector(".w40ts"))return;var b=document.createElement("button");b.type="button";b.className="linkbtn w40ts";b.textContent="Larger text";b.addEventListener("click",function(){sv(!big());apply()});var p=document.createElement("p");p.className="w40tsp small w84s-ts";p.appendChild(b);h1.parentNode.insertBefore(p,h1.nextSibling);apply()};
 apply();ts();if(window.MutationObserver)new MutationObserver(ts).observe(main,{childList:true,subtree:true});
}
/* W84S-003 */
function today(){var ul=document.querySelector("main ul.rules");if(!ul)return;var su=null,re=null;[].forEach.call(ul.querySelectorAll("li"),function(l){var t=l.textContent.trim();if(/^Sundays are reserved for private parties of \d+ or more\.$/.test(t))su=t;else if(/^Reservations: Monday to Saturday during store hours, up to \d+ guests\.$/.test(t))re=t});if(!su||!re)return;var d;try{d=new Intl.DateTimeFormat("en-US",{timeZone:"America/Los_Angeles",weekday:"long"}).format(new Date())}catch(e){return}if(!/^(Sun|Mon|Tues|Wednes|Thurs|Fri|Satur)day$/.test(d))return;var p=document.getElementById("w84s-today");if(!p){p=document.createElement("p");p.id="w84s-today";p.className="note";ul.parentNode.insertBefore(p,ul.nextSibling)}p.textContent="";var s=document.createElement("strong");s.textContent="Today is "+d+" in Artesia. ";p.appendChild(s);p.appendChild(document.createTextNode(d==="Sunday"?su:re))}
today();document.addEventListener("visibilitychange",function(){if(!document.hidden)today()});
})();
