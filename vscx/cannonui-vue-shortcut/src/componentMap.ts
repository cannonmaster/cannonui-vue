export type ComponentMeta = {
  props: String[];
};
export const componentMap: Record<string, ComponentMeta> = {
  card: {
    props: ["img-url='' title='' price='' vip-price='' shop-desc='' delivery='' shop-name='' is-need-price=''"],
  },
  skeleton: {
    props: ["animated title round loading","row=''","width=''","height=''"]
  }
};
