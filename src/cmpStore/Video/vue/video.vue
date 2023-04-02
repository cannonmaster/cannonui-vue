<style lang="scss" scoped>
@import "../video.scss";
</style>
<template></template>
<script lang="ts">
import { PropType, CSSProperties, toRefs, computed, reactive } from "vue"
import createComponent from "@/utils/vue_component"
const { componentName, create } = createComponent("video")
export default create({
  props: {
    source: {
      type: Object,
      default: {}
    },
    options: {
      type: Object,
      default: {
        autoplay: false,
        volume: 0.5,
        poster: '',
        loop: false,
        controls: true,
        muted: false,
        disabled: false,
        playsinline: false,
        touchPlay: false,
        preload: ''
      },
      required: true
    },
    model: {
      type: String,
      default: ''
    }
  },
  emits: ['click', 'play', 'pause', 'playend', 'time'],
  setup(props) {
    const state = reactive({
      videoElm: null,
      initial: true,
      showToolbox: false,
      player: {
        $player: null,
        pos: null
      },
      progressBar: {
        
      }
    })
  },
})
</script>
