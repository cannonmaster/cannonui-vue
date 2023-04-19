<style lang="scss" scoped>
.content--title {
  font-size: 1rem;
}
.content--desc {
  font-size: 0.8rem;
}
</style>
<template>
  <section class="cmp-usage__section">
    <h2 class="cmp-usage__title">{{ state.h2_title.round }}</h2>
    <section class="cmp-usage__section--showcase">
      <Skeleton
        row="3"
        animated
        round
        title
        :loading="loading"
        height="16px"
        width="300px"
      >
        <div
          class="content"
          style="width: 300px"
        >
          <h4 class="content--title">{{ state.title }}</h4>
          <div class="content--desc">
            {{ state.content }}
          </div>
        </div>
      </Skeleton>
    </section>
  </section>
  <section class="cmp-usage__section">
    <h2 class="cmp-usage__title">{{ state.h2_title.basic }}</h2>
    <section class="cmp-usage__section--showcase">
      <Skeleton
        row="3"
        animated
        title
        :loading="loading"
        height="20px"
        width="300px"
      >
        <div
          class="content"
          style="width: 300px"
        >
          <h4 class="content--title">{{ state.title }}</h4>
          <div class="content--desc">
            {{ state.content }}
          </div>
        </div>
      </Skeleton>
    </section>
  </section>
</template>
<script lang="ts">
import { onMounted, reactive, ref } from 'vue';
import Skeleton from './skeleton.vue';
interface Translation {
  [key: string]: {
    h2_title: {
      basic: string;
      round: string;
    };
    title: string;
    content: string;
  };
}
const translation: Translation = {
  en: {
    h2_title: {
      basic: 'Basic',
      round: 'Round Corner'
    },
    title: 'Title',
    content: `The Skeleton component can be used to improve the user experience of
          your application by providing visual feedback while content is being
          loaded. This can reduce the perceived loading time and make your
          application feel more responsive.`
  },
  'zh-EN': {
    h2_title: {
      basic: '基本使用',
      round: '圆角'
    },
    title: '标题',
    content: `Skeleton组件可用于通过在内容加载时提供视觉反馈来改善应用程序的用户体验。这可以减少用户感知的加载时间，使您的应用程序更具响应性。`
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
  components: { Skeleton },
  setup(props) {
    const loading = ref(true);
    const { lang } = props;
    const state = reactive({
      ...translation[lang]
    });
    onMounted(() => {
      // mock async req
      setTimeout(() => {
        loading.value = false;
      }, 3000);
    });
    return {
      loading,
      state
    };
  }
};
</script>
