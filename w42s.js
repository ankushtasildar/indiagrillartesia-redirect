/* W42S (IGE site): QR code per dish page. QR images are made at build time (files under /qr/), no outside service. No prices, no fetch, no storage. */
(function(d,w){
var P=location.pathname,H=d.documentElement,ID=/^[a-z0-9-]{1,80}$/;
function el(t,c,x){var e=d.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
var st=el("style");st.textContent=".w42q{margin:12px 0;text-align:center}.w42q h2{font-size:var(--fs-h3,20px);margin:0 0 4px}.w42q img,.w42c img{display:block;margin:8px auto;background:#fff;border-radius:8px;width:200px;height:200px;max-width:70vw;max-height:70vw}.w42q .btn{min-height:44px}#w42sheet{display:none}.w42c{border:2px dashed #888;border-radius:12px;padding:20px;text-align:center;break-inside:avoid;page-break-inside:avoid;color:#000;background:#fff}.w42c h2{font-size:24px;margin:4px 0}.w42c p{margin:4px 0;font-size:15px}.w42c .w42b{font-size:13px;letter-spacing:.06em;text-transform:uppercase}.w42one .w42c img{width:280px;height:280px}.w42grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}.w42grid .w42c img{width:150px;height:150px}";d.head.appendChild(st);
var tel=d.querySelector('a[href^="tel:+1"]'),ph="";
if(tel){var n=tel.getAttribute("href").replace(/\D/g,"").slice(-10);if(n.length==10)ph="("+n.slice(0,3)+") "+n.slice(3,6)+"-"+n.slice(6)}
var T=d.getElementById("dpTools");
if(T&&ID.test(T.dataset.id||"")&&!d.getElementById("w42qb")){
 var id=T.dataset.id,nm=T.dataset.name||d.title,src="/qr/"+id+".svg",line="Scan to open this dish's page. Nutrition and allergens there are estimates.";
 var b=el("button","linkbtn","QR code");b.type="button";b.id="w42qb";b.setAttribute("aria-expanded","false");b.setAttribute("aria-controls","w42q");
 var st2=d.getElementById("dpStatus");T.insertBefore(d.createTextNode(" · "),st2);T.insertBefore(b,st2);
 var q=el("section","card w42q");q.id="w42q";q.hidden=true;q.setAttribute("aria-labelledby","w42qh");var h=el("h2",null,"QR code for this dish");h.id="w42qh";q.appendChild(h);
 var im=el("img");im.alt="QR code that opens the "+nm+" page";im.width=200;im.height=200;q.appendChild(im);
 q.appendChild(el("p","small muted","Point a phone camera at it to open this page. Made on this site, no outside service, no prices."));
 T.parentNode.insertBefore(q,T.nextSibling);
 b.onclick=function(){var o=q.hidden;if(o&&!im.src)im.src=src;q.hidden=!o;b.setAttribute("aria-expanded",o?"true":"false");if(o)h.focus&&q.scrollIntoView({block:"nearest"})};
}
})(document,window);
/* W43S-BEGIN */(function(d){if(d.querySelector('script[src="/w43s.js"]'))return;var s=d.createElement("script");s.src="/w43s.js";s.defer=1;d.head.appendChild(s)})(document);/* W43S-END */
