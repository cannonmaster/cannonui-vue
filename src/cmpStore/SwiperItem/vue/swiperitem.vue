<style lang="scss" scoped>
@import "../swiperitem.scss";
</style>
<template>
  <view :class="classes" :style="style">
    <slot></slot>
  </view>
</template>
<script lang="ts">
import { reactive, inject, PropType, CSSProperties, toRefs, computed, getCurrentInstance, onUnmounted } from "vue"
import createComponent from "@/utils/vue_component"
import useExpose from "@/utils/vue_useExpose"
const { componentName, create } = createComponent("swiperitem")
interface IStyle {
  width?: string
  height?: string
  transform?: string
}
export default create({
  props: {},
  emits: [],
  setup(props) {
    const parent = inject('parent') as any
    parent['relation'](getCurrentInstance())
    const state = reactive({
      offset: 0
    })

    const classes = computed(() => {
      const prefix = componentName
      return {
        [prefix]: true
      }
    })

    const style = computed(() => {
      const style: IStyle = {}
      const direction = parent?.props.direction
      if (parent?.size.value) {
        style[direction === 'horizontal' ? 'width' : 'height'] = `${parent?.size.value}px`
      }

      if (state.offset) {
        style['transform'] = `translate${direction === 'horizontal' ? 'X' : 'Y'}(${state.offset}px)`
      }

      return style
    })
    const setOffset = (offset: number) => {
      state.offset = offset
    }

    onUnmounted(() => {
      parent['relation'](getCurrentInstance(), 'unmount')
    })

    useExpose({ setOffset })

    return {
      style,
      classes
    }
  },
})
</script>
