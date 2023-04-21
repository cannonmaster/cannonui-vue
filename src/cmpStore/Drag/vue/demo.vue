<style lang="scss" scoped>
@import '../drag.scss';
</style>
<template>
  <div class="phone">
    <div class="phone-top">Drag</div>
    <div
      class="phone-content"
      style="overflow-x: hidden; overflow-y: hidden"
      ref="phone"
    >
      <section class="cmp-usage__section">
        <h2 class="cmp-usage__title">{{ lang.h2_title.basic }}</h2>
        <Drag :boundary="info">
          <span :style="btnStyle">drag</span>
        </Drag>
      </section>

      <section class="cmp-usage__section">
        <h2 class="cmp-usage__title">{{ lang.h2_title.direction }}</h2>
        <Drag
          :boundary="info"
          direction="x"
        >
          <span :style="btnStyle">x axis</span>
        </Drag>
        <Drag
          :boundary="info"
          direction="y"
        >
          <span :style="btnStyle">y axis</span>
        </Drag>
      </section>
      <section class="cmp-usage__section">
        <h2 class="cmp-usage__title">{{ lang.h2_title.attract }}</h2>
        <Drag
          :boundary="info"
          attract
        >
          <span :style="btnStyle">x direction</span>
        </Drag>
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
      direction: string;
      attract: string;
    };
  };
}
const translation: Translation = {
  en: {
    h2_title: {
      basic: 'Basic',
      direction: 'Direction',
      attract: 'Snap to grid'
    }
  },
  'zh-CN': {
    h2_title: {
      basic: '基本使用',
      direction: '指定移动方向',
      attract: '吸边'
    }
  }
};
import { onMounted, reactive, ref } from 'vue';
import Drag from './drag.vue';
export default {
  props: {
    lang: {
      type: String,
      default: 'en'
    }
  },
  emits: [],
  components: { Drag },
  setup(props) {
    const lang = reactive({
      ...translation[props.lang]
    });
    const phone = ref<HTMLElement>();
    const btnStyle = {
      borderRadius: '25px',
      padding: '0 18px',
      fontSize: '14px',
      color: '#fff',
      display: 'inline-block',
      lineHeight: '36px',
      background: 'linear-gradient(135deg,#fa2c19 0,#fa6419 100%)'
    };
    const info = reactive({
      left: 0,
      top: 0,
      bottom: 0,
      right: 0
    });
    onMounted(() => {
      const sectionProperty = phone.value?.getBoundingClientRect();

      info.left = sectionProperty?.left || 0;
      info.right = sectionProperty?.right || 0;
      info.top = sectionProperty?.top || 0;
      info.bottom = sectionProperty?.bottom || 0;
    });

    return { btnStyle, phone, info, lang };
  }
};
</script>
