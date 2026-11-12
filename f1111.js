/* F1111 (IGE site, /menu/): one live filter bar. Diet chips (the dishes' own diet tags) + free-of chips (each dish's own estimated allergens; dishes with no confirmed estimate are left out), combined with AND, a live count on every chip, Clear all, and the selection in the URL (?f=vegan,free-of-peanuts) so it can be shared. It drives the menu's existing filter inputs, so filtering is the same as before; without JavaScript each chip is a link to the existing diet or free-of page. */
(function(w,d){var bar=d.getElementById("f11"),menu=d.getElementById("menu");if(!bar||!menu)return;
var chips=[].slice.call(bar.querySelectorAll("a.f11c[data-f]")),clr=d.getElementById("f11x"),cv=d.getElementById("f11cv"),
D={"vegetarian":"veg","vegan":"vegan","gluten-free":"gluten-free-friendly","high-protein":"high-protein"},A=/^free-of-([a-z-]+)$/;
function spec(k){if(D[k])return{t:"d",v:D[k]};var m=A.exec(k);return m?{t:"a",v:m[1]}:null}
function box(k){var s=spec(k);return s?d.querySelector((s.t==="d"?".mdiet":".malg")+' input[value="'+s.v+'"]'):null}
function key(c){return c.getAttribute("data-f")}
function ev(el){var e;try{e=new Event("change",{bubbles:true})}catch(x){e=d.createEvent("Event");e.initEvent("change",true,true)}el.dispatchEvent(e)}
function sel(){return chips.map(key).filter(function(k){var b=box(k);return b&&b.checked})}
function fits(li,ks){var dd=" "+(li.getAttribute("data-diet")||(li.getAttribute("data-veg")==="1"?"veg":""))+" ",al=li.hasAttribute("data-alg")?" "+li.getAttribute("data-alg")+" ":null;
 return ks.every(function(k){var s=spec(k);if(!s)return true;if(s.t==="d")return dd.indexOf(" "+s.v+" ")>=0;return al!==null&&al.indexOf(" "+s.v+" ")<0})}
function rows(){return [].filter.call(menu.querySelectorAll(".msec .dish"),function(li){var s=li.closest(".msec");return !(s&&s.classList.contains("mpop"))})}
function url(ks){try{var p=new URLSearchParams(location.search);if(ks.length)p.set("f",ks.join(","));else p.delete("f");p.delete("free");var q=p.toString().replace(/%2C/g,",");var u=location.pathname+(q?"?"+q:"")+location.hash;if(u!==location.pathname+location.search+location.hash)history.replaceState(history.state,"",u)}catch(e){}}
var busy=0;function paint(){busy=0;var ks=sel(),rs=rows(),alg=false;
 chips.forEach(function(c){var k=key(c),on=ks.indexOf(k)>=0,want=on?ks:ks.concat([k]),n=0;rs.forEach(function(li){if(fits(li,want))n++});
  c.setAttribute("aria-pressed",on?"true":"false");c.classList.toggle("f11z",!on&&n===0);var nn=c.querySelector(".f11n");if(nn&&nn.textContent!==String(n))nn.textContent=String(n);
  var b0=c.getAttribute("data-label")||c.getAttribute("aria-label")||c.firstChild.textContent.trim();c.setAttribute("data-label",b0);c.setAttribute("aria-label",b0+", "+n+(n===1?" dish":" dishes"));if(on&&spec(k).t==="a")alg=true});
 if(clr){clr.classList.toggle("on",ks.length>0);clr.setAttribute("aria-hidden",ks.length?"false":"true");clr.tabIndex=ks.length?0:-1}
 if(cv)cv.hidden=!alg;d.documentElement.classList.remove("f11alg");url(ks)}
function soon(){if(!busy){busy=1;(w.requestAnimationFrame||setTimeout)(paint)}}
function set(k,v){var b=box(k);if(b&&b.checked!==v){b.checked=v;ev(b)}}
chips.forEach(function(c){c.setAttribute("role","button");c.addEventListener("click",function(e){var b=box(key(c));if(!b)return;e.preventDefault();set(key(c),!b.checked);paint()})});
if(clr)clr.addEventListener("click",function(){chips.forEach(function(c){set(key(c),false)});paint();if(chips[0])chips[0].focus()});
d.addEventListener("change",function(e){var t=e.target;if(t&&t.closest&&t.closest(".mdiet,.malg"))soon()},true);
if(w.MutationObserver)new MutationObserver(soon).observe(menu,{childList:true});
var m=/[?&]f=([^&#]*)/.exec(location.search);if(m){var want=[];try{want=decodeURIComponent(m[1]).split(",")}catch(e){}chips.forEach(function(c){set(key(c),want.indexOf(key(c))>=0)});var t=d.querySelector(".mdiet input:checked,.malg input:checked");if(t)ev(t)}
paint()})(window,document);
