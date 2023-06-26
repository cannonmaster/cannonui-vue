<style lang="scss" scoped>
@import '../table.scss';
</style>
<template>
  <Table
    :data="data1"
    :columns="column1"
  ></Table>
</template>
<script lang="ts">
import { reactive, toRefs } from 'vue';
import Table from './table.vue';
export default {
  props: {},
  emits: [],
  components: { Table },
  setup(props) {
    const sampleData = reactive({
      data1: [
        {
          name: 'Tom',
          age: 12
        },
        {
          name: 'Yi',
          age: 16
        }
      ],
      column1: [
        {
          key: 'name',
          title: '名字'
        },
        {
          key: 'age',
          title: '年龄'
        }
      ]
    });
    return {
      ...toRefs(sampleData)
    };
  }
};
</script>
