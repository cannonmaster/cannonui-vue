<style lang="scss" scoped>
@import "../swiper.scss";
</style>
<template>
  <div class="demo">
    <h2>基本使用</h2>
    <view class="demo-box">
      <Swiper :init-page="page" :pagination-visibile="true" auto-play="2000">
        <SwiperItem v-for="item in list" :key="item">
          <img :src="item" alt="" />
        </SwiperItem>
      </Swiper>
    </view>
    <h2>导航图标</h2>
    <view class="demo-box">
      <Swiper :init-page="page" :pagination-visible="true" pagination-color="cyan" auto-play="2000">
        <SwiperItem v-for="item in list1" :key="item">
          <img :src="item" alt="" />
        </SwiperItem>
      </Swiper>
    </view>
  </div>
</template>
<script lang="ts">
import { toRefs, onMounted, reactive, ref } from 'vue';
import Swiper from "./swiper.vue"
import SwiperItem from '@/cmpStore/SwiperItem/vue'
export default {
  props: {},
  emits: [],
  components: { Swiper, SwiperItem },
  setup(props) {
    const swiper = ref(null)
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
    })
    const change = (index: number) => {
      state.current = index + 1
    }
    onMounted(() => {
      setTimeout(() => {

        state.list1 = state.list.slice()
      }, 3000)
    })
    return {
      ...toRefs(state),
      swiper,
      change,
    }
  },
}
</script>
<style lang="scss" scoped>
.demo-box {
  position: relative;

  .chihuoui-swiperitem {
    height: 150px;

    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
