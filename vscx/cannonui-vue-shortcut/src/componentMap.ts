export type ComponentMeta = {
  props: String[];
};
export const componentMap: Record<string, ComponentMeta> = {
  card: {
    props: ["img-url='' title='' price='' vip-price='' shop-desc='' delivery='' shop-name='' is-need-price=''"],
  },
  skeleton: {
    props: ["animated title round loading","row=''","width=''","height=''"]
  },
  row: {
    props: ["type='flex' gutter='0' justify='center' align='flex-center' wrap='nowrap'"]
  },
  col: {
    props: ["span='3' offset='0'"]
  },
  drag: {
    props: ["attract='false' direction='all' style=''"]
  },
  switch: {
    props: ["modelValue='false' activeValue='true' inactiveValue='false' disable activeColor='' inactiveColor='' activeText='' inactiveText=''"]
  },
  infiniteloading: {
    props: ["loadingText='' hasNoMoreData='' threshold='' :hasMore='fn' "]
  },
  search: {
    props: ["clearable inputType='textarea' shape='' label='' background='' inputBackground='' maxLength='9999' v-model='' placeholder='' input-align='left'"] 
  },
  price: {
    props: ["isStrike=false thousand needSymbol symbol='$' price=0 decimalPoint=2"]
  }
}
;
