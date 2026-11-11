/* W42S (IGE site): QR code per dish page + printable table cards. QR images are made at build time (files under /qr/), no outside service. No prices, no fetch, no storage. */
(function(d,w){
var P=location.pathname,H=d.documentElement,ID=/^[a-z0-9-]{1,80}$/;
function el(t,c,x){var e=d.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
var st=el("style");st.textContent=".w42q{margin:12px 0;text-align:center}.w42q h2{font-size:var(--fs-h3,20px);margin:0 0 4px}.w42q img,.w42c img{display:block;margin:8px auto;background:#fff;border-radius:8px;width:200px;height:200px;max-width:70vw;max-height:70vw}.w42q .btn{min-height:44px}#w42sheet{display:none}.w42c{border:2px dashed #888;border-radius:12px;padding:20px;text-align:center;break-inside:avoid;page-break-inside:avoid;color:#000;background:#fff}.w42c h2{font-size:24px;margin:4px 0}.w42c p{margin:4px 0;font-size:15px}.w42c .w42b{font-size:13px;letter-spacing:.06em;text-transform:uppercase}.w42one .w42c img{width:280px;height:280px}.w42grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}.w42grid .w42c img{width:150px;height:150px}@media print{html.w42pr body>*:not(#w42sheet){display:none!important}html.w42pr #w42sheet{display:block!important}html.w42pr #w42sheet.w42grid{display:grid!important}html.w42pr body{background:#fff}}";d.head.appendChild(st);
var tel=d.querySelector('a[href^="tel:+1"]'),ph="";
if(tel){var n=tel.getAttribute("href").replace(/\D/g,"").slice(-10);if(n.length==10)ph="("+n.slice(0,3)+") "+n.slice(3,6)+"-"+n.slice(6)}
function card(name,src,line){var c=el("div","w42c");c.appendChild(el("p","w42b","India Grill Express"));c.appendChild(el("h2",null,name));var i=el("img");i.src=src;i.alt="QR code: "+line;i.width=200;i.height=200;c.appendChild(i);c.appendChild(el("p",null,line));if(ph)c.appendChild(el("p",null,"To order, call "+ph+" or use the IGE app."));return c}
function sheet(cls,cards){var o=d.getElementById("w42sheet");if(o)o.remove();var s=el("div",cls);s.id="w42sheet";s.setAttribute("aria-hidden","true");cards.forEach(function(c){s.appendChild(c)});d.body.appendChild(s);var im=[].slice.call(s.querySelectorAll("img")),k=0,done=0;function go(){if(done)return;done=1;H.classList.add("w42pr");w.print()}im.forEach(function(i){if(i.complete)k++;else i.onload=i.onerror=function(){if(++k>=im.length)go()}});if(k>=im.length)go();else setTimeout(go,3000)}
w.addEventListener("afterprint",function(){H.classList.remove("w42pr")});
var T=d.getElementById("dpTools");
if(T&&ID.test(T.dataset.id||"")&&!d.getElementById("w42qb")){
 var id=T.dataset.id,nm=T.dataset.name||d.title,src="/qr/"+id+".svg",line="Scan to open this dish's page. Nutrition and allergens there are estimates.";
 var b=el("button","linkbtn","QR code");b.type="button";b.id="w42qb";b.setAttribute("aria-expanded","false");b.setAttribute("aria-controls","w42q");
 var st2=d.getElementById("dpStatus");T.insertBefore(d.createTextNode(" · "),st2);T.insertBefore(b,st2);
 var q=el("section","card w42q");q.id="w42q";q.hidden=true;q.setAttribute("aria-labelledby","w42qh");var h=el("h2",null,"QR code for this dish");h.id="w42qh";q.appendChild(h);
 var im=el("img");im.alt="QR code that opens the "+nm+" page";im.width=200;im.height=200;q.appendChild(im);
 q.appendChild(el("p","small muted","Point a phone camera at it to open this page, or print it as a table card. Made on this site, no outside service, no prices."));
 var pb=el("button","btn alt","Print a table card");pb.type="button";q.appendChild(pb);
 T.parentNode.insertBefore(q,T.nextSibling);
 b.onclick=function(){var o=q.hidden;if(o&&!im.src)im.src=src;q.hidden=!o;b.setAttribute("aria-expanded",o?"true":"false");if(o)h.focus&&q.scrollIntoView({block:"nearest"})};
 pb.onclick=function(){sheet("w42one",[card(nm,src,line)])};
}
if(/^\/menu\/popular\/?$/.test(P)&&!d.getElementById("w42pb")){
 var L=[];[].forEach.call(d.querySelectorAll('script[type="application/ld+json"]'),function(s){try{[].concat(JSON.parse(s.textContent)).forEach(function(o){[].concat(o["@graph"]||o).forEach(function(g){if(g&&g["@type"]=="ItemList"&&g.itemListElement)g.itemListElement.forEach(function(e){var m=/\/menu\/d\/([a-z0-9-]{1,80})\/$/.exec(e.url||"");if(m&&e.name&&L.length<12&&!L.some(function(x){return x[0]==m[1]}))L.push([m[1],String(e.name).slice(0,60)])})})})}catch(e){}});
 var anc=d.querySelector(".w27pr")||d.querySelector("main h1");
 if(L.length&&anc){var p=el("p","w42pp"),pb2=el("button","btn ghost","Print table cards (QR)");pb2.type="button";pb2.id="w42pb";p.appendChild(pb2);p.appendChild(el("span","small muted"," One card for the full menu and one per popular dish, each with a QR code to its page. No prices."));anc.parentNode.insertBefore(p,anc.nextSibling);
 pb2.onclick=function(){var cs=[card("Our full menu","/qr/menu.svg","Scan to see the full menu with estimated nutrition and allergens.")];L.forEach(function(x){cs.push(card(x[1],"/qr/"+x[0]+".svg","Scan to open this dish's page. Nutrition and allergens there are estimates."))});sheet("w42grid",cs)}}
}
})(document,window);
/* W43S-BEGIN */(function(d){if(d.querySelector('script[src="/w43s.js"]'))return;var s=d.createElement("script");s.src="/w43s.js";s.defer=1;d.head.appendChild(s)})(document);/* W43S-END */
