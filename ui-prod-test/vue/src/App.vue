<script lang="ts">
export default {
  props: {
    lang: {
      type: String,
      default: 'en'
    }
  },
  emits: [],
  components: {},
  setup(props) {}
};
</script>

<template>
  <cannonui-row
    type="flex"
    gutter="20"
    justify="start"
    align="flex-center"
    wrap="nowrap"
  >
    <cannonui-col
      span="3"
      offset="0"
    >
      <div class="flex-content">span:3</div>
    </cannonui-col>
    <cannonui-col
      span="3"
      offset="0"
    >
      <div class="flex-content">span:3</div>
    </cannonui-col>
    <cannonui-col
      span="3"
      offset="0"
    >
      <div class="flex-content">span:3</div>
    </cannonui-col>
    <cannonui-col
      span="3"
      offset="0"
    >
      <div class="flex-content">span:3</div>
    </cannonui-col>
  </cannonui-row>
</template>

<style scoped lang="scss">
.content--title {
  font-size: 1rem;
}
.content--desc {
  font-size: 0.8rem;
}

.flex-content {
  line-height: 40px;
  color: var(--theme-text);
  text-align: center;
  border-radius: 6px;
  // background: #ff8881;
  background: cyan;
  &.flex-content-light {
    background: #ffc7c4;
  }
  &.flex-content-height {
    height: 50px;
  }
}
</style>
