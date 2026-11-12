/* W43S (IGE site): QR code on section pages, diet guides and allergen guides. QR images are made at build time (/qr/, /qr-pages/), no outside service. No prices, no fetch; My list is only read on this device, never written or sent. */
(function(d,w){
var P=location.pathname,H=d.documentElement,ID=/^[a-z0-9-]{1,80}$/;
function el(t,c,x){var e=d.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
var st=el("style");st.textContent=".w43p{margin:8px 0}.w43p .btn{min-height:44px}.w43q{margin:12px 0;text-align:center}.w43q h2{font-size:var(--fs-h3,20px);margin:0 0 4px}.w43q img{display:block;margin:8px auto;background:#fff;border-radius:8px;width:200px;height:200px;max-width:70vw;max-height:70vw}.w43q .btn{min-height:44px}.w43two{display:flex;justify-content:center;gap:28px;flex-wrap:wrap;margin:8px 0}.w43two figure{margin:0}.w43two figcaption{font-size:16px;font-weight:700}.w42c .w43two img{width:200px;height:200px}";d.head.appendChild(st);
var tel=d.querySelector('a[href^="tel:+1"]'),ph="";
if(tel){var n=tel.getAttribute("href").replace(/\D/g,"").slice(-10);if(n.length==10)ph="("+n.slice(0,3)+") "+n.slice(3,6)+"-"+n.slice(6)}
var DL="Scan to open this dish's page. Nutrition and allergens there are estimates.";
function img(src,alt,s){var i=el("img");i.src=src;i.alt=alt;i.width=s;i.height=s;return i}
/* W43S-001 page QR: sections, diet guides, allergen guides */
var m,key=null,alg=0;
if((m=/^\/menu\/s\/([a-z0-9-]{1,60})\/$/.exec(P))&&m[1]!="catering")key="s-"+m[1];
else if(m=/^\/menu\/(vegetarian|vegan|gluten-free|high-protein)\/$/.exec(P)){key="g-"+m[1];alg=m[1]=="gluten-free"}
else if(m=/^\/menu\/allergens\/([a-z0-9-]{1,60})\/$/.exec(P)){key="a-"+m[1];alg=1}
else if(/^\/menu\/allergens\/$/.test(P)){key="allergens";alg=1}
var h1=d.querySelector("main h1");
if(key&&h1&&!d.getElementById("w43qb")){
 var nm=(h1.textContent||"").replace(/\s+/g," ").trim().slice(0,60),src="/qr-pages/"+key+".svg",line=alg?"Scan to open this page. Allergen info there is estimated from each recipe; tell staff about any allergy.":"Scan to open this page. Nutrition and allergens there are estimates.";
 var p=el("p","w43p"),b=el("button","btn ghost","QR code + table card");b.type="button";b.id="w43qb";b.setAttribute("aria-expanded","false");b.setAttribute("aria-controls","w43q");p.appendChild(b);
 var q=el("section","card w43q");q.id="w43q";q.hidden=true;q.setAttribute("aria-labelledby","w43qh");var h=el("h2",null,"QR code for this page");h.id="w43qh";q.appendChild(h);
 var im=el("img");im.alt="QR code that opens the "+nm+" page";im.width=200;im.height=200;q.appendChild(im);
 q.appendChild(el("p","small muted","Point a phone camera at it to open this page. Made on this site, no outside service, no prices."));
 var anc=d.querySelector(".w27pr")||h1;anc.parentNode.insertBefore(p,anc.nextSibling);p.parentNode.insertBefore(q,p.nextSibling);
 b.onclick=function(){var o=q.hidden;if(o&&!im.src)im.src=src;q.hidden=!o;b.setAttribute("aria-expanded",o?"true":"false");if(o)q.scrollIntoView({block:"nearest"})};
}
})(document,window);
/* W44S-BEGIN */(function(d){if(d.querySelector('script[src="/w44s.js"]'))return;var s=d.createElement("script");s.src="/w44s.js";s.defer=1;d.head.appendChild(s)})(document);/* W44S-END */
