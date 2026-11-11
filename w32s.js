/* W32S w32s.js (IGE site). Uses ONLY what this device already saved (localStorage "ige-freeof-v1" free-of list, "ige-mylist-v1" My list; nothing is sent anywhere) and each dish's own estimated allergens already on the page. All allergen info is estimated from each recipe.
W32S-002 "Show only what fits (est.)" toggle on My list (/menu/) and the Happy Hour picks (Support page), using the W31S marks.
W32S-003 Popular page + diet guides: "N of M fit your free-of list (est.)" under the title and in each section heading.
W32S-004 Privacy page: "Saved on this device" card listing both on-device lists, with buttons to clear them. */
(function(){if(window.__w32s)return;window.__w32s=1;var K="ige-freeof-v1",KM="ige-mylist-v1",N={dairy:"dairy",gluten:"gluten","tree-nuts":"tree nuts",peanuts:"peanuts",egg:"egg",soy:"soy",fish:"fish",shellfish:"shellfish"},
CALL="Estimated from each recipe, not lab-tested; shared equipment. Call (562) 991-4320 first if you have an allergy.",$=function(i){return document.getElementById(i)};
function ok(v){return Object.prototype.hasOwnProperty.call(N,v)}
function get(){try{var a=JSON.parse(localStorage.getItem(K)||"[]");return Array.isArray(a)?a.filter(ok):[]}catch(e){return[]}}
function names(a){return a.map(function(v){return N[v]}).join(", ")}
function mk(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x)e.textContent=x;return e}
var hold=0;function soon(fn){clearTimeout(hold);hold=setTimeout(fn,90)}
/* W32S-002 */
var T={};function tog(ulId,what){var ul=$(ulId);if(!ul)return;var a=get(),lis=[].slice.call(ul.children),marked=lis.filter(function(li){return li.querySelector(".w31s-mk")}),fit=marked.filter(function(li){return li.querySelector(".w31s-ok")});
 var bid="w32sT-"+ulId,b=$(bid),st=$(bid+"-s");
 if(!a.length||!marked.length){if(b)b.parentNode.hidden=true;T[ulId]=false;lis.forEach(function(li){if(li.hasAttribute("data-w32s-h")){li.hidden=false;li.removeAttribute("data-w32s-h")}});return}
 if(!b){var p=mk("p","w32s-tog");b=mk("button","btn ghost w32s-btn","Show only what fits (est.)");b.type="button";b.id=bid;b.setAttribute("aria-pressed","false");b.setAttribute("aria-controls",ulId);
  st=mk("span","small muted w32s-st");st.id=bid+"-s";st.setAttribute("role","status");p.appendChild(b);p.appendChild(document.createTextNode(" "));p.appendChild(st);ul.parentNode.insertBefore(p,ul);
  b.addEventListener("click",function(){T[ulId]=!T[ulId];tog(ulId,what)})}
 b.parentNode.hidden=false;var on=!!T[ulId];b.setAttribute("aria-pressed",on?"true":"false");b.textContent=on?"Show all "+what:"Show only what fits (est.)";
 lis.forEach(function(li){var h=on&&!li.querySelector(".w31s-ok");if(h){li.hidden=true;li.setAttribute("data-w32s-h","")}else if(li.hasAttribute("data-w32s-h")){li.hidden=false;li.removeAttribute("data-w32s-h")}});
 st.textContent=on?("Showing "+fit.length+" of "+lis.length+" "+what+" that fit your free-of list ("+names(a)+") by estimate. "+CALL):""}
function togs(){tog("mlItems","saved dishes");tog("hhPicksList","picks")}
/* W32S-003 */
function fits(li,a){var v=li.getAttribute("data-alg");if(v===null)return "u";var r=v.split(" ");return a.some(function(x){return r.indexOf(x)>=0})?"n":"f"}
function guide(){if(!/^\/menu\/(popular|vegetarian|vegan|gluten-free|high-protein)\/?$/.test(location.pathname))return;var h1=document.querySelector("main h1"),box=$("leaveOut");if(!h1||!box)return;var rows=[].slice.call(document.querySelectorAll("main li.dish"));if(!rows.length)return;var a=get(),p=$("w32sFit");
 if(!p){p=mk("p","small w32s-fit");p.id="w32sFit";p.setAttribute("role","status");box.parentNode.insertBefore(p,box)}p.textContent="";
 [].forEach.call(document.querySelectorAll(".w32s-hc"),function(s){s.parentNode.removeChild(s)});
 if(!a.length){p.appendChild(document.createTextNode("Have allergies? "));var l=mk("a",null,"Build a free-of list");l.href="/menu/allergens/free-of/";p.appendChild(l);p.appendChild(document.createTextNode(" and this page shows how many dishes fit it (estimated)."));return}
 var f=0,u=0;rows.forEach(function(li){var k=fits(li,a);if(k==="f")f++;if(k==="u")u++});
 p.appendChild(mk("strong",null,f+" of "+rows.length+" dishes here fit your free-of list ("+names(a)+") by estimate"));p.appendChild(document.createTextNode((u?"; "+u+" "+(u===1?"has":"have")+" no confirmed estimate":"")+". "+CALL));
 [].forEach.call(document.querySelectorAll("main section"),function(s){var h=s.querySelector("h2");var ls=s.querySelectorAll("li.dish");if(!h||!ls.length)return;var c=0;[].forEach.call(ls,function(li){if(fits(li,a)==="f")c++});h.appendChild(mk("span","w32s-hc"," · "+c+" of "+ls.length+" fit your list (est.)"))})}
/* W32S-004 */
function mcount(){try{var v=JSON.parse(localStorage.getItem(KM)||"null");if(!v)return 0;if(Array.isArray(v))return v.length;if(Array.isArray(v.items))return v.items.length;if(typeof v==="object")return Object.keys(v).length}catch(e){}return 0}
function dev(){var host=$("w32sDev");if(!host)return;var a=get(),m=mcount();host.textContent="";host.appendChild(mk("h2","h4","Saved on this device"));
 host.appendChild(mk("p","small","This website saves two optional things in your browser's storage on this device only. They are never sent to us, and you can clear them here."));
 var ul=mk("ul","small");ul.appendChild(mk("li",null,"Free-of list (allergens to leave out, estimated): "+(a.length?names(a):"nothing saved")));ul.appendChild(mk("li",null,"My list (dishes you saved on the menu): "+(m?m+" "+(m===1?"dish":"dishes"):"nothing saved")));host.appendChild(ul);
 var p=mk("p","w32s-btns");function btn(t,keys,show){if(!show)return;var b=mk("button","btn ghost",t);b.type="button";b.addEventListener("click",function(){keys.forEach(function(k){try{localStorage.removeItem(k)}catch(e){}});dev();var s=$("w32sDevS");if(s)s.textContent="Cleared from this device."});p.appendChild(b);p.appendChild(document.createTextNode(" "))}
 btn("Clear free-of list",[K],a.length);btn("Clear My list",[KM],m);btn("Clear both",[K,KM],a.length&&m);host.appendChild(p);var s=mk("p","small muted");s.id="w32sDevS";s.setAttribute("role","status");host.appendChild(s)}
if(/^\/privacy\/?/.test(location.pathname)){var main=document.querySelector("main .wrap")||document.querySelector("main");if(main){var c=mk("section","card w32s-dev");c.id="w32sDev";c.setAttribute("aria-label","Saved on this device");var cl=main.querySelector(".chlog");if(cl)main.insertBefore(c,cl);else main.appendChild(c)}}
function all(){togs();guide();dev()}
if(window.MutationObserver){var mo=new MutationObserver(function(){soon(togs)});["mlItems","hhPicksList"].forEach(function(i){var e=$(i);if(e)mo.observe(e,{childList:true,subtree:true})})}
var lo=$("leaveOut");if(lo)lo.addEventListener("change",function(){soon(guide)});
window.addEventListener("storage",function(e){if(!e||e.key===K||e.key===KM)all()});all()})();
/* W34S-BEGIN: load /w34s.js (on-device only) */(function(){if(document.querySelector('script[src="/w34s.js"]'))return;var s=document.createElement("script");s.src="/w34s.js";s.defer=true;document.head.appendChild(s)})();/* W34S-END */
/* W40S-BEGIN */(function(d){if(d.querySelector('script[src="/w40s.js"]'))return;var s=d.createElement("script");s.src="/w40s.js";s.defer=1;d.head.appendChild(s)})(document);/* W40S-END */
/* W39S-BEGIN: load /w39s.js (on-device only) */(function(){if(document.querySelector('script[src="/w39s.js"]'))return;var s=document.createElement("script");s.src="/w39s.js";s.defer=true;document.head.appendChild(s)})();/* W39S-END */
/* W38S-BEGIN: load /w38s.js (on-device only) */(function(){if(document.querySelector('script[src="/w38s.js"]'))return;var s=document.createElement("script");s.src="/w38s.js";s.defer=true;document.head.appendChild(s)})();/* W38S-END */
/* W37S-BEGIN: load /w37s.js (on-device only) */(function(){if(document.querySelector('script[src="/w37s.js"]'))return;var s=document.createElement("script");s.src="/w37s.js";s.defer=true;document.head.appendChild(s)})();/* W37S-END */
/* W36S-BEGIN: load /w36s.js (on-device only) */(function(){if(document.querySelector('script[src="/w36s.js"]'))return;var s=document.createElement("script");s.src="/w36s.js";s.defer=true;document.head.appendChild(s)})();/* W36S-END */
/* W35S-BEGIN: load /w35s.js (on-device only) */(function(){if(document.querySelector('script[src="/w35s.js"]'))return;var s=document.createElement("script");s.src="/w35s.js";s.defer=true;document.head.appendChild(s)})();/* W35S-END */
/* W33S-BEGIN: load /w33s.js (on-device only) */(function(){if(document.querySelector('script[src="/w33s.js"]'))return;var s=document.createElement("script");s.src="/w33s.js";s.defer=true;document.head.appendChild(s)})();/* W33S-END */
