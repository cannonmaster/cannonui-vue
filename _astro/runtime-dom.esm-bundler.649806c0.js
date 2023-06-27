import{J as P,K as p,L,M as x,N as O,O as H,P as I,Q as T,R as N,S as B,T as D,U as K,V as _,W as z}from"./runtime-core.esm-bundler.23703bfe.js";const W="http://www.w3.org/2000/svg",l=typeof document<"u"?document:null,g=l&&l.createElement("template"),$={insert:(t,e,n)=>{e.insertBefore(t,n||null)},remove:t=>{const e=t.parentNode;e&&e.removeChild(t)},createElement:(t,e,n,i)=>{const r=e?l.createElementNS(W,t):l.createElement(t,n?{is:n}:void 0);return t==="select"&&i&&i.multiple!=null&&r.setAttribute("multiple",i.multiple),r},createText:t=>l.createTextNode(t),createComment:t=>l.createComment(t),setText:(t,e)=>{t.nodeValue=e},setElementText:(t,e)=>{t.textContent=e},parentNode:t=>t.parentNode,nextSibling:t=>t.nextSibling,querySelector:t=>l.querySelector(t),setScopeId(t,e){t.setAttribute(e,"")},insertStaticContent(t,e,n,i,r,s){const c=n?n.previousSibling:e.lastChild;if(r&&(r===s||r.nextSibling))for(;e.insertBefore(r.cloneNode(!0),n),!(r===s||!(r=r.nextSibling)););else{g.innerHTML=i?`<svg>${t}</svg>`:t;const f=g.content;if(i){const o=f.firstChild;for(;o.firstChild;)f.appendChild(o.firstChild);f.removeChild(o)}e.insertBefore(f,n)}return[c?c.nextSibling:e.firstChild,n?n.previousSibling:e.lastChild]}};function q(t,e,n){const i=t._vtc;i&&(e=(e?[e,...i]:[...i]).join(" ")),e==null?t.removeAttribute("class"):n?t.setAttribute("class",e):t.className=e}function U(t,e,n){const i=t.style,r=p(n);if(n&&!r){if(e&&!p(e))for(const s in e)n[s]==null&&h(i,s,"");for(const s in n)h(i,s,n[s])}else{const s=i.display;r?e!==n&&(i.cssText=n):e&&t.removeAttribute("style"),"_vod"in t&&(i.display=s)}}const b=/\s*!important$/;function h(t,e,n){if(T(n))n.forEach(i=>h(t,e,i));else if(n==null&&(n=""),e.startsWith("--"))t.setProperty(e,n);else{const i=j(t,e);b.test(n)?t.setProperty(N(i),n.replace(b,""),"important"):t[i]=n}}const S=["Webkit","Moz","ms"],d={};function j(t,e){const n=d[e];if(n)return n;let i=B(e);if(i!=="filter"&&i in t)return d[e]=i;i=D(i);for(let r=0;r<S.length;r++){const s=S[r]+i;if(s in t)return d[e]=s}return e}const A="http://www.w3.org/1999/xlink";function F(t,e,n,i,r){if(i&&e.startsWith("xlink:"))n==null?t.removeAttributeNS(A,e.slice(6,e.length)):t.setAttributeNS(A,e,n);else{const s=K(e);n==null||s&&!_(n)?t.removeAttribute(e):t.setAttribute(e,s?"":n)}}function G(t,e,n,i,r,s,c){if(e==="innerHTML"||e==="textContent"){i&&c(i,r,s),t[e]=n??"";return}if(e==="value"&&t.tagName!=="PROGRESS"&&!t.tagName.includes("-")){t._value=n;const o=n??"";(t.value!==o||t.tagName==="OPTION")&&(t.value=o),n==null&&t.removeAttribute(e);return}let f=!1;if(n===""||n==null){const o=typeof t[e];o==="boolean"?n=_(n):n==null&&o==="string"?(n="",f=!0):o==="number"&&(n=0,f=!0)}try{t[e]=n}catch{}f&&t.removeAttribute(e)}function J(t,e,n,i){t.addEventListener(e,n,i)}function Q(t,e,n,i){t.removeEventListener(e,n,i)}function X(t,e,n,i,r=null){const s=t._vei||(t._vei={}),c=s[e];if(i&&c)c.value=i;else{const[f,o]=Y(e);if(i){const R=s[e]=V(i,r);J(t,f,R,o)}else c&&(Q(t,f,c,o),s[e]=void 0)}}const E=/(?:Once|Passive|Capture)$/;function Y(t){let e;if(E.test(t)){e={};let i;for(;i=t.match(E);)t=t.slice(0,t.length-i[0].length),e[i[0].toLowerCase()]=!0}return[t[2]===":"?t.slice(3):N(t.slice(2)),e]}let m=0;const Z=Promise.resolve(),y=()=>m||(Z.then(()=>m=0),m=Date.now());function V(t,e){const n=i=>{if(!i._vts)i._vts=Date.now();else if(i._vts<=n.attached)return;z(k(i,n.value),e,5,[i])};return n.value=t,n.attached=y(),n}function k(t,e){if(T(e)){const n=t.stopImmediatePropagation;return t.stopImmediatePropagation=()=>{n.call(t),t._stopped=!0},e.map(i=>r=>!r._stopped&&i&&i(r))}else return e}const C=/^on[a-z]/,tt=(t,e,n,i,r=!1,s,c,f,o)=>{e==="class"?q(t,i,r):e==="style"?U(t,n,i):H(e)?I(e)||X(t,e,n,i,c):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):et(t,e,i,r))?G(t,e,i,s,c,f,o):(e==="true-value"?t._trueValue=i:e==="false-value"&&(t._falseValue=i),F(t,e,i,r))};function et(t,e,n,i){return i?!!(e==="innerHTML"||e==="textContent"||e in t&&C.test(e)&&P(n)):e==="spellcheck"||e==="draggable"||e==="translate"||e==="form"||e==="list"&&t.tagName==="INPUT"||e==="type"&&t.tagName==="TEXTAREA"||C.test(e)&&p(n)?!1:e in t}const nt=["ctrl","shift","alt","meta"],it={stop:t=>t.stopPropagation(),prevent:t=>t.preventDefault(),self:t=>t.target!==t.currentTarget,ctrl:t=>!t.ctrlKey,shift:t=>!t.shiftKey,alt:t=>!t.altKey,meta:t=>!t.metaKey,left:t=>"button"in t&&t.button!==0,middle:t=>"button"in t&&t.button!==1,right:t=>"button"in t&&t.button!==2,exact:(t,e)=>nt.some(n=>t[`${n}Key`]&&!e.includes(n))},ct=(t,e)=>(n,...i)=>{for(let r=0;r<e.length;r++){const s=it[e[r]];if(s&&s(n,e))return}return t(n,...i)},ft={beforeMount(t,{value:e},{transition:n}){t._vod=t.style.display==="none"?"":t.style.display,n&&e?n.beforeEnter(t):u(t,e)},mounted(t,{value:e},{transition:n}){n&&e&&n.enter(t)},updated(t,{value:e,oldValue:n},{transition:i}){!e!=!n&&(i?e?(i.beforeEnter(t),u(t,!0),i.enter(t)):i.leave(t,()=>{u(t,!1)}):u(t,e))},beforeUnmount(t,{value:e}){u(t,e)}};function u(t,e){t.style.display=e?t._vod:"none"}const w=O({patchProp:tt},$);let a,v=!1;function rt(){return a||(a=L(w))}function st(){return a=v?a:x(w),v=!0,a}const lt=(...t)=>{const e=rt().createApp(...t),{mount:n}=e;return e.mount=i=>{const r=M(i);if(!r)return;const s=e._component;!P(s)&&!s.render&&!s.template&&(s.template=r.innerHTML),r.innerHTML="";const c=n(r,!1,r instanceof SVGElement);return r instanceof Element&&(r.removeAttribute("v-cloak"),r.setAttribute("data-v-app","")),c},e},ut=(...t)=>{const e=st().createApp(...t),{mount:n}=e;return e.mount=i=>{const r=M(i);if(r)return n(r,!0,r instanceof SVGElement)},e};function M(t){return p(t)?document.querySelector(t):t}export{ut as a,lt as c,ft as v,ct as w};
