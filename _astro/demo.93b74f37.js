import{r as p}from"./index.f1bc5ebf.js";/* empty css                       */import{j as e}from"./jsx-runtime.109e40f8.js";const i={round:!1,animated:!1,loading:!1,height:"20px",width:"100px",title:!1,row:1},n=s=>{const{loading:l,animated:o,round:f,height:d,width:c,title:m,row:h,children:x}={...i,...s},r=t=>`
      ${t}
      ${t}--round
    `,u=t=>Array.from({length:t},(a,j)=>j);return e.jsx(e.Fragment,{children:l?e.jsx("div",{children:x}):e.jsxs("div",{className:r("skeleton"),children:[o&&e.jsx("div",{className:"skeleton-animation"}),e.jsx("div",{className:"content",children:e.jsxs("div",{className:"content-line",style:{width:c},children:[m&&e.jsx("div",{className:"title"}),u(h).map((t,a)=>e.jsx("div",{className:r("blockLine"),style:{height:d}},a))]})})]})})};n.defaultProps=i;n.displayName="ChihuouiSkeleton";const k=()=>{const s=p.useRef(!1);return e.jsx(e.Fragment,{children:e.jsxs("div",{className:"demo",children:[e.jsx("h2",{children:"基础用法"}),e.jsx(n,{row:"6",animated:!0,round:!0,loading:s.current,height:"20px",width:"300px"})]})})};export{k as default};
