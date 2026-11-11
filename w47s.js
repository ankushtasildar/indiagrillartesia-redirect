/* W47S (IGE site): popular-picks filter chips and a dish-tag key. Reads only this page; no network, no storage; nothing is sent. */
(function(w,d){
var DEF=[["veg","Vegetarian"],["vegan","Vegan"],["gluten-free-friendly","Gluten-free friendly"],["high-protein","High protein"],["light","Under 500 cal (est.)"]];
var KEY=[["pop","Popular","Marked Popular on our menu."],["chef","Chef\u2019s pick","One of the chef\u2019s picks."],["veg","Veg","Vegetarian."],["cal","Calories (est.)","Estimated calories, not lab-tested."],["alg","Contains \u2026 (est.)","Allergens estimated from each recipe."],["alg unk","Allergens not confirmed","No estimate yet; please ask before you order."],["out","Sold out today","Marked sold out in the app today."]];
var W47S={
 cal:function(t){var m=/(\d{2,4})\s*cal\b/.exec(t||"");return m?+m[1]:null},
 match:function(i,k){if(k==="all")return true;if(k==="light")return i.cal!=null&&i.cal<500;return (" "+(i.diet||"")+" ").indexOf(" "+k+" ")>=0},
 chips:function(items){var r=[{key:"all",label:"All",n:items.length}];DEF.forEach(function(x){var n=items.filter(function(i){return W47S.match(i,x[0])}).length;if(n)r.push({key:x[0],label:x[1],n:n})});return r},
 key:function(counts){return KEY.filter(function(k){return counts[k[0]]}).map(function(k){return {cls:k[0],tag:k[1],means:k[2],n:counts[k[0]]}})}
};
w.W47S=W47S;
if(!d||!d.querySelector||w.W47S_ON)return;w.W47S_ON=1;
function el(t,c,x){var e=d.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
var css=el("style");css.id="w47s-css";css.textContent=".w47s-off{display:none!important}.w47s-chips{display:flex;flex-wrap:wrap;gap:8px;margin:.4rem 0 .6rem}.w47s-chips button{min-height:44px;padding:0 14px;border-radius:999px;border:1px solid var(--line,#ccc);background:var(--bg,#fff);color:inherit;font:inherit;font-size:var(--fs-sm,14px);cursor:pointer}.w47s-chips button[aria-pressed=true]{background:var(--ink,#222);color:var(--bg,#fff);border-color:var(--ink,#222)}.w47s-key{margin:.3rem 0 .8rem;font-size:var(--fs-sm,14px)}.w47s-key summary{min-height:44px;line-height:44px;display:list-item;cursor:pointer}.w47s-key ul{margin:.2rem 0 .4rem;padding-left:1.1rem}.w47s-key li{margin:.25rem 0}.w47s-key .tag{margin-right:.35rem}@media print{.w47s-chips,.w47s-key{display:none!important}}";
d.head.appendChild(css);
/* W47S-001 popular picks: filter chips (counts from this list; calories are estimates) */
var pops=[].slice.call(d.querySelectorAll("section.mpop"));
if(!pops.length&&/^\/menu\/popular\/?(index\.html)?/.test(location.pathname)){var u0=d.querySelector("main ul.dishes");if(u0)pops=[u0.parentNode]}
pops.forEach(function(sec,si){var ul=sec.querySelector("ul.dishes");if(!ul||sec.querySelector(".w47s-chips"))return;
 var lis=[].slice.call(ul.querySelectorAll("li.dish"));if(lis.length<2)return;
 var items=lis.map(function(li){var c=li.querySelector(".tag.cal");return {li:li,diet:(li.getAttribute("data-diet")||"")+(li.getAttribute("data-veg")==="1"||li.querySelector(".tag.veg")?" veg":""),cal:W47S.cal(c&&c.textContent)}});
 var cs=W47S.chips(items);if(cs.length<2)return;
 var g=el("div","w47s-chips");g.setAttribute("role","group");g.setAttribute("aria-label","Filter popular picks");
 var st=el("p","small muted");st.setAttribute("role","status");st.id="w47s-pst"+si;
 var bs=[];
 function set(k){var n=0;items.forEach(function(i){var on=W47S.match(i,k);i.li.classList.toggle("w47s-off",!on);if(on)n++});bs.forEach(function(b){b.setAttribute("aria-pressed",b.getAttribute("data-k")===k?"true":"false")});st.textContent=k==="all"?"":"Showing "+n+" of "+items.length+" popular picks"+(k==="light"?" (calories are estimates).":".")}
 cs.forEach(function(c){var b=el("button",null,c.label+" ("+c.n+")");b.type="button";b.setAttribute("data-k",c.key);b.setAttribute("aria-pressed",c.key==="all"?"true":"false");b.addEventListener("click",function(){set(c.key)});bs.push(b);g.appendChild(b)});
 var anchor=sec.querySelector("p.muted")||sec.querySelector("h2");if(anchor&&anchor.parentNode===sec){sec.insertBefore(g,anchor.nextSibling)}else{sec.insertBefore(g,ul)}
 sec.insertBefore(st,ul)});
/* W47S-002 what the dish tags mean (counts of dishes on this page) */
var ms=d.getElementById("mstatus"),mn=d.getElementById("menu");
if(ms&&mn&&!d.querySelector(".w47s-key")){var seen={},counts={};
 [].forEach.call(mn.querySelectorAll("li.dish"),function(li){var id=li.getAttribute("data-id")||"";if(!id||seen[id])return;seen[id]=1;
  var cl={};[].forEach.call(li.querySelectorAll(".tags .tag"),function(t){var k=t.className.replace(/^tag\s*/,"").trim();if(!cl[k]){cl[k]=1;counts[k]=(counts[k]||0)+1}})});
 var rows=W47S.key(counts);
 if(rows.length){var dt=el("details","w47s-key"),sm=el("summary",null,"What the dish tags mean"),ul2=el("ul");dt.appendChild(sm);
  rows.forEach(function(r){var li=el("li"),t=el("span","tag "+r.cls,r.tag);li.appendChild(t);li.appendChild(d.createTextNode(r.means+" "+r.n+(r.n===1?" dish.":" dishes.")));ul2.appendChild(li)});
  dt.appendChild(ul2);var p=el("p","small muted","Allergens are estimated from each recipe, not lab-tested, and our kitchen shares equipment. ");
  var tel=d.querySelector('a[href^="tel:"]');if(tel){var a=el("a",null,"With an allergy, please call first.");a.href=tel.getAttribute("href");p.appendChild(a)}
  dt.appendChild(p);ms.parentNode.insertBefore(dt,ms.nextSibling)}}
})(typeof window!="undefined"?window:{},typeof document!="undefined"?document:undefined);
/* W48S-BEGIN */(function(d){if(!d||d.querySelector('script[src="/w48s.js"]'))return;var s=d.createElement("script");s.src="/w48s.js";s.defer=1;d.head.appendChild(s)})(typeof document!="undefined"?document:undefined);/* W48S-END */
