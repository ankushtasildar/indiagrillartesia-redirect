/* W45S (IGE site): QR codes made on this device (no outside service, nothing sent) for a shared list someone opened (/menu/?list=), for the allergen booklet, and for each common question on the Support home. All allergen info is estimated from each recipe. No amounts, no fetch, no storage writes. Encoder copied from W44S (byte mode, level M, v1-v15, 8 masks). */
var W45Q=function(text,mask){
var T=[0,[10,1,16,0,0],[16,1,28,0,0],[26,1,44,0,0],[18,2,32,0,0],[24,2,43,0,0],[16,4,27,0,0],[18,4,31,0,0],[22,2,38,2,39],[22,3,36,2,37],[26,4,43,1,44],[30,1,50,4,51],[22,6,36,2,37],[22,8,37,1,38],[24,4,40,5,41],[24,5,41,5,42]];
var EXP=[],LOG=[],i,j,x=1;for(i=0;i<255;i++){EXP[i]=x;LOG[x]=i;x<<=1;if(x&256)x^=285}for(i=255;i<512;i++)EXP[i]=EXP[i-255];
function mul(a,b){return a&&b?EXP[LOG[a]+LOG[b]]:0}
var by=[],u=unescape(encodeURIComponent(text));for(i=0;i<u.length;i++)by.push(u.charCodeAt(i));
var v=0,t,nd;for(i=1;i<16;i++){t=T[i];nd=t[1]*t[2]+t[3]*t[4];if(4+(i<10?8:16)+8*by.length<=nd*8){v=i;break}}if(!v)return null;
var bits=[];function put(n,l){for(var k=l-1;k>=0;k--)bits.push((n>>>k)&1)}
put(4,4);put(by.length,v<10?8:16);by.forEach(function(b){put(b,8)});put(0,Math.min(4,nd*8-bits.length));while(bits.length%8)bits.push(0);
var dat=[];for(i=0;i<bits.length;i+=8){x=0;for(j=0;j<8;j++)x=(x<<1)|bits[i+j];dat.push(x)}for(i=0;dat.length<nd;i++)dat.push(i%2?17:236);
var ne=t[0],g=[1];for(i=0;i<ne;i++){var r=[];for(j=0;j<=g.length;j++)r[j]=(j<g.length?g[j]:0)^(j>0?mul(g[j-1],EXP[i]):0);g=r}
var bl=[],ecs=[],p=0,mx=0;for(i=0;i<t[1]+t[3];i++){var n=i<t[1]?t[2]:t[4],b=dat.slice(p,p+n);p+=n;bl.push(b);mx=Math.max(mx,n);
 var rm=b.concat([]);for(j=0;j<ne;j++)rm.push(0);for(j=0;j<n;j++){var c=rm[j];if(c)for(var k=0;k<g.length;k++)rm[j+k]^=mul(g[k],c)}ecs.push(rm.slice(n))}
var cw=[];for(j=0;j<mx;j++)bl.forEach(function(b){if(j<b.length)cw.push(b[j])});for(j=0;j<ne;j++)ecs.forEach(function(e){cw.push(e[j])});
var N=17+4*v,M=[],F=[];for(i=0;i<N;i++){M.push([]);F.push([]);for(j=0;j<N;j++){M[i][j]=0;F[i][j]=0}}
function set(cx,cy,d){M[cy][cx]=d?1:0;F[cy][cx]=1}
function fp(cx,cy){for(var dy=-4;dy<=4;dy++)for(var dx=-4;dx<=4;dx++){var xx=cx+dx,yy=cy+dy,dd=Math.max(Math.abs(dx),Math.abs(dy));if(xx>=0&&xx<N&&yy>=0&&yy<N)set(xx,yy,dd!=2&&dd!=4)}}
for(i=0;i<N;i++){set(6,i,i%2==0);set(i,6,i%2==0)}fp(3,3);fp(N-4,3);fp(3,N-4);
if(v>1){var na=Math.floor(v/7)+2,st=Math.ceil((v*4+4)/(na*2-2))*2,ap=[6];for(x=N-7;ap.length<na;x-=st)ap.splice(1,0,x);
 for(i=0;i<na;i++)for(j=0;j<na;j++){if((i==0&&j==0)||(i==0&&j==na-1)||(i==na-1&&j==0))continue;for(var ay=-2;ay<=2;ay++)for(var ax=-2;ax<=2;ax++)set(ap[i]+ax,ap[j]+ay,Math.max(Math.abs(ax),Math.abs(ay))!=1)}}
function fmt(mk){var d=mk,rm=d;for(var k=0;k<10;k++)rm=(rm<<1)^((rm>>>9)*1335);var b=((d<<10)|rm)^21522;function q(k){return(b>>>k)&1}
 for(k=0;k<=5;k++)set(8,k,q(k));set(8,7,q(6));set(8,8,q(7));set(7,8,q(8));for(k=9;k<15;k++)set(14-k,8,q(k));for(k=0;k<8;k++)set(N-1-k,8,q(k));for(k=8;k<15;k++)set(8,N-15+k,q(k));set(8,N-8,1)}
fmt(0);
if(v>=7){var rv=v;for(i=0;i<12;i++)rv=(rv<<1)^((rv>>>11)*7973);var vb=(v<<12)|rv;for(i=0;i<18;i++){var bt=(vb>>>i)&1,a=N-11+i%3,bb=Math.floor(i/3);set(a,bb,bt);set(bb,a,bt)}}
var k2=0,tot=cw.length*8;for(var rt=N-1;rt>=1;rt-=2){if(rt==6)rt=5;for(var vt=0;vt<N;vt++)for(j=0;j<2;j++){var xx=rt-j,up=((rt+1)&2)==0,yy=up?N-1-vt:vt;if(!F[yy][xx]&&k2<tot){M[yy][xx]=(cw[k2>>>3]>>>(7-(k2&7)))&1;k2++}}}
function mf(m,y,x){switch(m){case 0:return(y+x)%2==0;case 1:return y%2==0;case 2:return x%3==0;case 3:return(y+x)%3==0;case 4:return(Math.floor(y/2)+Math.floor(x/3))%2==0;case 5:return(y*x)%2+(y*x)%3==0;case 6:return((y*x)%2+(y*x)%3)%2==0;default:return((y+x)%2+(y*x)%3)%2==0}}
function ap2(m){for(var y=0;y<N;y++)for(var x=0;x<N;x++)if(!F[y][x]&&mf(m,y,x))M[y][x]^=1}
function pen(){var s=0,y,x,d=0,P1=[1,0,1,1,1,0,1,0,0,0,0],P2=[0,0,0,0,1,0,1,1,1,0,1];
 for(var o=0;o<2;o++)for(y=0;y<N;y++){var run=1;for(x=1;x<=N;x++){var a=x<N?(o?M[x][y]:M[y][x]):-1,b=o?M[x-1][y]:M[y][x-1];if(a===b)run++;else{if(run>=5)s+=run-2;run=1}}
  for(x=0;x+11<=N;x++){var e1=1,e2=1;for(var q=0;q<11;q++){var c=o?M[x+q][y]:M[y][x+q];if(c!=P1[q])e1=0;if(c!=P2[q])e2=0}s+=40*(e1+e2)}}
 for(y=0;y<N-1;y++)for(x=0;x<N-1;x++){var c0=M[y][x];if(c0==M[y][x+1]&&c0==M[y+1][x]&&c0==M[y+1][x+1])s+=3}
 for(y=0;y<N;y++)for(x=0;x<N;x++)d+=M[y][x];return s+10*Math.floor(Math.abs(d*20-N*N*10)/(N*N))}
var best=mask;if(best==null){var bs=1e9;for(var m=0;m<8;m++){ap2(m);fmt(m);var sc=pen();if(sc<bs){bs=sc;best=m}ap2(m)}}
ap2(best);fmt(best);return{size:N,m:M,v:v,mask:best}};
(function(w,d){if(typeof d=="undefined"||!d.body&&!d.head)return;var P=location.pathname,O=location.origin;
function el(t,c,x){var e=d.createElement(t);if(c)e.className=c;if(x)e.textContent=x;return e}
function svg(q,lab){var NS="http://"+"www.w3.org/2000/svg",n=q.size+8,s=d.createElementNS(NS,"svg"),r=d.createElementNS(NS,"rect"),p=d.createElementNS(NS,"path"),t=d.createElementNS(NS,"title"),dd=[];
 s.setAttribute("viewBox","0 0 "+n+" "+n);s.setAttribute("width","220");s.setAttribute("height","220");s.setAttribute("role","img");s.setAttribute("aria-label",lab);s.setAttribute("shape-rendering","crispEdges");
 t.textContent=lab;r.setAttribute("width",n);r.setAttribute("height",n);r.setAttribute("fill","#fff");
 for(var y=0;y<q.size;y++)for(var x=0;x<q.size;x++)if(q.m[y][x])dd.push("M"+(x+4)+" "+(y+4)+"h1v1h-1z");p.setAttribute("d",dd.join(""));p.setAttribute("fill","#000");
 s.appendChild(t);s.appendChild(r);s.appendChild(p);return s}
var st=el("style");st.textContent=".w45s-qr{margin:.6rem 0;padding:.8rem;border:1px solid var(--line,#ddd);border-radius:12px;background:var(--card,#fff)}.w45s-qr svg{display:block;width:220px;max-width:100%;height:auto;background:#fff;border-radius:6px}.w45s-qr p{margin:.4rem 0}.w45s-row{display:flex;gap:.5rem;flex-wrap:wrap;align-items:center}#w45sheet{display:none}";d.head.appendChild(st);
function panel(id,after,url,title,cap,lines){var o=d.getElementById(id);if(o){o.remove();return null}var q=W45Q(url),bx=el("div","w45s-qr");bx.id=id;bx.setAttribute("role","region");bx.setAttribute("aria-label",title);
 if(!q){bx.appendChild(el("p",null,"This is too long for one QR code. Use the link instead."));after.parentNode.insertBefore(bx,after.nextSibling);return bx}
 bx.appendChild(el("p",null,title));bx.appendChild(svg(q,"QR code: "+title));bx.appendChild(el("p","small",cap));after.parentNode.insertBefore(bx,after.nextSibling);return bx}
var CALL="To order, call (562) 991-4320 or use the IGE app.",EST="Allergen info is estimated from each recipe, not lab-tested; shared equipment. Tell staff about any allergy.";
/* W45S-001: QR for a shared list someone opened (/menu/?list=id,id): the same link, to pass it on to another phone */
var shb=d.getElementById("mlShared"),sv=d.getElementById("mlsSave"),qm=((w.location&&w.location.search||"").match(/[?&]list=([^&]*)/)||[])[1];
if(shb&&sv&&qm&&!d.getElementById("w45sl")){var lids=[];try{lids=decodeURIComponent(qm).split(",")}catch(e){lids=[]}lids=lids.filter(function(x,i,s){return /^[A-Za-z0-9_-]{1,80}$/.test(x)&&s.indexOf(x)===i}).slice(0,60);
 if(lids.length){var sb=el("button","btn ghost","QR for this shared list");sb.type="button";sb.id="w45sl";sb.setAttribute("aria-expanded","false");sv.parentNode.insertBefore(sb,sv.nextSibling);
  sb.onclick=function(){var n=lids.length,lab="Shared list ("+n+(n==1?" dish)":" dishes)"),b=panel("w45slq",sb.parentNode,O+"/menu/?list="+lids.join(","),lab,"Scan to open this same list on another phone. Nothing is sent anywhere; the code only holds the link.",["Scan to open the list ("+n+(n==1?" dish).":" dishes)."),CALL]);sb.setAttribute("aria-expanded",b?"true":"false")}}}
/* W45S-002: allergen booklet: a QR for the booklet on screen that opens the current online copy */
var bkp=d.querySelector(".w44s-bkp"),pth=(w.location&&w.location.pathname)||"";
if(bkp&&/\/menu\/allergen-booklet\/?$/.test(pth)&&!d.getElementById("w45bk")){var BU=O+"/menu/allergen-booklet/",BT="Allergen booklet (11 free-of lists, estimated)";
 var bb=el("button","btn ghost","QR for this booklet");bb.type="button";bb.id="w45bk";bb.setAttribute("aria-expanded","false");bkp.appendChild(bb);
 bb.onclick=function(){var b=panel("w45bkq",bkp,BU,BT,"Scan to open the current booklet on a phone. Estimates, not lab results.",[EST,CALL]);bb.setAttribute("aria-expanded",b?"true":"false")};
}
/* W45S-003: a QR beside each common question's existing "copy link" button on the Support home (opens that answer) */
var qls=d.querySelectorAll('h3[id^="q-"] button.qlink');
if(qls.length&&!d.getElementById("w45fqs")){var st4=el("style");st4.id="w45fqs";st4.textContent=".w45s-fq::before{content:'QR'}.w45s-fq{margin-left:.35rem}";d.head.appendChild(st4);
 Array.prototype.forEach.call(qls,function(ql){var h3=ql.parentNode,qt="";Array.prototype.forEach.call(h3.childNodes,function(n){if(n.nodeType==3)qt+=n.textContent});qt=qt.trim().replace(/\s+/g," ");if(!qt)return;
  var qb=el("button",(ql.className+" w45s-fq").trim());qb.type="button";qb.setAttribute("aria-label","QR code for this answer: "+qt);qb.setAttribute("aria-expanded","false");ql.parentNode.insertBefore(qb,ql.nextSibling);
  qb.onclick=function(){Array.prototype.forEach.call(d.querySelectorAll(".w45s-fqp"),function(o){if(o.id!="w45fq-"+h3.id){o.remove()}});var b=panel("w45fq-"+h3.id,h3,O+"/#"+h3.id,qt,"Scan to open this answer on a phone. Nothing is sent anywhere; the code only holds the link.",["Scan for the answer.",CALL]);if(b)b.className+=" w45s-fqp";qb.setAttribute("aria-expanded",b?"true":"false")}});
 var fq=d.getElementById("fq");if(fq)fq.addEventListener("input",function(){Array.prototype.forEach.call(d.querySelectorAll(".w45s-fqp"),function(o){o.remove()})})}
})(typeof window!="undefined"?window:{},typeof document!="undefined"?document:undefined);
/* W46S-BEGIN */(function(d){if(!d||d.querySelector('script[src="/w46s.js"]'))return;var s=d.createElement("script");s.src="/w46s.js";s.defer=1;d.head.appendChild(s)})(typeof document!="undefined"?document:undefined);/* W46S-END */
