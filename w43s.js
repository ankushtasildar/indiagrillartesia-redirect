/* W43S (IGE site): QR code + printable table card on section pages, diet guides and allergen guides; "Print my list (QR)" in the menu's My list; "Print a counter card" (menu QR + save-our-number QR) on the Support home. QR images are made at build time (/qr/, /qr-pages/), no outside service. No prices, no fetch; My list is only read on this device, never written or sent. */
(function(d,w){
var P=location.pathname,H=d.documentElement,ID=/^[a-z0-9-]{1,80}$/;
function el(t,c,x){var e=d.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
var st=el("style");st.textContent=".w43p{margin:8px 0}.w43p .btn{min-height:44px}.w43q{margin:12px 0;text-align:center}.w43q h2{font-size:var(--fs-h3,20px);margin:0 0 4px}.w43q img{display:block;margin:8px auto;background:#fff;border-radius:8px;width:200px;height:200px;max-width:70vw;max-height:70vw}.w43q .btn{min-height:44px}.w43two{display:flex;justify-content:center;gap:28px;flex-wrap:wrap;margin:8px 0}.w43two figure{margin:0}.w43two figcaption{font-size:16px;font-weight:700}.w42c .w43two img{width:200px;height:200px}";d.head.appendChild(st);
var tel=d.querySelector('a[href^="tel:+1"]'),ph="";
if(tel){var n=tel.getAttribute("href").replace(/\D/g,"").slice(-10);if(n.length==10)ph="("+n.slice(0,3)+") "+n.slice(3,6)+"-"+n.slice(6)}
var DL="Scan to open this dish's page. Nutrition and allergens there are estimates.";
function img(src,alt,s){var i=el("img");i.src=src;i.alt=alt;i.width=s;i.height=s;return i}
function card(name,src,line){var c=el("div","w42c");c.appendChild(el("p","w42b","India Grill Express"));c.appendChild(el("h2",null,name));c.appendChild(img(src,"QR code: "+name,200));c.appendChild(el("p",null,line));if(ph)c.appendChild(el("p",null,"To order, call "+ph+" or use the IGE app."));return c}
function sheet(cls,cards){var o=d.getElementById("w42sheet");if(o)o.remove();var s=el("div",cls);s.id="w42sheet";s.setAttribute("aria-hidden","true");cards.forEach(function(c){s.appendChild(c)});d.body.appendChild(s);var im=[].slice.call(s.querySelectorAll("img")),k=0,done=0;function go(){if(done)return;done=1;H.classList.add("w42pr");w.print()}im.forEach(function(i){if(i.complete)k++;else i.onload=i.onerror=function(){if(++k>=im.length)go()}});if(k>=im.length)go();else setTimeout(go,3000)}
w.addEventListener("afterprint",function(){H.classList.remove("w42pr")});
/* W43S-001 page QR + table card: sections, diet guides, allergen guides */
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
 q.appendChild(el("p","small muted","Point a phone camera at it to open this page, or print it as a table card. Made on this site, no outside service, no prices."));
 var pb=el("button","btn alt","Print a table card");pb.type="button";q.appendChild(pb);
 var anc=d.querySelector(".w27pr")||h1;anc.parentNode.insertBefore(p,anc.nextSibling);p.parentNode.insertBefore(q,p.nextSibling);
 b.onclick=function(){var o=q.hidden;if(o&&!im.src)im.src=src;q.hidden=!o;b.setAttribute("aria-expanded",o?"true":"false");if(o)q.scrollIntoView({block:"nearest"})};
 pb.onclick=function(){sheet("w42one",[card(nm,src,line)])};
}
/* W43S-002 My list: print one QR table card per saved dish (read-only) */
var ML=d.getElementById("mylist"),act=ML&&ML.querySelector(".mlact");
if(act&&!d.getElementById("w43ml")){
 var mb=el("button","btn alt","Print my list (QR)");mb.type="button";mb.id="w43ml";act.appendChild(mb);
 mb.onclick=function(){var a=[],seen={},cs=[];try{a=JSON.parse(w.localStorage.getItem("ige-mylist-v1")||"[]")}catch(e){}if(!Array.isArray(a))a=[];
  a.forEach(function(x){if(x&&typeof x.id=="string"&&ID.test(x.id)&&x.name&&!seen[x.id]&&cs.length<60){seen[x.id]=1;cs.push(card(String(x.name).slice(0,60),"/qr/"+x.id+".svg",DL))}});
  var s=d.getElementById("mlStatus");if(!cs.length){if(s){s.textContent="";setTimeout(function(){s.textContent="My list is empty."},30)}return}sheet("w42grid",cs)};
}
/* W43S-003 Support home: counter card with the menu QR + save-our-number QR */
var V=d.querySelector('a[href="/india-grill-express.vcf"]');
if((P=="/"||P=="/index.html")&&V&&!d.getElementById("w43cc")){
 var ad="";[].forEach.call(d.querySelectorAll('script[type="application/ld+json"]'),function(s){try{[].concat(JSON.parse(s.textContent)).forEach(function(o){[].concat(o["@graph"]||o).forEach(function(g){var a=g&&g.address;if(!ad&&a&&a.streetAddress)ad=[a.streetAddress,a.addressLocality,(a.addressRegion||"")+" "+(a.postalCode||"")].join(", ").replace(/\s+/g," ").trim()})})}catch(e){}});
 var cp=el("p","w43p"),cb=el("button","btn ghost","Print a counter card");cb.type="button";cb.id="w43cc";cp.appendChild(cb);cp.appendChild(el("span","small muted"," One card with two QR codes: our menu, and our number for your contacts. No prices."));
 var vp=V.parentNode;vp.parentNode.insertBefore(cp,vp.nextSibling);
 cb.onclick=function(){var c=el("div","w42c");c.appendChild(el("p","w42b","India Grill Express"));c.appendChild(el("h2",null,"Scan for our menu"));
  var two=el("div","w43two");[["/qr/menu.svg","Menu"],["/qr-pages/vcf.svg","Save our number"]].forEach(function(x){var f=el("figure");f.appendChild(img(x[0],"QR code: "+x[1],200));f.appendChild(el("figcaption",null,x[1]));two.appendChild(f)});c.appendChild(two);
  if(ph)c.appendChild(el("p",null,"Call "+ph+" to order, or use the IGE app."));if(ad)c.appendChild(el("p",null,ad));
  c.appendChild(el("p",null,"Nutrition and allergens on the menu are estimates."));sheet("w42one",[c])};
}
})(document,window);
/* W44S-BEGIN */(function(d){if(d.querySelector('script[src="/w44s.js"]'))return;var s=d.createElement("script");s.src="/w44s.js";s.defer=1;d.head.appendChild(s)})(document);/* W44S-END */
