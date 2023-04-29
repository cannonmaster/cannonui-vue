<style lang="scss" scoped>
@import '../tag.scss';
</style>
<template>
  <view
    :class="classes"
    :style="{ ...style, ...getStyle() }"
    @click="onClick"
  >
    <slot></slot>
    <span
      v-if="closeable"
      @click="onClose"
      class="cannonui-tag__close"
      style="
        width: 12px;
        height: 12px;
        display: flex;
        font-size: 12px;
        align-items: center;
        justify-content: center;
        color: #000;
        padding: 10px;
        background-color: #fff;
        margin-left: 6px;
        border-left: 1px solid #fff;
      "
      >x</span
    >
  </view>
</template>
<script lang="ts">
import createComponent from '@/utils/vue_component';
import type { CSSProperties } from 'react';
import { PropType, computed, toRefs } from 'vue';
const { componentName, create } = createComponent('tag');
export default create({
  props: {
    type: {
      type: String as PropType<'primary' | 'success' | 'danger' | 'warning'>,
      default: 'default'
    },
    color: {
      type: String,
      default: ''
    },
    textColor: {
      type: String,
      default: 'default'
    },
    plain: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    },
    mark: {
      type: Boolean,
      default: false
    },
    closeable: {
      type: Boolean,
      default: false
    },
    style: {
      type: Object,
      default: {}
    }
  },
  emits: ['close', 'click'],
  setup(props, { emit }) {
    const { type, color, plain, round, mark, textColor } = toRefs(props);
    const classes = computed(() => {
      const prefix = componentName;
      return {
        [prefix]: true,
        [`${prefix}--${type.value}`]: type.value,
        [`${prefix}--plain`]: plain.value,
        [`${prefix}--round`]: round.value,
        [`${prefix}--mark`]: mark.value
      };
    });
    const getStyle = (): CSSProperties => {
      const style: CSSProperties = {};
      if (textColor.value) {
        style.color = textColor.value;
      } else if (color.value && plain.value) {
        style.color = color.value;
      }

      if (plain.value) {
        style.background = '#fff';
        style.borderColor = color.value;
      } else if (color.value) {
        style.background = color.value;
      }

      return style;
    };

    const onClose = (e: MouseEvent) => {
      e.stopPropagation();
      emit('close', e);
    };

    const onClick = (e: MouseEvent) => {
      emit('click', e);
    };

    return {
      onClick,
      onClose,
      getStyle,
      classes
    };
  }
});
</script>
