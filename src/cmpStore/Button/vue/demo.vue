<style lang="scss" scoped>
.cannonui-button {
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>
<template>
  <div class="phone">
    <div class="phone-top">Button</div>
    <div class="phone-content">
      <section class="cmp-usage__section">
        <h2 class="cmp-usage__title">{{ h2_title.basic }}</h2>
        <Button
          shape="square"
          size="mini"
          type="primary"
        >
          primary
        </Button>
        <Button
          shape="square"
          size="mini"
          type="info"
        >
          info
        </Button>
        <Button
          shape="square"
          size="mini"
          type="success"
        >
          success
        </Button>
        <Button
          shape="square"
          size="mini"
          type="default"
        >
          default
        </Button>
        <Button
          shape="square"
          size="mini"
          type="danger"
        >
          {{ h2_title.basic }}
        </Button>
        <Button
          shape="square"
          size="mini"
          type="warning"
        >
          warning
        </Button>
        <Button
          shape="square"
          size="mini"
          type="warning"
          style="background: pink; color: azure"
        >
          customize
        </Button>
      </section>
      <section class="cmp-usage__section">
        <h2 class="cmp-usage__title">{{ h2_title.shape }}</h2>
        <Button
          type="info"
          shape="square"
          size="small"
        >
          square
        </Button>
        <Button
          type="info"
          shape="round"
          size="small"
        >
          round
        </Button>
        <Button
          type="info"
          shape="round"
          size="small"
          style="border-radius: 26px"
        >
          customize
        </Button>
      </section>
      <section class="cmp-usage__section">
        <h2 class="cmp-usage__title">{{ h2_title.shape }}</h2>
        <Button
          shape="square"
          size="mini"
          type="success"
          style="border-radius: 26px"
        >
          mini
        </Button>
        <Button
          shape="square"
          size="normal"
          type="info"
        >
          normal
        </Button>
        <Button
          shape="square"
          size="small"
          >small</Button
        >
        <Button
          type="primary"
          size="large"
          shape="round"
        >
          large</Button
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
      basic: '类型',
      shape: '形状'
    }
  }
};
import Button from './button.vue';
export default {
  props: {
    lang: {
      type: String,
      default: 'en'
    }
  },
  emits: [],
  components: { Button },
  setup(props) {
    const { lang } = props;
    return {
      ...translation[lang]
    };
  }
};
</script>
