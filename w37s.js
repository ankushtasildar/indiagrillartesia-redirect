/* W37S w37s.js (IGE site). Reads ONLY what this device already saved (localStorage "ige-freeof-v1") and the ticks in the page's own Leave out box, plus each dish's estimated allergens already on the page. Nothing is saved, changed or sent by this file. All allergen info is estimated from each recipe.
W37S-001 Section pages, Popular, diet guides and dish-page lists: when the Leave out ticks on screen differ from the saved list (e.g. a shared ?free= link), each dish's fit mark and the section's "N of M fit" line follow the view on screen ("Fits this view (est.)"); the saved list is untouched.
W37S-002 /menu/: "Share what fits (est.)" for the whole menu, grouped by section (share sheet on phones, copy on computers; the person shares it).
W37S-003 /menu/: the same bar can share one section's fitting dishes with a link to that section page (?free=). Popular and Catering are left out. */
(function(){if(window.__w37s)return;window.__w37s=1;var K="ige-freeof-v1",N={dairy:"dairy",gluten:"gluten","tree-nuts":"tree nuts",peanuts:"peanuts",egg:"egg",soy:"soy",fish:"fish",shellfish:"shellfish"},
CALL="Estimated from each recipe, not lab-tested; shared equipment. Call (562) 991-4320 first if you have an allergy.",P=location.pathname,$=function(i){return document.getElementById(i)};
function ok(v){return Object.prototype.hasOwnProperty.call(N,v)}
function get(){try{var a=JSON.parse(localStorage.getItem(K)||"[]");return Array.isArray(a)?a.filter(ok):[]}catch(e){return[]}}
function names(a){return a.map(function(v){return N[v]}).join(", ")}
function mk(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x)e.textContent=x;return e}
function same(a,b){return a.length===b.length&&a.every(function(x){return b.indexOf(x)>=0})}
function box(){return document.querySelector("fieldset.malg")||$("leaveOut")}
function cbs(){var b=box();return b?[].slice.call(b.querySelectorAll("input[type=checkbox]")).filter(function(c){return ok(c.value)}):[]}
function on(){return cbs().filter(function(c){return c.checked}).map(function(c){return c.value})}
function act(){var v=on();return v.length?v:get()}
function fit(li,a){var v=li.getAttribute("data-alg");if(v===null)return{k:"u",h:[]};var r=v.split(" "),h=a.filter(function(x){return r.indexOf(x)>=0});return{k:h.length?"n":"f",h:h}}
var LIST=/^\/menu\/(s\/[a-z0-9-]+|popular|vegetarian|vegan|gluten-free|high-protein|d\/[a-z0-9-]+)\/?$/.test(P),SEC=/^\/menu\/s\/[a-z0-9-]+\/?$/.test(P),MENU=/^\/menu\/?$/.test(P);
var st=mk("style");st.id="w37sCss";st.textContent=".w37s-view .w33s-mk,.w37s-view #w33sFit{display:none}.w37s-fit{margin:.5rem 0}.w37s-bar{display:flex;flex-wrap:wrap;gap:.5rem;align-items:center;margin:.5rem 0}.w37s-bar select,.w37s-btn{min-height:44px;max-width:100%;font-size:var(--fs-sm,14px)}.w37s-st{flex-basis:100%;font-size:var(--fs-sm,14px)}.w37s-ta{width:100%;min-height:8rem;font-size:var(--fs-sm,14px)}";document.head.appendChild(st);
function rows(){return [].slice.call(document.querySelectorAll("main li.dish")).filter(function(li){return !li.closest("#mlItems,#hhPicksList,#mlsItems")})}
/* W37S-001 */
function vmarks(){if(!LIST)return;[].forEach.call(document.querySelectorAll(".w37s-mk"),function(s){s.parentNode.removeChild(s)});var v=on(),mine=get(),use=v.length>0&&!same(v,mine),p=$("w37sFit");
 document.body.classList.toggle("w37s-view",use);if(!use){if(p)p.parentNode.removeChild(p);return}
 var rs=rows(),f=0,u=0;rs.forEach(function(li){var r=fit(li,v),t=li.querySelector(".tags")||li,s;if(r.k==="f")f++;if(r.k==="u")u++;
  if(r.k==="f")s=mk("span","tag w37s-mk w33s-ok","Fits this view (est.)");else if(r.k==="n")s=mk("span","tag w37s-mk w33s-no","Has "+names(r.h)+" (est.)");else s=mk("span","tag w37s-mk w33s-unk","Can't check: not confirmed");
  s.title="Against the Leave out ticks on screen ("+names(v)+"); your saved list is unchanged. "+CALL;t.appendChild(s)});
 if(!SEC)return;var h1=document.querySelector("main h1"),b=box();if(!h1||!b||!rs.length)return;
 if(!p){p=mk("p","small w37s-fit");p.id="w37sFit";p.setAttribute("role","status");b.parentNode.insertBefore(p,b)}p.textContent="";
 p.appendChild(mk("strong",null,f+" of "+rs.length+" "+h1.textContent.trim()+" dishes fit this view (leaving out "+names(v)+") by estimate"));
 p.appendChild(document.createTextNode((u?"; "+u+" "+(u===1?"is":"are")+" not confirmed":"")+". Your saved list is unchanged. "+CALL))}
/* W37S-002 + W37S-003 */
function secs(){return [].slice.call(document.querySelectorAll("#menu section.msec[id]")).filter(function(s){return s.id!=="popular"&&s.id!=="catering"&&!/mpop/.test(s.className)})}
function secName(s){var h=s.querySelector("h2");return h?h.textContent.replace(/\s+/g," ").trim():s.id}
function fitIn(s,a){var seen={},out=[];[].forEach.call(s.querySelectorAll("li.dish"),function(li){if(fit(li,a).k!=="f")return;var d=li.querySelector(".dname"),n=d?d.textContent.replace(/\s+/g," ").trim():"";if(n&&!seen[n]){seen[n]=1;out.push(n)}});return out}
var bar=null;
function menuBar(){if(!MENU||bar)return;var ss=secs(),anc=$("mstatus");if(!ss.length||!anc)return;
 bar=mk("div","w37s-bar");bar.id="w37sBar";var lab=mk("label","small","Share what fits from ");var sel=mk("select");sel.id="w37sSel";lab.htmlFor="w37sSel";
 sel.appendChild(new Option("the whole menu",""));ss.forEach(function(s){sel.appendChild(new Option(secName(s),s.id))});
 var btn=mk("button","btn ghost w37s-btn","Share what fits (est.)");btn.type="button";btn.id="w37sShare";var stt=mk("span","small muted w37s-st");stt.id="w37sSt";stt.setAttribute("role","status");
 bar.appendChild(lab);bar.appendChild(sel);bar.appendChild(btn);bar.appendChild(stt);anc.parentNode.insertBefore(bar,anc);
 btn.addEventListener("click",function(){var a=act(),id=sel.value,list=id?ss.filter(function(s){return s.id===id}):ss,n=0,parts=[];if(!a.length){paint();return}
  list.forEach(function(s){var l=fitIn(s,a);if(l.length){n+=l.length;parts.push(id?l.join("\n"):secName(s)+": "+l.join(", "))}});
  if(!n){stt.textContent="Nothing in "+(id?secName(list[0]):"the menu")+" fits this list by estimate, so there is nothing to share.";return}
  var u=location.origin+(id?"/menu/s/"+id+"/":"/menu/")+"?free="+a.join(","),title="India Grill Express"+(id?", "+secName(list[0]):" menu"),
  txt=title+": "+n+" "+(n===1?"dish fits":"dishes fit")+" free of "+names(a)+" (estimated)\n\n"+parts.join(id?"\n":"\n\n")+"\n\n"+CALL+"\n"+u,
  told="Ready: "+n+" "+(n===1?"dish":"dishes")+". You choose where it goes; nothing was sent by this site.";
  var coarse=window.matchMedia&&matchMedia("(pointer:coarse)").matches;
  if(coarse&&navigator.share){navigator.share({title:title,text:txt}).then(function(){stt.textContent=told},function(){stt.textContent="Not shared. Nothing was sent by this site."});return}
  function ta(){var t=$("w37sTa");if(!t){t=mk("textarea","w37s-ta");t.id="w37sTa";t.readOnly=true;t.setAttribute("aria-label","Dishes that fit, to copy");bar.appendChild(t)}t.value=txt;t.focus();t.select();stt.textContent="Select and copy the text below. Nothing was sent by this site."}
  if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(txt).then(function(){stt.textContent="Copied "+n+" "+(n===1?"dish":"dishes")+" (with the call-first note and a link). Paste it anywhere; nothing was sent by this site."},ta)}else ta()});
 paint()}
function paint(){if(!bar)return;var a=act();bar.hidden=!a.length;if(!a.length){var t=$("w37sTa");if(t)t.parentNode.removeChild(t);$("w37sSt").textContent=""}}
function all(){vmarks();menuBar();paint()}
function boot(){all();var h=0;function soon(){clearTimeout(h);h=setTimeout(all,300)}document.addEventListener("change",soon);document.addEventListener("click",function(){setTimeout(soon,80)});window.addEventListener("storage",soon);window.addEventListener("pageshow",soon)}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot);else boot()})();
