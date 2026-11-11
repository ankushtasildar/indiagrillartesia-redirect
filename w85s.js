/* W85S w85s.js (IGE site). Every word shown comes from the page itself or the restaurant's own public calendar.
W85S-001 What's On night pages (/whatson/<id>): "Add to calendar" makes a calendar file on this device from the night's own title, start, end, description and the page's address line (nothing sent; only for nights that are not cancelled or over).
W85S-002 What's On night pages: "Share this night" hands the page link, title and its own date line to the phone's share sheet (or copies it).
W85S-003 Parties page (/parties/): under the house rules, the full-day closures on the restaurant's calendar in the next 21 days (the same public calendar read / and /support/ use), with the calendar's own words. Nothing shown when there are none. */
(function(){if(window.__w85s)return;window.__w85s=1;
var U="https://icadicvgsgdjcvvgocqx.supabase.co/rest/v1/",K="sb_publishable_ShnB-KVuSOngL4SaWutFjg_BsvmHY5b",H={"Content-Type":"application/json",apikey:K,Authorization:"Bearer "+K},TZ="America/Los_Angeles",main=document.getElementById("app");
function el(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
function post(p,b){var c=window.AbortController?new AbortController():null;if(c)setTimeout(function(){c.abort()},8000);return fetch(U+p,{method:"POST",headers:H,body:JSON.stringify(b),signal:c?c.signal:undefined}).then(function(r){if(!r.ok)throw 0;return r.json()})}
/* W85S-001/002 */
function esc(s){return String(s||"").replace(/\\/g,"\\\\").replace(/;/g,"\\;").replace(/,/g,"\\,").replace(/\r?\n/g,"\\n")}
function z(ms){return new Date(ms).toISOString().replace(/[-:]/g,"").replace(/\.\d{3}/,"")}
function fold(l){var o="";while(l.length>73){o+=l.slice(0,73)+"\r\n ";l=l.slice(73)}return o+l}
function add(ev){if(!main||!ev||!ev.title||document.getElementById("w85s-ev"))return;var s=Date.parse(ev.starts_at),e=Date.parse(ev.ends_at),w=main.querySelector("p.when");if(!w||!(s>0)||!(e>s)||e<Date.now()||ev.status==="cancelled")return;
var tag=document.querySelector("header .tag"),ad=tag?tag.textContent.trim():"",url=location.href.split("#")[0],id=((location.pathname+location.search).match(/[0-9a-f]{8}-[0-9a-f-]{27}/i)||[String(s)])[0].toLowerCase(),p=el("p","w85s-ev"),st=el("span","small w85s-st");st.style.display="block";p.id="w85s-ev";st.setAttribute("role","status");
var b=el("button","btn w85s-cal","Add to calendar");b.type="button";b.addEventListener("click",function(){var L=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//India Grill Express//What's On//EN","BEGIN:VEVENT","UID:"+id+"@indiagrillexpress","DTSTAMP:"+z(Date.now()),"DTSTART:"+z(s),"DTEND:"+z(e),"SUMMARY:"+esc(ev.title),"LOCATION:"+esc("India Grill Express"+(ad?", "+ad:"")),"URL:"+url];if(ev.description)L.push("DESCRIPTION:"+esc(ev.description));L.push("END:VEVENT","END:VCALENDAR");
var a=el("a");a.href=URL.createObjectURL(new Blob([L.map(fold).join("\r\n")+"\r\n"],{type:"text/calendar"}));a.download=(ev.title.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")||"night")+".ics";document.body.appendChild(a);a.click();setTimeout(function(){URL.revokeObjectURL(a.href);a.remove()},1500);st.textContent="Calendar file made on this device: open it to add the night."});
var sh=el("button","linkbtn w85s-share","Share this night");sh.type="button";sh.addEventListener("click",function(){var t=ev.title+" · "+w.textContent.trim();if(navigator.share)navigator.share({title:ev.title,text:t,url:url}).catch(function(){});else if(navigator.clipboard)navigator.clipboard.writeText(t+" "+url).then(function(){st.textContent="Link copied."},function(){st.textContent="Copy this link: "+url});else st.textContent="Copy this link: "+url});
p.appendChild(b);p.appendChild(document.createTextNode(" "));p.appendChild(sh);p.appendChild(document.createTextNode(" "));p.appendChild(st);w.parentNode.insertBefore(p,w.nextSibling)}
if(main&&/^\/whatson\/./.test(location.pathname+location.search)&&typeof window.render==="function"){var o=window.render;window.render=function(ev){var r=o.apply(this,arguments);try{add(ev)}catch(x){}return r};
if(main.querySelector("p.when")){var m=location.pathname.match(/[0-9a-f-]{36}/i)||location.search.match(/[0-9a-f-]{36}/i);if(m)post("rpc/whatson_event",{p_event:m[0].toLowerCase()}).then(add,function(){})}}
/* W85S-003 */
var ul=document.querySelector("main ul.rules");
function ymd(d){return new Intl.DateTimeFormat("en-CA",{timeZone:TZ,year:"numeric",month:"2-digit",day:"2-digit"}).format(d)}
function nice(d){return new Date(d+"T12:00:00Z").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric",timeZone:"UTC"})}
if(ul&&/^\/parties\/?$/.test(location.pathname))post("rpc/store_closures",{p_days:21}).then(function(a){if(!Array.isArray(a))return;var t=ymd(new Date()),seen={},L=a.filter(function(c){if(!c||!c.full_day||!/^\d{4}-\d{2}-\d{2}$/.test(c.day||"")||c.day<t||seen[c.day])return false;return seen[c.day]=1}).sort(function(x,y){return x.day<y.day?-1:1}).slice(0,4);if(!L.length||document.getElementById("w85s-cal"))return;
var p=el("p","note");p.id="w85s-cal";p.appendChild(el("strong",null,"Closed all day on the restaurant's calendar (next 21 days): "));p.appendChild(document.createTextNode(L.map(function(c){return(c.day===t?"Today":nice(c.day))+": "+(c.label||(c.kind==="private"?"Closed for a private event":"Closed for a special event"))}).join(" · ")));
var at=document.getElementById("w84s-today")||ul;at.parentNode.insertBefore(p,at.nextSibling)},function(){});
})();
