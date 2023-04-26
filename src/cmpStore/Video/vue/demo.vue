<style lang="scss" scoped></style>
<template>
  <div class="phone">
    <div class="phone-top"></div>
    <div class="phone-content">
      <div class="cannonui-video">
        <h2 class="cmp-usage__title">{{ h2_title.basic }}</h2>
        <Video
          :source="src"
          :type="type"
          :options="options1"
        ></Video>
        <h2 class="cmp-usage__title">{{ h2_title.auto }}</h2>
        <Video
          :source="src"
          :type="type"
          :options="options2"
        ></Video>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
interface Translation {
  [key: string]: {
    h2_title: {
      basic: string;
      auto: string;
    };
  };
}
const translation: Translation = {
  en: {
    h2_title: {
      basic: 'basic',
      auto: 'auto play'
    }
  },
  'zh-CN': {
    h2_title: {
      basic: '简单使用',
      auto: '自动播放'
    }
  }
};
import { reactive, toRefs } from 'vue';
import Video from './video.vue';
export default {
  props: {
    lang: {
      type: String,
      default: 'en'
    }
  },
  emits: [],
  components: { Video },
  setup(props) {
    const { lang } = props;
    const state = reactive({
      src: 'https://storage.360buyimg.com/nutui/video/video_NutUI.mp4',
      type: 'video/mp4',
      options1: {
        autoplay: false,
        volumn: '0.5',
        poster: '',
        loop: false,
        controls: true,
        muted: false,
        disabled: false,
        playsinline: false,
        preload: '',
        touchPlay: false
      },
      options2: {
        autoplay: true,
        volumn: '0.5',
        poster: '',
        loop: false,
        controls: true,
        muted: true,
        disabled: false,
        playsinline: false,
        preload: '',
        touchPlay: 'true'
      }
    });
    return {
      ...translation[lang],
      ...toRefs(state)
    };
  }
};
</script>
