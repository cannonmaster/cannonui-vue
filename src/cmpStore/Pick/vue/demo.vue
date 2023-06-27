<style lang="scss" scoped></style>
<template>
  <div class="phone">
    <div class="phone-top">Pick</div>
    <div class="phone-content">
      <h2></h2>
      <Pick
        :columns="columns"
        title="123"
        @confirm="confirm"
      ></Pick>
    </div>
    <div class="phone-bottom"></div>
  </div>
</template>
<script lang="ts">
import { computed } from 'vue';
import Pick from './pick.vue';
export default {
  props: {},
  emits: [],
  components: { Pick },
  setup(props) {
    const columns = computed(() => [
      { text: 'nanJing', value: 'NanJing' },
      { text: 'wuXi', value: 'WuXi' },
      { text: 'zangZu', value: 'ZangZu' },
      { text: 'beiJing', value: 'BeiJing' },
      { text: 'lianYunGang', value: 'LianYunGang' },
      { text: 'zheJiang', value: 'ZheJiang' },
      { text: 'jiangSu', value: 'JiangSu' }
    ]);
    const confirm = ({
      selectedValue,
      selectedOptions
    }: {
      selectedValue: string[];
      selectedOptions: any;
    }) => {
      console.log('confirm');
    };
    return {
      columns,
      confirm
    };
  }
};
</script>
