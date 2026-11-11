/* W87S w87s.js (IGE site). Every word shown comes from the page itself or the restaurant's own public calendar; nothing is sent anywhere.
W87S-001 Invitation pages (/e/<code>): beside the plain "Add to calendar" (the server's file, unchanged), a separate, clearly labelled "Add with a reminder 1 hour before": the same party (the page's own title, times, venue and address) as a calendar file made on this device, plus a reminder 1 hour before. Hidden once the party is over.
W87S-002 Invitation pages: under the date line, how far away the party is in the restaurant's own time zone ("That's today." / "That's tomorrow." / "That's in N days." / "Happening now."), from the page's own start and end times. Hidden once the party is over.
W87S-003 (inline in site/index.html, the homepage loads no outside scripts) Homepage (/): when the restaurant's calendar (the page's ONE read, window.igeClosures) holds a timed booking today that has not ended, the Hours card says "Today's booked times are also on the Parties page." with a link to /parties/, where W86S lists them. Nothing shown otherwise. */
(function(){if(window.__w87s)return;window.__w87s=1;
var TZ="America/Los_Angeles",d=document,main=d.getElementById("app"),P=location.pathname+location.search;
function el(t,c,x){var e=d.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
function ymd(t){var o={};new Intl.DateTimeFormat("en-US",{timeZone:TZ,year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(new Date(t)).forEach(function(x){o[x.type]=x.value});return o.year+"-"+o.month+"-"+o.day}
function dn(s){var p=s.split("-");return Date.UTC(+p[0],+p[1]-1,+p[2])/86400000}
/* W87S-001 + W87S-002 */
if(main&&/^\/e\/./.test(P)){var code=(new URLSearchParams(location.search).get("c")||location.pathname.replace(/^\/e\/?/,"").split("/")[0]||"").toUpperCase(),ev=null,asked=0;
if(typeof window.render==="function"){var o=window.render;window.render=function(x){ev=x;return o.apply(this,arguments)}}
function esc(s){return String(s||"").replace(/\\/g,"\\\\").replace(/;/g,"\\;").replace(/,/g,"\\,").replace(/\r?\n/g,"\\n")}
function z(ms){return new Date(ms).toISOString().replace(/[-:]/g,"").replace(/\.\d{3}/,"")}
function fold(l){var o="";while(l.length>73){o+=l.slice(0,73)+"\r\n ";l=l.slice(73)}return o+l}
function rel(s,e){var n=Date.now();if(s<=n&&n<e)return "Happening now.";var k=dn(ymd(s))-dn(ymd(n));return k===0?"That's today.":k===1?"That's tomorrow.":k>1&&k<=60?"That's in "+k+" days.":""}
function go(){var w=main.querySelector("p.when"),h=main.querySelector("h1");if(!w||!h)return;
 if(!ev){if(!asked&&/^[A-Z0-9]{6,12}$/.test(code)){asked=1;fetch("https://icadicvgsgdjcvvgocqx.supabase.co/functions/v1/event-rsvp?code="+encodeURIComponent(code)).then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(x){ev=x;go()},function(){})}return}
 var s=Date.parse(ev.starts_at),e=Date.parse(ev.ends_at);if(!(s>0)||!(e>s)||e<=Date.now())return;
 if(!d.getElementById("w87s-rel")){var t=rel(s,e);if(t){var r=el("p","small muted w87s-rel",t);r.id="w87s-rel";r.style.margin="2px 0 8px";w.parentNode.insertBefore(r,w.nextSibling)}}
 var cal=main.querySelector('a.btn[href*="event-ics"]');if(!cal||d.getElementById("w87s-rem"))return;
 var box=cal.parentNode,url=location.href.split("#")[0],st=el("span","small w87s-st"),b=el("button","linkbtn w87s-rem","Add with a reminder 1 hour before");b.id="w87s-rem";b.type="button";b.style.minHeight="44px";st.style.display="block";st.setAttribute("role","status");
 b.addEventListener("click",function(){var title=h.textContent.trim(),L=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//India Grill Express//Invitation//EN","BEGIN:VEVENT","UID:"+code.toLowerCase()+"-invite@indiagrillexpress","DTSTAMP:"+z(Date.now()),"DTSTART:"+z(s),"DTEND:"+z(e),"SUMMARY:"+esc(title),"LOCATION:"+esc((ev.venue||"India Grill Express")+", "+(ev.address||"11811 Artesia Blvd, Artesia, CA")),"URL:"+url,"BEGIN:VALARM","ACTION:DISPLAY","TRIGGER:-PT1H","DESCRIPTION:"+esc(title+" starts in 1 hour"),"END:VALARM","END:VEVENT","END:VCALENDAR"];
  var a=el("a");a.href=URL.createObjectURL(new Blob([L.map(fold).join("\r\n")+"\r\n"],{type:"text/calendar"}));a.download=(title.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")||"party")+"-reminder.ics";d.body.appendChild(a);a.click();setTimeout(function(){URL.revokeObjectURL(a.href);a.remove()},1500);st.textContent="Calendar file with a reminder 1 hour before made on this device: open it to add the party."});
 box.appendChild(d.createTextNode(" "));box.appendChild(b);box.appendChild(st)}
if(window.MutationObserver)new MutationObserver(go).observe(main,{childList:true,subtree:true});go()}
})();
