/* W38S w38s.js (IGE site). Reads ONLY what this device already saved (localStorage "ige-freeof-v1") and the ticks in the page's own Leave out box, plus each dish's estimated allergens already on the page. Nothing is saved, changed or sent by this file. All allergen info is estimated from each recipe.
W38S-001 Dish pages: when the Leave out ticks on screen differ from the saved list (e.g. a shared ?free= link), a "This view" verdict for the dish itself follows the view (est.); the saved list and its own verdict are untouched.
W38S-002 Section pages, Popular and diet guides: when the ticks (saved list or a shared ?free= view) hide every dish on the page, an empty-state card says why by estimate (how many list a ticked allergen, how many are not confirmed) and links to every dish on the menu that fits.
W38S-003 /menu/ dish sheet: the same "This view" verdict when a shared ?free= view is open on the full menu (est.). */
(function(){if(window.__w38s)return;window.__w38s=1;var K="ige-freeof-v1",N={dairy:"dairy",gluten:"gluten","tree-nuts":"tree nuts",peanuts:"peanuts",egg:"egg",soy:"soy",fish:"fish",shellfish:"shellfish"},
CALL="Estimated from each recipe, not lab-tested; shared equipment. Call (562) 991-4320 first if you have an allergy.",P=location.pathname,$=function(i){return document.getElementById(i)},IN={};
function ok(v){return Object.prototype.hasOwnProperty.call(N,v)}for(var q in N)if(ok(q))IN[N[q]]=q;
function get(){try{var a=JSON.parse(localStorage.getItem(K)||"[]");return Array.isArray(a)?a.filter(ok):[]}catch(e){return[]}}
function names(a){return a.map(function(v){return N[v]}).join(", ")}
function mk(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x)e.textContent=x;return e}
function same(a,b){return a.length===b.length&&a.every(function(x){return b.indexOf(x)>=0})}
function box(){return document.querySelector("fieldset.malg")||$("leaveOut")}
function on(){var b=box();if(!b)return[];return [].slice.call(b.querySelectorAll("input[type=checkbox]")).filter(function(c){return ok(c.value)&&c.checked}).map(function(c){return c.value})}
function view(){var v=on();return v.length&&!same(v,get())?v:null}
function fitOf(alg,v){if(alg===null)return{k:"u",h:[]};var h=v.filter(function(x){return alg.indexOf(x)>=0});return{k:h.length?"n":"f",h:h}}
function say(o,v,r){o.textContent="";o.appendChild(mk("strong",null,"This view (leaving out "+names(v)+"): "));
 o.appendChild(document.createTextNode(r.k==="u"?"this dish has no confirmed allergen estimate yet, so we can't say. ":r.k==="n"?"by its estimate this dish contains "+names(r.h)+". ":"by its estimate this dish lists none of them. "));
 o.appendChild(document.createTextNode("Your saved list is unchanged. "));o.appendChild(mk("span","small muted",CALL))}
var DISH=/^\/menu\/d\/[a-z0-9-]+\/?$/.test(P),LIST=/^\/menu\/(s\/[a-z0-9-]+|popular|vegetarian|vegan|gluten-free|high-protein)\/?$/.test(P),MENU=/^\/menu\/?$/.test(P);
var st=mk("style");st.id="w38sCss";st.textContent=".w38s-none{margin:.5rem 0}.w38s-fit{margin:.5rem 0}.w38s-btn{min-height:44px;max-width:100%;font-size:var(--fs-sm,14px)}";document.head.appendChild(st);
/* W38S-001 */
function own(){var c=document.querySelector("section.dpn");if(!c)return null;var h=[].filter.call(c.querySelectorAll("h3"),function(x){return /^Allergens/.test(x.textContent)})[0];if(!h)return null;
 var a=[],unk=false;for(var e=h.nextElementSibling;e&&e.tagName!=="H3";e=e.nextElementSibling){if(/Not confirmed for this dish yet/.test(e.textContent))unk=true;[].forEach.call(e.querySelectorAll(".tag.al"),function(s){var k=IN[s.textContent.trim().toLowerCase()];if(k)a.push(k)})}return unk?null:a}
function dish(){if(!DISH)return;var o=$("w38sFit"),v=view(),c=document.querySelector("section.dpn");if(!v||!c){if(o)o.parentNode.removeChild(o);return}
 if(!o){o=mk("p","card w38s-fit");o.id="w38sFit";o.setAttribute("role","status");var at=$("w30sFit")||$("dpTools");if(at&&at.parentNode)at.parentNode.insertBefore(o,at.nextSibling);else c.parentNode.insertBefore(o,c)}
 say(o,v,fitOf(own(),v))}
/* W38S-002 */
function empty(){if(!LIST)return;var o=$("w38sNone"),v=on(),rs=[].slice.call(document.querySelectorAll("main li.dish")).filter(function(li){return !li.closest("#mlItems,#hhPicksList,#mlsItems")});
 var vis=rs.filter(function(li){return !li.hidden}).length;if(!v.length||!rs.length||vis){if(o)o.hidden=true;return}
 var u=rs.filter(function(li){return li.getAttribute("data-alg")===null}).length,lo=$("loStatus")||$("leaveOut");if(!lo||!lo.parentNode)return;
 if(!o){o=mk("div","card w38s-none");o.id="w38sNone";o.setAttribute("role","status");lo.parentNode.insertBefore(o,lo.nextSibling)}o.hidden=false;o.textContent="";
 o.appendChild(mk("p",null,"Nothing on this page fits what is ticked (leaving out "+names(v)+"), by estimate: "+(rs.length-u)+" of the "+rs.length+" dishes list one of them"+(u?" and "+u+" are not confirmed yet.":".")));
 var l=mk("a","btn w38s-btn","See every dish on the menu that fits (est.)");l.href="/menu/allergens/free-of/?x="+v.map(encodeURIComponent).join(",");o.appendChild(l);
 o.appendChild(mk("p","small muted",(view()?"Your saved list is unchanged. ":"")+CALL))}
/* W38S-003 */
function sheet(){if(!MENU)return;var d=$("dish"),b=$("dishBody"),o=$("w38sSheet"),v=view();if(!d||!b||!d.open||!v){if(o)o.parentNode.removeChild(o);return}
 var t=$("dishTitle"),id=null,el=null,m=/^#d-(.+)$/.exec(location.hash);if(m){try{id=decodeURIComponent(m[1])}catch(e){}if(id)[].some.call(document.querySelectorAll(".dish[data-id]"),function(x){if(x.getAttribute("data-id")===id){el=x;return true}})}
 if(!el&&t){var nm=t.textContent.trim();[].some.call(document.querySelectorAll(".dish[data-id]"),function(x){var s=x.querySelector(".dname");if(s&&s.textContent.trim()===nm){el=x;return true}})}
 if(!el){if(o)o.parentNode.removeChild(o);return}var a=el.getAttribute("data-alg");
 if(!o){o=mk("p","card w38s-fit");o.id="w38sSheet";o.setAttribute("role","status");var w=$("w31sSheet"),sv=$("dishSave"),at=sv?sv.parentNode:null;if(w&&w.parentNode===b)b.insertBefore(o,w.nextSibling);else if(at&&at.parentNode===b)b.insertBefore(o,at);else b.appendChild(o)}
 say(o,v,fitOf(a===null?null:a.split(" "),v))}
var tm=0;function all(){tm=0;dish();empty();sheet()}function soon(){if(!tm)tm=setTimeout(all,60)}
document.addEventListener("change",soon,true);window.addEventListener("hashchange",soon);window.addEventListener("storage",soon);
var dg=$("dish");if(dg&&window.MutationObserver)new MutationObserver(soon).observe(dg,{attributes:true,attributeFilter:["open"]});
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",soon);else soon();setTimeout(soon,700);setTimeout(soon,1800)})();
