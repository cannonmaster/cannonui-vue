<style lang="scss" scoped>
@import "../drag.scss";
</style>
<template>
  <div
  :class="classes"
  :style="getStyles"
  ref="mydrag"
  >
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { reactive, ref, PropType, CSSProperties, toRefs, computed, onMounted } from "vue"
import createComponent from "@/utils/vue_component"
import {useDrag, useGesture} from '@vueuse/gesture'
import {useSpring, useMotionProperties} from '@vueuse/motion'
const { componentName, create } = createComponent("drag")
export default create({
  props: {
    attract: {
      type: Boolean,
      default: false
    },
    direction: {
      type: String,
      default: 'all'
    },
    style: {
      type: String,
      default: ''
    }
  },
  emits: [],
  setup(props) {
    const {attract, direction, style} = props
    const mydrag = ref()
    const classes = computed(()=>{
      return {[componentName]: true}
    })
    const { motionProperties } = useMotionProperties(mydrag, {
      cursor: 'grab',
      x: 0,
      y: 0,
    })
    const getStyles = computed(()=>{
      return style
    })
    const { set } = useSpring(motionProperties)
    const rightLocation = computed(()=>{
      return info.screenWidth - info.boundary.right
    })
    const bottomLocation = computed(()=>{
      return info.screenHeight - info.boundary.bottom
    })
    const getMovement = (clientX:number,clientY:number, moveX:number, moveY:number) => {
      if ((moveX + info.left + info.elWidth) > rightLocation.value) {
        info.mx = info.screenWidth - info.left - info.elWidth
      } else if (clientX < info.boundary.left+info.elWidth) {
        info.mx =-info.left
      } else {
        info.mx = moveX
      }
      if ((moveY + info.top + info.elHeight) > bottomLocation.value) {
        info.my = info.screenHeight - info.top - info.elHeight
      } else if (clientY < info.boundary.top+info.elHeight) {
        info.my = -info.top
      } else {
        info.my = moveY
      }
    }
    const gesture = useGesture(
      {
        onDrag: ({ movement: [x, y], event: e }: TouchEvent | PointerEvent) => {
          e.preventDefault()
          if (e.clientX !== undefined) {
            getMovement(e.clientX, e.clientY, x, y)
          } 
          else {
            const targetTouch = e.targetTouches[0]
            if (targetTouch !== undefined) {
              getMovement(targetTouch.clientX, targetTouch.clientY,x,y)
            }
          }

          if (direction === 'y') {
            set({y:info.my})
          }
          else if (direction === 'x') {
            set({x:info.mx})
          }
          else {
            set({ x:info.mx,y:info.my})
          }
        },
        onDragEnd: ({movement: [x,y], event:e})=>{
          e.preventDefault() 
          if (attract && direction!=='y') {
            if (e.clientX !== undefined) {
              if(info.left + info.elWidth+x > info.middleLine) {
                
                set({x:x+ info.screenWidth - (info.left+x+info.elWidth)})
                gesture.config.drag.initial = [x+ info.screenWidth - (info.left+x+info.elWidth), info.my]
              } else {
              //  gesture.config.drag.initial = [x, info.my] 
                set({x:-info.left})
               gesture.config.drag.initial = [-info.left, info.my] 
              }
            }
            else {
              if(x+info.left+info.boundary.left+info.elWidth > info.middleLine) {
                set({x:info.screenWidth - (x+info.left+info.boundary.left+info.elWidth) + x})
                gesture.config.drag.initial = [info.screenWidth - (x+info.left+info.boundary.left+info.elWidth) + x,info.my]
              } 
              else {
                set({x: -info.left, y: info.my})
                gesture.config.drag.initial=[-info.left, info.my]
              }
            }   
          }
          // let moveX = 0
          // if (props.direction!=='y' && props.attract) {
          //   if (event.clientX !== undefined) {
               
          //     if (event.clientX>=info.middleLine) {
          //         moveX = info.screenWidth - info.elWidth - info.left - info.boundary.right
          //         set({x: moveX,y:info.my})
          //         console.log('123');
          //     } 
          //     else {
                  
          //         set({x:info.boundary.left,y:info.my})
          //         moveX= info.boundary.left 
          //     } 
          //   } 
          //   else {
          //     const targetTouch = event.changedTouches[0]
          //     if (targetTouch !== undefined) {
          //       if (targetTouch.clientX>=info.middleLine) {
          //         set({x:info.boundary.right,y:info.my})
          //         moveX=info.boundary.right
          //       } else {
          //         set({x:info.boundary.left,y:info.my})
          //         moveX=info.boundary.left
          //       }
          //     } 
          //   }
          //   gesture.config.drag.initial = [moveX, info.my];
          // } else {
          //   gesture.config.drag.initial = [info.mx, info.my];
          // }
          else {
            gesture.config.drag.initial = [info.mx, info.my];
          }
        } 
      },
      {
        domTarget: mydrag,
        eventOptions: {
          passive: false
        }
      }
    )
    const info = reactive({
      top: 0,
      left: 0,
      mx: 0,
      my: 0,
      updateX: 0,
      updateY: 0,
      positions: {
        startX: 0,
        startY:0,
      },
      screenWidth: 0,
      screenHeight: 0,
      elWidth: 0,
      elHeight: 0,
      boundary: {
        left:0,
        top: 0,
        right: 0,
        bottom: 0
      },
      middleLine: 0
    })

    const getInfo = ()=>{
      
      const elm = document.documentElement
      const dragProperty = mydrag.value.getBoundingClientRect()
      info.screenWidth = elm.clientWidth || 375
      info.screenHeight = elm.clientHeight || 667
      info.elWidth = mydrag.value.offsetWidth
      info.elHeight = mydrag.value.offsetHeight
      info.left = dragProperty.left
      info.top = dragProperty.top
      info.middleLine = info.screenWidth/2 + info.elWidth/2 
    }
    onMounted(()=>{
      getInfo()
    })
    return {
      mydrag,
      classes,
      getStyles
    }
  },
})
</script>










    <!-- const touchStart = (e:TouchEvent)=>{
      console.log('touch start');
      
      const target = e.currentTarget as HTMLElement;
      const touches = e.touches[0] 
      const touch = e.targetTouches[0]
      info.top = target.offsetTop
      info.left = target.offsetLeft
      
      info.positions.startX = touches.clientX
      info.positions.startY = touches.clientY

      // info.x = touch.clientX - info.positions.startX
      // info.y = touch.clientY - info.positions.startY 

    }
    const touchEnd = (e: TouchEvent)=>{
      const target = e.currentTarget as HTMLElement
      console.log('touchend');
      
    }
    const touchMove = (e: TouchEvent)=>{
      e.preventDefault();
      const target = e.currentTarget as HTMLElement
      if (e.targetTouches.length === 1) {
        const touch = e.targetTouches[0]
        
        info.mx = touch.clientX - info.positions.startX
        info.my = touch.clientY - info.positions.startY
        
        info.updateX = info.left + info.mx
        info.updateY = info.top + info.my
        
        const rightBoundary = info.screenWidth - info.boundary.right - info.elWidth
        const bottomBoundary = info.screenHeight - info.elHeight - info.boundary.bottom
        if (Math.abs(info.updateX) > rightBoundary)
          info.updateX = rightBoundary
        else if (info.updateX <= info.boundary.left) 
          info.updateX = info.boundary.left

        if (info.updateY < info.boundary.top) 
          info.updateY = info.boundary.top
        else if (info.updateY > bottomBoundary)
          info.updateY = bottomBoundary
          
        target.style.top = info.updateY+'px'
        target.style.left  =info.updateX + 'px'
      }
    } -->
