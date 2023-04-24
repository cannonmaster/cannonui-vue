<style lang="scss" scoped></style>
<template>
  <div class="phone">
    <div class="phone-top">Search</div>
    <div class="phone-content">
      <h3>{{ h2_title.basic }}</h3>
      <SearchBar
        v-model="searchValue"
        :placeholder="h2_title.basic"
        background="cyan"
        :focus-style="{ border: '1px solid cyan' }"
      />
      <h3></h3>
      <SearchBar
        v-model="searchValue"
        :placeholder="h2_title.round"
        background="yellow"
        :label="h2_title.leftText"
        shape="round"
        :focus-style="{ border: '1px solid cyan' }"
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
      round: string;
      leftText: string;
    };
  };
}
const translation: Translation = {
  en: {
    h2_title: {
      basic: 'Basic',
      round: 'Round',
      leftText: 'left label'
    }
  },
  'zh-CN': {
    h2_title: {
      basic: '基本使用',
      round: '圆角',
      leftText: '左标签'
    }
  }
};
import { reactive, toRefs } from 'vue';
import SearchBar from './searchbar.vue';
export default {
  props: {
    lang: {
      type: String,
      default: 'en'
    }
  },
  emits: [],
  components: { SearchBar },
  setup(props) {
    const { lang } = props;
    const state = reactive({
      searchValue: '',
      ...translation[lang]
    });
    return {
      ...toRefs(state)
    };
  }
};
</script>
