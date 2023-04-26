<style lang="scss" scoped>
@import '../video.scss';
</style>
<template>
  <div class="cannonui-video">
    <video
      ref="rootRef"
      :muted="options.muted"
      :auto-play="options.autoplay"
      :loop="options.loop"
      :poster="options.poster"
      :controls="options.controls"
      :preload="options.preload"
    >
      <source
        :src="source"
        :type="type"
      />
    </video>
  </div>
</template>
<script lang="ts">
import createComponent from '@/utils/vue_component';
import {
  nextTick,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  toRefs,
  watch
} from 'vue';
const { componentName, create } = createComponent('video');
export default create({
  props: {
    source: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
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
  emits: ['click', 'play', 'pause', 'playend', 'ended', 'timeupdate'],
  setup(props, { emit }) {
    const rootRef = ref<HTMLVideoElement>();
    const state = reactive({
      curState: ''
    });
    const init = () => {
      if (props.options.autoplay) {
        nextTick(() => {
          rootRef.value?.play?.();
        });
      }

      if (props.options.playinline) {
        rootRef.value?.setAttribute('playinline', props.options.playinline);
        rootRef.value?.setAttribute(
          'webkit-playinline',
          props.options.playinline
        );
        rootRef.value?.setAttribute('x5-video-player-type', 'h5-page');
        rootRef.value?.setAttribute('x5-video-player-fullscreen', '');
      }

      rootRef.value?.addEventListener('play', play);
      rootRef.value?.addEventListener('pause', pause);
      rootRef.value?.addEventListener('timeupdate', timeupdate);
      rootRef.value?.addEventListener('ended', ended);
    };
    watch(
      () => props.source,
      (newVal) => {
        newVal &&
          nextTick(() => {
            rootRef.value?.load();
          });
      }
    );
    const play = () => {
      state.curState = 'play';
      emit('play', rootRef.value);
    };
    const pause = () => {
      state.curState = 'pause';
      emit('pause', rootRef.value);
    };
    const timeupdate = () => {
      state.curState = 'timeupdate';
      emit('timeupdate', rootRef.value);
    };
    const ended = () => {
      state.curState = 'ended';
      emit('ended', rootRef.value);
    };
    onMounted(() => init());
    onUnmounted(() => {
      rootRef.value?.removeEventListener('play', play);
      rootRef.value?.removeEventListener('ended', ended);
      rootRef.value?.removeEventListener('timeupdate', timeupdate);
      rootRef.value?.removeEventListener('pause', pause);
    });
    return {
      rootRef,
      ...toRefs(props)
    };
  }
});
</script>
