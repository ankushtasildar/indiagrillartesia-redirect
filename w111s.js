/* W111S w111s.js (IGE site). On-device only: nothing is sent anywhere and nothing is stored; the free-of list this device saved
 (localStorage "ige-freeof-v1") is only READ, never written. No money amounts, no menu facts added or changed; allergen words stay estimates.
 W111S-001 section pages, Popular and the 4 diet guides, after W106S 'Show all N dishes': W106S's row says 'Your saved free-of list (...) is
  unchanged' and offers 'Leave out ... again', and it stops listening to the Leave out boxes. A visitor's own tick there DOES change the saved
  list (the boxes remember hand ticks), so the row went on naming the old list. Now, while the saved list differs from the one the row names:
  the row (role=status, so a screen reader hears it) says 'You changed your saved free-of list here: it is now <list>.' and the button says
  'Leave out <list> again' ('Leave out <list>' when those boxes are already ticked; a tap hands back to W106S's own row). With nothing saved
  any more the row hides (its button could do nothing). Back to the same list as before: the row's own words come back.
  One debounced change/click/storage listener, finite timers, no observer, no interval. Not on ?free= / ?fits. */
(function(w,d){
if(!d||w.W111S)return;w.W111S=1;
var L=w.location,P=L.pathname,N={dairy:"dairy",gluten:"gluten","tree-nuts":"tree nuts",peanuts:"peanuts",egg:"egg",soy:"soy",fish:"fish",shellfish:"shellfish"};
if(/[?&](free|fits)(=|&|$)/.test(L.search))return;
if(!/^\/menu\/(s\/[a-z0-9-]+|popular|vegetarian|vegan|gluten-free|high-protein)\/?$/.test(P))return;
var R=/Your saved free-of list \((.+)\) is unchanged\./,keep=null,mine=null,tm=0,tm2=0;
function list(){try{var a=JSON.parse(w.localStorage.getItem("ige-freeof-v1")||"[]");return Array.isArray(a)?a.filter(function(v){return Object.prototype.hasOwnProperty.call(N,v)}):[]}catch(e){return[]}}
function names(a){return a.map(function(v){return N[v]}).join(", ")}
function fix(){var p=d.getElementById("w106sAll"),st=d.getElementById("w106sSt"),bt=d.getElementById("w106sBtn");if(!p||!st||!bt)return;
 var a=list(),n=names(a),t=st.textContent||"";
 if(keep&&mine&&!(t===mine.st&&bt.textContent===mine.bt&&p.hidden===mine.hid)){keep=null;mine=null}
 if(!keep){var m=R.exec(t);if(p.hidden||bt.getAttribute("data-act")!=="again"||!m||m[1]===n)return;keep={st:t,bt:bt.textContent,q:m[1]}}
 if(n===keep.q){st.textContent=keep.st;bt.textContent=keep.bt;p.hidden=false;keep=null;mine=null;return}
 if(!a.length){p.hidden=true}
 else{var off=[].slice.call(d.querySelectorAll("#leaveOut input[type=checkbox]")).some(function(k){return a.indexOf(k.value)>=0&&!k.checked});
  st.textContent="You changed your saved free-of list here: it is now "+n+". ";bt.textContent="Leave out "+n+(off?" again":"");p.hidden=false}
 mine={st:st.textContent,bt:bt.textContent,hid:p.hidden}}
function soon(){clearTimeout(tm);clearTimeout(tm2);tm=setTimeout(fix,400);tm2=setTimeout(fix,1200)}
function start(){d.addEventListener("change",soon);d.addEventListener("click",soon);w.addEventListener("storage",soon)}
if(d.readyState==="loading")d.addEventListener("DOMContentLoaded",start);else start();
})(typeof window!="undefined"?window:undefined,typeof document!="undefined"?document:undefined);
