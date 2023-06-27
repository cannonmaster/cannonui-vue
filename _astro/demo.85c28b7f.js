import{P as C}from"./price.66023e5b.js";import{c as E,_ as m}from"./_plugin-vue_export-helper.a85d8817.js";/* empty css                       */import{k as g,o as i,c as a,b as t,g as o,i as l,A as h,h as _,F as v,r as b,l as n,m as p,z as F,p as k,a as A}from"./runtime-core.esm-bundler.23703bfe.js";const{componentName:hs,create:B}=E("card"),N=B({components:{Price:C},props:{imgUrl:{type:String,default:""},title:{type:String,default:""},symbol:{type:String,default:""},price:{type:String,default:""},vipPrice:{type:String,default:""},shopDesc:{type:String,default:""},delivery:{type:String,default:""},shopName:{type:String,default:""},isNeedPrice:{type:Boolean,default:!0}},emits:[],setup(e,{emit:r,slots:u}){return{isHaveSlot:d=>u[d]}}}),P={class:"cannonui-card"},S={class:"cannonui-card__left"},w=["src"],j={class:"cannonui-card__right"},U={class:"cannonui-card__right-title"},H={key:0,class:"cannonui-card__right-price"},I={class:"cannonui-card__right-other"},V={class:"cannonui-card__right-shop"},z={class:"cannonui-card__right-shop-name"};function T(e,r,u,s,d,f){const c=g("Price");return i(),a("div",P,[t("div",S,[t("img",{src:e.imgUrl,alt:""},null,8,w)]),t("div",j,[t("div",U,o(e.title),1),l(e.$slots,"prolist",{},void 0,!0),e.isNeedPrice?(i(),a("div",H,[e.isHaveSlot("price")?l(e.$slots,"price",{key:0},void 0,!0):(i(),h(c,{key:1,"is-strike":!0,symbol:e.symbol,price:e.price},null,8,["symbol","price"])),e.isHaveSlot("origin")?l(e.$slots,"origin",{key:2},void 0,!0):(i(),h(c,{key:3,class:"cannonui-card__right-price-origin",price:e.vipPrice,symbol:e.symbol},null,8,["price","symbol"]))])):_("",!0),t("div",I,[e.isHaveSlot("shop-custom-desc")?l(e.$slots,"shop-custom-desc",{key:0},void 0,!0):(i(),a(v,{key:1},[t("span",null,o(e.shopDesc),1),t("span",null,o(e.delivery),1)],64))]),t("div",V,[t("div",z,o(e.shopName),1),e.isHaveSlot("footer")?l(e.$slots,"footer",{key:0},void 0,!0):_("",!0)])])])}const q=m(N,[["render",T],["__scopeId","data-v-ed43e8d2"]]),G={en:{h2_title:{basic:"Basic",custom_prolist_tag:"Custom Prolist Tag",custom_shop_desc:"Custom Shop Desc",custom_footer:"Custom Action"},imgUrl:"https://placehold.co/300x300",title:"wild Alaskan salmon is packed with omega-3s, vitamin D, and other essential nutrients for a delicious and nutritious addition to any meal dshkjewirdskjmhfuierjksdfhkdjsfdjksfhdksjfhdskfdhsfkjdsf",price:"388",vipPrice:"378",shopDesc:"self-operated",delivery:"free delivery",shopName:"The Fishmen Catch",shopCustomDesc:"Fresh and sustainably caught seafood shop. Wide variety of high-quality seafood. Knowledgeable staff to assist with cooking tips and recipes.",shopCustomFooter:"custom footer",priceSymbol:"$",prolist:["jumbo","wild-caught"]},"zh-CN":{h2_title:{basic:"基本使用",custom_prolist_tag:"自定义标签",custom_shop_desc:"自定义店铺描述",custom_footer:"自定义右下角"},imgUrl:"https://placehold.co/300x300",title:"老海公黄鱼酥 酥脆零食高钙高蛋白营养即食小黄鱼干60g/袋组合装",price:"388",vipPrice:"378",shopDesc:"自营",shopCustomDesc:"新鲜且以可持续方式捕捞的海鲜商店。提供多样化的高品质海鲜。有知识渊博的工作人员提供烹饪技巧和食谱建议。",shopCustomFooter:"自定义右下角",delivery:"厂商配送",shopName:"渔夫海鲜旗舰店",prolist:["礼盒","国产"]}},K={props:{lang:{type:String,default:"en"}},emits:[],components:{Card:q},setup(e){const{lang:r}=e;return{state:b({...G[r],symbol:r==="en"?"$":""})}}},y=e=>(k("data-v-ed6530bf"),e=e(),A(),e),L={class:"phone"},W=y(()=>t("div",{class:"phone-top"},"Skeleton",-1)),J={class:"phone-content"},M={class:"cmp-usage__section"},O={class:"cmp-usage__title"},Q={class:"cmp-usage__section--showcase"},R={class:"cmp-usage__section"},X={class:"cmp-usage__title"},Y={class:"cmp-usage__section--showcase"},Z={class:"prolist-tag-group"},x={class:"prolist-tag"},$={class:"cmp-usage__section"},ss={class:"cmp-usage__title"},es={class:"cmp-usage__section--showcase"},ts={class:"custom-desc"},os={class:"cmp-usage__section"},is={class:"cmp-usage__title"},cs={class:"cmp-usage__section--showcase"},as={class:"custom-footer"},rs=y(()=>t("div",{class:"phone-bottom"},null,-1));function ls(e,r,u,s,d,f){const c=g("Card");return i(),a("div",L,[W,t("div",J,[t("section",M,[t("h2",O,o(s.state.h2_title.basic),1),t("section",Q,[n(c,{"img-url":s.state.imgUrl,title:s.state.title,price:s.state.price,vipPrice:s.state.vipPrice,shopDesc:s.state.shopDesc,delivery:s.state.delivery,shopName:s.state.shopName,symbol:s.state.symbol},null,8,["img-url","title","price","vipPrice","shopDesc","delivery","shopName","symbol"])])]),t("section",R,[t("h2",X,o(s.state.h2_title.custom_prolist_tag),1),t("section",Y,[n(c,{"img-url":s.state.imgUrl,title:s.state.title,price:s.state.price,vipPrice:s.state.vipPrice,shopDesc:s.state.shopDesc,delivery:s.state.delivery,shopName:s.state.shopName,symbol:s.state.symbol},{prolist:p(()=>[t("div",Z,[(i(!0),a(v,null,F(s.state.prolist,D=>(i(),a("span",x,o(D),1))),256))])]),_:1},8,["img-url","title","price","vipPrice","shopDesc","delivery","shopName","symbol"])])]),t("section",$,[t("h2",ss,o(s.state.h2_title.custom_shop_desc),1),t("section",es,[n(c,{"img-url":s.state.imgUrl,title:s.state.title,price:s.state.price,vipPrice:s.state.vipPrice,shopDesc:s.state.shopDesc,delivery:s.state.delivery,shopName:s.state.shopName,symbol:s.state.symbol},{"shop-custom-desc":p(()=>[t("div",ts,o(s.state.shopCustomDesc),1)]),_:1},8,["img-url","title","price","vipPrice","shopDesc","delivery","shopName","symbol"])])]),t("section",os,[t("h2",is,o(s.state.h2_title.custom_footer),1),t("section",cs,[n(c,{"img-url":s.state.imgUrl,title:s.state.title,price:s.state.price,vipPrice:s.state.vipPrice,shopDesc:s.state.shopDesc,delivery:s.state.delivery,shopName:s.state.shopName,symbol:s.state.symbol},{footer:p(()=>[t("div",as,o(s.state.shopCustomFooter),1)]),_:1},8,["img-url","title","price","vipPrice","shopDesc","delivery","shopName","symbol"])])])]),rs])}const _s=m(K,[["render",ls],["__scopeId","data-v-ed6530bf"]]);export{_s as default};
