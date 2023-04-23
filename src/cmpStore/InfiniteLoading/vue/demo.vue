<style lang="scss" scoped></style>
<template>
  <div class="phone">
    <div class="phone-top">Infinite loading</div>
    <div class="phone-content">
      <ul class="styleul">
        <InfiniteLoading
          :loading-text="loading"
          :has-no-more-data="hasNoMore"
          :hasMore="hasMore"
          @refresh-on-pull="(completed) => refreshOnPull(completed)"
          @load-more="(completed) => loadMore(completed)"
        >
          <li
            v-for="(item, index) in defaultlist"
            :key="index"
            class="styleli"
          >
            {{ item }}
          </li>
        </InfiniteLoading>
      </ul>
    </div>
    <div class="phone-bottom"></div>
  </div>
</template>
<script lang="ts">
interface Translation {
  [key: string]: {
    h2_title: {
      basic: string;
    };
    loading: string;
    hasNoMore: string;
  };
}
const translation: Translation = {
  en: {
    h2_title: {
      basic: 'Basic'
    },
    loading: 'Loading...',
    hasNoMore: 'No more data'
  },
  'zh-CN': {
    h2_title: {
      basic: '基本'
    },
    loading: '加载...',
    hasNoMore: '全部加载完成~'
  }
};
import { onMounted, reactive, ref, toRefs } from 'vue';
import '../demo.scss';
import InfiniteLoading from './infiniteloading.vue';
export default {
  props: {
    lang: {
      type: String,
      default: 'en'
    }
  },
  emits: [],
  components: { InfiniteLoading },
  setup(props) {
    const { lang } = props;
    const data = reactive({
      defaultlist: []
    });
    const hasMore = ref(true);
    const loadMore = (completed: () => void) => {
      setTimeout(() => {
        const len = data.defaultlist.length;
        if (len > 30) {
          hasMore.value = false;
          completed();
          return;
        }
        for (let i = len; i < len + 10; i++) {
          data.defaultlist.push(`${i}`);
        }
        completed();
      }, 600);
    };
    const refreshOnPull = (completed: () => void) => {
      return new Promise((res, rej) => {
        setTimeout(() => {
          completed();
          res('1');
        }, 2000);
      });
    };
    onMounted(() => {
      init();
    });
    const init = () => {
      for (let i = 0; i < 10; i++) {
        data.defaultlist.push(`${i}`);
      }
    };
    return {
      refreshOnPull,
      ...toRefs(data),
      hasMore,
      loadMore,
      ...translation[lang]
    };
  }
};
</script>
