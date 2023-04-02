<template>
  <view :class="classes()">
    <slot></slot>
  </view>
</template>
<script lang="ts">
import { PropType, CSSProperties, toRefs, computed, provide } from "vue"
import createComponent from "@/utils/vue_component"
const { componentName, create } = createComponent("row")
export default create({
  props: {
    type: {
      type: String,
      default: 'flex'
    },
    gutter: {
      type: [Number, String],
      default: 0
    },
    justify: {
      type: String,
      default: "center"
    },
    align: {
      type: String,
      default: "flex-center"
    },
    flex: {
      type: String,
      default: "wrap"
    }
  },
  emits: [],
  setup(props) {

    provide('gutter', props.gutter)
    const prefixCls = `${componentName}`
    const gClass = (key:string, val: string)=>{
      return key ? prefixCls+'-'+key + '-' + val : prefixCls + '-' + val
    }
    const classes = ()=>{
      return `
        ${prefixCls}
        ${gClass('', props.type)}
        ${gClass('align', props.align)}
        ${gClass('type', props.type)}
        ${gClass('justify', props.justify)}
        ${gClass('flex', props.flex)}
      `
    }
    return {
      classes
    }
  },
})
</script>
<style lang="scss">
  @import '../row.scss'
</style>