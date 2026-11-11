// W16S-001: dish page tools. "Save to My list" uses the same on-device list as /menu/ (ige-mylist-v1; nothing is sent anywhere).
// "Share this dish" uses the phone's share sheet, else copies the link.
(function(){var t=document.getElementById("dpTools");if(!t)return;var id=t.getAttribute("data-id"),nm=t.getAttribute("data-name"),K="ige-mylist-v1",
sv=document.getElementById("dpSave"),sh=document.getElementById("dpShare"),st=document.getElementById("dpStatus");
function load(){try{var a=JSON.parse(localStorage.getItem(K)||"[]");return Array.isArray(a)?a.filter(function(x){return x&&x.id&&x.name}).slice(0,60):[]}catch(e){return[]}}
function save(a){try{localStorage.setItem(K,JSON.stringify(a));return true}catch(e){return false}}
function has(a){return a.some(function(x){return x.id===id})}
function paint(){var on=has(load());sv.setAttribute("aria-pressed",on?"true":"false");sv.textContent=on?"Saved to My list":"Save to My list"}
function say(m){st.textContent="";setTimeout(function(){st.textContent=m},30)}
sv.addEventListener("click",function(){var a=load(),on=has(a);if(on)a=a.filter(function(x){return x.id!==id});else{if(a.length>=60){say("My list is full (60 dishes).");return}a.push({id:id,name:nm})}
 if(!save(a)){say("This browser is not saving lists right now.");return}paint();say(on?"Removed from My list.":"Saved. Open the menu to see My list.")});
sh.addEventListener("click",function(){var u=location.origin+location.pathname;
 if(navigator.share){navigator.share({title:nm+" · India Grill Express",url:u}).catch(function(){});return}
 if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(u).then(function(){say("Link copied")},function(){say(u)})}else say(u)});
paint();t.hidden=false})();
/* W71S-003: dish pages get the homepage's own visit helpers, next to "Call to order": one "Directions" button (the homepage's OWN Apple Maps link on Apple devices, its OWN Google Maps link elsewhere) and, on phones only, "Text the address" (the visitor's own Messages with the homepage's address + Apple Maps link; they pick who). The address and both links are copied verbatim from the homepage's Visit us card; nothing is fetched, stored, guessed or sent. */
(function(){try{var d=document,p=d.querySelector("main.dp p.dpact");if(!p||d.getElementById("w71dir"))return;
var AD="11811 Artesia Blvd, Artesia, CA 90701",AP="https://maps.apple.com/?q=India%20Grill%20Express&address=11811%20Artesia%20Blvd%2C%20Artesia%2C%20CA%2090701",GG="https://www.google.com/maps/search/?api=1&query=India%20Grill%20Express%2C%2011811%20Artesia%20Blvd%2C%20Artesia%2C%20CA%2090701",apl=/iPhone|iPad|iPod|Macintosh/.test(navigator.userAgent||"");
var a=d.createElement("a");a.className="btn alt";a.id="w71dir";a.href=apl?AP:GG;a.textContent="Directions";a.setAttribute("aria-label","Directions in "+(apl?"Apple Maps":"Google Maps"));p.appendChild(a);
if(window.matchMedia&&matchMedia("(pointer: coarse)").matches){var x=d.createElement("a");x.className="btn alt";x.id="w71tx";x.textContent="Text the address";x.href="sms:?&body="+encodeURIComponent("India Grill Express, "+AD+" "+AP);p.appendChild(x)}
}catch(e){}})();
/* W72S-003: on computers (no touch pointer) whose browser can copy, dish pages get "Copy address" next to the W71S Directions button: it copies the homepage's own Visit us address (the same text, the same "Address copied" words as the homepage's W58S button; if copying is refused the address itself is shown). Phones keep "Text the address" instead. Nothing is fetched, stored, guessed or sent. */
(function(){try{var d=document,p=d.querySelector("main.dp p.dpact");if(!p||!d.getElementById("w71dir")||d.getElementById("w72ca"))return;if(window.matchMedia&&matchMedia("(pointer: coarse)").matches)return;if(!(navigator.clipboard&&navigator.clipboard.writeText))return;
var AD="11811 Artesia Blvd, Artesia, CA 90701",b=d.createElement("button"),st=d.createElement("span");b.type="button";b.className="btn alt";b.id="w72ca";b.textContent="Copy address";st.className="small";st.id="w72cas";st.style.cssText="white-space:nowrap;align-self:center";st.setAttribute("role","status");
function say(m){st.textContent="";setTimeout(function(){st.textContent=m},30)}
b.addEventListener("click",function(){navigator.clipboard.writeText(AD).then(function(){say("Address copied")},function(){say(AD)})});p.appendChild(b);p.appendChild(st)}catch(e){}})();
