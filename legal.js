/* W26S-003: Privacy/Terms sticky contents bar + scroll-spy. No third parties; works without it (the contents list stays). */
(function(){var toc=document.getElementById("toc");if(!toc||!("IntersectionObserver" in window))return;
var links=[].slice.call(toc.querySelectorAll('a[href^="#"]')),map={},heads=[];
links.forEach(function(a){var h=document.getElementById(decodeURIComponent(a.getAttribute("href").slice(1)));if(h){map[h.id]=a;heads.push(h);}});
if(!heads.length)return;
var bar=document.createElement("div");bar.className="tocbar";bar.hidden=true;
bar.innerHTML='<a href="#toc" class="tocbtn">Contents</a><span class="tocnow" aria-live="off"></span><a href="#main" class="tocbtn">Top</a>';
document.body.appendChild(bar);var now=bar.querySelector(".tocnow");
function set(id){links.forEach(function(a){a.removeAttribute("aria-current");a.classList.remove("on");});var a=map[id];if(a){a.setAttribute("aria-current","location");a.classList.add("on");now.textContent=a.textContent;}}
function pick(){var cur=null;for(var i=0;i<heads.length;i++){if(heads[i].getBoundingClientRect().top<=120)cur=heads[i];}set(cur?cur.id:null);}
new IntersectionObserver(function(es){es.forEach(function(e){bar.hidden=e.isIntersecting||e.boundingClientRect.top>0;});}).observe(toc);
var t=0;window.addEventListener("scroll",function(){if(t)return;t=requestAnimationFrame(function(){t=0;pick();});},{passive:true});pick();
})();
/* W76S-002: on a 320 px phone the Terms contents link "4. Food allergies and dietary information" kept the site nav's nowrap and the whole page scrolled 6 px sideways. Let contents links wrap; words unchanged. W76S-004: the contents list showed every number twice ("1. 1. Ordering": the list's own counter plus the heading's number); drop the list counter, the heading words keep theirs. */(function(){var s=document.createElement("style");s.textContent=".toc a{white-space:normal}.toc ol{list-style:none;padding-left:0}";document.head.appendChild(s)})();
/* W77S-002: on phones under 600 px the bar's current-section name was cut to one line ("4. Food allergies and dietar…"); let it use up to two lines inside the 44 px bar, so the whole heading reads; Contents and Top stay where they were and stay tappable. Words unchanged. */(function(){var s=document.createElement("style");s.textContent="@media(max-width:599px){.tocnow{white-space:normal;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;line-height:1.15;font-size:.85rem;width:max-content;max-width:52vw}}";document.head.appendChild(s)})();
/* W78S-001: under 300 px the longest Terms section name still stopped mid-heading on line 2 of the sticky contents bar; let the name use up to three lines in slightly smaller type and a tighter gap, still inside the 44 px buttons, so the whole name reads. Words unchanged. */(function(){var s=document.createElement("style");s.textContent="@media(max-width:299px){.tocbar{gap:6px}.tocnow{-webkit-line-clamp:3;font-size:.76rem;line-height:1.12}}";document.head.appendChild(s)})();/* W78S-END */
/* W79S-002: load /w79s.js (section N of M on the contents bar) */(function(){if(document.querySelector('script[src="/w79s.js"]'))return;var s=document.createElement("script");s.src="/w79s.js";s.defer=true;document.head.appendChild(s)})();/* W79S-END */
/* W32S-BEGIN: load /w32s.js (on-device only) */(function(){if(document.querySelector('script[src="/w32s.js"]'))return;var s=document.createElement("script");s.src="/w32s.js";s.defer=true;document.head.appendChild(s)})();/* W32S-END */
/* W34S-BEGIN: load /w34s.js (on-device only) */(function(){if(document.querySelector('script[src="/w34s.js"]'))return;var s=document.createElement("script");s.src="/w34s.js";s.defer=true;document.head.appendChild(s)})();/* W34S-END */
/* W33S-BEGIN: load /w33s.js (on-device only) */(function(){if(document.querySelector('script[src="/w33s.js"]'))return;var s=document.createElement("script");s.src="/w33s.js";s.defer=true;document.head.appendChild(s)})();/* W33S-END */
