<style lang="scss" scoped>
@import '../swiper.scss';
</style>
<template>
  <div class="demo">
    <section class="cmp-usage__section">
      <h2 class="cmp-usage__title">{{ h2_title.basic }}</h2>
      <view class="demo-box">
        <Swiper
          :init-page="page"
          :pagination-visibile="true"
          auto-play="2000"
        >
          <SwiperItem
            v-for="item in list"
            :key="item"
          >
            <img
              :src="item"
              alt=""
            />
          </SwiperItem>
        </Swiper>
      </view>
    </section>
    <section class="cmp-usage__section">
      <h2 class="cmp-usage__title">{{ h2_title.nav }}</h2>
      <view class="demo-box">
        <Swiper
          :init-page="page"
          :pagination-visible="true"
          pagination-color="cyan"
          auto-play="2000"
        >
          <SwiperItem
            v-for="item in list1"
            :key="item"
          >
            <img
              :src="item"
              alt=""
            />
          </SwiperItem>
        </Swiper>
      </view>
    </section>
    <section class="cmp-usage__section">
      <h2 class="cmp-usage__title">{{ h2_title.vertical }}</h2>
      <view class="demo-box">
        <Swiper
          direction="vertical"
          :init-page="page"
          :pagination-visible="true"
          pagination-color="cyan"
          auto-play="2000"
          style="height: 150px"
        >
          <SwiperItem
            v-for="item in list1"
            :key="item"
          >
            <img
              :src="item"
              alt=""
            />
          </SwiperItem>
        </Swiper>
      </view>
    </section>
  </div>
</template>
<script lang="ts">
interface Translation {
  [key: string]: {
    h2_title: {
      basic: string;
      nav: string;
      vertical: string;
    };
  };
}
const translation: Translation = {
  en: {
    h2_title: {
      basic: 'basic usage',
      nav: 'nav',
      vertical: 'vertical'
    }
  },
  'zh-CN': {
    h2_title: {
      basic: '基本使用',
      nav: '导航指示器',
      vertical: '纵向'
    }
  }
};
import SwiperItem from '@/cmpStore/SwiperItem/vue';
import { onMounted, reactive, ref, toRefs } from 'vue';
import Swiper from './swiper.vue';
export default {
  props: {
    lang: {
      type: String,
      default: 'en'
    }
  },
  emits: [],
  components: { Swiper, SwiperItem },
  setup(props) {
    const swiper = ref(null);
    const { lang } = props;
    const state = reactive({
      page: 2,
      current: 1,
      list: [
        'https://picsum.photos/id/28/750/300',
        'https://picsum.photos/id/26/750/300',
        'https://picsum.photos/id/30/750/300',
        'https://picsum.photos/id/32/750/300'
      ],
      list1: [] as string[]
    });
    const change = (index: number) => {
      state.current = index + 1;
    };
    onMounted(() => {
      state.list1 = state.list.slice();
    });
    return {
      ...toRefs(state),
      ...translation[lang],
      swiper,
      change
    };
  }
};
</script>
<style lang="scss" scoped>
.demo-box {
  position: relative;

  .cannonui-swiperitem {
    height: 150px;

    img {
      width: 100%;
      height: 100%;
    }
  }
  &.vertical-center {
    height: 300px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  ::v-deep(.cannonui-swiper-pagination-vertical) {
    i {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      &.active {
        height: 18px;
        border-radius: 5px;
      }
    }
  }
  .page {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 46px;
    height: 22px;
    background: rgba(0, 0, 0, 0.33);
    border-radius: 22px;
    text-align: center;
    color: #fff;
    font-size: 14px;
  }
  .cannonui-swiper-btns {
    width: 100%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
    display: flex;
    justify-content: space-between;
    span {
      display: flex;
      align-items: center;
      width: 20px;
      height: 30px;
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
}
</style>
