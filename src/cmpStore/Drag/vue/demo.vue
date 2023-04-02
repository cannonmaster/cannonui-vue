<style lang="scss" scoped>
@import "../drag.scss";
</style>
<template>
  <div class="demo" style="position: relative">
    <h2 style="position: relative">基本使用</h2>
    <Drag>
      <span :style="btnStyle">触摸移动</span>
    </Drag>
    <h2 style="position: relative">方向控制</h2>
    <Drag direction="x">
      <span :style="btnStyle">x方向移动</span>
    </Drag>
    <Drag direction="y">
      <span :style="btnStyle">y方向移动</span>
    </Drag>
    <h2>自动吸边</h2>
    <Drag attract>
      <span :style="btnStyle">x方向自动</span>
    </Drag>  
  </div>
</template>
<script lang="ts">
import Drag from "./drag.vue"
export default {
  props: {},
  emits: [],
  components: {Drag},
  setup(props) {
    const btnStyle = {
      borderRadius: '25px',
      padding: '0 18px',
      fontSize: '14px',
      color: '#fff',
      display: 'inline-block',
      lineHeight: '36px',
      background: 'linear-gradient(135deg,#fa2c19 0,#fa6419 100%)',
    };
    return {btnStyle}
  },
}
</script>
