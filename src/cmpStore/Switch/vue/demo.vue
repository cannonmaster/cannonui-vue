<style lang="scss" scoped></style>
<template>
  <h2>基本使用</h2>
  <Switch v-model="checked" />
  <h2>禁用状态</h2>
  <Switch
    disable
    v-model="checked"
  />
  <h2>onChange</h2>
  <Switch
    v-model="checked"
    @change="change"
  />
  <h2>异步控制</h2>
  <Switch
    :model-Value="isAsync"
    @change="changeAsync"
  />
  <h2>自定义颜色</h2>
  <Switch
    v-model="checked"
    activeColor="cyan"
  />
  <h2>自定义文字</h2>
  <Switch
    v-model="checked"
    activeText="开"
    inactiveText="关"
  />
</template>
<script lang="ts">
import Switch from '@/cmpStore/Switch/vue';
import { ref } from 'vue';
export default {
  props: {},
  emits: [],
  components: {
    Switch
  },
  setup(props) {
    const isAsync = ref(false);
    const change = (value: Boolean, e: any) => {
      console.log('change function called');
    };
    const changeAsync = (value: Boolean, e: any) => {
      setTimeout(() => {
        isAsync.value = !isAsync.value;
      }, 2000);
    };
    const checked = ref(false);
    return {
      checked,
      isAsync,
      changeAsync,
      change
    };
  }
};
</script>
