<style lang="scss" scoped>
@import '../infiniteloading.scss';
</style>
<template>
  <view
    :class="classes"
    ref="scroller"
  >
    <view class="infinite-body">
      <slot></slot>
    </view>
    <view class="infinite-bottom">
      <template v-if="isLoadingMore">
        <view class="bottom-content">
          <span class="title">{{ loadingText }}</span>
        </view>
      </template>
      <template v-else-if="!hasMore">{{ hasNoMoreData }}</template>
    </view>
  </view>
</template>
<script lang="ts">
import createComponent from '@/utils/vue_component';
import {
  computed,
  onActivated,
  onDeactivated,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  toRefs
} from 'vue';
const { componentName, create } = createComponent('infiniteloading');
export default create({
  props: {
    loadingText: {
      type: String,
      default: '加载...'
    },
    hasNoMoreData: {
      type: String,
      default: '全部加载完成~'
    },
    isRefreshOnPull: {
      type: Boolean,
      default: true
    },
    threshold: {
      type: Number,
      default: 0
    },
    hasMore: {
      type: Boolean,
      default: true
    }
  },
  emits: ['loadMore', 'refreshOnPull'],
  setup(props, { emit }) {
    const scroller = ref();
    const infiniteTop = ref();
    const parentEle = ref();
    const info = reactive({
      top: 0,
      isTouching: false,
      isLoadingMore: false,
      prevScrollTop: 0,
      direction: 'down',
      totalHeight: 0
    });

    const isKeepAlive = ref(false);
    onActivated(() => {
      if (isKeepAlive.value) {
        isKeepAlive.value = false;
        parentEle.value.addEventListener('scroll', handleScroll);
      }
    });

    onDeactivated(() => {
      isKeepAlive.value = true;
      parentEle.value.removeEventListener('scroll', handleScroll);
    });

    onMounted(() => {
      parentEle.value = getParentEle(scroller.value as HTMLElement);
      parentEle.value.addEventListener('scroll', handleScroll);
    });

    onUnmounted(() => {
      parentEle.value.removeEventListener('scroll', handleScroll);
    });
    const handleScroll = () => {
      requestAnimationFrame(() => {
        if (!isScrollingBottom() || !props.hasMore || info.isLoadingMore)
          return false;

        info.isLoadingMore = true;
        emit('loadMore', loadingCompleted);
      });
    };

    const getParentEle = (el: HTMLElement) => {
      return el && el.parentNode;
    };

    const styles = computed(() => {
      return {
        height: info.top < 0 ? 0 : `${info.top}px`,
        transition: info.isTouching
          ? 'height 0s cubic-bezier(0.25,0.1,0.25,1)'
          : 'height 0.6s cubic-bezier(0.25,0.1,0.25,1)'
      };
    });
    const classes = computed(() => {
      return {
        [componentName]: true
      };
    });

    const isScrollingBottom = () => {
      const { scrollHeight, scrollTop, clientHeight } = parentEle.value;
      if (info.prevScrollTop < scrollTop) {
        info.direction = 'down';
      } else {
        info.direction = 'up';
      }
      const offsetDistance = scrollHeight - scrollTop - clientHeight;
      info.prevScrollTop = scrollTop;

      return offsetDistance <= props.threshold && info.direction === 'down';
    };

    const loadingCompleted = () => {
      info.isLoadingMore = false;
    };

    return {
      classes,
      scroller,
      styles,
      infiniteTop,
      ...toRefs(info)
    };
  }
});
</script>
