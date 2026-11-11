/* W112S w112s.js (IGE site). On-device only: nothing is sent anywhere and nothing is stored; the free-of list this device saved
 (localStorage "ige-freeof-v1") is only READ, never written. No money amounts, no menu facts added or changed; allergen words stay estimates.
 W112S-001 dish pages (/menu/d/*), after W107S 'Show all N dishes' (or its 'Leave out <list> again'): W107S's row stops listening to the Leave
  out boxes, but a visitor's own tick there DOES change the saved list (the boxes remember hand ticks), so the row went on saying 'Showing all
  N dishes: nothing left out on this page. Your saved free-of list (dairy, gluten) is unchanged.' while ticks hid dishes and the list had
  changed. Now, while the row's words no longer match the page: the row (role=status, so a screen reader hears it) says 'You changed your
  saved free-of list here: it is now <list>. S of N dishes shown.' with W107S's own 44 px 'Show all N dishes' (handed back to W107S on tap),
  or 'All N dishes shown.' with no button when nothing is hidden; back to the same list, W107S's own words for that state ('Leaving out <list>
  again: S of N dishes shown.'); nothing saved any more and nothing hidden: the row hides.
 W112S-002 /menu/ phones: after W107S-002's Clear line, a hand tick hides the line (right), but its hidden status text kept saying 'Your saved
  free-of list (dairy, gluten) is unchanged.' (or 'Leaving out ... again.') for screen readers after the list had changed: that stale text is
  emptied (an emptied status region says nothing aloud).
 One debounced change/click/storage listener, finite timers, no observer, no interval. Not on ?free= / ?fits. */
(function(w,d){
if(!d||w.W112S)return;w.W112S=1;
var L=w.location,P=L.pathname,N={dairy:"dairy",gluten:"gluten","tree-nuts":"tree nuts",peanuts:"peanuts",egg:"egg",soy:"soy",fish:"fish",shellfish:"shellfish"};
if(/[?&](free|fits)(=|&|$)/.test(L.search))return;
var tm=0,tm2=0,mine=null,q=null;
function list(){try{var a=JSON.parse(w.localStorage.getItem("ige-freeof-v1")||"[]");return Array.isArray(a)?a.filter(function(v){return Object.prototype.hasOwnProperty.call(N,v)}):[]}catch(e){return[]}}
function names(a){return a.map(function(v){return N[v]}).join(", ")}
var RA=/^Showing all \d+ dish(?:es)?: nothing left out on this page\. Your saved free-of list \((.+)\) is unchanged\./,RG=/^Leaving out (.+) again: (\d+) of (\d+) dish(?:es)? shown\./;
function dish(){var p=d.getElementById("w107sAll"),st=d.getElementById("w107sSt"),bt=d.getElementById("w107sBtn");if(!p||!st||!bt)return;
 var t0=st.textContent||"";
 if(mine&&!(t0===mine.st&&bt.textContent===mine.bt&&p.hidden===mine.hid&&bt.hidden===mine.bh)){mine=null;q=null;bt.hidden=false}
 if(!mine){if(p.hidden)return;var m=RA.exec(t0)||RG.exec(t0);if(!m)return;q=m[1]}
 var a=list(),n=names(a),r=[].slice.call(d.querySelectorAll("main li.dish")),T=r.length,H=r.filter(function(li){return !li.getClientRects().length}).length,S=T-H,D=T>1?" dishes":" dish";
 if(!T)return;
 var st1,bt1="",act="all",hid=false,bh=false;
 if(!a.length&&!H){hid=true;st1=t0;bt1=bt.textContent;act=bt.getAttribute("data-act")}
 else if(n===q&&H>0){st1="Leaving out "+n+" again: "+S+" of "+T+D+" shown. ";bt1=T>1?"Show all "+T+" dishes":"Show the dish"}
 else if(n===q){st1="Showing all "+T+D+": nothing left out on this page. Your saved free-of list ("+n+") is unchanged. ";bt1="Leave out "+n+" again";act="again"}
 else{st1="You changed your saved free-of list here: it is now "+(a.length?n:"empty")+". "+(H>0?S+" of "+T+D+" shown. ":(T>1?"All "+T+" dishes shown. ":"The dish is shown. "));
  if(H>0)bt1=T>1?"Show all "+T+" dishes":"Show the dish";else{bh=true;bt1=bt.textContent;act=bt.getAttribute("data-act")}}
 if(st1===t0&&bt1===bt.textContent&&hid===p.hidden&&bh===bt.hidden&&act===bt.getAttribute("data-act")){if(mine)mine={st:t0,bt:bt1,hid:hid,bh:bh};return}
 if(st1!==t0)st.textContent=st1;bt.textContent=bt1;bt.setAttribute("data-act",act);bt.className=act==="all"?"btn w107s-btn":"btn ghost w107s-btn";p.hidden=hid;bt.hidden=bh;
 mine={st:st.textContent,bt:bt.textContent,hid:p.hidden,bh:bt.hidden}}
var RS=/^(?:Your saved free-of list \((.+)\) is unchanged|Leaving out (.+) again)\.$/;
function menu(){var s=d.getElementById("w107sSay");if(!s)return;var m=RS.exec(s.textContent||"");if(!m)return;
 if((m[1]||m[2])!==names(list()))s.textContent=""}
function fix(){if(/^\/menu\/d\/[a-z0-9-]+\/?$/.test(P))dish();else if(/^\/menu\/?$/.test(P))menu()}
function soon(e){if(e&&e.type==="click"&&!(e.target&&e.target.closest&&e.target.closest("#w107sBtn,#leaveOut,.mtools")))return;clearTimeout(tm);clearTimeout(tm2);tm=setTimeout(fix,400);tm2=setTimeout(fix,1200)}
function start(){d.addEventListener("change",soon);d.addEventListener("click",soon);w.addEventListener("storage",soon)}
if(!/^\/menu\/(d\/[a-z0-9-]+\/?|)$/.test(P))return;
if(d.readyState==="loading")d.addEventListener("DOMContentLoaded",start);else start();
})(typeof window!="undefined"?window:undefined,typeof document!="undefined"?document:undefined);
