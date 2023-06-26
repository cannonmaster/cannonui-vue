<style lang="scss" scoped>
@import '../pick.scss';
</style>
<template>
  <div :class="classes">
    <view
      class="cannonui-picker__bar"
      v-if="showToolbar"
    >
      <view
        class="cannonui-picker__left"
        @click="cancel"
        >取消</view
      >
      <view class="cannonui-picker__title"> {{ title }}</view>
      <view
        class="cannonui-picker__right"
        @click="confirmHandler()"
        >ok</view
      >
    </view>

    <slot name="top"></slot>
    <view
      class="cannonui-picker__column"
      :style="columnStyle"
    >
      <view
        class="cannonui-picker__columnitem"
        v-for="(column, columnIndex) in columnsList"
        :key="columnIndex"
      >
        <cannonui-pickcolumn
          :ref="swipeRef"
          :column="column"
          :columnsType="columnsType"
          :value="defaultValues && defaultValues[columnIndex]"
          :threeDimensional="threeDimensional"
          :swipeDuration="swipeDuration"
          :visibleOptionNum="visibleOptionNum"
          :optionHeight="optionHeight"
          @change="
            (option:PickerOption) => {
              changeHandler(columnIndex, option);
            }
          "
        ></cannonui-pickcolumn>
      </view>
    </view>

    <slot name="default"></slot>
  </div>
</template>
<script lang="ts">
import Column from '@/cmpStore/PickColumn/vue';
import createComponent from '@/utils/vue_component';
import type { CSSProperties, PropType } from 'vue';
import { computed, ref } from 'vue';
import { PickerOption, usePicker } from './usePicker';
const { componentName, create } = createComponent('pick');
export default create({
  components: {
    [Column.name]: Column
  },
  props: {
    modelValue: {
      type: Array as PropType<(string | number)[]>,
      default: () => []
    },
    title: {
      type: String,
      default: ''
    },
    cancelText: {
      type: String,
      default: ''
    },
    okText: {
      type: String,
      default: ''
    },
    columns: {
      type: Array as PropType<(PickerOption | PickerOption[])[]>,
      default: () => {
        return [];
      }
    },
    threeDimensional: {
      type: Boolean,
      default: true
    },
    swipeDuration: {
      type: [Number, String],
      default: 1000
    },
    showToolbar: {
      type: Boolean,
      default: true
    },
    visibleOptionNum: {
      type: [Number, String],
      default: 7
    },
    optionHeight: {
      type: [Number, String],
      default: 36
    }
  },
  emits: ['cancel', 'change', 'confirm', 'update:modelValue'],
  setup(props, { emit }) {
    const {
      changeHandler,
      confirm,
      defaultValues,
      columnsList,
      columnsType,
      classes,
      cancel
    } = usePicker(props, emit);
    console.log(columnsList.value, 'column list');

    const pickerColumn = ref<any[]>([]);

    const swipeRef = (el: any) => {
      if (el && pickerColumn.value.length < columnsList.value.length) {
        pickerColumn.value.push(el);
      }
    };
    const columnStyle = computed(() => {
      const styles: CSSProperties = {};
      styles.height = `${+props.visibleOptionNum * +props.optionHeight}px`;
      styles['--lineHeight'] = `${+props.optionHeight}px`;
      return styles;
    });
    const confirmHandler = () => {
      pickerColumn.value.length > 0 &&
        pickerColumn.value.forEach((column) => {
          column.stopMomentum();
        });
      confirm();
    };

    return {
      classes,
      columnsType,
      columnsList,
      cancel,
      changeHandler,
      confirmHandler,
      defaultValues,
      pickerColumn,
      swipeRef,
      columnStyle
    };
  }
});
</script>
