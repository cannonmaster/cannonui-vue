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
    props: ["modelValue='false' activeValue='true' inactiveValue='false' disable='false' activeColor='' inactiveColor='' activeText='' inactiveText=''"]
  }
};
