<style lang="scss" scoped>
@import "../searchbar.scss";
</style>
<template>
  <view class="chihuoui-searchbar" :style="searchbarStyle">
    <span class="chihuoui-searchbar__label" v-if="label">{{ label }}</span>
    <view class="chihuoui-searchbar__content">
      <!-- <view v-if="$slots.leftout" class="chihuoui-searchbar__icon chihuoui-searchbar__leftin-icon">
        <slot name="leftout"></slot>
      </view> -->
      <view v-if="$slots.leftin" class="chihuoui-searchbar__icon chihuoui-searchbar__leftin-icon"
        @click="leftIconClick">
        <slot name="leftin"></slot>
      </view>
      <view class="chihuoui-searchbar__input-wrap">
        <form action="#" @submit.prevent="handleSubmit">
          <input :type="inputType" ref="inputSearch" :maxLength="maxLength" :placeholder="placeholder"
            :value="modelValue" :disabled="disabled" :readOnly="readonly" @click="clickInput" @input="valueChange"
            @focus="valueFocus" @blur="valueBlur" :class="shape === 'round' ? 'chihuoui-searchbar__round' : ''"
            class="chihuoui-searchbar__input" :style="styleSearchbar" />
        </form>
        <view @click="handleClear" class="chihuoui-searchbar__clear" v-if="clearable"
          v-show="String(modelValue).length > 0">
          Clear
        </view>
      </view>
      <view v-if="$slots.rightin" class="chihuoui-searchable__search-icon chihuoui-searchbar__iptright-search-icon"
        @click="rightIconClick">
        <slot name="rightin"></slot>
      </view>
    </view>
    <view v-if="$slots.rightout" class="chihuoui-searchbar__search-icon chihuoui-searchbar__right-search-icon">
      <slot name="rightout"></slot>
    </view>
  </view>
</template>
<script lang="ts">
import { PropType, CSSProperties, Ref, toRefs, computed, reactive, ref, onMounted } from "vue"
import createComponent from "@/utils/vue_component"
const { componentName, create } = createComponent("searchbar")
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
  emits: ['search', 'update:modelValue', 'change', 'blur', 'click-input', 'click-left-icon', 'click-right-icon', 'clear'],
  setup(props, { emit }) {
    const state = reactive({ active: false })

    const searchbarStyle = computed(() => {
      return {
        background: props.background
      }
    })
    const inputSearchbarStyle = computed(() => {
      return {
        background: props.inputBackground
      }
    })
    const valueChange = (e: Event) => {
      const input = e.target as HTMLInputElement
      let val = input.value
      if (props.maxLength && val.length > Number(props.maxLength)) {
        val = val.slice(0, Number(props.maxLength))
      }
      emit('update:modelValue', val, e)
      emit('change', val, e)
    }

    const focusCss = ref({})
    const valueFocus = (e: Event) => {
      const input = e.target as HTMLInputElement
      let value = input.value
      state.active = true
      focusCss.value = props.focusStyle
    }

    const valueBlur = (e: Event) => {
      setTimeout(() => {
        state.active = false
      }, 0)
      const input = e.target as HTMLInputElement
      let value = input.value
      if (props.maxLength && value.length > Number(props.maxLength)) {
        value = value.slice(0, Number(props.maxLength))
      }
      focusCss.value = {}
      emit('blur', value, e)
    }

    const handleClear = (e: Event) => {
      emit('update:modelValue', '', e)
      emit('change', '', e)
      emit('clear', '')
    }

    const clickInput = (e: Event) => {
      emit('click-input', e)
    }

    const handleSubmit = () => {
      emit('search', props.modelValue)
    }

    const leftIconClick = (e: Event) => {
      emit('click-left-icon', props.modelValue, e)
    }

    const rightIconClick = (e: Event) => {
      emit('click-right-icon', props.modelValue, e)
    }

    const styleSearchbar = computed(() => {
      const style: CSSProperties = {
        textAlign: props.inputAlign as any
      }
      return style
    })
    const inputSearch: Ref<HTMLElement | null> = ref(null)
    onMounted(() => {
      if (props.autoFocus) {
        inputSearch.value?.focus()
      }
    })

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
    }

  },
})
</script>
