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
  }
};
