<style lang="scss" scoped>
@import '../infiniteloading.scss';
</style>
<template>
  <view
    :class="classes"
    ref="scroller"
    :style="styleY"
  >
    <div
      class="infinite-top"
      ref="infiniteTop"
      :style="styles"
    >
      <div class="top-content">
        <span class="title">{{ loadingText }}</span>
      </div>
    </div>
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
import { useGesture } from '@vueuse/gesture';
import {
  computed,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  toRefs,
  watch
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
    const thresholdToPullRefresh = ref(0);
    // const { motionProperties } = useMotionProperties(scroller, {
    //   cursor: 'grab',
    //   x: 0,
    //   y: 0
    // });
    // const { set } = useSpring(motionProperties as any);

    const info = reactive({
      top: 0,
      isTouching: false,
      isLoadingMore: false,
      prevScrollTop: 0,
      direction: 'down',
      totalHeight: 0
    });
    const translateY = ref(0);
    const getThresholdToPullRefresh = () => {
      thresholdToPullRefresh.value =
        ((infiniteTop.value as HTMLDivElement).firstElementChild as HTMLElement)
          .offsetHeight + 10;
    };
    onMounted(() => {
      getThresholdToPullRefresh();
      parentEle.value = getParentEle(scroller.value as HTMLElement);
    });

    onUnmounted(() => {
      // parentEle.value.removeEventListener('scroll', handleScroll);
    });
    const handleScroll = (y: any) => {
      requestAnimationFrame(() => {
        if (!isScrollingBottom(y) || !props.hasMore || info.isLoadingMore)
          return false;
        info.isLoadingMore = true;
        emit('loadMore', loadingCompleted);
      });
    };
    watch(
      () => props.hasMore,
      () => {
        if (!props.hasMore) {
          info.totalHeight = -translateY.value;
        }
      }
    );
    const gesture = useGesture(
      {
        onDrag: ({ offset: [x, y], movement: [moveX, moveY], dragging }) => {
          info.isTouching = true;
          const { scrollTop } = parentEle.value;

          if (scrollTop === 0) {
            if (moveY <= thresholdToPullRefresh.value) {
              info.top = moveY;
            } else {
              info.top = thresholdToPullRefresh.value;
            }
          }

          if (!info.isLoadingMore) {
            if (!props.hasMore) {
              if (-translateY.value - moveY > info.totalHeight)
                translateY.value = -info.totalHeight;
              else translateY.value = y;
            } else {
              translateY.value = y;
            }
          }
          if (y < 0 && props.hasMore) {
            handleScroll(y);
          }
        },
        onDragEnd: async ({ offset: [x, y], movement: [moveX, moveY] }) => {
          info.isTouching = false;
          const { scrollTop } = parentEle.value;
          if (
            props.isRefreshOnPull &&
            moveY >= thresholdToPullRefresh.value &&
            scrollTop === 0
          ) {
            emit('refreshOnPull', () => {
              info.top = 0;
            });
          }
        }
      },
      {
        drag: {
          threshold: 0,
          // delay: true,
          axis: 'y',
          filterTaps: true,
          useTouch: true
        },
        domTarget: scroller,
        eventOptions: {
          passive: false
        }
      }
    );
    const getParentEle = (el: HTMLElement) => {
      return el && el.parentNode;
    };
    const styleY = computed(() => {
      return {
        transform: `translateY(${
          translateY.value < 0 ? translateY.value : 0
        }px)`
      };
    });
    const styles = computed(() => {
      return {
        height: info.top < 0 ? 0 : `${info.top}px`,
        transition: info.isTouching
          ? 'height 0s cubic-bezier(0.25,0.1,0.25,1)'
          : 'height 0.2s cubic-bezier(0.25,0.1,0.25,1)'
      };
    });
    const classes = computed(() => {
      return {
        [componentName]: true
      };
    });

    const isScrollingBottom = (y: any) => {
      const { scrollHeight, scrollTop, clientHeight } = scroller.value;
      const offsetDistance = scrollHeight + y - clientHeight;
      if (info.prevScrollTop < -y) {
        info.direction = 'down';
      } else {
        info.direction = 'up';
      }
      info.prevScrollTop = -y;

      // const offsetDistance = scrollHeight - scrollTop - clientHeight;
      // if (info.prevScrollTop < scrollTop) {
      //   info.direction = 'down';
      // } else {
      //   info.direction = 'up';
      // }
      // info.prevScrollTop = scrollTop;

      // console.log(offsetDistance);

      return offsetDistance <= props.threshold && info.direction === 'down';
    };

    const loadingCompleted = () => {
      info.isLoadingMore = false;
    };

    return {
      classes,
      scroller,
      styles,
      styleY,
      infiniteTop,
      ...toRefs(info)
    };
  }
});
</script>
