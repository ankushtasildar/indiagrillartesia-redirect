/* W86S w86s.js (IGE site). Every word shown comes from the page itself or the restaurant's own public calendar.
W86S-001 Invitation pages (/e/<code>): "Share this invitation" hands the page link, the party's title and its own date line to the phone's share sheet (or copies it). Hidden once the party is over.
W86S-002 Parties page (/parties/): under the Today line, today's timed bookings on the restaurant's calendar (the same public calendar read / uses), with the calendar's own words and times. Nothing shown when there are none.
W86S-003 What's On night pages (/whatson/<id>): beside W85S's "Add to calendar", a separate, clearly labelled "Add with a reminder 1 hour before" (same calendar file plus a reminder; made on this device, nothing sent). */
(function(){if(window.__w86s)return;window.__w86s=1;
var U="https://icadicvgsgdjcvvgocqx.supabase.co/",K="sb_publishable_ShnB-KVuSOngL4SaWutFjg_BsvmHY5b",H={"Content-Type":"application/json",apikey:K,Authorization:"Bearer "+K},TZ="America/Los_Angeles",main=document.getElementById("app"),P=location.pathname+location.search;
function el(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
function get(p,b){var c=window.AbortController?new AbortController():null;if(c)setTimeout(function(){c.abort()},8000);return fetch(U+p,b?{method:"POST",headers:H,body:JSON.stringify(b),signal:c?c.signal:undefined}:{signal:c?c.signal:undefined}).then(function(r){if(!r.ok)throw 0;return r.json()})}
function share(t,title,url,st){if(navigator.share)navigator.share({title:title,text:t,url:url}).catch(function(){});else if(navigator.clipboard)navigator.clipboard.writeText(t+" "+url).then(function(){st.textContent="Link copied."},function(){st.textContent="Copy this link: "+url});else st.textContent="Copy this link: "+url}
function watch(f){if(!main||!window.MutationObserver)return;new MutationObserver(f).observe(main,{childList:true,subtree:true});f()}
function hook(set){if(typeof window.render!=="function")return false;var o=window.render;window.render=function(ev){set(ev);return o.apply(this,arguments)};return true}
var ev=null;
/* W86S-001 */
if(main&&/^\/e\/./.test(P)){var code=(new URLSearchParams(location.search).get("c")||location.pathname.replace(/^\/e\/?/,"").split("/")[0]||"").toUpperCase(),asked=0;
hook(function(x){ev=x});
function inv(){var w=main.querySelector("p.when"),h=main.querySelector("h1");if(!w||!h||document.getElementById("w86s-inv"))return;
if(!ev){if(!asked&&/^[A-Z0-9]{6,12}$/.test(code)){asked=1;get("functions/v1/event-rsvp?code="+encodeURIComponent(code)).then(function(x){ev=x;inv()},function(){})}return}
var e=Date.parse(ev.ends_at);if(!(e>Date.now()))return;
var url=location.href.split("#")[0],p=el("p","w86s-inv"),st=el("span","small w86s-st"),b=el("button","linkbtn w86s-share","Share this invitation");b.style.minHeight="44px";p.id="w86s-inv";st.style.display="block";st.setAttribute("role","status");b.type="button";
b.addEventListener("click",function(){share(h.textContent.trim()+" · "+w.textContent.trim(),h.textContent.trim(),url,st)});p.appendChild(b);p.appendChild(document.createTextNode(" "));p.appendChild(st);
var cal=main.querySelector('a.btn[href*="event-ics"]'),at=cal&&cal.parentNode&&cal.parentNode.parentNode===main?cal.parentNode:w;at.parentNode.insertBefore(p,at.nextSibling)}watch(inv)}
/* W86S-002 */
var ul=document.querySelector("main ul.rules");
function parts(d){var o={};new Intl.DateTimeFormat("en-US",{timeZone:TZ,year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(d).forEach(function(x){o[x.type]=x.value});return o.year+"-"+o.month+"-"+o.day}
function hm(d){return d.toLocaleTimeString("en-US",{timeZone:TZ,hour:"numeric",minute:"2-digit"}).replace(":00","").replace(/\u202f/g," ")}
if(ul&&/^\/parties\/?$/.test(location.pathname))get("rest/v1/rpc/store_closures",{p_days:21}).then(function(a){if(!Array.isArray(a)||document.getElementById("w86s-today"))return;var n=new Date(),t=parts(n),sn={},L=a.filter(function(c){if(!c||c.full_day||!c.starts_at||!c.ends_at)return false;var s=new Date(c.starts_at),e=new Date(c.ends_at);if(isNaN(s)||isNaN(e)||!(e>s)||e<=n||parts(s)>t||parts(e)<t)return false;var k=c.starts_at+"|"+c.ends_at+"|"+(c.label||c.kind);if(sn[k])return false;return sn[k]=1}).sort(function(x,y){return Date.parse(x.starts_at)-Date.parse(y.starts_at)}).slice(0,4);if(!L.length)return;
var p=el("p","note");p.id="w86s-today";p.appendChild(el("strong",null,"Booked today on the restaurant's calendar: "));p.appendChild(document.createTextNode(L.map(function(c){return(c.label?String(c.label):(c.kind==="private"?"Privately booked":"Reserved for an event"))+" "+hm(new Date(c.starts_at))+" \u2013 "+hm(new Date(c.ends_at))}).join(" · ")));
function put(){var at=document.getElementById("w84s-today")||ul;if(p.previousElementSibling!==at)at.parentNode.insertBefore(p,at.nextSibling)}put();if(window.MutationObserver)new MutationObserver(put).observe(ul.parentNode,{childList:true})},function(){});
/* W86S-003 */
function esc(s){return String(s||"").replace(/\\/g,"\\\\").replace(/;/g,"\\;").replace(/,/g,"\\,").replace(/\r?\n/g,"\\n")}
function z(ms){return new Date(ms).toISOString().replace(/[-:]/g,"").replace(/\.\d{3}/,"")}
function fold(l){var o="";while(l.length>73){o+=l.slice(0,73)+"\r\n ";l=l.slice(73)}return o+l}
if(main&&/^\/whatson\/./.test(P)){var wa=0;hook(function(x){ev=x});
function rem(){var box=document.getElementById("w85s-ev");if(!box||document.getElementById("w86s-rem"))return;
if(!ev){var m=P.match(/[0-9a-f]{8}-[0-9a-f-]{27}/i);if(!wa&&m){wa=1;get("rest/v1/rpc/whatson_event",{p_event:m[0].toLowerCase()}).then(function(x){ev=x;rem()},function(){})}return}
var s=Date.parse(ev.starts_at),e=Date.parse(ev.ends_at);if(!(s>0)||!(e>s)||e<Date.now()||ev.status==="cancelled")return;
var tag=document.querySelector("header .tag"),ad=tag?tag.textContent.trim():"11811 Artesia Blvd, Artesia, CA",url=location.href.split("#")[0],id=(P.match(/[0-9a-f]{8}-[0-9a-f-]{27}/i)||[String(s)])[0].toLowerCase(),st=box.querySelector(".w85s-st"),b=el("button","linkbtn w86s-rem","Add with a reminder 1 hour before");b.style.minHeight="44px";b.id="w86s-rem";b.type="button";
b.addEventListener("click",function(){var L=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//India Grill Express//What's On//EN","BEGIN:VEVENT","UID:"+id+"@indiagrillexpress","DTSTAMP:"+z(Date.now()),"DTSTART:"+z(s),"DTEND:"+z(e),"SUMMARY:"+esc(ev.title),"LOCATION:"+esc("India Grill Express"+(ad?", "+ad:"")),"URL:"+url];if(ev.description)L.push("DESCRIPTION:"+esc(ev.description));L.push("BEGIN:VALARM","ACTION:DISPLAY","TRIGGER:-PT1H","DESCRIPTION:"+esc(ev.title+" starts in 1 hour"),"END:VALARM","END:VEVENT","END:VCALENDAR");
var a=el("a");a.href=URL.createObjectURL(new Blob([L.map(fold).join("\r\n")+"\r\n"],{type:"text/calendar"}));a.download=(String(ev.title).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")||"night")+"-reminder.ics";document.body.appendChild(a);a.click();setTimeout(function(){URL.revokeObjectURL(a.href);a.remove()},1500);if(st)st.textContent="Calendar file with a reminder 1 hour before made on this device: open it to add the night."});
box.insertBefore(b,st||null);box.insertBefore(document.createTextNode(" "),st||null)}watch(rem)}
})();
