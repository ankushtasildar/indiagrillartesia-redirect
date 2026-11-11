/* W88S w88s.js (IGE site). Every word shown comes from the page itself or the restaurant's own public calendar.
W88S-001 Parties page (/parties/): W86S's "Booked today on the restaurant's calendar" line gets live words per booking: "(happening now)", "(starts in N min)" or "(later today)"; an ended booking drops off and the line hides once none is left. It reads the SAME calendar answer W86S asked for (no second request).
W88S-002 What's On night pages (/whatson/<id>): under the date line (right after W85S's Add to calendar / Share row, which stays first under the date), "That's today." / "That's tomorrow." / "That's in N days." / "Happening now.", restaurant time, from the night's own start/end; hidden once over or cancelled. */
(function(){if(window.__w88s)return;window.__w88s=1;
var U="https://icadicvgsgdjcvvgocqx.supabase.co/",K="sb_publishable_ShnB-KVuSOngL4SaWutFjg_BsvmHY5b",TZ="America/Los_Angeles",P=location.pathname,d=document;
function ymd(t){var o={};new Intl.DateTimeFormat("en-US",{timeZone:TZ,year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(new Date(t)).forEach(function(x){o[x.type]=x.value});return o.year+"-"+o.month+"-"+o.day}
function hm(t){return new Date(t).toLocaleTimeString("en-US",{timeZone:TZ,hour:"numeric",minute:"2-digit"}).replace(":00","").replace(/\u202f/g," ")}
/* W88S-001 */
if(/^\/parties\/?$/.test(P)&&window.fetch){var A=null,of=window.fetch;
window.fetch=function(u,o){var r=of.apply(this,arguments);try{var s=String(u&&u.url||u);if(!A&&s.indexOf("/rest/v1/rpc/store_closures")>0&&o&&o.method==="POST")r.then(function(x){try{if(x&&x.ok)x.clone().json().then(function(a){if(!A&&Array.isArray(a)){A=a;tick()}},function(){})}catch(e){}},function(){})}catch(e){}return r};
function tick(){var p=d.getElementById("w86s-today");if(!p||!A)return;var b=p.querySelector("strong");if(!b)return;var n=Date.now(),t=ymd(n),sn={};
var L=A.filter(function(c){if(!c||c.full_day||!c.starts_at||!c.ends_at)return false;var s=Date.parse(c.starts_at),e=Date.parse(c.ends_at);if(!(s>0)||!(e>s)||e<=n||ymd(s)>t||ymd(e)<t)return false;var k=c.starts_at+"|"+c.ends_at+"|"+(c.label||c.kind);if(sn[k])return false;return sn[k]=1}).sort(function(x,y){return Date.parse(x.starts_at)-Date.parse(y.starts_at)}).slice(0,4);
if(!L.length){p.hidden=true;return}p.hidden=false;
var tx=L.map(function(c){var s=Date.parse(c.starts_at),m=Math.ceil((s-n)/60000),w=s<=n?"happening now":(m<60?"starts in "+m+" min":"later today");return(c.label?String(c.label):(c.kind==="private"?"Privately booked":"Reserved for an event"))+" "+hm(s)+" \u2013 "+hm(Date.parse(c.ends_at))+" ("+w+")"}).join(" · ");
p.setAttribute("data-w88s","1");if(b.nextSibling&&b.nextSibling.nodeType===3&&!b.nextSibling.nextSibling){if(b.nextSibling.nodeValue!==tx)b.nextSibling.nodeValue=tx}else{while(b.nextSibling)p.removeChild(b.nextSibling);p.appendChild(d.createTextNode(tx))}}
function watch(){var ul=d.querySelector("main ul.rules");if(ul&&window.MutationObserver)new MutationObserver(tick).observe(ul.parentNode,{childList:true});tick();setInterval(tick,30000)}
if(d.readyState==="loading")d.addEventListener("DOMContentLoaded",watch);else watch()}
/* W88S-002 */
var main=d.getElementById("app");
if(main&&/^\/whatson\/./.test(P+location.search)){var ev=null,asked=0,id=((P+location.search).match(/[0-9a-f]{8}-[0-9a-f-]{27}/i)||[""])[0].toLowerCase();
if(typeof window.render==="function"){var orr=window.render;window.render=function(x){ev=x;var r=orr.apply(this,arguments);setTimeout(rel,0);return r}}
function rel(){var w=main.querySelector("p.when");if(!w)return;
if(!ev){if(!asked&&id){asked=1;var c=window.AbortController?new AbortController():null;if(c)setTimeout(function(){c.abort()},8000);fetch(U+"rest/v1/rpc/whatson_event",{method:"POST",headers:{"Content-Type":"application/json",apikey:K,Authorization:"Bearer "+K},body:JSON.stringify({p_event:id}),signal:c?c.signal:undefined}).then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(x){ev=x;rel()},function(){})}return}
var s=Date.parse(ev.starts_at),e=Date.parse(ev.ends_at),n=Date.now(),q=d.getElementById("w88s-rel"),tx="";
if(s>0&&e>s&&e>n&&ev.status!=="cancelled"){if(s<=n)tx="Happening now.";else{var k=Math.round((Date.parse(ymd(s)+"T12:00:00Z")-Date.parse(ymd(n)+"T12:00:00Z"))/864e5);tx=k<=0?"That's today.":k===1?"That's tomorrow.":k<=60?"That's in "+k+" days.":""}}
if(!tx){if(q)q.hidden=true;return}
if(!q){q=d.createElement("p");q.className="small";q.id="w88s-rel"}var at=d.getElementById("w85s-ev");at=at&&at.parentNode===w.parentNode?at:w;if(q.previousElementSibling!==at)at.parentNode.insertBefore(q,at.nextSibling);if(q.textContent!==tx)q.textContent=tx;q.hidden=false}
function go(){rel();if(window.MutationObserver)new MutationObserver(function(){var q=d.getElementById("w88s-rel"),b=d.getElementById("w85s-ev");if(!q||q.previousElementSibling!==(b&&b.parentNode===q.parentNode?b:main.querySelector("p.when")))rel()}).observe(main,{childList:true});setInterval(rel,60000)}
if(d.readyState==="loading")d.addEventListener("DOMContentLoaded",go);else go()}
})();
