/* W41S w41s.js (IGE site). On-device only: nothing is sent anywhere and nothing is ordered. No prices. All allergen info elsewhere stays labelled as estimates.
W41S-001 App hand-off for one dish (phones only, pointer: coarse): each dish page and the dish sheet on the full menu get "Open this dish in the IGE app" (ige://dish/<id>, the route the app accepts since W40P). If the app is not on the phone, app-open.js says so with a working call link. Desktop shows nothing.
W41S-002 Recently viewed on the Support home page: the dishes this device already remembers (W40S, "ige-recent-v1") with a Clear button.
W41S-003 Larger text (W40S toggle) also applies inside the dish sheet on the full menu. */
(function(){if(window.__w41s)return;window.__w41s=1;
var d=document,KR="ige-recent-v1",ID=/^[a-z0-9-]{1,64}$/,$=function(i){return d.getElementById(i)},main=d.querySelector("main");
function mk(t,c,x){var e=d.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
function lg(k){try{return localStorage.getItem(k)}catch(e){return null}}
function sv(k,v){try{if(v==null)localStorage.removeItem(k);else localStorage.setItem(k,v)}catch(e){}}
var S="html.w40lg dialog.dsheet ",st=mk("style");
st.textContent=".w41app{margin:4px 0 12px}.w41app .btn{min-height:44px;display:inline-flex;align-items:center}.w41n{margin:6px 0 0}"+
 [S+"p",S+"li",S+"dd",S+"dt",S+"td",S+"th",S+"summary",S+"label"].join(",")+"{font-size:var(--fs-lg,20px)!important;line-height:1.6}"+
 S+".tag{font-size:var(--fs-md,16px)!important}"+S+"h3{font-size:var(--fs-h3,21px)!important}"+S+".btn{font-size:var(--fs-md,17px)!important}"+
 ".w41rv h2{margin:0 0 4px;font-size:var(--fs-md,17px)}.w41rvl a{display:inline-flex;align-items:center;min-height:44px;margin-right:16px}.w41rv .btn{min-height:44px}"+
 "@media print{.w41app,.w41rv{display:none!important}}";
d.head.appendChild(st);
/* W41S-001 */
var phone=!!(window.matchMedia&&matchMedia("(pointer: coarse)").matches);
var NOTE="If the IGE app is not on this phone, nothing opens. To order, call ";
function opener(){if(!d.querySelector('script[src="/app-open.js"]')){var s=mk("script");s.src="/app-open.js";s.defer=1;d.head.appendChild(s)}}
function block(id,nm){var w=mk("div","w41app"),a=mk("a","btn alt","Open this dish in the IGE app");a.href="ige://dish/"+id;a.setAttribute("data-appnote",NOTE);w.appendChild(a);
 w.appendChild(mk("p","small muted w41n","The app opens "+nm+" if it is on today\u2019s menu, or today\u2019s menu if not. Nothing is added or ordered."));return w}
if(phone){var dp=$("dpTools"),id=dp&&dp.getAttribute("data-id"),nm=dp&&dp.getAttribute("data-name"),act=main&&main.querySelector("p.dpact");
 if(id&&nm&&act&&ID.test(id)&&location.pathname.indexOf("/menu/d/"+id+"/")===0&&!main.querySelector(".w41app")){opener();act.parentNode.insertBefore(block(id,nm),act.nextSibling)}
 var body=$("dishBody");
 if(body&&window.MutationObserver){var paint=function(){if(body.querySelector(".w41app"))return;var a=body.querySelector('a[href^="/menu/d/"]'),m=a&&/^\/menu\/d\/([a-z0-9-]{1,64})\/$/.exec(a.getAttribute("href")),t=$("dishTitle");
   if(!m||!t||!ID.test(m[1]))return;opener();var p=a.parentNode;p.parentNode.insertBefore(block(m[1],t.textContent.trim()||"this dish"),p.nextSibling)};
  new MutationObserver(paint).observe(body,{childList:true});paint()}}
/* W41S-002 */
function rget(){try{var v=JSON.parse(lg(KR)||"[]");return Array.isArray(v)?v.filter(function(x){return x&&typeof x.id==="string"&&ID.test(x.id)&&typeof x.n==="string"&&x.n.length>0&&x.n.length<90}).slice(0,8):[]}catch(e){return[]}}
function home(){var old=d.querySelector(".w41rv");if(old)old.parentNode.removeChild(old);if(!main||location.pathname!=="/"&&location.pathname!=="/support/")return;var L=rget();if(!L.length)return;
 var c=mk("section","card w41rv");c.setAttribute("aria-labelledby","w41rvH");var h=mk("h2",null,"Recently viewed on this device");h.id="w41rvH";c.appendChild(h);
 var p=mk("p","w41rvl");L.forEach(function(x){var l=mk("a",null,x.n);l.href="/menu/d/"+x.id+"/";p.appendChild(l)});c.appendChild(p);
 c.appendChild(mk("p","small muted","Only on this phone or computer. Nutrition and allergens on each dish page are estimates."));
 var b=mk("button","btn ghost","Clear recently viewed");b.type="button";b.addEventListener("click",function(){sv(KR,null);home();var t=main.querySelector("h1");if(t){t.setAttribute("tabindex","-1");t.focus()}});c.appendChild(b);
 var first=main.querySelector(".card"),w=main.querySelector(".wrap")||main;if(first&&first.parentNode)first.parentNode.insertBefore(c,first.nextSibling);else w.appendChild(c)}
home();
})();
/* W42S-BEGIN */(function(d){if(d.querySelector('script[src="/w42s.js"]'))return;var s=d.createElement("script");s.src="/w42s.js";s.defer=1;d.head.appendChild(s)})(document);/* W42S-END */
