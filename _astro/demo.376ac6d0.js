import{r as a}from"./index.f1bc5ebf.js";/* empty css                       */import{j as n}from"./jsx-runtime.109e40f8.js";const $={placeholder:"",shape:"square",disabled:!1,autoFocus:!1,maxLength:9999,clearable:!0,align:"left",label:"",readOnly:!1},t=i=>{const o=a.useRef(null),[r,l]=a.useState(()=>i.value),{align:B,clearable:h,onClickLeftinIcon:d,leftinIcon:f,readOnly:g,children:X,placeholder:F,shape:E,className:S,disabled:u,actionText:_,leftoutIcon:b,rightinIcon:s,rightoutIcon:O,maxLength:P,autoFocus:k,onCancel:m,onChange:x,onFocus:C,onBlur:v,onClear:j,onClickInput:I,onClickRightoutIcon:p,onClickRightinIcon:N,onClickLeftoutIcon:R}={...$,...i},V=`${B}`,q=e=>{const{value:c}=e.target;x&&x?.(c,e),l(c)},D=e=>{const{value:c}=e.target;C&&C(c,e)},T=e=>{const c=o.current;c&&c.blur();const{value:W}=e.target;v&&v(W,e)};a.useEffect(()=>{l(i.value)},[i.value]),a.useEffect(()=>{if(k){const e=o.current;e&&e.focus()}},[k]);const w=()=>n.jsx("input",{className:`chihuoui-searchbar__input chihuoui-searchbar__input-${V} ${E==="round"?"chihuoui-searchbar__round":""} ${h?"chihuoui-searchbar__input-clear":""}`,ref:o,style:{...i.style,background:i.inputBackground},value:r||"",placeholder:F,disabled:u,readOnly:g,maxLength:P,onChange:e=>q(e),onFocus:e=>D(e),onBlur:e=>T(e),onClick:e=>z(e)}),z=e=>{I&&I(e)},y=(e,c)=>{e==="in-left"?d&&d(r,c):R&&R(r,c)},A=()=>f?n.jsx("div",{className:"chihuoui-searchbar__leftin-icon chihuoui-searchbar__icon",onClick:e=>{y("in-left",e)},children:f}):null,G=()=>b?n.jsx("div",{className:"chihuoui-input__leftout-icon",onClick:e=>y("out-left",e),children:b}):null,H=()=>s?n.jsx("div",{className:"chihuoui-input__rightin-icon chihuoui-input__icon",onClick:e=>L("in-right",e),children:s}):null,J=()=>O?n.jsx("div",{className:"chihuoui-input-rightout-icon",onClick:e=>L("out-right",e)}):null,L=(e,c)=>{e==="in-right"?N&&N(r,c):p&&p(r,c)},K=()=>n.jsx("div",{className:`chihuoui-searchbar__clear ${s?"pos-right":""}`,onClick:e=>Q(e),children:"Clear"}),M=()=>{m&&m()},Q=e=>{u||g||(console.log("clicked"),l(""),j&&j(e))},U=()=>{if(_)return n.jsx("div",{className:"chihuoui-input__action-text",onClick:M,children:_})};return n.jsxs("div",{className:`chihuoui-searchbar ${u?"chihuoui-searchbar__disabled":""} ${S||""}`,style:{...i.style,background:i.background},children:[G(),n.jsxs("div",{className:"chihuoui-searchbar__content",children:[A(),w(),H(),h&&r&&K()]}),J(),U()]})};t.defaultProps=$;t.displayName="ChihuouiSearchBar";const ne=()=>n.jsx(n.Fragment,{children:n.jsxs("div",{className:"demo",children:[n.jsx("h3",{children:"基础用法"}),n.jsx(t,{background:"black",placeholder:"基本使用"}),n.jsx("h3",{children:"基础用法"}),n.jsx(t,{background:"cyan",placeholder:"基本使用",shape:"round"})]})});export{ne as default};
