import{c as g,_ as f}from"./_plugin-vue_export-helper.a85d8817.js";import{H as v,I as $,r as b,x as S,d as y,t as k,k as C,o as n,c as s,b as u,F as p,z as h,n as i,q as w,g as D,i as F,h as B,l as N,j as R,A as V}from"./runtime-core.esm-bundler.23703bfe.js";/* empty css                       */const A=v({setup(e){return()=>$("view",{},e.render?e.render(e.data):e.value)},props:{data:{type:Object,default:{}},value:{type:[String,Number],default:""},render:{type:[Function],default:void 0}}}),{componentName:I,create:T}=g("table"),j=T({components:{RenderColumn:A},props:{columns:{type:Array,default:[{title:"",key:""}]},style:{type:Object,default:{}},bordered:{type:Boolean,default:!0},data:{type:Array,default:[]},summary:{type:String,default:""},noData:{type:String,default:""},striped:{type:Boolean,default:!1}},emits:["onSort"],setup(e,{emit:o}){const r=b({curData:e.data});S(()=>e.data,t=>{r.curData=t.slice()});const c=y(()=>({[I]:!0})),d=t=>({"chihuoui-table__main__head__tr--border":e.bordered,[`chihuoui-table__main__head__tr--align${t.align?t.align:""}`]:!0}),_=y(()=>e.columns.map(t=>[t.key,t.render])),l=t=>e.columns.filter(m=>m.key===t)[0],a=t=>t.sortFun&&o("onSort",t,r.curData);return{...k(r),handleSortClick:a,getColumnItem:l,cellClasses:d,classes:c,getColumnKeyValueAndRender:_}}}),z={class:"chihuoui-table__main__head"},E={class:"chihuoui-table__main__head__tr"},K=["onClick"],O={key:0},q={class:"chihuoui-table__main__body"};function G(e,o,r,c,d,_){const l=C("RenderColumn");return n(),s("view",{class:i(e.classes),style:R(e.style)},[u("view",{class:i(["chihuoui-table__main",{"chihuoui-table__main--striped":e.striped}])},[u("view",z,[u("view",E,[(n(!0),s(p,null,h(e.columns,a=>(n(),s("span",{key:a.key,class:i(["chihuoui-table__main__head__tr__th",e.cellClasses(a)]),onClick:t=>e.handleSortClick(a)},[w(D(a.title)+" ",1),F(e.$slots,"icon",{},void 0,!0),!e.$slots.icon&&a.sortFun&&typeof a.sortFun=="function"?(n(),s("span",O," 排序")):B("",!0)],10,K))),128))])]),u("view",q,[(n(!0),s(p,null,h(e.curData,a=>(n(),s("view",{class:"chihuoui-table__main__body__tr",key:a},[(n(!0),s(p,null,h(e.getColumnKeyValueAndRender,([t,m])=>(n(),s("span",{class:i([e.cellClasses(e.getColumnItem(t)),"chihuoui-table__main__body__tr__td"]),key:t},[N(l,{data:a,render:m,value:a[t]},null,8,["data","render","value"])],2))),128))]))),128))])],2)],6)}const H=f(j,[["render",G],["__scopeId","data-v-49896c45"]]),L={props:{},emits:[],components:{Table:H},setup(e){const o=b({data1:[{name:"Tom",age:12},{name:"Yi",age:16}],column1:[{key:"name",title:"名字"},{key:"age",title:"年龄"}]});return{...k(o)}}};function Y(e,o,r,c,d,_){const l=C("Table");return n(),V(l,{data:e.data1,columns:e.column1},null,8,["data","columns"])}const Q=f(L,[["render",Y],["__scopeId","data-v-d2d5d417"]]);export{Q as default};
