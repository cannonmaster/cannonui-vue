<style lang="scss" scoped>
@import "../card.scss";
</style>
<template>
  <div class="chihuoui-card">
    <div class="chihuoui-card__left">
      <img :src="imgUrl" alt="" />
    </div>
    <div class="chihuoui-card__right">
      <div class="chihuoui-card__right-title">{{ title }}</div>
      <slot name="prolist"></slot>
      <div v-if="isNeedPrice" class="chihuoui-card__right-price">
        <template v-if="isHaveSlot('price')">
          <slot name="price"></slot>
        </template>
        <Price :symbol="symbol" :price="price" v-else />
        <template v-if="isHaveSlot('origin')">
          <slot name="origin"></slot>
        </template>
        <Price v-else class="chihuoui-card__right-price-origin" :price="vipPrice" :symbol="symbol" />
      </div>
      <div class="chihuoui-card__right-other">
        <template v-if="isHaveSlot('shop-custom-desc')">
          <slot name="shop-custom-desc"></slot>
        </template>
        <template v-else>
          <span>{{ shopDesc }}</span>
          <span>{{ delivery }}</span>
        </template>
      </div>
      <div class="chihuoui-card__right-shop">
        <div class="chihuoui-card__right-shop-name">
          {{ shopName }}
        </div>
        <template v-if="isHaveSlot('footer')">
          <slot name="footer"></slot>
        </template>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Price from '@/cmpStore/Price/vue'
import createComponent from "@/utils/vue_component"
const { componentName, create } = createComponent("card")
export default create({
  components: { Price },
  props: {
    imgUrl: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    symbol: {
      type: String,
      default: ''
    },
    price: {
      type: String,
      default: ''
    },
    vipPrice: {
      type: String,
      default: ''
    },
    shopDesc: {
      type: String,
      default: ''
    },
    delivery: {
      type: String,
      default: ''
    },
    shopName: {
      type: String,
      default: ''
    },
    isNeedPrice: {
      type: Boolean,
      default: true
    }
  },
  emits: [],
  setup(props, { emit, slots }) {
    const isHaveSlot = (slot: string) => {
      return slots[slot]
    }
    return {
      isHaveSlot
    }
  },
})
</script>
