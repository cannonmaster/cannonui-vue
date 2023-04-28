<style lang="scss" scoped>
@import '../swiper.scss';
</style>
<template>
  <div class="demo">
    <h2>基本使用</h2>
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
    <h2>导航图标</h2>
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
    <h2>导航图标</h2>
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
  </div>
</template>
<script lang="ts">
import SwiperItem from '@/cmpStore/SwiperItem/vue';
import { onMounted, reactive, ref, toRefs } from 'vue';
import Swiper from './swiper.vue';
export default {
  props: {},
  emits: [],
  components: { Swiper, SwiperItem },
  setup(props) {
    const swiper = ref(null);
    const state = reactive({
      page: 2,
      current: 1,
      list: [
        'https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg',
        'https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg',
        'https://storage.360buyimg.com/jdc-article/welcomenutui.jpg',
        'https://storage.360buyimg.com/jdc-article/fristfabu.jpg'
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
