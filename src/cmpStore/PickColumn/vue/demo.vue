<style lang="scss" scoped>
@import "../pickcolumn.scss";
</style>
<template>
  <div class="phone">
    <div class="phone-top">PickColumn</div>
    <div class="phone-content">
      {/* TODO: add / update the cmp such as lang*/}
    </div>
    <div class="phone-bottom"></div>
  </div>
</template>
<script lang="ts">
import PickColumn from "./pickcolumn.vue"
export default {
  props: {},
  emits: [],
  components: { PickColumn },
  setup(props) {
    return {}
  },
}
</script>
