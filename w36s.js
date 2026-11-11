/* W36S w36s.js (IGE site). Uses ONLY what is already on the page (dish names and each dish's own estimated allergens), the Leave out ticks on screen and the free-of list this device already saved (localStorage "ige-freeof-v1", read only; nothing is written or sent anywhere by this site). All allergen info is estimated from each recipe.
W36S-001 /menu/: when the view on screen leaves out a different set than your saved list (for example a shared ?free= link), the section chips count what fits THIS view, and say so.
W36S-002 Popular, section pages and diet guides: "Share what fits (est.)" puts the names of the dishes that fit into your phone's share sheet (or copies them on a computer), with the estimate note and a link to the same view. You share it yourself.
W36S-003 Section pages: previous / next section links at the bottom (order and names from the menu's own section bar, baked into this file; Popular and Catering left out). */
(function(){if(window.__w36s)return;window.__w36s=1;var K="ige-freeof-v1",N={dairy:"dairy",gluten:"gluten","tree-nuts":"tree nuts",peanuts:"peanuts",egg:"egg",soy:"soy",fish:"fish",shellfish:"shellfish"},
CALL="Estimated from each recipe, not lab-tested; shared equipment. Call (562) 991-4320 first if you have an allergy.",P=location.pathname,$=function(i){return document.getElementById(i)},MENU=/^\/menu\/?$/.test(P),
LIST=/^\/menu\/(s\/[a-z0-9-]+|popular|vegetarian|vegan|gluten-free|high-protein)\/?$/.test(P);
function ok(v){return Object.prototype.hasOwnProperty.call(N,v)}
function get(){try{var a=JSON.parse(localStorage.getItem(K)||"[]");return Array.isArray(a)?a.filter(ok):[]}catch(e){return[]}}
function names(a){return a.map(function(v){return N[v]}).join(", ")}
function mk(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x)e.textContent=x;return e}
function fit(li,a){var v=li.getAttribute("data-alg");if(v===null)return"u";var r=v.split(" ");return a.some(function(x){return r.indexOf(x)>=0})?"n":"f"}
function same(a,b){return a.length===b.length&&a.every(function(x){return b.indexOf(x)>=0})}
var st=mk("style");st.id="w36sCss";st.textContent=".w36s-view .w34s-cc{display:none}.w36s-cc{margin-left:.3em;white-space:nowrap;font-weight:600;font-size:var(--fs-xs,12px)}.w36s-bar{display:flex;flex-wrap:wrap;gap:.5rem;align-items:center;margin:.5rem 0}.w36s-btn{min-height:44px}.w36s-st{flex-basis:100%;font-size:var(--fs-sm,14px)}.w36s-ta{width:100%;min-height:8rem;font-size:var(--fs-sm,14px)}.w36s-pn{display:flex;flex-wrap:wrap;gap:8px;justify-content:space-between;margin:1.25rem 0}.w36s-pn a{min-height:44px;display:inline-flex;align-items:center;max-width:100%}@media print{.w36s-bar,.w36s-pn,.w36s-cc{display:none!important}}";document.head.appendChild(st);
function box(){return document.querySelector("fieldset.malg")||$("leaveOut")}
function cbs(){var b=box();return b?[].slice.call(b.querySelectorAll("input[type=checkbox]")).filter(function(c){return ok(c.value)}):[]}
function on(){return cbs().filter(function(c){return c.checked}).map(function(c){return c.value})}
/* W36S-001 */
function chips(){if(!MENU)return;var nav=$("chips");if(!nav)return;var v=on(),mine=get(),use=v.length&&!same(v,mine);
 [].forEach.call(nav.querySelectorAll("a[href^='#']"),function(c){var id=c.getAttribute("href").slice(1),s=c.querySelector(".w36s-cc"),sec=id&&id!=="catering"?$(id):null;
  if(!use||!sec||!sec.classList.contains("msec")){if(s)s.parentNode.removeChild(s);if(c.getAttribute("data-w36s")){if(c.getAttribute("aria-label")===c.getAttribute("data-w36s"))c.removeAttribute("aria-label");c.removeAttribute("data-w36s")}return}
  var rs=[].slice.call(sec.querySelectorAll("li.dish")),f=0,u=0;if(!rs.length){if(s)s.parentNode.removeChild(s);return}rs.forEach(function(li){var k=fit(li,v);if(k==="f")f++;else if(k==="u")u++});
  if(!s){s=mk("span","w36s-cc");c.appendChild(s)}s.textContent="\u00b7 "+f+" fit";var nm=(c.firstChild&&c.firstChild.nodeType===3?c.firstChild.nodeValue:c.textContent).trim(),
  lab=nm+": "+f+" of "+rs.length+" fit this view (leaving out "+names(v)+") by estimate"+(u?", "+u+" not confirmed":"");var ti=f+" of "+rs.length+" fit this view, leaving out "+names(v)+" (estimated). "+CALL;if(c.getAttribute("aria-label")!==lab)c.setAttribute("aria-label",lab);c.setAttribute("data-w36s",lab);if(c.title!==ti)c.title=ti});
 nav.classList.toggle("w36s-view",!!use);if(!mo&&window.MutationObserver){mo=new MutationObserver(function(){if([].some.call(nav.querySelectorAll("a[data-w36s]"),function(c){return c.getAttribute("aria-label")!==c.getAttribute("data-w36s")||c.title.indexOf("this view")<0}))setTimeout(chips,60)});mo.observe(nav,{subtree:true,attributes:true,attributeFilter:["aria-label","title"]})}}
var mo=null;
/* W36S-003 */
var SECS=[["combos", "Combos & Plates"], ["appetizers", "Appetizers"], ["tandoor-grill", "Tandoor & Grill"], ["chicken", "Chicken"], ["lamb-goat", "Lamb & Goat"], ["seafood", "Seafood"], ["vegetarian", "Vegetarian"], ["biryani-rice", "Biryani & Rice"], ["breads", "Breads"], ["street-food", "Chaat, Rolls & Momos"], ["indo-chinese", "Indo-Chinese"], ["south-indian", "South Indian"], ["sides", "Sides & Extras"], ["desserts", "Desserts & Sweets"], ["drinks", "Drinks"], ["grocery", "Grocery"]];
function pn(){var m=/^\/menu\/s\/([a-z0-9-]+)\/?$/.exec(P);if(!m||$("w36sPn"))return;var i=-1;SECS.forEach(function(s,k){if(s[0]===m[1])i=k});if(i<0)return;var mn=document.querySelector("main");if(!mn)return;
 var d=mk("div","w36s-pn");d.id="w36sPn";d.setAttribute("role","navigation");d.setAttribute("aria-label","More menu sections, this is section "+(i+1)+" of "+SECS.length);/* W82S-003: "Section N of 16" from this file's own section order (Popular and Catering left out) */var w82=mk("p","small muted w82s-pos","Section "+(i+1)+" of "+SECS.length);w82.id="w82sPos";w82.style.cssText="flex-basis:100%;margin:0";d.appendChild(w82);/* /W82S-003 *//* W83S-003: an "All sections" link beside the position goes to the full menu's section list (/menu/#chips) */var w83=mk("a","w83s-all","All sections");w83.id="w83sAll";w83.href="/menu/#chips";w83.style.cssText="display:inline-block;padding:10px 6px;margin:-10px 0";w82.appendChild(document.createTextNode(" \u00b7 "));w82.appendChild(w83);/* /W83S-003 */
 function ln(s,rel,t){var a=mk("a","btn alt",t);a.href="/menu/s/"+s[0]+"/";a.rel=rel;return a}
 d.appendChild(i>0?ln(SECS[i-1],"prev","\u2190 "+SECS[i-1][1]):mk("span"));if(i+1<SECS.length)d.appendChild(ln(SECS[i+1],"next",SECS[i+1][1]+" \u2192"));
 var c=mn.querySelector("p.dgcta");if(c)c.parentNode.insertBefore(d,c);else(mn.querySelector(".wrap")||mn).appendChild(d)}
/* W36S-002 */
function rows(){return [].slice.call(document.querySelectorAll("main li.dish")).filter(function(li){return !li.closest("#mlItems,#hhPicksList,#mlsItems")})}
function act(){var v=on();return v.length?v:get()}
function fitNames(a){var seen={},out=[];rows().forEach(function(li){if(fit(li,a)!=="f")return;var d=li.querySelector(".dname"),n=d?d.textContent.replace(/\s+/g," ").trim():"";if(n&&!seen[n]){seen[n]=1;out.push(n)}});return out}
var sb=null;function shareBar(){if(!LIST||sb)return;if(!rows().length)return;var h1=document.querySelector("main h1");if(!h1)return;var an=$("w34sBar")||document.querySelector("main .w27pr")||h1;
 sb=mk("div","w36s-bar");sb.id="w36sBar";var btn=mk("button","btn ghost w36s-btn","Share what fits (est.)");btn.type="button";btn.id="w36sShare";var s=mk("span","small muted w36s-st");s.id="w36sSt";s.setAttribute("role","status");sb.appendChild(btn);sb.appendChild(s);an.parentNode.insertBefore(sb,an.nextSibling);
 function paint(){var a=act(),n=a.length?fitNames(a).length:0;sb.hidden=!(a.length&&n);btn.setAttribute("aria-label","Share the "+n+" dishes on this page that fit, leaving out "+names(a)+" (estimated)")}
 paint();document.addEventListener("change",function(){setTimeout(paint,200)});window.addEventListener("storage",function(){setTimeout(paint,200)});
 btn.addEventListener("click",function(){var a=act(),l=fitNames(a);if(!a.length||!l.length){paint();return}
  var title=h1.textContent.replace(/\s+/g," ").trim(),u=location.origin+P+"?free="+a.join(","),
  txt="India Grill Express, "+title+": "+l.length+" "+(l.length===1?"dish":"dishes")+" without "+names(a)+" (estimated)\n"+l.map(function(x){return"\u2022 "+x}).join("\n")+"\n\n"+CALL+"\n"+u,
  done="You share it yourself; nothing was sent by this site.";
  function fall(){var t=sb.querySelector(".w36s-ta");if(!t){t=mk("textarea","w36s-ta");t.readOnly=true;t.setAttribute("aria-label","Dishes that fit, ready to copy");sb.insertBefore(t,s)}t.value=txt;t.focus();t.select();s.textContent="Copy this list ("+l.length+" dishes, estimated). "+done}
  function copy(){try{if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(txt).then(function(){s.textContent="Copied "+l.length+" dish names that leave out "+names(a)+" (estimated), with the call-first note and a link. Paste it into a text or email. "+done},fall);else fall()}catch(e){fall()}}
  var coarse=window.matchMedia&&window.matchMedia("(pointer:coarse)").matches;
  if(coarse&&navigator.share){navigator.share({title:"India Grill Express: dishes that fit (estimated)",text:txt}).then(function(){s.textContent="Shared "+l.length+" dish names (estimated). "+done},function(e){if(e&&e.name==="AbortError")s.textContent="Not shared.";else copy()})}else copy()})}
function go(){chips();pn();shareBar();if(MENU){document.addEventListener("change",function(){setTimeout(chips,400)});document.addEventListener("click",function(){setTimeout(chips,450)});window.addEventListener("storage",function(){setTimeout(chips,400)});setTimeout(chips,450)}}
if(document.readyState==="complete")setTimeout(go,120);else window.addEventListener("load",function(){setTimeout(go,150)})})();
