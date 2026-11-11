/* W30S freeof.js (loaded by leaveout.js): W30S-001 remembers your free-of choice on this device only (localStorage "ige-freeof-v1"; nothing is sent anywhere) and pre-ticks Leave out filters; W30S-002 dish-page verdict for your list; W30S-004 copy the built list as text. All allergen info is estimated. */
(function(){var K="ige-freeof-v1",N={dairy:"dairy",gluten:"gluten","tree-nuts":"tree nuts",peanuts:"peanuts",egg:"egg",soy:"soy",fish:"fish",shellfish:"shellfish"},
CALL="Estimated from each recipe, not lab-tested; shared equipment. Call (562) 991-4320 first if you have an allergy.",dp=document.getElementById("dpTools"),dv=null;
function ok(v){return Object.prototype.hasOwnProperty.call(N,v)}
function get(){try{var a=JSON.parse(localStorage.getItem(K)||"[]");return Array.isArray(a)?a.filter(ok):[]}catch(e){return[]}}
function put(a){try{if(a.length)localStorage.setItem(K,JSON.stringify(a));else localStorage.removeItem(K)}catch(e){}}
function names(a){return a.map(function(v){return N[v]}).join(", ")}
function ticks(r){return [].slice.call(r.querySelectorAll("input[type=checkbox]")).filter(function(c){return ok(c.value)})}
function on(cs){return cs.filter(function(c){return c.checked}).map(function(c){return c.value})}
function mk(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x)e.textContent=x;return e}
function ev(el){var e;try{e=new Event("change",{bubbles:true})}catch(x){e=document.createEvent("Event");e.initEvent("change",true,true)}el.dispatchEvent(e)}
function forget(cb){var b=mk("button","linkbtn","Forget my list");b.type="button";b.addEventListener("click",cb);return b}
var IN={};for(var k in N)if(ok(k))IN[N[k]]=k;
function own(){var c=document.querySelector("section.dpn");if(!c)return null;var h=[].filter.call(c.querySelectorAll("h3"),function(x){return /^Allergens/.test(x.textContent)})[0];if(!h)return null;
 var r={unk:false,a:[]};for(var e=h.nextElementSibling;e&&e.tagName!=="H3";e=e.nextElementSibling){if(/Not confirmed for this dish yet/.test(e.textContent))r.unk=true;[].forEach.call(e.querySelectorAll(".tag.al"),function(s){var v=IN[s.textContent.trim().toLowerCase()];if(v)r.a.push(v)})}return r}
function dish(){if(!dp)return;var me=own();if(!me)return;var a=get();
 if(!dv){dv=mk("p","card w30s-fit");dv.id="w30sFit";dv.setAttribute("role","status");dp.parentNode.insertBefore(dv,dp.nextSibling)}
 dv.textContent="";if(!a.length){dv.hidden=true;return}dv.hidden=false;
 var hit=a.filter(function(v){return me.a.indexOf(v)>=0});dv.appendChild(mk("strong",null,"Your free-of list ("+names(a)+"): "));
 dv.appendChild(document.createTextNode(me.unk?"this dish has no confirmed allergen estimate yet, so we can't say. ":hit.length?"by its estimate this dish contains "+names(hit)+". ":"by its estimate this dish lists none of them. "));
 var mh=document.getElementById("mH");if(mh){var ls=[].slice.call(mh.parentNode.querySelectorAll("li.dish")),vis=ls.filter(function(li){return !li.hidden}).length,t="\u201c"+mh.textContent.trim()+"\u201d";
  if(ls.length)dv.appendChild(document.createTextNode(vis?"Below, "+vis+" of the "+ls.length+" dishes under "+t+" fit your list. ":"None of the "+ls.length+" dishes under "+t+" fit your list. "))}
 var l=mk("a",null,"See every dish that fits");l.href="/menu/allergens/free-of/?x="+a.join(",");dv.appendChild(l);dv.appendChild(mk("span","small muted"," · "+CALL))}
var mem=get(),fp=document.getElementById("foPick");
if(fp&&!fp.hidden){var fcs=ticks(fp),fn=mk("p","small muted w30s-mem");fn.setAttribute("role","status");fp.parentNode.insertBefore(fn,fp.nextSibling);
 var fpaint=function(){var a=get();fn.textContent="";if(!a.length){fn.textContent="Your ticks are remembered on this device only (nothing is sent), so dish pages and Leave out filters start with them.";return}
  fn.appendChild(document.createTextNode("Remembered on this device only: "+names(a)+". Dish pages and Leave out filters use it. "));
  fn.appendChild(forget(function(){put([]);fcs.forEach(function(c){c.checked=false});ev(fp);fpaint()}))};
 if(!/[?&]x=/.test(location.search)&&mem.length){fcs.forEach(function(c){c.checked=mem.indexOf(c.value)>=0});ev(fp)}
 fp.addEventListener("change",function(e){if(e.isTrusted)put(on(fcs));fpaint()});fpaint();
 var pb=document.getElementById("foPrint"),out=document.getElementById("foOut");
 if(pb&&out&&navigator.clipboard&&navigator.clipboard.writeText){var cb=mk("button","btn alt w30s-copy","Copy as text"),cs=mk("span","small muted");cb.type="button";cs.setAttribute("role","status");pb.parentNode.insertBefore(cb,pb.nextSibling);pb.parentNode.insertBefore(cs,cb.nextSibling);
  cb.addEventListener("click",function(){var x=on(fcs);function say(m){cs.textContent="";setTimeout(function(){cs.textContent=" "+m},30)}
   if(!x.length){say("Tick at least one allergen first.");return}
   var ln=["India Grill Express, Artesia: dishes whose estimate lists none of "+names(x)+" (estimated)"];
   [].slice.call(out.querySelectorAll("h2")).forEach(function(h){var ul=h.nextElementSibling;if(!ul)return;ln.push((h.firstChild?h.firstChild.textContent:"").trim()+": "+[].slice.call(ul.querySelectorAll("a")).map(function(a){return a.textContent}).join(", "))});
   ln.push(CALL);ln.push(location.href);
   navigator.clipboard.writeText(ln.join("\n")).then(function(){say("Copied. Paste it into a text or a note.")},function(){say("Copying didn't work in this browser.")})})}}
var lo=document.getElementById("leaveOut");
if(lo&&!lo.hidden){var lcs=ticks(lo),lnote=mk("p","small muted w30s-mem");lo.appendChild(lnote);
 var lpaint=function(){var a=get();lnote.textContent="";if(!a.length){lnote.appendChild(document.createTextNode("Ticks here are remembered on this device only, for other pages too. "));var b=mk("a",null,"Build a free-of list");b.href="/menu/allergens/free-of/";lnote.appendChild(b);return}
  lnote.appendChild(document.createTextNode("Your saved list ("+names(a)+") is remembered on this device only. "));
  lnote.appendChild(forget(function(){put([]);lcs.forEach(function(c){if(c.checked){c.checked=false;ev(c)}});lpaint();dish()}))};
 if(mem.length&&!on(lcs).length){var hit=false;lcs.forEach(function(c){if(mem.indexOf(c.value)>=0){c.checked=true;hit=true;ev(c)}});if(hit)lo.open=true}
 lcs.forEach(function(c){c.addEventListener("change",function(e){if(e.isTrusted){put(on(lcs));dish()}lpaint()})});lpaint()}
dish()})();
