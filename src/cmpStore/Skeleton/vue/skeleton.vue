<style lang="scss" scoped>
@import "../skeleton.scss";
</style>
<template>
  <view v-if="loading">
    <slot></slot>
  </view>
  <view v-else class="skeleton">
    <view class="skeleton-animation" v-if="animated"></view>
    <view class="content">
      <view class="content-line" :style="{ width }">
        <view v-if="title" :class="getCls('blockTitle')" :style="{ height }"></view>
        <view v-for="_ in Number(row)" :key="Math.random()" :class="getCls('blockLine')" :style="{ height }"></view>
      </view>
    </view>
  </view>
</template>
<script lang="ts">
import { PropType, CSSProperties, toRefs, computed } from "vue"
import createComponent from "@/utils/vue_component"
const { componentName, create } = createComponent("skeleton")
export default create({
  props: {
    width: {
      type: String,
      default: '100px'
    },
    height: {
      type: String,
      default: '100px'
    },
    animated: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    row: {
      type: String,
      default: '1'
    },
    title: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    }
  },
  emits: [],
  setup(props) {
    const { round, row } = toRefs(props)
    const styles = () => {
      const style: CSSProperties = {}
      return {
        width: '50px',
        height: '50px'
      }
    }
    const getCls = (prefix: string) => {
      return {
        [prefix]: true,
        [`${prefix}--round`]: round.value
      }
    }

    return {
      styles,
      getCls
    }
  },
})
</script>
