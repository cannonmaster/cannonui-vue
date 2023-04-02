<style lang="scss" scoped>
@import "../swiper.scss";
</style>
<template>
  <view ref="container" :class="classes" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd"
    @touchcancel="onTouchEnd">
    <view :class="{
      [`${componentName}__inner`]: true,
      [`${componentName}__vertical`]: isVertical
    }" :style="state.style">
      <slot></slot>
    </view>
    <slot name="page"></slot>
    <view :class="{
      [`${componentName}__pagination`]: true,
      [`${componentName}__pagination-vertical`]: isVertical
    }" v-if="paginationVisible && !slots.page">
      <i :style="{
        backgroundColor: activePagination === index ? paginationColor : '#ddd'
      }" :class="{ [`${componentName}__pagination-item`]: true, active: activePagination === index }"
        v-for="(item, index) in state.children.length" :key="index" />
    </view>
  </view>

</template>
<script lang="ts">
import { PropType, CSSProperties, toRefs, computed, VNode, ComponentPublicInstance, ComponentInternalInstance, reactive, ref, provide, onDeactivated, onBeforeUnmount, watch, nextTick } from "vue"
import createComponent from "@/utils/vue_component"
import { useTouch } from "./use-touch"
import useExpose from "@/utils/vue_useExpose"
const { componentName, create } = createComponent("swiper")
export default create({
  props: {
    width: {
      type: [Number, String],
      default: typeof window === 'object' ? window.innerWidth : 375
    },
    height: {
      type: [Number, String],
      default: 0
    },
    direction: {
      type: [String],
      default: 'horizontal'
    },
    isStopPropagation: {
      type: Boolean,
      default: false
    },
    paginationColor: {
      type: String,
      default: '#fff'
    },
    paginationVisible: {
      type: [Boolean],
      default: false
    },
    loop: {
      type: Boolean,
      default: true
    },
    duration: {
      type: [Number, String],
      default: 500
    },
    autoPlay: {
      type: [Number, String],
      default: 0
    },
    initPage: {
      type: [Number, String],
      default: 0
    },
    touchable: {
      type: Boolean,
      default: true
    },
    isPreventDefault: {
      type: Boolean,
      default: true
    },
    isCenter: {
      type: Boolean,
      default: false
    }
  },
  emits: ['change'],
  setup(props, { emit, slots }) {
    const container = ref()
    const state = reactive({
      active: 0,
      num: 0,
      rect: null as DOMRect | null,
      width: 0,
      height: 0,
      moving: false,
      offset: 0,
      touchTime: 0,
      autoplayTimer: 0 as number | undefined,
      children: [] as ComponentPublicInstance[],
      childrenVNode: [] as VNode[],
      style: {}
    })
    const touch = useTouch()
    const classes = computed(() => {
      const prefix = componentName;
      return {
        [prefix]: true
      }
    })
    const isVertical = computed(() => props.direction === 'vertical')

    const delTa = computed(() => {
      return isVertical.value ? touch.state.deltaY : touch.state.deltaX
    })

    const isCorrectDirection = computed(() => {
      return touch.state.direction === props.direction
    })

    const childCount = computed(() => {
      return state.children.length
    })

    const size = computed(() =>
      state[isVertical.value ? 'height' : 'width']
    )

    const trackSize = computed(() => childCount.value * size.value)

    const minOffset = computed(() => {
      if (state.rect) {
        const base = isVertical.value ? state.rect.height : state.rect.width

        return base - size.value * childCount.value
      }
      return 0
    })

    const activePagination = computed(() => {
      return (state.active + childCount.value) % childCount.value
    })

    const init = (active: number = +props.initPage) => {
      stopAutoPlay();
      state.rect = container.value.getBoundingClientRect()
      active = Math.min(childCount.value - 1, active)
      state.width = props.width ? +props.width : (state.rect as DOMRect).width
      state.height = props.height ? +props.height : (state.rect as DOMRect).height
      state.active = active
      state.offset = getOffset(state.active)
      state.moving = true
      autoplay()
      getStyle()
    }

    const onTouchStart = (e: TouchEvent) => {
      if (props.isPreventDefault) e.preventDefault()
      if (props.isStopPropagation) e.stopPropagation()

      if (!props.touchable) return
      touch.start(e)
      state.touchTime = Date.now()
      stopAutoPlay()
      resetPosition()
    }

    const onTouchMove = (e: TouchEvent) => {
      if (props.touchable && state.moving) {
        touch.move(e)
        if (isCorrectDirection.value) {
          move({ offset: delTa.value })
        }
      }
    }

    const onTouchEnd = (e: TouchEvent) => {
      if (!props.touchable || !state.moving) {
        return
      }

      const speed = delTa.value / (Date.now() - state.touchTime)

      const isShouldMove = Math.abs(speed) > 0.3 || Math.abs(delTa.value) > +(size.value / 2).toFixed(2)

      if (isShouldMove && isCorrectDirection.value) {
        let pace = 0
        const offset = isVertical.value ? touch.state.offsetY : touch.state.offsetX
        if (props.loop) {
          pace = offset > 0 ? (delTa.value > 0 ? -1 : 1) : 0
        } else {
          pace = -Math[delTa.value > 0 ? 'ceil' : 'floor'](delTa.value / size.value)
        }
        move({
          pace,
          isEmit: true
        })
      } else if (delTa.value) {
        move({ pace: 0 })
      }
      state.moving = false
      getStyle()
      autoplay()
    }


    const autoplay = () => {
      if (props.autoPlay <= 0 || childCount.value <= 1) return
      stopAutoPlay()

      state.autoplayTimer = window.setTimeout(() => {
        next()
        autoplay()
      }, Number(props.autoPlay))
    }

    const next = () => {
      resetPosition()
      touch.reset()
      requestFrame(() => {
        requestFrame(() => {
          state.moving = false
          move({
            pace: 1,
            isEmit: true
          })
        })
      })
    }

    const stopAutoPlay = () => {
      clearTimeout(state.autoplayTimer)
    }

    const getStyle = () => {
      let offset = 0;
      if (!props.isCenter) {
        offset = state.offset;
      } else {
        let val = isVertical.value
          ? (state.rect as DOMRect).height - size.value
          : (state.rect as DOMRect).width - size.value;
        offset = state.offset + (state.active === childCount.value - 1 ? -val / 2 : val / 2);
      }
      state.style = {
        transitionDuration: `${state.moving ? 0 : props.duration}ms`,
        transform: `translate${isVertical.value ? 'Y' : 'X'}(${offset}px)`,
        [isVertical.value ? 'height' : 'width']: `${size.value * childCount.value}px`,
        [isVertical.value ? 'width' : 'height']: `${isVertical.value ? state.width : state.height}px`
      };
    }

    const relation = (child: ComponentInternalInstance) => {
      let children = [] as VNode[]
      let slot = slots?.default?.() as VNode[];
      slot = slot.filter((item: VNode) => {
        return item.children && Array.isArray(item.children)
      })
      slot.forEach((item: VNode) => {
        children = children.concat(item.children as VNode[])
      })
      if (!state.childrenVNode.length) {
        state.childrenVNode = children.slice();
        child.proxy && state.children.push(child.proxy);
      } else {
        if (state.childrenVNode.length > children.length) {
          state.children = state.children.filter((item: ComponentPublicInstance) => child.proxy !== item);
        } else if (state.childrenVNode.length < children.length) {
          for (let i = 0; i < state.childrenVNode.length; i++) {
            if ((children[i] as VNode).key !== (state.childrenVNode[i] as VNode).key) {
              child.proxy && state.children.splice(i, 0, child.proxy);
              child.vnode && state.childrenVNode.splice(i, 0, child.vnode);
              break;
            }
          }
          if (state.childrenVNode.length !== children.length) {
            child.proxy && state.children.push(child.proxy);
            child.vnode && state.childrenVNode.push(child.vnode);
          }
        } else {
          state.childrenVNode = children.slice();
          child.proxy && state.children.push(child.proxy);
        }
      }
    }

    const range = (num: number, min: number, max: number) => {
      return Math.min(Math.max(num, min), max)
    }

    const requestFrame = (fn: FrameRequestCallback) => {
      window.requestAnimationFrame.call(window, fn)
    }

    const getOffset = (active: number, offset = 0) => {
      let currentPosition = active * size.value
      // 如果用户设置不能循环播放
      if (!props.loop) {
        currentPosition = Math.min(currentPosition, -minOffset.value)
      }

      let targetOffset = offset - currentPosition;
      if (!props.loop) {
        targetOffset = range(targetOffset, minOffset.value, 0)
      }

      return targetOffset
    }

    const getActive = (pace: number) => {
      const { active } = state
      if (pace) {
        if (props.loop) {
          return range(active + pace, -1, childCount.value)
        }
        return range(active + pace, 0, childCount.value - 1)
      }
      return active;
    }

    const move = ({ pace = 0, offset = 0, isEmit = false }) => {
      if (childCount.value <= 1) return

      const { active } = state;
      const targetActive = getActive(pace)
      const targetOffset = getOffset(targetActive, offset)

      if (props.loop) {
        if (state.children[0] && targetOffset !== minOffset.value) {
          const rightBound = targetOffset < minOffset.value;
          (state.children[0] as any).setOffset(rightBound ? trackSize.value : 0)
        }
        if (state.children[childCount.value - 1] && targetOffset !== 0) {
          const leftBound = targetOffset > 0;
          (state.children[childCount.value - 1] as any).setOffset(leftBound ? -trackSize.value : 0)
        }
      }

      state.active = targetActive
      state.offset = targetOffset

      if (isEmit && active !== state.active) {
        emit('change', activePagination.value)
      }

      getStyle()

    }

    const resetPosition = () => {
      state.moving = true
      const { active } = state
      if (active >= childCount.value) {
        move({ pace: -childCount.value })
      }
      if (active <= -1) {
        move({ pace: childCount.value })
      }
    }
    const prev = () => {
      resetPosition()
      touch.reset()

      requestFrame(() => {
        requestFrame(() => {
          state.moving = false
          move({
            pace: -1,
            isEmit: true
          })
        })
      })
    }
    provide('parent', {
      props,
      size,
      relation
    })

    const to = (index: number) => {
      resetPosition()

      touch.reset()

      requestFrame(() => {
        requestFrame(() => {
          state.moving = false
          let targetIndex
          if (props.loop && childCount.value === index) {
            targetIndex = state.active === 0 ? 0 : index
          } else {
            targetIndex = index % childCount.value
          }
          move({
            pace: targetIndex - state.active, isEmit: true
          })
        })
      })
    }

    useExpose({
      prev,
      next,
      to
    })

    onDeactivated(() => {
      stopAutoPlay()
    })

    onBeforeUnmount(() => {
      stopAutoPlay()
    })

    watch(() => props.initPage, (val: any) => {
      nextTick(() => {
        init(Number(val))
      })
    })

    watch(
      () => state.children.length,
      () => {
        nextTick(() => {
          init();
        });
      }
    );

    watch(
      () => props.autoPlay,
      (val) => {
        val > 0 ? autoplay() : stopAutoPlay();
      }
    );

    return {
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      isVertical,
      classes,
      state,
      componentName,
      slots,
      container,
      activePagination
    }
  },

})
</script>
