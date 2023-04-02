<style lang="scss" >
@import '../col.scss';
</style>
<template>
  <view :class="classes" :style="styles">
    <slot></slot>
  </view>
</template>
<script lang="ts">
import { PropType, CSSProperties, toRefs, inject, computed } from 'vue';
import createComponent from '@/utils/vue_component';
const { componentName, create } = createComponent('col');
export default create({
  props: {
    span: {
      type: [Number, String],
      default: '24',
    },
    offset: {
      type: [Number, String],
      default: '0',
    },
  },
  emits: [],
  setup(props) {
    const gutter = inject('gutter') as number;
    const prefixCls = componentName;
    const classes = computed(() => {
      return {
        [prefixCls]: true,
        [prefixCls + '-gutter']: gutter,
        [`${prefixCls}-offset-${props.offset}`]: true,
        [prefixCls + '-' + props.span]: true,
      };
    });
    const styles = computed(() => {
      return {
        paddingLeft: gutter / 2 + 'px',
        paddingRight: gutter / 2 + 'px',
      };
    });
    return {
      styles,
      classes,
    };
  },
});
</script>
