<style lang="scss" scoped>
@import "../price.scss";
</style>
<template>
  <view>
    <h2>基本使用</h2>
    <Price :thousand="true" :price=10000 :need-symbol="false" />
    <h2>带符号使用</h2>
    <Price :thousand="true" :price=10000 :need-symbol="true" />
    <h2>一般使用</h2>
    <Price :thousand="false" :price=10000 :need-symbol="true" />
  </view>
</template>
<script lang="ts">
import Price from "./price.vue"
export default {
  props: {},
  emits: [],
  components: { Price },
  setup(props) {
    return {}
  },
}
</script>
