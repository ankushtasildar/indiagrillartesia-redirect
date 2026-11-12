/* W40S w40s.js (IGE site). On-device only: nothing is sent anywhere. All allergen info is estimated from each recipe.
W40S-001 Recently viewed: dish pages remember the last 8 dishes you opened (name + page, this device only); menu, section, Popular and diet pages show them with a Clear button. Privacy's "Saved on this device" card lists it.
W40S-002 Diet guides: the "jump to a section" counts follow your Leave out ticks ("Seafood (3/5 fit)"), with a line saying the counts are estimates and naming the sections where nothing fits (their chips hide, as their sections do).
W40S-003 Larger text: one button (crumbs line or under the title) makes body text larger on every page of the site, saved on this device; Privacy's card lists and clears it. */
(function(){if(window.__w40s)return;window.__w40s=1;
var KR="ige-recent-v1",KT="ige-textsize-v1",ID=/^[a-z0-9-]{1,80}$/,$=function(i){return document.getElementById(i)};
function mk(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
function lg(k){try{return localStorage.getItem(k)}catch(e){return null}}
function sv(k,v){try{if(v==null)localStorage.removeItem(k);else localStorage.setItem(k,v)}catch(e){}}
var st=mk("style");st.textContent=".w40crumb{float:right;margin-left:12px}.w40ts{min-height:44px;display:inline-flex;align-items:center;font-size:var(--fs-sm,14px)}p.w40tsp{margin:0 0 8px}html.w40lg main p,html.w40lg main li,html.w40lg main dd,html.w40lg main dt,html.w40lg main td,html.w40lg main th,html.w40lg main summary,html.w40lg main label{font-size:var(--fs-lg,20px)!important;line-height:1.6}html.w40lg main .tag{font-size:var(--fs-md,16px)!important}html.w40lg main h3{font-size:var(--fs-h3,21px)!important}.w40rv{margin:16px 0}.w40rv h2{margin:0 0 4px;font-size:var(--fs-md,17px)}.w40rvl a{display:inline-flex;align-items:center;min-height:44px;margin-right:16px}.w40rv .btn{min-height:44px}.w40z{display:none!important}html.w40lg main nav li{font-size:inherit!important}";document.head.appendChild(st);
var R=document.documentElement,main=document.querySelector("main");
function big(){return lg(KT)==="lg"}
function apply(){R.classList.toggle("w40lg",big());[].forEach.call(document.querySelectorAll(".w40ts"),function(b){b.setAttribute("aria-pressed",big()?"true":"false")})}
apply();
/* W40S-003 */
var h1=main&&main.querySelector("h1");
if(h1&&!document.querySelector(".w40ts")){var b=mk("button","linkbtn w40ts","Larger text");b.type="button";b.addEventListener("click",function(){sv(KT,big()?null:"lg");apply();dev()});
 var cr=main.querySelector("p.crumbs");if(cr){var sp=mk("span","w40crumb");sp.appendChild(b);cr.insertBefore(sp,cr.firstChild)}else{var p=mk("p","w40tsp small");p.appendChild(b);h1.parentNode.insertBefore(p,h1.nextSibling)}apply()}
/* W40S-001 */
function rget(){try{var v=JSON.parse(lg(KR)||"[]");return Array.isArray(v)?v.filter(function(x){return x&&typeof x.id==="string"&&ID.test(x.id)&&typeof x.n==="string"&&x.n.length>0&&x.n.length<90}).slice(0,8):[]}catch(e){return[]}}
var dp=$("dpTools"),cur=dp&&dp.getAttribute("data-id"),cn=dp&&dp.getAttribute("data-name");
if(cur&&cn&&ID.test(cur)&&location.pathname.indexOf("/menu/d/"+cur+"/")===0){var a=rget().filter(function(x){return x.id!==cur});a.unshift({id:cur,n:cn.slice(0,89)});sv(KR,JSON.stringify(a.slice(0,8)))}
function recent(){var old=document.querySelector(".w40rv");if(old)old.parentNode.removeChild(old);if(!main||location.pathname.indexOf("/menu/")!==0)return;
 var L=rget().filter(function(x){return x.id!==cur});if(!L.length)return;
 var c=mk("section","card w40rv");c.setAttribute("aria-labelledby","w40rvH");var h=mk("h2",null,"Recently viewed on this device");h.id="w40rvH";c.appendChild(h);
 var p=mk("p","w40rvl");L.forEach(function(x){var l=mk("a",null,x.n);l.href="/menu/d/"+x.id+"/";p.appendChild(l)});c.appendChild(p);
 var b=mk("button","btn ghost","Clear recently viewed");b.type="button";b.addEventListener("click",function(){sv(KR,null);recent();dev();var m=main.querySelector("h1");if(m){m.setAttribute("tabindex","-1");m.focus()}});c.appendChild(b);
 var w=main.querySelector(".wrap")||main,lo=$("leaveOut"),dg=main.querySelector("p.dgl");
 if(dp){w.appendChild(c)}else if(lo&&lo.parentNode){lo.parentNode.insertBefore(c,lo)}else if(dg){dg.parentNode.insertBefore(c,dg.nextSibling)}else{w.appendChild(c)}}
recent();
/* W40S-001/003 on Privacy's "Saved on this device" card (W32S-004) */
function dev(){var host=$("w32sDev");if(!host)return;var ul=host.querySelector("ul");if(!ul)return;var q=host.querySelector(".w40dev");if(q)q.parentNode.removeChild(q);var q2=host.querySelector(".w40dev2");if(q2)q2.parentNode.removeChild(q2);
 var ip=host.querySelector("p.small");if(ip&&ip.textContent.indexOf("two optional things")>=0)ip.textContent=ip.textContent.replace("two optional things","a few optional things");
 var n=rget().length,li=mk("li","w40dev","Recently viewed dishes (names of dish pages you opened, up to 8): "+(n?n+" "+(n===1?"dish":"dishes"):"nothing saved"));ul.appendChild(li);
 ul.appendChild(mk("li","w40dev2","Text size: "+(big()?"larger":"standard (nothing saved)")));
 var bx=host.querySelector(".w40btns");if(bx)bx.parentNode.removeChild(bx);bx=mk("p","w40btns");
 if(n){var b1=mk("button","btn ghost","Clear recently viewed");b1.type="button";b1.addEventListener("click",function(){sv(KR,null);dev()});bx.appendChild(b1)}
 if(big()){var b2=mk("button","btn ghost","Clear text size");b2.type="button";b2.addEventListener("click",function(){sv(KT,null);apply();dev()});bx.appendChild(b2)}
 if(bx.firstChild)host.appendChild(bx)}
var host=$("w32sDev");if(host&&window.MutationObserver){new MutationObserver(function(){if(!host.querySelector(".w40dev")&&host.querySelector("ul"))dev()}).observe(host,{childList:true})}dev();
/* W40S-002 */
var lo=$("leaveOut");if(main&&main.id==="dg"&&lo){var jn=null;[].forEach.call(main.querySelectorAll("nav"),function(n){if(!jn&&n.querySelector('a[href^="#"]'))jn=n});
 if(jn){var K=[];[].forEach.call(jn.querySelectorAll('a[href^="#"]'),function(a){var m=/^(.*) \((\d+)\)$/.exec(a.textContent),s=$(a.getAttribute("href").slice(1));if(!m||!s)return;var ls=s.querySelectorAll("li.dish");if(ls.length!==+m[2])return;K.push({a:a,n:m[1],t:+m[2],s:s,h:a.getAttribute("href")})});
  var cap=mk("p","small muted w40cap");cap.hidden=true;jn.parentNode.insertBefore(cap,jn.nextSibling);
  var pend=0;function upd(){pend=0;var on=!!lo.querySelector("input:checked"),z=[];K.forEach(function(k){var c=0;[].forEach.call(k.s.querySelectorAll("li.dish"),function(li){if(!li.hidden)c++});
   if(!on){var t0=k.n+" ("+k.t+")";if(k.a.textContent!==t0)k.a.textContent=t0;if(k.a.hidden)k.a.hidden=false;k.a.classList.remove("w40z");return}/* W103S-001 */
   var t1=k.n+" ("+c+"/"+k.t+" fit)";if(k.a.textContent!==t1)k.a.textContent=t1;if(k.a.hidden!==!c)k.a.hidden=!c;k.a.classList.toggle("w40z",!c);if(!c)z.push(k.n)});/* W103S-001 */
   if(cap.hidden!==!on)cap.hidden=!on;var t2=on?"Counts are dishes that fit your Leave out ticks, by estimate."+(z.length?" Nothing fits by estimate in: "+z.join(", ")+".":""):"";if(cap.textContent!==t2)cap.textContent=t2}/* W103S-001 */
  function sch(){if(!pend){pend=1;setTimeout(upd,0)}}
  lo.addEventListener("change",sch);if(window.MutationObserver)new MutationObserver(sch).observe(main,{attributes:true,attributeFilter:["hidden"],subtree:true});upd()}}
})();
/* W41S-BEGIN */(function(d){if(d.querySelector('script[src="/w41s.js"]'))return;var s=d.createElement("script");s.src="/w41s.js";s.defer=1;d.head.appendChild(s)})(document);/* W41S-END */
