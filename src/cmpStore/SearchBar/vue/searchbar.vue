<style lang="scss" scoped>
@import '../searchbar.scss';
</style>
<template>
  <view
    class="cannonui-searchbar"
    :style="searchbarStyle"
  >
    <span
      class="cannonui-searchbar__label"
      v-if="label"
      >{{ label }}</span
    >
    <view class="cannonui-searchbar__content">
      <!-- <view v-if="$slots.leftout" class="cannonui-searchbar__icon cannonui-searchbar__leftin-icon">
        <slot name="leftout"></slot>
      </view> -->
      <view
        v-if="$slots.leftin"
        class="cannonui-searchbar__icon cannonui-searchbar__leftin-icon"
        @click="leftIconClick"
      >
        <slot name="leftin"></slot>
      </view>
      <view class="cannonui-searchbar__input-wrap">
        <form
          action="#"
          @submit.prevent="handleSubmit"
        >
          <input
            :type="inputType"
            ref="inputSearch"
            :maxLength="maxLength"
            :placeholder="placeholder"
            :value="modelValue"
            :disabled="disabled"
            :readOnly="readonly"
            @click="clickInput"
            @input="valueChange"
            @focus="valueFocus"
            @blur="valueBlur"
            :class="shape === 'round' ? 'cannonui-searchbar__round' : ''"
            class="cannonui-searchbar__input"
            :style="styleSearchbar"
          />
        </form>
        <view
          @click="handleClear"
          class="cannonui-searchbar__clear"
          v-if="clearable"
          v-show="String(modelValue).length > 0"
        >
          Clear
        </view>
      </view>
      <view
        v-if="$slots.rightin"
        class="cannonui-searchable__search-icon cannonui-searchbar__iptright-search-icon"
        @click="rightIconClick"
      >
        <slot name="rightin"></slot>
      </view>
    </view>
    <view
      v-if="$slots.rightout"
      class="cannonui-searchbar__search-icon cannonui-searchbar__right-search-icon"
    >
      <slot name="rightout"></slot>
    </view>
  </view>
</template>
<script lang="ts">
import createComponent from '@/utils/vue_component';
import {
  CSSProperties,
  Ref,
  computed,
  onMounted,
  reactive,
  ref,
  toRefs
} from 'vue';
const { componentName, create } = createComponent('searchbar');
export default create({
  props: {
    clearable: {
      type: [Boolean],
      default: true
    },
    inputType: {
      type: [String],
      default: 'textarea'
    },
    shape: {
      type: [String],
      default: ''
    },
    label: {
      type: [String],
      default: ''
    },
    disabled: {
      type: [Boolean],
      default: false
    },
    autoFocus: {
      type: [Boolean],
      default: false
    },
    readonly: {
      type: [Boolean],
      default: false
    },
    background: {
      type: [String],
      default: ''
    },
    inputBackground: {
      type: [String],
      default: ''
    },
    maxLength: {
      type: [Number],
      default: 9999
    },
    focusStyle: {
      type: Object,
      default: {}
    },
    modelValue: {
      type: [String, Number],
      default: ''
    },
    placeholder: {
      type: [String],
      default: ''
    },
    inputAlign: {
      type: [String],
      default: 'left'
    }
  },
  emits: [
    'search',
    'update:modelValue',
    'change',
    'blur',
    'click-input',
    'click-left-icon',
    'click-right-icon',
    'clear'
  ],
  setup(props, { emit }) {
    const state = reactive({ active: false });

    const searchbarStyle = computed(() => {
      return {
        background: props.background
      };
    });
    const inputSearchbarStyle = computed(() => {
      return {
        background: props.inputBackground
      };
    });
    const valueChange = (e: Event) => {
      const input = e.target as HTMLInputElement;
      let val = input.value;
      if (props.maxLength && val.length > Number(props.maxLength)) {
        val = val.slice(0, Number(props.maxLength));
      }
      emit('update:modelValue', val, e);
      emit('change', val, e);
    };

    const focusCss = ref({});
    const valueFocus = (e: Event) => {
      const input = e.target as HTMLInputElement;
      let value = input.value;
      state.active = true;
      focusCss.value = props.focusStyle;
    };

    const valueBlur = (e: Event) => {
      setTimeout(() => {
        state.active = false;
      }, 0);
      const input = e.target as HTMLInputElement;
      let value = input.value;
      if (props.maxLength && value.length > Number(props.maxLength)) {
        value = value.slice(0, Number(props.maxLength));
      }
      focusCss.value = {};
      emit('blur', value, e);
    };

    const handleClear = (e: Event) => {
      emit('update:modelValue', '', e);
      emit('change', '', e);
      emit('clear', '');
    };

    const clickInput = (e: Event) => {
      emit('click-input', e);
    };

    const handleSubmit = () => {
      emit('search', props.modelValue);
    };

    const leftIconClick = (e: Event) => {
      emit('click-left-icon', props.modelValue, e);
    };

    const rightIconClick = (e: Event) => {
      emit('click-right-icon', props.modelValue, e);
    };

    const styleSearchbar = computed(() => {
      const style: CSSProperties = {
        textAlign: props.inputAlign as any
      };
      return style;
    });
    const inputSearch: Ref<HTMLElement | null> = ref(null);
    onMounted(() => {
      if (props.autoFocus) {
        inputSearch.value?.focus();
      }
    });

    return {
      inputSearch,
      ...toRefs(state),
      valueChange,
      valueFocus,
      valueBlur,
      handleClear,
      handleSubmit,
      searchbarStyle,
      inputSearchbarStyle,
      focusCss,
      clickInput,
      leftIconClick,
      rightIconClick,
      styleSearchbar
    };
  }
});
</script>
