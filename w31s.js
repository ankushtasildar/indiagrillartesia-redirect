/* W31S w31s.js (IGE site, loaded on /menu/ and the Support page). Uses the free-of list saved ON THIS DEVICE by W30S (localStorage "ige-freeof-v1"; nothing is sent anywhere). All allergen info is estimated from each recipe.
W31S-001 /menu/: the saved list pre-ticks the menu's own Leave out (estimated) filter; ticks there are remembered; "Forget my list".
W31S-002 My list: each saved dish is marked "fits your list" / "contains X" / "no confirmed estimate" (est.) + a count.
W31S-003 Support: Happy Hour picks marked the same way (from /menu/alg.json, the baked menu's own estimates) + a count.
W31S-004 /menu/ dish sheet: a verdict for your saved list, like the dish pages. */
(function(){var K="ige-freeof-v1",N={dairy:"dairy",gluten:"gluten","tree-nuts":"tree nuts",peanuts:"peanuts",egg:"egg",soy:"soy",fish:"fish",shellfish:"shellfish"},
CALL="Estimated from each recipe, not lab-tested; shared equipment. Call (562) 991-4320 first if you have an allergy.",$=function(i){return document.getElementById(i)};
function ok(v){return Object.prototype.hasOwnProperty.call(N,v)}
function get(){try{var a=JSON.parse(localStorage.getItem(K)||"[]");return Array.isArray(a)?a.filter(ok):[]}catch(e){return[]}}
function put(a){try{if(a.length)localStorage.setItem(K,JSON.stringify(a));else localStorage.removeItem(K)}catch(e){}}
function names(a){return a.map(function(v){return N[v]}).join(", ")}
function mk(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x)e.textContent=x;return e}
function ev(el){var e;try{e=new Event("change",{bubbles:true})}catch(x){e=document.createEvent("Event");e.initEvent("change",true,true)}el.dispatchEvent(e)}
function algEl(d){if(!d)return undefined;var v=d.getAttribute("data-alg");return v===null?null:v.split(" ").filter(Boolean)}
function dishEl(id){var f=null;[].some.call(document.querySelectorAll(".dish[data-id]"),function(x){if(x.getAttribute("data-id")===id){f=x;return true}});return f}
/* r: undefined = unknown dish (no mark), null = no confirmed estimate, [] or [..] = the dish's own estimate */
function verdict(r,a){if(r===undefined)return null;if(r===null)return{k:"unk",t:"no confirmed estimate"};var h=a.filter(function(v){return r.indexOf(v)>=0});return h.length?{k:"no",t:"contains "+names(h)+" (est.)",h:h}:{k:"ok",t:"fits your list (est.)"}}
function mark(li,v){var o=li.querySelector(".w31s-mk");if(o)o.parentNode.removeChild(o);if(!v)return;var s=mk("span","tag w31s-mk w31s-"+v.k," "+v.t);li.appendChild(s)}
function idOf(a){var m=/#d-(.+)$/.exec(a.getAttribute("href")||"");if(!m)return null;try{return decodeURIComponent(m[1])}catch(e){return null}}
function sum(host,id,n,f,u,what){var p=$(id);if(!n){if(p)p.hidden=true;return}if(!p){p=mk("p","small muted w31s-sum");p.id=id;p.setAttribute("role","status");host.parentNode.insertBefore(p,host.nextSibling)}p.hidden=false;
 var a=get();p.textContent="Your free-of list ("+names(a)+"): "+f+" of "+n+" "+what+" fit by estimate"+(u?"; "+u+" "+(u===1?"has":"have")+" no confirmed estimate":"")+". "+CALL+" "}
var hold=0;function soon(fn){clearTimeout(hold);hold=setTimeout(fn,60)}
/* W31S-001 */
var boxes=[].slice.call(document.querySelectorAll(".malg input[type=checkbox]")).filter(function(c){return ok(c.value)}),fs=boxes.length?boxes[0].closest("fieldset"):null,note=null;
function on(){return boxes.filter(function(c){return c.checked}).map(function(c){return c.value})}
function paint(){if(!note)return;var a=get();note.textContent="";
 if(!a.length){note.appendChild(document.createTextNode("Ticks here are remembered on this device only (nothing is sent), for other pages too. "));var b=mk("a",null,"Build a free-of list");b.href="/menu/allergens/free-of/";note.appendChild(b);return}
 note.appendChild(document.createTextNode("Your saved free-of list ("+names(a)+") is remembered on this device only, so the menu starts with it. "));
 var f=mk("button","linkbtn","Forget my list");f.type="button";f.addEventListener("click",function(){put([]);boxes.forEach(function(c){if(c.checked){c.checked=false;ev(c)}});all()});note.appendChild(f)}
if(fs){note=mk("p","small muted w31s-mem");note.id="w31sMem";note.setAttribute("role","status");fs.parentNode.insertBefore(note,fs.nextSibling);
 var mem=get();if(mem.length&&!on().length&&!/[?&](list|q)=/.test(location.search)){boxes.forEach(function(c){if(mem.indexOf(c.value)>=0){c.checked=true;ev(c)}})}
 boxes.forEach(function(c){c.addEventListener("change",function(e){if(e.isTrusted){put(on());all()}})})}
/* W31S-002 */
function myl(){var ul=$("mlItems");if(!ul)return;var a=get(),n=0,f=0,u=0;[].forEach.call(ul.children,function(li){var l=li.querySelector("a[href^='#d-']"),v=null;
  if(a.length&&l){v=verdict(algEl(dishEl(idOf(l))),a);if(v){n++;if(v.k==="ok")f++;if(v.k==="unk")u++}}mark(li,v)});sum($("mlAlg")&&!$("mlAlg").hidden?$("mlAlg"):ul,"w31sMl",n,f,u,"saved dishes")}
/* W31S-004 */
function sheet(){var b=$("dishBody"),d=$("dish"),o=$("w31sSheet");if(!b||!d||!d.open)return;var a=get();if(o&&!a.length){o.parentNode.removeChild(o);return}if(!a.length)return;
 var t=$("dishTitle"),id=null,m=/^#d-(.+)$/.exec(location.hash),el=null;if(m){try{id=decodeURIComponent(m[1])}catch(e){}el=id&&dishEl(id)}
 if(!el&&t){var nm=t.textContent.trim();[].some.call(document.querySelectorAll(".dish[data-id]"),function(x){var s=x.querySelector(".dname");if(s&&s.textContent.trim()===nm){el=x;return true}})}
 var v=el?verdict(algEl(el),a):null;if(!v){if(o)o.parentNode.removeChild(o);return}
 if(!o){o=mk("p","card w31s-fit");o.id="w31sSheet";o.setAttribute("role","status");var sv=$("dishSave"),at=sv?sv.parentNode:null;if(at&&at.parentNode===b)b.insertBefore(o,at);else b.appendChild(o)}
 o.textContent="";o.appendChild(mk("strong",null,"Your free-of list ("+names(a)+"): "));
 o.appendChild(document.createTextNode(v.k==="unk"?"this dish has no confirmed allergen estimate yet, so we can't say. ":v.k==="no"?"by its estimate this dish contains "+names(v.h)+". ":"by its estimate this dish lists none of them. "));
 o.appendChild(mk("span","small muted",CALL))}
/* W31S-003 */
var AM=null,asked=false;function hh(){var ul=$("hhPicksList");if(!ul)return;var a=get();
 if(a.length&&!AM&&!asked){asked=true;fetch("/menu/alg.json",{credentials:"same-origin"}).then(function(r){return r.ok?r.json():null}).then(function(j){AM=(j&&j.d)||{};hh()}).catch(function(){AM={}});return}
 var n=0,f=0,u=0;[].forEach.call(ul.children,function(li){var l=li.querySelector("a[href^='/menu/#d-']"),v=null,id=l&&idOf(l);
  if(a.length&&AM&&id&&Object.prototype.hasOwnProperty.call(AM,id)){v=verdict(AM[id],a);if(v){n++;if(v.k==="ok")f++;if(v.k==="unk")u++}}mark(li,v)});sum(ul,"w31sHh",n,f,u,"picks")}
function all(){paint();myl();sheet();hh()}
if(window.MutationObserver){var mo=new MutationObserver(function(){soon(all)});["mlItems","menu","dishBody","hhPicksList"].forEach(function(i){var e=$(i);if(e)mo.observe(e,{childList:true})});
 var dg=$("dish");if(dg)mo.observe(dg,{attributes:true,attributeFilter:["open"]})}
window.addEventListener("storage",function(e){if(!e||e.key===K)all()});window.addEventListener("hashchange",function(){soon(sheet)});all()})();
