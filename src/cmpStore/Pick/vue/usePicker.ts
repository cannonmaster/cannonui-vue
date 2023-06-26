export interface PickerOption {
    text: string | number;
    value: string | number;
    disabled?: string;
    children?: PickerOption[];
    className?: string | number;
}
  
import { ref, reactive, watch, computed, toRefs, PropType } from 'vue';
import  createComponent  from '@/utils/vue_component';
const { componentName } = createComponent('picker');

export const usePicker = (props: any, emit: any) => {
  const state = reactive({
    formattedColumns: props.columns
  });

  let userSelectedValues = ref<(number | string)[]>([]);

  const pickerColumn = ref<any[]>([]);

  const swipeRef = (el: any) => {
    if (el && pickerColumn.value.length < columnsList.value.length) {
      pickerColumn.value.push(el);
    }
  };

  const classes = computed(() => {
    const prefixCls = componentName;
    return {
      [prefixCls]: true
    };
  });

  const selectedOptions = computed(() => {
    let optins: PickerOption[] = [];
    (columnsList.value as PickerOption[][]).map((column: PickerOption[], index: number) => {
      let currOptions = [];
      currOptions = column.filter((item) => {
        return item.value == userSelectedValues.value[index]
        
      });
      optins.push(currOptions[0]);
      
    });
    
    return optins;
  });

  // 当前类型
  const pickerType = computed(() => {
    const firstColumn: PickerOption | PickerOption[] = state.formattedColumns[0];
    if (firstColumn) {
      if (Array.isArray(firstColumn)) {
        return 'multiple';
      }
      if ('children' in firstColumn) {
        return 'cascade';
      }
    }
    return 'single';
  });
  const columnsList = computed(() => {
    switch (pickerType.value) {
      case 'multiple':
        return state.formattedColumns as PickerOption[][];
      case 'cascade':
        // 级联数据处理
        return formatCascade(state.formattedColumns as PickerOption[], userSelectedValues.value ? userSelectedValues.value : []);
      default:
        return [state.formattedColumns] as PickerOption[][];
    }
  });

  // 级联数据格式化
  const formatCascade = (columns: PickerOption[], defaultValues: (number | string)[]) => {
    const formatted: PickerOption[][] = [];
    let cursor: PickerOption = {
      text: '',
      value: '',
      children: columns
    };

    let columnIndex = 0;

    while (cursor && cursor.children) {
      const options: PickerOption[] = cursor.children;
      const value = defaultValues[columnIndex];
      console.log(value,'default val');
      
      let index = options.findIndex((columnItem) => columnItem.value == value);
      if (index == -1) index = 0;
      cursor = cursor.children[index];

      columnIndex++;
      formatted.push(options);
    }

    console.log(formatted, 'abc');
    

    return formatted;
  };

  const cancel = () => {
    emit('cancel', {
      selectedValue: userSelectedValues.value,
      selectedOptions: selectedOptions.value
    });
  };

  const changeHandler = (columnIndex: number, option: PickerOption) => {
    if (option && Object.keys(option).length) {
      userSelectedValues.value = userSelectedValues.value ? userSelectedValues.value : [];

      if (pickerType.value === 'cascade') {
        userSelectedValues.value[columnIndex] = option.value ? option.value : '';
        let index = columnIndex;
        let cursor = option;
        while (cursor && cursor.children && cursor.children[0]) {
          userSelectedValues.value[index + 1] = cursor.children[0].value;
          index++;
          cursor = cursor.children[0];
        }

        // 当前改变列 的 下一列 children 值为空
        if (cursor && cursor.children && cursor.children.length == 0) {
          userSelectedValues.value = userSelectedValues.value.slice(0, index + 1);
        }
      } else {
        userSelectedValues.value[columnIndex] = option.hasOwnProperty('value') ? option.value : '';
      }

      emit('change', {
        columnIndex: columnIndex,
        selectedValue: userSelectedValues.value,
        selectedOptions: selectedOptions.value
      });
    }
  };

  const confirm = () => {
    if (userSelectedValues.value && !userSelectedValues.value.length) {
      columnsList.value.forEach((columns) => {
        userSelectedValues.value.push(columns[0].value);
      });
    }

    emit('confirm', {
      selectedValue: userSelectedValues.value,
      selectedOptions: selectedOptions.value
    });
  };

  const isSameValue = (valA: any, valB: any) => JSON.stringify(valA) === JSON.stringify(valB);

  watch(
    () => props.modelValue,
    (newValues) => {
      if (!isSameValue(newValues, userSelectedValues.value)) {
        userSelectedValues.value = newValues;
      }
    },
    { deep: true, immediate: true }
  );

  watch(
    userSelectedValues,
    (newValues) => {
      if (!isSameValue(newValues, props.modelValue)) {
        emit('update:modelValue', newValues);
      }
    },
    { deep: true }
  );

  watch(
    () => props.columns,
    (val) => {
      if (val.length) state.formattedColumns = val as PickerOption[];
    }
  );

  return {
    classes,
    ...toRefs(state),
    columnsType: pickerType,
    columnsList,
    cancel,
    changeHandler,
    confirm,
    defaultValues: userSelectedValues,
    pickerColumn,
    swipeRef,
    selectedOptions,
    isSameValue
  };
};
