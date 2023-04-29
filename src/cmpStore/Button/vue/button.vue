<style lang="scss" scoped>
@import '../button.scss';
</style>
<template>
  <view
    :class="classes"
    :style="{ ...getStyle, ...style }"
    @click="handleClick"
  >
    <view class="cannonui-button__wrap">
      <view
        :class="{ 'cannonui-button__text': $slots.icon || loading }"
        v-if="$slots.default"
      >
        <slot></slot>
      </view>
    </view>
  </view>
</template>
<script lang="ts">
type shape = 'round' | 'square';
type size = 'large' | 'normal' | 'small' | 'mini';
type type = 'default' | 'primary' | 'info' | 'success' | 'warning' | 'danger';
import createComponent from '@/utils/vue_component';
import { computed, CSSProperties, PropType, toRefs } from 'vue';
const { componentName, create } = createComponent('button');
export default create({
  props: {
    color: String,
    shape: {
      type: String as PropType<shape>,
      default: 'round'
    },
    plain: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String as PropType<type>,
      default: 'default'
    },
    style: {
      type: Object,
      default: {}
    },
    size: {
      type: String as PropType<size>,
      default: 'normal'
    },
    block: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click'],
  setup(props, { emit }) {
    const { type, size, style, shape, disabled, loading, color, plain, block } =
      toRefs(props);
    const handleClick = (e: MouseEvent) => {
      if (!loading.value && !disabled.value) emit('click', e);
    };
    const classes = computed(() => {
      const prefixCls = componentName;
      return {
        [prefixCls]: true,
        [`${prefixCls}--${String(type.value)}`]: type.value,
        [`${prefixCls}--${String(shape.value)}`]: shape.value,
        [`${prefixCls}--${String(size.value)}`]: size.value,
        [`${prefixCls}--plain`]: plain.value,
        [`${prefixCls}--block`]: block.value,
        [`${prefixCls}--disabled`]: disabled.value,
        [`${prefixCls}--loading`]: loading.value
      };
    });
    const getStyle = computed(() => {
      const style: CSSProperties = {};
      if (color?.value) {
        if (plain.value) {
          style.color = color.value;
          style.background = '#fff';
          if (!color.value?.includes('gradient')) {
            style.borderColor = color.value;
          }
        } else {
          style.color = '#fff';
          style.background = color.value;
        }
      }
      return style;
    });

    return {
      classes,
      handleClick,
      getStyle,
      style
    };
  }
});
</script>
