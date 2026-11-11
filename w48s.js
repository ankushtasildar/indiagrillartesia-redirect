/* W48S (IGE site): "What the dish tags mean" key on section, diet-guide and popular pages. Reads only this page; no network, no storage; nothing is sent. */
(function(w,d){
var KEY=[["pop","Popular","Marked Popular on our menu."],["chef","Chef\u2019s pick","One of the chef\u2019s picks."],["veg","Veg","Vegetarian."],["cal","Calories (est.)","Estimated calories, not lab-tested."],["alg","Contains \u2026 (est.)","Allergens estimated from each recipe."],["alg unk","Allergens not confirmed","No estimate yet; please ask before you order."],["out","Sold out today","Marked sold out in the app today."]];
var W48S={
 page:function(p){return /^\/menu\/(s\/[a-z0-9-]+|popular|vegetarian|vegan|gluten-free|high-protein)\/?(index\.html)?$/.test(p||"")},
 cls:function(c){return String(c||"").replace(/^\s*tag\b/,"").replace(/\s+/g," ").trim()},
 rows:function(counts){return KEY.filter(function(k){return counts[k[0]]}).map(function(k){return {cls:k[0],tag:k[1],means:k[2],n:counts[k[0]]}})}
};
w.W48S=W48S;
if(!d||!d.querySelector||w.W48S_ON||!W48S.page(location.pathname)||d.querySelector(".w47s-key,.w48s-key"))return;w.W48S_ON=1;
function el(t,c,x){var e=d.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
var main=d.getElementById("main")||d.querySelector("main");if(!main)return;
var seen={},counts={};
[].forEach.call(main.querySelectorAll("ul.dishes li, li.dish"),function(li){var a=li.querySelector('a[href^="/menu/d/"]');var id=li.getAttribute("data-id")||(a&&a.getAttribute("href"))||"";if(!id||seen[id])return;seen[id]=1;
 var cl={};[].forEach.call(li.querySelectorAll(".tag"),function(t){var k=W48S.cls(t.className);if(k&&!cl[k]){cl[k]=1;counts[k]=(counts[k]||0)+1}})});
var rows=W48S.rows(counts);if(!rows.length)return;
var css=el("style");css.id="w48s-css";css.textContent=".w48s-key{margin:.3rem 0 .8rem;font-size:var(--fs-sm,14px)}.w48s-key summary{min-height:44px;line-height:44px;display:list-item;cursor:pointer}.w48s-key ul{margin:.2rem 0 .4rem;padding-left:1.1rem}.w48s-key li{margin:.25rem 0}.w48s-key .tag{margin-right:.35rem}@media print{.w48s-key{display:none!important}}";d.head.appendChild(css);
var dt=el("details","w48s-key"),ul=el("ul");dt.appendChild(el("summary",null,"What the dish tags mean"));
rows.forEach(function(r){var li=el("li");li.appendChild(el("span","tag "+r.cls,r.tag));li.appendChild(d.createTextNode(r.means+" "+r.n+(r.n===1?" dish":" dishes")+" on this page."));ul.appendChild(li)});
dt.appendChild(ul);dt.appendChild(el("p","small muted","Allergens and calories are estimates from each recipe, not lab-tested, and our kitchen shares equipment."));
var at=main.querySelector(".w27s-ag")||main.querySelector(".w26s-note")||main.querySelector("h1");
if(at&&at.parentNode){at.parentNode.insertBefore(dt,at.nextSibling)}
})(typeof window!="undefined"?window:{},typeof document!="undefined"?document:undefined);
/* W99S-BEGIN */(function(d){if(!d||d.querySelector('script[src="/w99s.js"]'))return;var s=d.createElement("script");s.src="/w99s.js";s.defer=1;d.head.appendChild(s)})(typeof document!="undefined"?document:undefined);/* W99S-END */
/* W100S-BEGIN */(function(d){if(!d||d.querySelector('script[src="/w100s.js"]'))return;var s=d.createElement("script");s.src="/w100s.js";s.defer=1;d.head.appendChild(s)})(typeof document!="undefined"?document:undefined);/* W100S-END */
/* W101S-BEGIN */(function(d){if(!d||d.querySelector('script[src="/w101s.js"]'))return;var s=d.createElement("script");s.src="/w101s.js";s.defer=1;d.head.appendChild(s)})(typeof document!="undefined"?document:undefined);/* W101S-END */
/* W102S-BEGIN */(function(d){if(!d||d.querySelector('script[src="/w102s.js"]'))return;var s=d.createElement("script");s.src="/w102s.js";s.defer=1;d.head.appendChild(s)})(typeof document!="undefined"?document:undefined);/* W102S-END */
/* W103S-BEGIN */(function(d){if(!d||d.querySelector('script[src="/w103s.js"]'))return;var s=d.createElement("script");s.src="/w103s.js";s.defer=1;d.head.appendChild(s)})(typeof document!="undefined"?document:undefined);/* W103S-END */
/* W104S-BEGIN */(function(d){if(!d||d.querySelector('script[src="/w104s.js"]'))return;var s=d.createElement("script");s.src="/w104s.js";s.defer=1;d.head.appendChild(s)})(typeof document!="undefined"?document:undefined);/* W104S-END */
/* W115S-BEGIN */(function(d){if(!d||d.querySelector('script[src="/w115s.js"]'))return;var s=d.createElement("script");s.src="/w115s.js";s.defer=1;d.head.appendChild(s)})(typeof document!="undefined"?document:undefined);/* W115S-END */
/* W114S-BEGIN */(function(d){if(!d||d.querySelector('script[src="/w114s.js"]'))return;var s=d.createElement("script");s.src="/w114s.js";s.defer=1;d.head.appendChild(s)})(typeof document!="undefined"?document:undefined);/* W114S-END */
/* W113S-BEGIN */(function(d){if(!d||d.querySelector('script[src="/w113s.js"]'))return;var s=d.createElement("script");s.src="/w113s.js";s.defer=1;d.head.appendChild(s)})(typeof document!="undefined"?document:undefined);/* W113S-END */
/* W112S-BEGIN */(function(d){if(!d||d.querySelector('script[src="/w112s.js"]'))return;var s=d.createElement("script");s.src="/w112s.js";s.defer=1;d.head.appendChild(s)})(typeof document!="undefined"?document:undefined);/* W112S-END */
/* W111S-BEGIN */(function(d){if(!d||d.querySelector('script[src="/w111s.js"]'))return;var s=d.createElement("script");s.src="/w111s.js";s.defer=1;d.head.appendChild(s)})(typeof document!="undefined"?document:undefined);/* W111S-END */
/* W110S-BEGIN */(function(d){if(!d||d.querySelector('script[src="/w110s.js"]'))return;var s=d.createElement("script");s.src="/w110s.js";s.defer=1;d.head.appendChild(s)})(typeof document!="undefined"?document:undefined);/* W110S-END */
/* W109S-BEGIN */(function(d){if(!d||d.querySelector('script[src="/w109s.js"]'))return;var s=d.createElement("script");s.src="/w109s.js";s.defer=1;d.head.appendChild(s)})(typeof document!="undefined"?document:undefined);/* W109S-END */
/* W108S-BEGIN */(function(d){if(!d||d.querySelector('script[src="/w108s.js"]'))return;var s=d.createElement("script");s.src="/w108s.js";s.defer=1;d.head.appendChild(s)})(typeof document!="undefined"?document:undefined);/* W108S-END */
/* W107S-BEGIN */(function(d){if(!d||d.querySelector('script[src="/w107s.js"]'))return;var s=d.createElement("script");s.src="/w107s.js";s.defer=1;d.head.appendChild(s)})(typeof document!="undefined"?document:undefined);/* W107S-END */
/* W106S-BEGIN */(function(d){if(!d||d.querySelector('script[src="/w106s.js"]'))return;var s=d.createElement("script");s.src="/w106s.js";s.defer=1;d.head.appendChild(s)})(typeof document!="undefined"?document:undefined);/* W106S-END */
/* W105S-BEGIN */(function(d){if(!d||d.querySelector('script[src="/w105s.js"]'))return;var s=d.createElement("script");s.src="/w105s.js";s.defer=1;d.head.appendChild(s)})(typeof document!="undefined"?document:undefined);/* W105S-END */
