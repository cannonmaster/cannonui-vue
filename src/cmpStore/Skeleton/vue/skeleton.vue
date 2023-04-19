<style lang="scss" scoped>
@import '../skeleton.scss';
</style>
<template>
  <view
    v-if="loading"
    class="cannonui-skeleton"
  >
    <view
      class="skeleton-animation"
      v-if="animated"
    ></view>
    <view class="content">
      <view
        class="content--wrapper"
        :style="{ width }"
      >
        <view
          v-if="title"
          :class="getCls('block-title')"
          :style="{ height }"
        ></view>
        <view
          v-for="_ in Number(row)"
          :key="Math.random()"
          :class="getCls('block-line')"
          :style="{ height }"
        ></view>
      </view>
    </view>
  </view>
  <view v-else>
    <slot></slot>
  </view>
</template>
<script lang="ts">
import createComponent from '@/utils/vue_component';
import { CSSProperties, toRefs } from 'vue';
const { componentName, create } = createComponent('skeleton');
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
    const { round } = toRefs(props);
    const styles = () => {
      const style: CSSProperties = {};
      return {
        width: '50px',
        height: '50px'
      };
    };
    const getCls = (prefix: string) => {
      return {
        [prefix]: true,
        [`${prefix}--round`]: round.value
      };
    };

    return {
      styles,
      getCls
    };
  }
});
</script>
