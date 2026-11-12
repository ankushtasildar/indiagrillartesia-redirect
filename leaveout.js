/* W26S-002 + W27S: "Leave out (estimated)" on section pages, diet guides and dish-page link lists; Hides dishes whose own estimated allergens include a ticked item; dishes with no allergen data hide too. */
(function(){var ps=document.getElementById("w27pstat");
var box=document.getElementById("leaveOut");if(!box)return;var rows=[].slice.call(document.querySelectorAll("li.dish"));if(!rows.length)return;box.hidden=false;
var st=document.getElementById("loStatus"),cbs=[].slice.call(box.querySelectorAll("input[type=checkbox]"));
function run(){var on=cbs.filter(function(c){return c.checked;}).map(function(c){return c.value;}),shown=0;
rows.forEach(function(li){var a=li.getAttribute("data-alg");var hide=on.length>0&&(a===null||on.some(function(v){return (" "+a+" ").indexOf(" "+v+" ")>=0;}));li.hidden=hide;if(!hide)shown++;});
[].slice.call(document.querySelectorAll("main section")).forEach(function(s){var ls=s.querySelectorAll("li.dish");if(!ls.length)return;s.hidden=![].some.call(ls,function(li){return !li.hidden;});});
if(ps)ps.textContent=on.length?"Leaving out (estimated): "+cbs.filter(function(c){return c.checked;}).map(function(c){return c.parentNode.textContent.trim();}).join(", ")+". "+shown+" of "+rows.length+" dishes shown.":"";
st.textContent=on.length?shown+" of "+rows.length+" dishes shown. Estimated from each recipe, not lab-tested; shared equipment. Call (562) 991-4320 first if you have an allergy.":"";}
cbs.forEach(function(c){c.addEventListener("change",run);});})();
/* W30S-BEGIN: load /freeof.js (remembered free-of list, on device only) */(function(){var s=document.createElement("script");s.src="/freeof.js";s.defer=true;document.body.appendChild(s)})();/* W30S-END */
/* W32S-BEGIN: load /w32s.js (on-device only) */(function(){if(document.querySelector('script[src="/w32s.js"]'))return;var s=document.createElement("script");s.src="/w32s.js";s.defer=true;document.head.appendChild(s)})();/* W32S-END */
/* W34S-BEGIN: load /w34s.js (on-device only) */(function(){if(document.querySelector('script[src="/w34s.js"]'))return;var s=document.createElement("script");s.src="/w34s.js";s.defer=true;document.head.appendChild(s)})();/* W34S-END */
/* W40S-BEGIN */(function(d){if(d.querySelector('script[src="/w40s.js"]'))return;var s=d.createElement("script");s.src="/w40s.js";s.defer=1;d.head.appendChild(s)})(document);/* W40S-END */
/* W39S-BEGIN: load /w39s.js (on-device only) */(function(){if(document.querySelector('script[src="/w39s.js"]'))return;var s=document.createElement("script");s.src="/w39s.js";s.defer=true;document.head.appendChild(s)})();/* W39S-END */
/* W38S-BEGIN: load /w38s.js (on-device only) */(function(){if(document.querySelector('script[src="/w38s.js"]'))return;var s=document.createElement("script");s.src="/w38s.js";s.defer=true;document.head.appendChild(s)})();/* W38S-END */
/* W37S-BEGIN: load /w37s.js (on-device only) */(function(){if(document.querySelector('script[src="/w37s.js"]'))return;var s=document.createElement("script");s.src="/w37s.js";s.defer=true;document.head.appendChild(s)})();/* W37S-END */
/* W36S-BEGIN: load /w36s.js (on-device only) */(function(){if(document.querySelector('script[src="/w36s.js"]'))return;var s=document.createElement("script");s.src="/w36s.js";s.defer=true;document.head.appendChild(s)})();/* W36S-END */
/* W35S-BEGIN: load /w35s.js (on-device only) */(function(){if(document.querySelector('script[src="/w35s.js"]'))return;var s=document.createElement("script");s.src="/w35s.js";s.defer=true;document.head.appendChild(s)})();/* W35S-END */
/* W33S-BEGIN: load /w33s.js (on-device only) */(function(){if(document.querySelector('script[src="/w33s.js"]'))return;var s=document.createElement("script");s.src="/w33s.js";s.defer=true;document.head.appendChild(s)})();/* W33S-END */
