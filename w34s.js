/* W34S w34s.js (IGE site). Uses ONLY what this device already saved (localStorage "ige-freeof-v1" free-of list, "ige-mylist-v1" My list; nothing is sent anywhere) and each dish's own estimated allergens already on the page. All allergen info is estimated from each recipe.
W34S-001 /menu/: each section chip shows "N fit" (est.) for your saved free-of list, from the dishes already on the page.
W34S-002 Section pages, Popular and diet guides: "Print what fits (est.)" prints only the dishes that fit, with the date and the call-first note.
W34S-003 Section pages, Popular and diet guides: "Fits first (est.)" reorders the list on screen (fits, then not confirmed, then has an allergen); tap again for menu order.
W34S-004 Privacy page: "Restore from a copy" reads a "Download a copy" file in this browser and puts the lists back on this device (checked against the menu; nothing is sent). */
(function(){if(window.__w34s)return;window.__w34s=1;var K="ige-freeof-v1",KM="ige-mylist-v1",N={dairy:"dairy",gluten:"gluten","tree-nuts":"tree nuts",peanuts:"peanuts",egg:"egg",soy:"soy",fish:"fish",shellfish:"shellfish"},
CALL="Estimated from each recipe, not lab-tested; shared equipment. Call (562) 991-4320 first if you have an allergy.",P=location.pathname,$=function(i){return document.getElementById(i)};
function ok(v){return Object.prototype.hasOwnProperty.call(N,v)}
function get(){try{var a=JSON.parse(localStorage.getItem(K)||"[]");return Array.isArray(a)?a.filter(ok):[]}catch(e){return[]}}
function names(a){return a.map(function(v){return N[v]}).join(", ")}
function mk(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x)e.textContent=x;return e}
var hold=0;function soon(fn){clearTimeout(hold);hold=setTimeout(fn,150)}
function fit(li,a){var v=li.getAttribute("data-alg");if(v===null)return"u";var r=v.split(" ");return a.some(function(x){return r.indexOf(x)>=0})?"n":"f"}
/* W34S-001 */
var MENU=/^\/menu\/?$/.test(P);
function chips(){if(!MENU)return;var nav=$("chips");if(!nav)return;var a=get();[].forEach.call(nav.querySelectorAll("a[href^='#']"),function(c){var id=c.getAttribute("href").slice(1),s=c.querySelector(".w34s-cc"),sec=id&&id!=="catering"?$(id):null;
 if(!a.length||!sec||!sec.classList.contains("msec")){if(s){s.parentNode.removeChild(s);c.removeAttribute("aria-label")}return}
 var rs=[].slice.call(sec.querySelectorAll("li.dish")),f=0,u=0;rs.forEach(function(li){var k=fit(li,a);if(k==="f")f++;else if(k==="u")u++});if(!rs.length){if(s)s.parentNode.removeChild(s);return}
 if(!s){s=mk("span","w34s-cc");c.appendChild(s)}s.textContent="\u00b7 "+f+" fit";var nm=(c.firstChild&&c.firstChild.nodeType===3?c.firstChild.nodeValue:c.textContent).trim();
 c.setAttribute("aria-label",nm+": "+f+" of "+rs.length+" fit your free-of list by estimate"+(u?", "+u+" not confirmed":""));c.title=f+" of "+rs.length+" fit your free-of list ("+names(a)+") by estimate. "+CALL})}
/* W34S-002 + W34S-003 */
var LIST=/^\/menu\/(s\/[a-z0-9-]+|popular|vegetarian|vegan|gluten-free|high-protein)\/?$/.test(P);
function rows(){return [].slice.call(document.querySelectorAll("main li.dish")).filter(function(li){return !li.closest("#mlItems,#hhPicksList,#mlsItems")})}
function bar(){if(!LIST)return null;var b=$("w34sBar");if(b)return b;var rs=rows();if(!rs.length)return null;var h1=document.querySelector("main h1");if(!h1)return null;
 var anchor=document.querySelector("main .w27pr")||h1;b=mk("p","w34s-bar");b.id="w34sBar";anchor.parentNode.insertBefore(b,anchor.nextSibling);
 var pb=mk("button","btn ghost w34s-btn","Print what fits (est.)");pb.type="button";pb.id="w34sPrint";
 var sb=mk("button","btn ghost w34s-btn","Fits first (est.)");sb.type="button";sb.id="w34sSort";sb.setAttribute("aria-pressed","false");
 var st=mk("span","small muted w34s-st");st.id="w34sSt";st.setAttribute("role","status");b.appendChild(sb);b.appendChild(document.createTextNode(" "));b.appendChild(pb);b.appendChild(st);
 var hd=mk("p","pronly small w34s-phd");hd.id="w34sPhd";b.parentNode.insertBefore(hd,b.nextSibling);
 pb.addEventListener("click",printFit);sb.addEventListener("click",sortFit);return b}
function ui(){var b=bar();if(!b)return;var a=get(),rs=rows(),f=rs.filter(function(li){return fit(li,a)==="f"}).length;
 $("w34sPrint").hidden=!(a.length&&f&&window.print);$("w34sSort").hidden=!a.length;b.hidden=!a.length;
 if(!a.length&&$("w34sSort").getAttribute("aria-pressed")==="true")unsort()}
function printFit(){var a=get(),n=0,h1=document.querySelector("main h1");rows().forEach(function(li){if(fit(li,a)!=="f")li.setAttribute("data-w34s-ph","1");else n++});
 $("w34sPhd").textContent=(h1?h1.textContent.trim()+": ":"")+n+(n===1?" dish fits":" dishes fit")+" your free-of list ("+names(a)+") by estimate. Printed "+new Date().toLocaleDateString()+" from indiagrillexpress.sites.tab.bot. "+CALL;
 document.body.classList.add("w34s-pf");window.print();setTimeout(pdone,600)}
function pdone(){document.body.classList.remove("w34s-pf");[].forEach.call(document.querySelectorAll("[data-w34s-ph]"),function(x){x.removeAttribute("data-w34s-ph")})}
window.addEventListener("afterprint",pdone);
var ORD=[];
function sortFit(){var sb=$("w34sSort");if(sb.getAttribute("aria-pressed")==="true"){unsort();return}var a=get(),R={f:0,u:1,n:2},uls=[];ORD=[];
 rows().forEach(function(li,i){ORD.push(li);var ul=li.parentNode;if(uls.indexOf(ul)<0)uls.push(ul)});
 uls.forEach(function(ul){var ls=[].slice.call(ul.children).filter(function(li){return li.classList.contains("dish")});ls.map(function(li,i){return{li:li,r:R[fit(li,a)],i:i}}).sort(function(x,y){return x.r-y.r||x.i-y.i}).forEach(function(o){ul.appendChild(o.li)})});
 sb.setAttribute("aria-pressed","true");sb.textContent="Menu order";var f=rows().filter(function(li){return fit(li,a)==="f"}).length;$("w34sSt").textContent=" Showing the "+f+" that fit first, then not confirmed, then the rest (est.)."}
function unsort(){ORD.forEach(function(li){if(li.parentNode)li.parentNode.appendChild(li)});ORD=[];var sb=$("w34sSort");if(sb){sb.setAttribute("aria-pressed","false");sb.textContent="Fits first (est.)"}var st=$("w34sSt");if(st)st.textContent=""}
/* W34S-004 */
var KNOWN=null;function known(cb){if(KNOWN)return cb(KNOWN);fetch("/menu/alg.json",{credentials:"same-origin"}).then(function(r){return r.json()}).then(function(j){KNOWN=j&&j.d||{};cb(KNOWN)}).catch(function(){cb(null)})}
function rst(){var host=$("w32sDev");if(!host||!host.firstChild||$("w34sRs"))return;var p=mk("p","w34s-rs"),l=mk("label","btn ghost w34s-rsl","Restore from a copy"),f=mk("input");f.type="file";f.accept="application/json,.json";f.id="w34sRs";f.className="w34s-file";l.htmlFor="w34sRs";
 var s=mk("span","small muted w34s-rss");s.setAttribute("role","status");var go=mk("button","btn w34s-go","Put these back on this device");go.type="button";go.hidden=true;
 l.appendChild(f);p.appendChild(l);p.appendChild(s);p.appendChild(go);host.appendChild(p);var pend=null;
 f.addEventListener("change",function(){pend=null;go.hidden=true;var fl=f.files&&f.files[0];if(!fl)return;if(fl.size>200000){s.textContent="That file is too big to be a copy from this website.";return}
  var rd=new FileReader();rd.onload=function(){var o;try{o=JSON.parse(String(rd.result))}catch(e){s.textContent="That file isn't a copy from this website (it isn't readable).";return}
   known(function(kn){if(!kn){s.textContent="Couldn't check the file against the menu right now. Try again in a moment.";return}
    var fo=Array.isArray(o&&o.free_of_list)?o.free_of_list.filter(function(v,i,a){return ok(v)&&a.indexOf(v)===i}):[],ml=Array.isArray(o&&o.my_list)?o.my_list:[],seen={},keep=[],skip=0;
    ml.forEach(function(x){var id=x&&typeof x.id==="string"?x.id:"";if(id&&typeof x.name==="string"&&Object.prototype.hasOwnProperty.call(kn,id)&&!seen[id]&&keep.length<60){seen[id]=1;keep.push({id:id,name:x.name.slice(0,80)})}else skip++});
    if(!fo.length&&!keep.length){s.textContent="Nothing in that file to restore (no free-of list or saved dishes from this menu).";return}
    pend={fo:fo,ml:keep};s.textContent="Found: "+(fo.length?"free-of list ("+names(fo)+")":"no free-of list")+"; "+keep.length+" saved "+(keep.length===1?"dish":"dishes")+(skip?" ("+skip+" no longer on the menu, left out)":"")+". This replaces what is saved here now.";go.hidden=false})};rd.readAsText(fl)});
 go.addEventListener("click",function(){if(!pend)return;try{if(pend.fo.length)localStorage.setItem(K,JSON.stringify(pend.fo));if(pend.ml.length)localStorage.setItem(KM,JSON.stringify(pend.ml));s.textContent="Done. Your lists are back on this device; nothing was sent. Reload to see them below.";go.hidden=true;pend=null;f.value=""}catch(e){s.textContent="This browser won't save it (storage is off or full)."}})}
function all(){chips();ui()}
function boot(){all();if(/^\/privacy\/?$/.test(P)){rst();new MutationObserver(function(){rst()}).observe(document.body,{childList:true,subtree:true})}
 var mn=document.querySelector("main");if(MENU&&mn)new MutationObserver(function(m){for(var i=0;i<m.length;i++){var t=m[i].target;if(!(t.closest&&t.closest("#chips")))return soon(all)}}).observe(mn,{childList:true,subtree:true});
 document.addEventListener("change",function(){soon(all)});document.addEventListener("click",function(){setTimeout(function(){soon(all)},80)});window.addEventListener("storage",function(){soon(all)})}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot);else boot()})();
