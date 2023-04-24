<style lang="scss" scoped></style>
<template>
  <div class="phone">
    <div class="phone-top">Skeleton</div>
    <div class="phone-content">
      <h2>{{ h2_title.basic }}</h2>
      <Price
        :thousand="true"
        :price="10000"
        :need-symbol="false"
      />
      <h2>{{ h2_title.thousand }}</h2>
      <Price
        :thousand="true"
        :price="10000"
        :need-symbol="true"
      />
      <h2>{{ h2_title.nothousand }}</h2>
      <Price
        :thousand="false"
        :price="10000"
        :need-symbol="true"
      />
    </div>
    <div class="phone-bottom"></div>
  </div>
</template>
<script lang="ts">
interface Translation {
  [key: string]: {
    h2_title: {
      basic: string;
      thousand: string;
      nothousand: string;
    };
  };
}
const translation: Translation = {
  en: {
    h2_title: {
      basic: 'Basic',
      thousand: 'Thousand',
      nothousand: 'No thousand'
    }
  },
  'zh-CN': {
    h2_title: {
      basic: '基本使用',
      thousand: '千分位',
      nothousand: '无千份位'
    }
  }
};
import { reactive, toRefs } from 'vue';
import Price from './price.vue';
export default {
  props: {
    lang: {
      type: String,
      default: 'en'
    }
  },
  emits: [],
  components: { Price },
  setup(props) {
    const { lang } = props;
    const state = reactive({
      ...translation[lang]
    });
    return {
      ...toRefs(state)
    };
  }
};
</script>
