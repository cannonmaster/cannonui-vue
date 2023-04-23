<style lang="scss" scoped></style>
<template>
  <div class="phone">
    <div class="phone-top">Skeleton</div>
    <div class="phone-content">
      <h2 class="cmp-usage__title">{{ state.h2_title.basic }}</h2>
      <Switch v-model="checked" />
      <h2 class="cmp-usage__title">{{ state.h2_title.disabled }}</h2>
      <Switch
        disable
        v-model="checked"
      />
      <h2 class="cmp-usage__title">{{ state.h2_title.onchange }}</h2>
      <Switch
        v-model="checked"
        @change="change"
      />
      <h2 class="cmp-usage__title">{{ state.h2_title.async }}</h2>
      <Switch
        :model-Value="isAsync"
        @change="changeAsync"
      />
      <h2 class="cmp-usage__title">{{ state.h2_title.customizecolor }}</h2>
      <Switch
        v-model="checked"
        activeColor="cyan"
      />
      <h2 class="cmp-usage__title">{{ state.h2_title.customizetext }}</h2>
      <Switch
        v-model="checked"
        :activeText="state.h2_title.customizetexton"
        :inactiveText="state.h2_title.customizetextoff"
      />
    </div>
    <div class="phone-bottom"></div>
  </div>
</template>
<script lang="ts">
import Switch from '@/cmpStore/Switch/vue';
import { reactive, ref } from 'vue';
interface Translation {
  [key: string]: {
    h2_title: {
      basic: string;
      disabled: string;
      onchange: string;
      async: string;
      customizecolor: string;
      customizetext: string;
      customizetexton: string;
      customizetextoff: string;
    };
  };
}
const translation: Translation = {
  en: {
    h2_title: {
      basic: 'Basic',
      onchange: 'onchange callback',
      async: 'Async',
      customizecolor: 'Customize Color',
      customizetext: 'Customize Text',
      disabled: 'Disabled',
      customizetexton: 'on',
      customizetextoff: 'off'
    }
  },
  'zh-CN': {
    h2_title: {
      basic: '基本使用',
      onchange: 'onchange 回调',
      async: '异步',
      customizecolor: '自定义颜色',
      customizetext: '自定义文字',
      disabled: '禁用状态',
      customizetextoff: '关',
      customizetexton: '开'
    }
  }
};
export default {
  props: {
    lang: {
      type: String,
      default: 'en'
    }
  },
  emits: [],
  components: {
    Switch
  },
  setup(props) {
    const { lang } = props;
    const isAsync = ref(false);
    const change = (value: Boolean, e: any) => {
      console.log('change function called');
    };
    const changeAsync = (value: Boolean, e: any) => {
      setTimeout(() => {
        isAsync.value = !isAsync.value;
      }, 2000);
    };
    const state = reactive({
      ...translation[lang]
    });
    const checked = ref(false);
    return {
      checked,
      state,
      isAsync,
      changeAsync,
      change
    };
  }
};
</script>
