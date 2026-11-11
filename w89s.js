/* W89S w89s.js (IGE site). Invitation pages (/e/<code>) only. Every word comes from the invitation the page already rendered; nothing is fetched or sent.
W89S-001: W87S's line under the date ("That's today." / "That's tomorrow." / "That's in N days." / "Happening now.") was set once at load. It is now re-checked every 30 s from the invitation's own start and end (restaurant time zone): under an hour before the start it reads "That's today. Starts in N min.", during the party "Happening now." (W90S-003: "Happening now, until <end time>."), and once the party is over the line hides. */
(function(){if(window.__w89s)return;window.__w89s=1;
var TZ="America/Los_Angeles",d=document,main=d.getElementById("app");
if(!main||!/^\/e\/./.test(location.pathname+location.search))return;
var ev=null;
function ymd(t){var o={};new Intl.DateTimeFormat("en-US",{timeZone:TZ,year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(new Date(t)).forEach(function(x){o[x.type]=x.value});return o.year+"-"+o.month+"-"+o.day}
function dn(s){var p=s.split("-");return Date.UTC(+p[0],+p[1]-1,+p[2])/86400000}
function hm(t){return new Date(t).toLocaleTimeString("en-US",{timeZone:TZ,hour:"numeric",minute:"2-digit"}).replace(":00","").replace(/\u202f/g," ")}/* W90S-003 */
function words(s,e,n){if(e<=n)return "";if(s<=n)return "Happening now, until "+hm(e)+".";var k=dn(ymd(s))-dn(ymd(n)),m=Math.ceil((s-n)/60000);if(k===0)return m<60?"That's today. Starts in "+m+" min.":"That's today.";return k===1?"That's tomorrow.":k>1&&k<=60?"That's in "+k+" days.":""}
function tick(){try{var r=d.getElementById("w87s-rel");if(!r||!ev)return;var s=Date.parse(ev.starts_at),e=Date.parse(ev.ends_at);if(!(s>0)||!(e>s))return;var t=words(s,e,Date.now());r.setAttribute("data-w89s","1");if(!t){if(!r.hidden)r.hidden=true;return}if(r.hidden)r.hidden=false;if(r.textContent!==t)r.textContent=t}catch(x){}}
if(typeof window.render==="function"){var o=window.render;window.render=function(x){if(x&&x.starts_at)ev=x;setTimeout(tick,0);return o.apply(this,arguments)}}
if(window.MutationObserver)new MutationObserver(function(){if(d.getElementById("w87s-rel"))tick()}).observe(main,{childList:true,subtree:true});
setInterval(tick,30000)})();
