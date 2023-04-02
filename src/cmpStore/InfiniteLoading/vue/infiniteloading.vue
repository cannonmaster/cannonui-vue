<style lang="scss" scoped>
@import "../infiniteloading.scss";
</style>
<template>
  <view :class="classes" ref="scroller">
    <div class="infinite-top" ref="infiniteTop" :style="styles">
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
import { ref, PropType, CSSProperties, toRefs, computed, onMounted, reactive, onUnmounted } from "vue"
import createComponent from "@/utils/vue_component"
import { useDrag, useScroll, useGesture } from '@vueuse/gesture'
import { useSpring, useMotionProperties } from '@vueuse/motion'
import { emit } from "process"
const { componentName, create } = createComponent("infiniteloading")
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
      default: 20
    },
    hasMore: {
      type: Boolean,
      default: true
    }
  },
  emits: ['loadMore', 'refreshOnPull'],
  setup(props, { emit }) {
    const scroller = ref()
    const infiniteTop = ref()
    const parentEle = ref()
    const { motionProperties } = useMotionProperties(scroller, {
      cursor: 'grab',
      x: 0,
      y: 0
    })

    const info = reactive({
      top: 0,
      isTouching: false,
      isLoadingMore: false,
      prevScrollTop: 0,
      direction: 'down'
    })
    const topRefreshHeight = ref(0)
    const { set } = useSpring(motionProperties as any)
    const gesture = useGesture(
      {
        onDrag: ({ offset: [x, y], movement: [moveX, moveY], dragging }) => {
          info.isTouching = true
          const { scrollTop } = parentEle.value
          console.log(scrollTop);

          if (scrollTop === 0) {
            if (moveY <= topRefreshHeight.value) {
              info.top = moveY
            }
            else {
              info.top = topRefreshHeight.value
            }
          }
        },
        onDragEnd: async ({ offset: [x, y], movement: [moveX, moveY] }) => {
          info.isTouching = false
          const { scrollTop } = parentEle.value
          if (props.isRefreshOnPull && moveY >= topRefreshHeight.value && scrollTop === 0) {
            emit('refreshOnPull', () => { info.top = 0 })
          }
        },
      },
      {
        domTarget: scroller,
        eventOptions: {
          passive: false
        }
      }
    )
    const getParentEle = (el: HTMLElement) => {
      // parentEle.value = el && el.parentNode
      return el && el.parentNode
    }

    const styles = computed(() => {

      return {
        height: info.top < 0 ? 0 : `${info.top}px`,
        transition: info.isTouching ? 'height 0s cubic-bezier(0.25,0.1,0.25,1)' : 'height 0.2s cubic-bezier(0.25,0.1,0.25,1)'
      }
    })
    const classes = computed(() => {
      return {
        [componentName]: true
      }
    })
    const getInfo = () => {
      topRefreshHeight.value = ((infiniteTop.value as HTMLDivElement).firstElementChild as HTMLElement).offsetHeight + 10
    }

    const isScrollingBottom = () => {
      const { scrollHeight, scrollTop, clientHeight } = parentEle.value
      const offsetDistance = scrollHeight - scrollTop - clientHeight
      if (info.prevScrollTop < scrollTop) {
        info.direction = 'down'
      } else {
        info.direction = 'up'
      }
      info.prevScrollTop = scrollTop

      return offsetDistance <= props.threshold && info.direction === 'down'
    }

    const loadingCompleted = () => {
      info.isLoadingMore = false
    }

    const handleScroll = () => {
      requestAnimationFrame(() => {
        if (!isScrollingBottom() || !props.hasMore || info.isLoadingMore)
          return false

        info.isLoadingMore = true
        emit('loadMore', loadingCompleted)
      })
    }

    onMounted(() => {
      getInfo()
      parentEle.value = getParentEle(scroller.value as HTMLElement)
      parentEle.value.addEventListener('scroll',
        handleScroll
      )
    })

    onUnmounted(() => {
      parentEle.value.removeEventListener('scroll', handleScroll)
    })

    return {
      classes,
      scroller,
      styles,
      infiniteTop,
      ...toRefs(info),
    }
  },
})
</script>
