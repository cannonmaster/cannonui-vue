<style lang="scss" scoped>
@import "../table.scss";
</style>
<template>
  <view :class="classes" :style="style">
    <view class="chihuoui-table__main" :class="{ 'chihuoui-table__main--striped': striped }">
      <view class="chihuoui-table__main__head">
        <view class="chihuoui-table__main__head__tr">
          <span v-for="column in columns" :key="column.key" class="chihuoui-table__main__head__tr__th"
            @click="handleSortClick(column)" :class="cellClasses(column)">
            {{ column.title }}
            <slot name="icon"></slot>
            <span v-if="!$slots.icon && column.sortFun && typeof column.sortFun === 'function'"> 排序</span>
          </span>
        </view>
      </view>
      <view class="chihuoui-table__main__body">
        <view class="chihuoui-table__main__body__tr" v-for="item in curData" :key="(item as any)">
          <span :class="cellClasses(getColumnItem(value))" class="chihuoui-table__main__body__tr__td"
            v-for="[value, render] in getColumnKeyValueAndRender" :key="value">
            <RenderColumn :data="item" :render="render" :value="item[value]" />
            <!-- {{ renderData(data, value, render) }} -->
          </span>
        </view>
      </view>
    </view>
  </view>
</template>
<script lang="ts">
import { PropType, CSSProperties, toRefs, reactive, watch, computed, onMounted, h } from "vue"
import createComponent from "@/utils/vue_component"
import RenderColumn from './renderColumn'

interface TableColumnProps {
  key: string,
  title: string,
  render?: (data: any) => void,
  sortFun?: (item: TableColumnProps) => void
}
const { componentName, create } = createComponent("table")
export default create({
  components: { RenderColumn },
  props: {
    columns: {
      type: Array<TableColumnProps>,
      default: [
        {
          title: '',
          key: ''
        }
      ]
    },
    style: {
      type: Object,
      default: {}
    },
    bordered: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array<Record<string, any>>,
      default: []
    },
    summary: {
      type: String,
      default: ''
    },
    noData: {
      type: String,
      default: ''
    },
    striped: {
      type: Boolean,
      default: false
    },
  },
  emits: ['onSort'],
  setup(props, { emit }) {
    const info = reactive({
      curData: props.data,
    })
    watch(() => props.data, (val) => {
      info.curData = val.slice()
    })

    const classes = computed(() => {
      return {
        [componentName]: true
      }
    })

    const cellClasses = (item: any) => {
      return {
        'chihuoui-table__main__head__tr--border': props.bordered,
        [`chihuoui-table__main__head__tr--align${item.align ? item.align : ''}`]: true
      }
    }

    const getColumnKeyValueAndRender = computed(() => {

      return props.columns.map((column: TableColumnProps) => {

        return [column.key, column.render] as [string, (data: any) => void | undefined]
      })
    })

    const getColumnItem = (keyVal: string) => {

      return props.columns.filter((column: TableColumnProps) => {
        return column.key === keyVal
      })[0]
    }

    // const renderData = (data: Record<string, any>, columnKeyValueAsDataKey: any, render: ((data: Record<string, any>) => void) | undefined) => {

    //   return h('view', {}, render && typeof render === 'function' ? render(data) : data[columnKeyValueAsDataKey])
    // }

    const handleSortClick = (item: TableColumnProps) => {
      return item.sortFun && emit('onSort', item, info.curData)
    }

    return {
      ...toRefs(info),
      handleSortClick,
      getColumnItem,
      cellClasses,
      classes,
      getColumnKeyValueAndRender,
    }
  },
})
</script>
