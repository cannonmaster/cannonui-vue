<template>
  <div class="phone">
    <div class="phone-top">Layout</div>
    <div class="phone-content">
      <section class="cmp-usage__section">
        <h2 class="cmp-usage__title">{{ state.h2_title.basic }} - 8 * 3</h2>
        <section class="cmp-usage__section--showcase">
          <Row>
            <Col span="8">
              <div class="flex-content">span:8</div>
            </Col>
            <Col span="8">
              <div class="flex-content">span:8</div>
            </Col>
            <Col span="8">
              <div class="flex-content">span:8</div>
            </Col>
          </Row>
        </section>
      </section>
      <section class="cmp-usage__section">
        <h2 class="cmp-usage__title">{{ state.h2_title.basic }} - 24 * 1</h2>
        <section class="cmp-usage__section--showcase">
          <Row>
            <Col span="24">
              <div class="flex-content">span:24</div>
            </Col>
          </Row>
        </section>
      </section>
      <section class="cmp-usage__section">
        <h2 class="cmp-usage__title">{{ state.h2_title.offset }} - offset6</h2>
        <section class="cmp-usage__section--showcase">
          <Row gutter="20">
            <Col
              span="6"
              offset="6"
            >
              <div class="flex-content">span:6</div>
            </Col>
            <Col span="12">
              <div class="flex-content">span:12</div>
            </Col>
          </Row>
        </section>
      </section>
      <section class="cmp-usage__section">
        <h2 class="cmp-usage__title">{{ state.h2_title.gutter }}</h2>
        <section class="cmp-usage__section--showcase">
          <Row gutter="20">
            <Col span="8">
              <div class="flex-content">span:8</div>
            </Col>
            <Col span="8">
              <div class="flex-content">span:8</div>
            </Col>
            <Col span="8">
              <div class="flex-content">span:8</div>
            </Col>
          </Row>
        </section>
      </section>
      <section class="cmp-usage__section">
        <h2 class="cmp-usage__title">{{ state.h2_title.basic }} - offset4</h2>
        <section class="cmp-usage__section--showcase">
          <Row gutter="20">
            <Col
              span="6"
              offset="4"
            >
              <div class="flex-content">span:6</div>
            </Col>
            <Col span="6">
              <div class="flex-content">span:6</div>
            </Col>
            <Col span="8">
              <div class="flex-content">span:8</div>
            </Col>
          </Row>
        </section>
      </section>
    </div>
    <div class="phone-bottom"></div>
  </div>
</template>
<style lang="scss" scoped>
@import '../demo.scss';
</style>
<script lang="ts">
import Col from '@/cmpStore/Col/vue';
import Row from '@/cmpStore/Row/vue';
import { reactive } from 'vue';
interface Translation {
  [key: string]: {
    h2_title: {
      basic: string;
      gutter: string;
      offset: string;
    };
  };
}
const translation: Translation = {
  en: {
    h2_title: {
      basic: 'Basic',
      offset: 'Usage Offset',
      gutter: 'Gutter'
    }
  },
  'zh-CN': {
    h2_title: {
      basic: '基本使用',
      offset: '缩进用法',
      gutter: 'Gutter'
    }
  }
};
export default {
  components: { Row, Col },
  props: {
    lang: {
      type: String,
      default: 'en'
    }
  },
  setup(props) {
    const { lang } = props;
    const state = reactive({
      ...translation[lang]
    });
    return {
      state
    };
  }
};
</script>
