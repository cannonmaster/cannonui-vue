<template>
  <view
    :class="classes.join(' ')"
    :style="styles"
  >
    <slot></slot>
  </view>
</template>
<script lang="ts">
import createComponent from '@/utils/vue_component';
import { provide } from 'vue';
const { componentName, create } = createComponent('row');
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
      default: 'center'
    },
    align: {
      type: String,
      default: 'flex-center'
    },
    wrap: {
      type: String,
      default: 'nowrap'
    }
  },
  emits: [],
  setup(props) {
    const prefixCls = `${componentName}`;
    provide('gutter', props.gutter);
    const generateClass = (key: string, val: string) => {
      return key ? prefixCls + '-' + key + '-' + val : prefixCls + '-' + val;
    };
    const styles = {
      'column-gap': +props.gutter / 2 + 'px'
    };
    const classes = [
      `${prefixCls}`,
      generateClass('', props.type),
      generateClass('align', props.align),
      generateClass('type', props.type),
      generateClass('justify', props.justify),
      generateClass('flex', props.wrap)
    ];
    return {
      classes,
      styles
    };
  }
});
</script>
<style lang="scss">
@import '../row.scss';
</style>
