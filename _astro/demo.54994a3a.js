import{r as o}from"./index.f1bc5ebf.js";import{c as u}from"./index.2e4736b8.js";/* empty css                       */import{j as a}from"./jsx-runtime.109e40f8.js";const x={bordered:!0,data:[],striped:!1,noData:"无数据",style:{},columns:[],className:"",summary:""},_=i=>{const{onSort:l,summary:n,noData:h,children:k,data:t,style:b,striped:j,columns:c,bordered:S}={...x,...i},[r,p]=o.useState(t);console.log(r),o.useEffect(()=>{t&&String(t)!==String(r)&&p(t)},[t]);const m=e=>({"chihuoui-table__main__head__tr--border":i.bordered}),y=e=>{e.sorter&&l&&l(e,r)},N=()=>c?.map((e,s)=>a.jsxs("span",{className:u("chihuoui-table__main__head__tr__th",m()),onClick:()=>y(e),children:[e.title,e.sorter&&" sort"]},e.key)),f=e=>c?.filter(s=>{s.key})[0],g=()=>c.map(e=>[e.key,e.render]),C=e=>(console.log(e,"123"),g().map(([s,d],D)=>a.jsx("span",{className:u("chihuoui-table__main__body__tr__td",m(f(s))),children:typeof e[s]=="function"||typeof d=="function"?a.jsx("div",{children:d?d(e):e[s](e)}):e[s]},s))),v=()=>r?.map((e,s)=>a.jsx("div",{className:"chihuoui-table__main__body__tr",children:C(e)},s));return a.jsxs("div",{className:"chihuoui-table",style:b,children:[a.jsxs("div",{className:u("chihuoui-table__main",{"chihuoui-table__main--striped":j}),children:[a.jsx("div",{className:"chihuoui-table__main__head",children:a.jsx("div",{className:"chihuoui-table__main__head__tr",children:N()})}),a.jsx("div",{className:"chihuoui-table__main__body",children:v()})]}),n&&a.jsx("div",{className:"chihuoui-table__summary",children:a.jsx("span",{className:"chihuoui-table__summary__text",children:n})}),r.length===0&&a.jsx("div",{className:"chihuoui-table__nodata",children:a.jsx("div",{className:"chihuoui-table__nodata",children:a.jsx("div",{className:"chihuoui-table__nodata__text",children:h})})})]})};_.defaultProps=x;_.displayName="ChihuouiTable";const P=()=>{const[i,l]=o.useState([{title:"姓名",key:"name"},{title:"年龄",key:"age"}]),[n,h]=o.useState([{name:"Tom",age:10},{name:"Hi",age:12},{name:"小张",age:16}]);return a.jsx(a.Fragment,{children:a.jsxs("div",{className:"demo",children:[a.jsx("h2",{children:"基础用法"}),a.jsx(_,{columns:i,data:n})]})})};export{P as default};
