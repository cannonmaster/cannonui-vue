<style lang="scss" scoped>
.cannonui-tag {
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>
<template>
  <div class="phone">
    <div class="phone-top">Tag</div>
    <div class="phone-content">
      <section class="cmp-usage__section">
        <h2 class="cmp-usage__title">{{ h2_title.basic }}</h2>
        <Tag
          type="primary"
          color=""
          textColor=""
          @click="click"
          @close="close"
          >primary</Tag
        >
        <Tag
          type="success"
          color=""
          textColor=""
          @click="click"
          @close="close"
          >success</Tag
        >
        <Tag
          type="danger"
          color=""
          textColor=""
          @click="click"
          @close="close"
          >danger</Tag
        >
        <Tag
          type="warning"
          color=""
          textColor=""
          @click="click"
          @close="close"
          >warning</Tag
        >
        <Tag
          type="warning"
          color=""
          textColor=""
          @click="click"
          @close="close"
          style="background-color: gold; color: #000"
          >customize</Tag
        >
      </section>
      <section class="cmp-usage__section">
        <h2 class="cmp-usage__title">{{ h2_title.shape }}</h2>
        <Tag
          type="primary"
          color=""
          textColor=""
          mark
          @click="click"
          @close="close"
          >mark</Tag
        >
        <Tag
          type="success"
          color=""
          textColor=""
          round
          @click="click"
          @close="close"
          >round</Tag
        >
        <Tag
          type="danger"
          color="#000"
          textColor=""
          plain
          @click="click"
          @close="close"
          >plain</Tag
        >
        <Tag
          type="warning"
          color=""
          textColor=""
          @click="click"
          @close="close"
          >customize</Tag
        >
        <Tag
          type="warning"
          color=""
          textColor=""
          @click="click"
          @close="close"
          closeable
          v-show="display"
          style="background-color: gold; color: #000"
          >Closeable</Tag
        >
      </section>
    </div>
    <div class="phone-bottom"></div>
  </div>
</template>
<script lang="ts">
interface Translation {
  [key: string]: {
    h2_title: {
      basic: string;
      shape: string;
    };
  };
}
const translation: Translation = {
  en: {
    h2_title: {
      basic: 'type',
      shape: 'shape'
    }
  },
  'zh-CN': {
    h2_title: {
      basic: '',
      shape: ''
    }
  }
};
import { ref } from 'vue';
import Tag from './tag.vue';
export default {
  props: {
    lang: {
      type: String,
      default: 'en'
    }
  },
  emits: [],
  components: { Tag },
  setup(props) {
    const display = ref(true);
    const { lang } = props;
    const click = () => {
      console.log('clicked');
    };
    const close = () => {
      display.value = false;
    };

    return { ...translation[lang], click, close, display };
  }
};
</script>
