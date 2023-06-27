import{u as ie,S as se}from"./swiperitem.e1d5bf69.js";import{c as le,_ as Q}from"./_plugin-vue_export-helper.a85d8817.js";import{r as z,e as Z,d as m,s as re,u as ue,v as ce,x as E,y as L,o as h,c as w,b as d,i as U,n as X,j as W,F as Y,z as B,h as de,f as fe,t as he,k as H,g as A,l as D,m as N,A as F}from"./runtime-core.esm-bundler.23703bfe.js";/* empty css                       */const J=5;function ve(){const e=z({startX:0,startY:0,deltaX:0,deltaY:0,offsetX:0,offsetY:0,direction:""}),c=(n,s)=>n>s&&n>J?"horizontal":s>n&&s>J?"vertical":"",g=()=>{e.startX=0,e.startY=0,e.deltaX=0,e.deltaY=0,e.offsetX=0,e.offsetY=0,e.direction=""};return{state:e,start:n=>{g(),e.startX=n.touches[0].clientX,e.startY=n.touches[0].clientY},reset:g,move:n=>{e.deltaX=n.touches[0].clientX-e.startX,e.deltaY=n.touches[0].clientY-e.startY,e.offsetX=Math.abs(e.deltaX),e.offsetY=Math.abs(e.deltaY),e.direction||(e.direction=c(e.offsetX,e.offsetY))}}}const{componentName:K,create:ge}=le("swiper"),pe=ge({props:{width:{type:[Number,String],default:typeof window=="object"?window.innerWidth:375},height:{type:[Number,String],default:0},direction:{type:[String],default:"horizontal"},isStopPropagation:{type:Boolean,default:!1},paginationColor:{type:String,default:"#fff"},paginationVisible:{type:[Boolean],default:!1},loop:{type:Boolean,default:!0},duration:{type:[Number,String],default:500},autoPlay:{type:[Number,String],default:0},initPage:{type:[Number,String],default:0},touchable:{type:Boolean,default:!0},isPreventDefault:{type:Boolean,default:!0},isCenter:{type:Boolean,default:!1}},emits:["change"],setup(e,{emit:c,slots:g}){const v=Z(),t=z({active:0,num:0,rect:null,width:0,height:0,moving:!1,offset:0,touchTime:0,autoplayTimer:0,children:[],childrenVNode:[],style:{}}),n=ve(),s=m(()=>({[K]:!0})),l=m(()=>e.direction==="vertical"),u=m(()=>l.value?n.state.deltaY:n.state.deltaX),I=m(()=>n.state.direction===e.direction),r=m(()=>t.children.length),p=m(()=>t[l.value?"height":"width"]),O=m(()=>r.value*p.value),T=m(()=>t.rect?(l.value?t.rect.height:t.rect.width)-p.value*r.value:0),j=m(()=>(t.active+r.value)%r.value),q=(o=+e.initPage)=>{_(),t.rect=v.value.getBoundingClientRect(),o=Math.min(r.value-1,o),t.width=e.width?+e.width:t.rect.width,t.height=e.height?+e.height:t.rect.height,t.active=o,t.offset=G(t.active),t.moving=!0,C(),$()},x=o=>{e.isPreventDefault&&o.preventDefault(),e.isStopPropagation&&o.stopPropagation(),e.touchable&&(n.start(o),t.touchTime=Date.now(),_(),V())},ee=o=>{e.touchable&&t.moving&&(n.move(o),I.value&&y({offset:u.value}))},te=o=>{if(!e.touchable||!t.moving)return;const a=u.value/(Date.now()-t.touchTime);if((Math.abs(a)>.3||Math.abs(u.value)>+(p.value/2).toFixed(2))&&I.value){let i=0;const P=l.value?n.state.offsetY:n.state.offsetX;e.loop?i=P>0?u.value>0?-1:1:0:i=-Math[u.value>0?"ceil":"floor"](u.value/p.value),y({pace:i,isEmit:!0})}else u.value&&y({pace:0});t.moving=!1,C(),$()},$=()=>{e.autoPlay<=0||r.value<=1||(_(),t.autoplayTimer=window.setTimeout(()=>{R(),$()},Number(e.autoPlay)))},R=()=>{V(),n.reset(),b(()=>{b(()=>{t.moving=!1,y({pace:1,isEmit:!0})})})},_=()=>{clearTimeout(t.autoplayTimer)},C=()=>{let o=0;if(!e.isCenter)o=t.offset;else{let a=l.value?t.rect.height-p.value:t.rect.width-p.value;o=t.offset+(t.active===r.value-1?-a/2:a/2)}t.style={transitionDuration:`${t.moving?0:e.duration}ms`,transform:`translate${l.value?"Y":"X"}(${o}px)`,[l.value?"height":"width"]:`${p.value*r.value}px`,[l.value?"width":"height"]:`${l.value?t.width:t.height}px`}},oe=o=>{let a=[],f=g?.default?.();if(f=f.filter(i=>i.children&&Array.isArray(i.children)),f.forEach(i=>{a=a.concat(i.children)}),!t.childrenVNode.length)t.childrenVNode=a.slice(),o.proxy&&t.children.push(o.proxy);else if(t.childrenVNode.length>a.length)t.children=t.children.filter(i=>o.proxy!==i);else if(t.childrenVNode.length<a.length){for(let i=0;i<t.childrenVNode.length;i++)if(a[i].key!==t.childrenVNode[i].key){o.proxy&&t.children.splice(i,0,o.proxy),o.vnode&&t.childrenVNode.splice(i,0,o.vnode);break}t.childrenVNode.length!==a.length&&(o.proxy&&t.children.push(o.proxy),o.vnode&&t.childrenVNode.push(o.vnode))}else t.childrenVNode=a.slice(),o.proxy&&t.children.push(o.proxy)},k=(o,a,f)=>Math.min(Math.max(o,a),f),b=o=>{window.requestAnimationFrame.call(window,o)},G=(o,a=0)=>{let f=o*p.value;e.loop||(f=Math.min(f,-T.value));let i=a-f;return e.loop||(i=k(i,T.value,0)),i},ae=o=>{const{active:a}=t;return o?e.loop?k(a+o,-1,r.value):k(a+o,0,r.value-1):a},y=({pace:o=0,offset:a=0,isEmit:f=!1})=>{if(r.value<=1)return;const{active:i}=t,P=ae(o),S=G(P,a);if(e.loop){if(t.children[0]&&S!==T.value){const M=S<T.value;t.children[0].setOffset(M?O.value:0)}if(t.children[r.value-1]&&S!==0){const M=S>0;t.children[r.value-1].setOffset(M?-O.value:0)}}t.active=P,t.offset=S,f&&i!==t.active&&c("change",j.value),C()},V=()=>{t.moving=!0;const{active:o}=t;o>=r.value&&y({pace:-r.value}),o<=-1&&y({pace:r.value})},ne=()=>{V(),n.reset(),b(()=>{b(()=>{t.moving=!1,y({pace:-1,isEmit:!0})})})};return re("parent",{props:e,size:p,relation:oe}),ie({prev:ne,next:R,to:o=>{V(),n.reset(),b(()=>{b(()=>{t.moving=!1;let a;e.loop&&r.value===o?a=t.active===0?0:o:a=o%r.value,y({pace:a-t.active,isEmit:!0})})})}}),ue(()=>{_()}),ce(()=>{_()}),E(()=>e.initPage,o=>{L(()=>{q(Number(o))})}),E(()=>t.children.length,()=>{L(()=>{q()})}),E(()=>e.autoPlay,o=>{o>0?$():_()}),{onTouchStart:x,onTouchMove:ee,onTouchEnd:te,isVertical:l,classes:s,state:t,componentName:K,slots:g,container:v,activePagination:j}}});function me(e,c,g,v,t,n){return h(),w("view",{ref:"container",class:X(e.classes),onTouchstart:c[0]||(c[0]=(...s)=>e.onTouchStart&&e.onTouchStart(...s)),onTouchmove:c[1]||(c[1]=(...s)=>e.onTouchMove&&e.onTouchMove(...s)),onTouchend:c[2]||(c[2]=(...s)=>e.onTouchEnd&&e.onTouchEnd(...s)),onTouchcancel:c[3]||(c[3]=(...s)=>e.onTouchEnd&&e.onTouchEnd(...s))},[d("view",{class:X({[`${e.componentName}__inner`]:!0,[`${e.componentName}__vertical`]:e.isVertical}),style:W(e.state.style)},[U(e.$slots,"default",{},void 0,!0)],6),U(e.$slots,"page",{},void 0,!0),e.paginationVisible&&!e.slots.page?(h(),w("view",{key:0,class:X({[`${e.componentName}__pagination`]:!0,[`${e.componentName}__pagination-vertical`]:e.isVertical})},[(h(!0),w(Y,null,B(e.state.children.length,(s,l)=>(h(),w("i",{style:W({backgroundColor:e.activePagination===l?e.paginationColor:"#ddd"}),class:X({[`${e.componentName}__pagination-item`]:!0,active:e.activePagination===l}),key:l},null,6))),128))],2)):de("",!0)],34)}const ye=Q(pe,[["render",me],["__scopeId","data-v-fd959449"]]),we={en:{h2_title:{basic:"basic usage",nav:"nav",vertical:"vertical"}},"zh-CN":{h2_title:{basic:"基本使用",nav:"导航指示器",vertical:"纵向"}}},_e={props:{lang:{type:String,default:"en"}},emits:[],components:{Swiper:ye,SwiperItem:se},setup(e){const c=Z(null),{lang:g}=e,v=z({page:2,current:1,list:["https://picsum.photos/id/28/750/300","https://picsum.photos/id/26/750/300","https://picsum.photos/id/30/750/300","https://picsum.photos/id/32/750/300"],list1:[]}),t=n=>{v.current=n+1};return fe(()=>{v.list1=v.list.slice()}),{...he(v),...we[g],swiper:c,change:t}}},be={class:"demo"},Ne={class:"cmp-usage__section"},Se={class:"cmp-usage__title"},Te={class:"demo-box"},$e=["src"],Ve={class:"cmp-usage__section"},Pe={class:"cmp-usage__title"},Xe={class:"demo-box"},Ye=["src"],Be={class:"cmp-usage__section"},Ce={class:"cmp-usage__title"},ke={class:"demo-box"},Me=["src"];function Ee(e,c,g,v,t,n){const s=H("SwiperItem"),l=H("Swiper");return h(),w("div",be,[d("section",Ne,[d("h2",Se,A(e.h2_title.basic),1),d("view",Te,[D(l,{"init-page":e.page,"pagination-visibile":!0,"auto-play":"2000"},{default:N(()=>[(h(!0),w(Y,null,B(e.list,u=>(h(),F(s,{key:u},{default:N(()=>[d("img",{src:u,alt:""},null,8,$e)]),_:2},1024))),128))]),_:1},8,["init-page"])])]),d("section",Ve,[d("h2",Pe,A(e.h2_title.nav),1),d("view",Xe,[D(l,{"init-page":e.page,"pagination-visible":!0,"pagination-color":"cyan","auto-play":"2000"},{default:N(()=>[(h(!0),w(Y,null,B(e.list1,u=>(h(),F(s,{key:u},{default:N(()=>[d("img",{src:u,alt:""},null,8,Ye)]),_:2},1024))),128))]),_:1},8,["init-page"])])]),d("section",Be,[d("h2",Ce,A(e.h2_title.vertical),1),d("view",ke,[D(l,{direction:"vertical","init-page":e.page,"pagination-visible":!0,"pagination-color":"cyan","auto-play":"2000",style:{height:"150px"}},{default:N(()=>[(h(!0),w(Y,null,B(e.list1,u=>(h(),F(s,{key:u},{default:N(()=>[d("img",{src:u,alt:""},null,8,Me)]),_:2},1024))),128))]),_:1},8,["init-page"])])])])}const Oe=Q(_e,[["render",Ee],["__scopeId","data-v-58953363"]]);export{Oe as default};
