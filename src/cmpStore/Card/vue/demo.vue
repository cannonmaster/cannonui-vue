<style lang="scss" scoped>
@import "../card.scss";
</style>
<template>
  <h2>基本使用</h2>
  <Card :img-url="state.imgUrl" :title="state.title" :price="state.price" :vipPrice="state.vipPrice"
    :shopDesc="state.shopDesc" :delivery="state.delivery" :shopName="state.shopName">
    <!-- <template #prolist>
      <div>
        <span>abc</span>
      </div>
    </template> -->
  </Card>
</template>
<script lang="ts">
import { computed, toRefs } from "vue"
import Card from "./card.vue"
import { reactive } from 'vue'
export default {
  props: {},
  emits: [],
  components: { Card },
  setup(props) {
    const state = reactive({
      imgUrl:
        '//img10.360buyimg.com/n2/s240x240_jfs/t1/210890/22/4728/163829/6163a590Eb7c6f4b5/6390526d49791cb9.jpg!q70.jpg',
      title: '测试',
      price: '388',
      vipPrice: '378',
      shopDesc: '测试',
      delivery: '测试',
      shopName: '测试'
    })
    return {
      state
    }

  },
}
</script>
