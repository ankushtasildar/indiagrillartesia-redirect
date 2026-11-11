/* W90S w90s.js (IGE site). What's On night pages (/whatson/<id>) and invitation pages (/e/<code>). Every word comes from the night the page already rendered; nothing is fetched or sent.
W90S-001 What's On night pages: W88S's line under the date (#w88s-rel) is re-checked every 30 s from the night's own start and end (restaurant time zone): under an hour before the start it reads "That's today. Starts in N min." (the words invitations got in W89S-001), and it hides within 30 s once the night is over.
W90S-003 What's On night pages: during the night it reads "Happening now, until <end time>." (invitations get the same words from w89s.js).
W90S-002 both pages: under 300 px the top site nav's side padding shrinks to 1vw so the last link (Terms) is not cut off; 300 px and wider unchanged. */
(function(){if(window.__w90s)return;window.__w90s=1;
var TZ="America/Los_Angeles",d=document,Q=location.pathname+location.search;
try{var st=d.createElement("style");st.textContent="@media(max-width:299px){nav .wrap a{padding-left:.4vw;padding-right:.4vw}}";d.head.appendChild(st)}catch(x){}
var main=d.getElementById("app");if(!main||!/^\/whatson\/./.test(Q))return;
var ev=null;
function ymd(t){var o={};new Intl.DateTimeFormat("en-US",{timeZone:TZ,year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(new Date(t)).forEach(function(x){o[x.type]=x.value});return o.year+"-"+o.month+"-"+o.day}
function dn(s){var p=s.split("-");return Date.UTC(+p[0],+p[1]-1,+p[2])/86400000}
function hm(t){return new Date(t).toLocaleTimeString("en-US",{timeZone:TZ,hour:"numeric",minute:"2-digit"}).replace(":00","").replace(/\u202f/g," ")}
function words(s,e,n){if(e<=n)return "";if(s<=n)return "Happening now, until "+hm(e)+".";var k=dn(ymd(s))-dn(ymd(n)),m=Math.ceil((s-n)/60000);if(k===0)return m<60?"That's today. Starts in "+m+" min.":"That's today.";return k===1?"That's tomorrow.":k>1&&k<=60?"That's in "+k+" days.":""}
function tick(){try{var r=d.getElementById("w88s-rel");if(!r||!ev||ev.status==="cancelled")return;var s=Date.parse(ev.starts_at),e=Date.parse(ev.ends_at);if(!(s>0)||!(e>s))return;var t=words(s,e,Date.now());if(r.getAttribute("data-w90s")!=="1")r.setAttribute("data-w90s","1");if(!t){if(!r.hidden)r.hidden=true;return}if(r.hidden)r.hidden=false;if(r.textContent!==t)r.textContent=t}catch(x){}}
if(typeof window.render==="function"){var o=window.render;window.render=function(x){if(x&&x.starts_at)ev=x;setTimeout(tick,0);return o.apply(this,arguments)}}
if(window.MutationObserver)new MutationObserver(function(){if(d.getElementById("w88s-rel"))tick()}).observe(main,{childList:true,subtree:true,characterData:true});
setInterval(tick,30000)})();
