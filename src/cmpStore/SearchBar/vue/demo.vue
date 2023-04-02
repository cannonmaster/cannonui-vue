<style lang="scss" scoped>
@import "../searchbar.scss";
</style>
<template>
  <h3>基本使用</h3>
  <SearchBar v-model="searchValue" placeholder="基本使用" background="cyan" :focus-style="{ border: '1px solid cyan' }" />
  <h3>基本使用</h3>
  <SearchBar v-model="searchValue" placeholder="基本使用" background="yellow" label="测试" shape="round"
    :focus-style="{ border: '1px solid cyan' }" />
</template>
<script lang="ts">
import { reactive, toRefs } from "vue";
import SearchBar from "./searchbar.vue"
export default {
  props: {},
  emits: [],
  components: { SearchBar },
  setup(props) {
    const state = reactive({
      searchValue: ''
    })
    return {
      ...toRefs(state)
    }
  },
}
</script>
