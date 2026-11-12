/* W39S w39s.js (IGE site). Reads ONLY the ticks already on the page (the Leave out box or the free-of builder) and the builder's own baked dish data. Nothing is saved, changed or sent by this file. All allergen info is estimated from each recipe.
W39S-001 Menu, section pages, Popular, diet guides (phones): "Open this list in the IGE app" hands the ticked list to the app as ige://menu?free=... (the app asks before it replaces its own Free of list); if the app is not on the phone, app-open.js says so and offers the call link.
W39S-002 Free-of builder (/menu/allergens/free-of/): a "Jump to a section" row with each section's fit count follows the ticks and ?x=, plus the sections where nothing fits by estimate.
W39S-003 Free-of builder: "See these on the full menu" opens /menu/?free=... with the same ticks, and the same app hand-off on phones. */
(function(){if(window.__w39s)return;window.__w39s=1;var N={dairy:"dairy",gluten:"gluten","tree-nuts":"tree nuts",peanuts:"peanuts",egg:"egg",soy:"soy",fish:"fish",shellfish:"shellfish"},
CALL="Estimated from each recipe, not lab-tested; shared equipment. Call (562) 991-4320 first if you have an allergy.",
NOTE="If the IGE app is not on this phone, nothing opens. To order, call ",$=function(i){return document.getElementById(i)};
function ok(v){return Object.prototype.hasOwnProperty.call(N,v)}
function names(a){return a.map(function(v){return N[v]}).join(", ")}
function mk(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x)e.textContent=x;return e}
function ticks(r){return [].slice.call(r.querySelectorAll("input[type=checkbox]")).filter(function(c){return ok(c.value)&&c.checked}).map(function(c){return c.value})}
function slug(s){return "w39s-"+s.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}
if(!$("w39sCss")){var st=mk("style");st.id="w39sCss";st.textContent=".w39s-app{margin:.5rem 0}.w39s-app .btn{min-height:44px;display:inline-flex;align-items:center}.w39s-app .appnote{margin:.4rem 0 0}.w39s-act{display:flex;flex-wrap:wrap;gap:.5rem;align-items:center;margin:.5rem 0}.w39s-act>a.btn{min-height:44px;display:inline-flex;align-items:center}.w39s-jump{display:flex;flex-wrap:wrap;gap:.4rem;margin:.4rem 0 .8rem;padding:0;list-style:none}.w39s-jump a{display:inline-flex;align-items:center;min-height:44px;padding:0 .8rem;border:1px solid currentColor;border-radius:999px;text-decoration:none}.w39s-none{margin:.2rem 0 .8rem}#foOut h2{scroll-margin-top:1rem}";document.head.appendChild(st)}
function phone(){try{return window.matchMedia("(pointer: coarse)").matches}catch(e){return false}}
function opener(){if(document.querySelector('script[src="/app-open.js"]'))return;var s=mk("script");s.src="/app-open.js";s.defer=true;document.head.appendChild(s)}
function app(v,id){var w=$(id);if(!v.length||!phone()){if(w)w.hidden=true;return null}
 if(!w){w=mk("div","w39s-app");w.id=id;var a=mk("a","btn ghost","Open this list in the IGE app");a.setAttribute("data-appnote",NOTE);w.appendChild(a);w.appendChild(mk("p","small muted w39s-why"))}
 w.hidden=false;var l=w.querySelector("a");l.href="ige://menu?free="+v.join(",");l.setAttribute("aria-label","Open the IGE app leaving out "+names(v));
 w.querySelector(".w39s-why").textContent="Leaving out "+names(v)+". The app asks before it replaces its own Free of list. Estimates only.";opener();return w}
function box(){return document.querySelector("fieldset.malg")||$("leaveOut")}
function menu(){var b=box();if(!b)return;var w=app(ticks(b),"w39sApp");if(w&&!w.parentNode)b.parentNode.insertBefore(w,b.nextSibling)}
function finder(){var f=$("foPick"),out=$("foOut"),dd=$("foData");if(!f||!out||!dd)return;var x=ticks(f),D;try{D=JSON.parse(dd.textContent)}catch(e){return}
 var J=$("w39sJump");if(!J){J=mk("nav");J.id="w39sJump";J.setAttribute("aria-label","Jump to a menu section");out.parentNode.insertBefore(J,out)}
 J.textContent="";var hs=[].slice.call(out.querySelectorAll("h2"));
 if(!x.length||!hs.length){J.hidden=true}else{J.hidden=false;J.appendChild(mk("p","small muted","Jump to a section ("+hs.length+(hs.length===1?" has":" have")+" dishes that fit, by estimate):"));var ul=mk("ul","w39s-jump");
  hs.forEach(function(h){var t=(h.firstChild&&h.firstChild.nodeType===3?h.firstChild.textContent:h.textContent).trim(),c=h.querySelector("span"),id=slug(t);h.id=id;h.tabIndex=-1;
   var li=mk("li"),a=mk("a",null,t+(c?" "+c.textContent.trim():""));a.href="#"+id;li.appendChild(a);ul.appendChild(li)});J.appendChild(ul);
  var none=D.s.filter(function(sec){return !sec[1].some(function(d){return x.every(function(k){return d[2].indexOf(k)<0})})}).map(function(sec){return sec[0]});
  if(none.length)J.appendChild(mk("p","small muted w39s-none","No dish fits by estimate in: "+none.join(", ")+" (every dish there with an estimate lists one of "+names(x)+"). "+CALL))}
 var A=$("w39sFoAct"),cnt=$("foCount");if(!A){A=mk("div","w39s-act");A.id="w39sFoAct";var m=mk("a","btn ghost","See these on the full menu");A.appendChild(m);(cnt||out).parentNode.insertBefore(A,cnt?cnt.nextSibling:out)}
 A.hidden=!x.length;var g=A.querySelector("a");g.href="/menu/?free="+x.join(",");g.setAttribute("aria-label","See the full menu leaving out "+names(x)+" (estimated)");
 var w=app(x,"w39sFoApp");if(w&&w.parentNode!==A)A.appendChild(w)}
var tm=0;function all(){tm=0;menu();finder()}function soon(){if(!tm)tm=setTimeout(all,80)}
document.addEventListener("change",soon,true);window.addEventListener("storage",soon);
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",soon);else soon();setTimeout(soon,700);setTimeout(soon,1800)})();
