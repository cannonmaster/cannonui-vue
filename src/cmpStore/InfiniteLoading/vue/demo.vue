<style lang="scss" scoped>
@import "../infiniteloading.scss";
</style>
<template>
  <ul class="styleul">
    <InfiniteLoading :hasMore="hasMore" @refresh-on-pull="(completed) => refreshOnPull(completed)"
      @load-more="(completed) => loadMore(completed)">
      <li v-for="(item, index) in defaultlist" :key="index" class="styleli">{{ item }}</li>
    </InfiniteLoading>
  </ul>
</template>
<script lang="ts">
import InfiniteLoading from "./infiniteloading.vue"
import { ref, reactive, onMounted, toRefs } from 'vue'
import '../demo.scss'
export default {
  props: {},
  emits: [],
  components: { InfiniteLoading },
  setup(props) {
    const data = reactive({
      defaultlist: []
    })
    const hasMore = ref(true)
    const loadMore = (completed: () => void) => {
      setTimeout(() => {

        const len = data.defaultlist.length
        if (len > 30) {
          console.log('123');

          hasMore.value = false;
          completed();
          return
        }
        for (let i = len; i < len + 10; i++) {
          data.defaultlist.push(`${i}`)
        }
        completed()
      }, 600)
    }
    const refreshOnPull = (completed: () => void) => {
      return new Promise((res, rej) => {
        setTimeout(() => {
          completed()
          res('1')
        }, 2000)
      })
    }
    onMounted(() => {
      init()
    })
    const init = () => {
      for (let i = 0; i < 10; i++) {
        data.defaultlist.push(`${i}`)
      }
    }
    return {
      refreshOnPull,
      ...toRefs(data),
      hasMore,
      loadMore
    }
  },
}
</script>
