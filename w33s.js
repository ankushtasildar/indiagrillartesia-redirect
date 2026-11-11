/* W33S w33s.js (IGE site). Uses ONLY what this device already saved (localStorage "ige-freeof-v1" free-of list, "ige-mylist-v1" My list; nothing is sent anywhere) and each dish's own estimated allergens already on the page. All allergen info is estimated from each recipe.
W33S-001 Per-dish marks on section pages, Popular, diet guides and dish-page lists: "Fits your list (est.)", "Has dairy (est.)" or "Can't check: not confirmed".
W33S-002 Section pages (/menu/s/*): "N of M dishes here fit your free-of list (est.)" under the title.
W33S-003 My list (/menu/): "Print what fits (est.)" prints only the saved dishes that fit the free-of list, with the call-first note.
W33S-004 Privacy page: "Download a copy" of what this website saved on this device (a file made in the browser; nothing is sent). */
(function(){if(window.__w33s)return;window.__w33s=1;var K="ige-freeof-v1",KM="ige-mylist-v1",N={dairy:"dairy",gluten:"gluten","tree-nuts":"tree nuts",peanuts:"peanuts",egg:"egg",soy:"soy",fish:"fish",shellfish:"shellfish"},
CALL="Estimated from each recipe, not lab-tested; shared equipment. Call (562) 991-4320 first if you have an allergy.",P=location.pathname,$=function(i){return document.getElementById(i)};
function ok(v){return Object.prototype.hasOwnProperty.call(N,v)}
function get(){try{var a=JSON.parse(localStorage.getItem(K)||"[]");return Array.isArray(a)?a.filter(ok):[]}catch(e){return[]}}
function names(a){return a.map(function(v){return N[v]}).join(", ")}
function mk(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x)e.textContent=x;return e}
var hold=0;function soon(fn){clearTimeout(hold);hold=setTimeout(fn,120)}
function fit(li,a){var v=li.getAttribute("data-alg");if(v===null)return{k:"u",h:[]};var r=v.split(" "),h=a.filter(function(x){return r.indexOf(x)>=0});return{k:h.length?"n":"f",h:h}}
/* W33S-001 */
var LISTPAGE=/^\/menu\/(s\/[a-z0-9-]+|popular|vegetarian|vegan|gluten-free|high-protein|d\/[a-z0-9-]+)\/?$/.test(P);
function rows(){return [].slice.call(document.querySelectorAll("main li.dish")).filter(function(li){return !li.closest("#mlItems,#hhPicksList,#mlsItems")})}
function marks(){if(!LISTPAGE)return;var a=get();[].forEach.call(document.querySelectorAll(".w33s-mk"),function(s){s.parentNode.removeChild(s)});if(!a.length)return;
 rows().forEach(function(li){var r=fit(li,a),t=li.querySelector(".tags")||li,s;
  if(r.k==="f")s=mk("span","tag w33s-mk w33s-ok","Fits your list (est.)");else if(r.k==="n")s=mk("span","tag w33s-mk w33s-no","Has "+names(r.h)+" (est.)");else s=mk("span","tag w33s-mk w33s-unk","Can't check: not confirmed");
  s.title="Against your free-of list ("+names(a)+"). "+CALL;t.appendChild(s)})}
/* W33S-002 */
function sect(){if(!/^\/menu\/s\/[a-z0-9-]+\/?$/.test(P))return;var h1=document.querySelector("main h1"),box=$("leaveOut");if(!h1||!box)return;var rs=rows();if(!rs.length)return;var a=get(),p=$("w33sFit");
 if(!p){p=mk("p","small w33s-fit");p.id="w33sFit";p.setAttribute("role","status");box.parentNode.insertBefore(p,box)}p.textContent="";
 if(!a.length){p.appendChild(document.createTextNode("Have allergies? "));var l=mk("a",null,"Build a free-of list");l.href="/menu/allergens/free-of/";p.appendChild(l);p.appendChild(document.createTextNode(" and every dish here gets an estimated fit mark."));return}
 var f=0,u=0;rs.forEach(function(li){var k=fit(li,a).k;if(k==="f")f++;if(k==="u")u++});
 p.appendChild(mk("strong",null,f+" of "+rs.length+" "+h1.textContent.trim()+" dishes fit your free-of list ("+names(a)+") by estimate"));p.appendChild(document.createTextNode((u?"; "+u+" "+(u===1?"is":"are")+" not confirmed":"")+". "));
 var c=mk("a",null,"Change list");c.href="/menu/allergens/free-of/";p.appendChild(c);p.appendChild(document.createTextNode(". "+CALL))}
/* W33S-003 */
function prt(){var ul=$("mlItems");if(!ul||!window.print)return;var sec=$("mylist"),act=sec&&sec.querySelector(".mlact");if(!act)return;var a=get(),lis=[].slice.call(ul.children),okl=lis.filter(function(li){return li.querySelector(".w31s-ok")}),b=$("w33sPrint");
 if(!b){b=mk("button","btn alt w33s-pbtn","Print what fits (est.)");b.type="button";b.id="w33sPrint";act.appendChild(b);var hd=mk("p","pronly small w33s-phd");hd.id="w33sPhd";sec.insertBefore(hd,ul);
  b.addEventListener("click",function(){var a2=get(),ls=[].slice.call(ul.children),n=0;ls.forEach(function(li){if(!li.querySelector(".w31s-ok")){li.setAttribute("data-w33s-ph","1")}else n++});
   $("w33sPhd").textContent="My list: "+n+" saved "+(n===1?"dish fits":"dishes fit")+" your free-of list ("+names(a2)+") by estimate. Printed "+new Date().toLocaleDateString()+" from indiagrillexpress.sites.tab.bot. "+CALL;
   for(var e=sec;e&&e!==document.body;e=e.parentNode){[].forEach.call(e.parentNode.children,function(x){if(x!==e&&x.tagName!=="SCRIPT")x.setAttribute("data-w33s-pa","1")})}
   document.body.classList.add("w33s-pml");window.print();setTimeout(done,600)})}
 b.hidden=!(a.length&&okl.length&&!sec.hidden)}
function done(){document.body.classList.remove("w33s-pml");[].forEach.call(document.querySelectorAll("[data-w33s-ph],[data-w33s-pa]"),function(x){x.removeAttribute("data-w33s-ph");x.removeAttribute("data-w33s-pa")})}
window.addEventListener("afterprint",done);
/* W33S-004 */
function raw(k){try{return JSON.parse(localStorage.getItem(k)||"null")}catch(e){return null}}
function dl(){var host=$("w32sDev");if(!host||!host.firstChild||$("w33sDl"))return;var p=mk("p","w33s-dl"),b=mk("button","btn ghost w33s-dlb","Download a copy");b.type="button";b.id="w33sDl";var s=mk("span","small muted w33s-dls");s.setAttribute("role","status");
 p.appendChild(b);p.appendChild(document.createTextNode(" "));p.appendChild(s);host.appendChild(p);
 b.addEventListener("click",function(){var fo=get(),ml=raw(KM);if(!fo.length&&!ml){s.textContent="Nothing is saved on this device, so there is nothing to download.";return}
  var o={what:"Everything indiagrillexpress.sites.tab.bot saved in this browser on this device. It was never sent to us.",made:new Date().toISOString(),free_of_list:fo,my_list:ml,allergen_note:CALL};
  try{var u=URL.createObjectURL(new Blob([JSON.stringify(o,null,2)],{type:"application/json"})),x=document.createElement("a");x.href=u;x.download="india-grill-express-saved-on-this-device.json";document.body.appendChild(x);x.click();setTimeout(function(){URL.revokeObjectURL(u);x.parentNode.removeChild(x)},800);s.textContent="Saved a copy to your downloads. It was made in your browser; nothing was sent."}catch(e){s.textContent="This browser can't make the file. Your lists are listed above."}})}
function all(){marks();sect();prt()}
function boot(){all();if(/^\/privacy\/?$/.test(P)){dl();new MutationObserver(function(){dl()}).observe(document.body,{childList:true,subtree:true})}
 var ul=$("mlItems");if(ul)new MutationObserver(function(){soon(prt)}).observe(ul,{childList:true,subtree:true,attributes:true,attributeFilter:["class"]});
 var sec=$("mylist");if(sec)new MutationObserver(function(){soon(prt)}).observe(sec,{attributes:true,attributeFilter:["hidden"]});
 document.addEventListener("change",function(){soon(all)});document.addEventListener("click",function(){setTimeout(function(){soon(all)},60)});window.addEventListener("storage",function(){soon(all)})}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot);else boot()})();
