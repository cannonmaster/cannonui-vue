<template>
  <view
    @click="onClick"
    :style="getStyles"
    :class="classes"
  >
    <view class="switch-button">
      <!-- <span
        v-show="!modelValue"
        class="close-line"
      ></span> -->
      <template v-if="activeText">
        <view
          v-show="modelValue"
          class="cannonui-switch-label open"
          >{{ activeText }}</view
        >
        <view
          v-show="!modelValue"
          class="cannonui-switch-label close"
          >{{ inactiveText }}</view
        >
      </template>
    </view>
  </view>
</template>
<style lang="scss" scoped>
@import '../switch.scss';
</style>
<script lang="ts">
import createComponent from '@/utils/vue_component';
import { computed, watch } from 'vue';
const { componentName, create } = createComponent('switch');
export default create({
  props: {
    modelValue: {
      type: [String, Boolean],
      default: false
    },
    activeValue: {
      type: [String, Number, Boolean],
      default: true
    },
    inactiveValue: {
      type: [String, Number, Boolean],
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    disable: {
      type: Boolean,
      default: false
    },
    activeColor: {
      type: String,
      default: ''
    },
    inactiveColor: {
      type: String,
      defualt: ''
    },
    activeText: {
      type: String,
      default: ''
    },
    inactiveText: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const isActive = computed(() => props.modelValue === props.activeValue);
    const classes = computed(() => ({
      [componentName]: true,
      ['switch-open']: isActive.value && !props.disable,
      ['switch-close']: !isActive.value || props.disable,
      [`${componentName}-base`]: true
    }));
    const getStyles = computed(() => ({
      backgroundColor: isActive.value ? props.activeColor : props.inactiveColor
    }));
    let updateType = '';
    const onClick = (e: any) => {
      if (props.loading || props.disable) return;
      const value = isActive.value ? props.inactiveValue : props.activeValue;
      updateType = 'click';
      emit('update:modelValue', value);
      emit('change', value, e);
    };
    watch(
      () => props.modelValue,
      (v) => {
        if (updateType === 'click') {
          updateType = '';
        } else {
          emit('change', v);
        }
      }
    );
    return {
      classes,
      getStyles,
      onClick
    };
  }
});
</script>
