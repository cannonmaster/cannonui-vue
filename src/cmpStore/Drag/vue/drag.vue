<style lang="scss" scoped>
@import '../drag.scss';
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
interface Info {
  top: number;
  left: number;
  mx: number;
  my: number;
  updateX: number;
  updateY: number;
  positions: {
    startX: number;
    startY: number;
  };
  screenWidth: number;
  screenHeight: number;
  elWidth: number;
  elHeight: number;
  boundary: {
    left: number;
    top: number;
    right: number;
    bottom: number;
  };
  middleLine: number;
}
import createComponent from '@/utils/vue_component';
import { useGesture } from '@vueuse/gesture';
import {
  PermissiveMotionProperties,
  useMotionProperties,
  useSpring
} from '@vueuse/motion';
import { computed, onMounted, onUnmounted, reactive, ref, watch } from 'vue';
const { componentName, create } = createComponent('drag');
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
    },
    boundary: {
      type: Object as () => {
        left: number;
        right: number;
        top: number;
        bottom: number;
      },
      default: () => {
        return {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        };
      }
    }
  },
  emits: [],
  setup(props) {
    const { attract, direction, style } = props;

    const mydrag = ref();

    const getStyles = computed(() => {
      return style;
    });
    const classes = computed(() => {
      return { [componentName]: true };
    });
    const { motionProperties } = useMotionProperties(mydrag, {
      cursor: 'grab',
      x: 0,
      y: 0
    });
    const { set } = useSpring(
      motionProperties as Partial<PermissiveMotionProperties>
    );
    const leftEdge = computed(() => {
      return info.boundary.left || 0;
    });
    const rightEdge = computed(() => {
      return info.boundary.right || info.screenWidth;
      // return info.screenWidth - info.boundary.right;
    });
    const topEdge = computed(() => {
      return info.boundary.top || 0;
    });
    const bottomEdge = computed(() => {
      return info.boundary.bottom || info.screenHeight;
    });
    const info: Info = reactive({
      top: 0,
      left: 0,
      mx: 0,
      my: 0,
      updateX: 0,
      updateY: 0,
      positions: {
        startX: 0,
        startY: 0
      },
      screenWidth: 0,
      screenHeight: 0,
      elWidth: 0,
      elHeight: 0,
      boundary: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      },
      middleLine: 0
    });

    watch(
      [
        () => props.boundary.left,
        () => props.boundary.right,
        () => props.boundary.bottom,
        () => props.boundary.top
      ],
      (newProp, oldProp) => {
        info.boundary.left = newProp[0];
        info.boundary.right = newProp[1];
        info.boundary.bottom = newProp[2];
        info.boundary.top = newProp[3];
        if (info.boundary.left) {
          console.log(info.boundary.left, 'left');
          console.log(info.boundary.right, 'right');

          info.middleLine =
            (info.boundary.right - info.boundary.left) / 2 + info.elWidth / 2;
        }
      }
    );
    const getInfo = () => {
      const elm = document.documentElement;
      const dragProperty = mydrag.value.getBoundingClientRect();
      info.screenWidth = elm.clientWidth || 375;
      info.screenHeight = elm.clientHeight || 667;
      info.elWidth = mydrag.value.offsetWidth;
      info.elHeight = mydrag.value.offsetHeight;
      info.left = dragProperty.left;
      info.top = dragProperty.top;
      info.middleLine = info.screenWidth / 2 + info.elWidth / 2;
    };
    // const updateOffsetHeight = () => {
    //   info.screenHeight =
    //     document.documentElement.scrollTop +
    //     document.documentElement.clientHeight;
    // };
    onMounted(() => {
      getInfo();
      console.log('11');

      // window.addEventListener('scroll', updateOffsetHeight);
    });
    onUnmounted(() => {
      // window.removeEventListener('scroll', updateOffsetHeight);
    });
    const getMovement = (
      clientX: number,
      clientY: number,
      moveX: number,
      moveY: number
    ) => {
      const isOverRightLocation = () =>
        moveX + info.left + info.elWidth > rightEdge.value;
      const isUnderLeftBoundary = () => {
        return -moveX > info.left - leftEdge.value;
      };
      const isOverBottomLocation = () =>
        info.top + moveY + info.elHeight > bottomEdge.value;
      const isAboveTopBoundary = () => -moveY > info.top - topEdge.value;

      const strategy = {
        boundaryRight() {
          info.mx = info.boundary.right - info.left - info.elWidth;
        },
        screenRight() {
          info.mx = info.screenWidth - info.left - info.elWidth;
        },
        boundaryLeft() {
          info.mx = -(info.left - info.boundary.left);
        },
        screenLeft() {
          info.mx = -info.left;
        },
        boundaryTop() {
          info.my = -info.top + info.boundary.top;
        },
        screenTop() {
          info.my = -info.top;
        },
        boundaryBottom() {
          info.my = info.boundary.bottom - info.top - info.elHeight;
        },
        screenBottom() {
          info.my = info.screenHeight - info.top - info.elHeight;
        }
      };

      const mx = () => {
        if (isOverRightLocation()) {
          info.boundary.right
            ? strategy['boundaryRight']()
            : strategy['screenRight']();
        } else if (isUnderLeftBoundary()) {
          info.boundary.left
            ? strategy['boundaryLeft']()
            : strategy['screenLeft']();
        } else {
          info.mx = moveX;
        }
      };

      const my = () => {
        if (isOverBottomLocation()) {
          info.boundary.bottom
            ? strategy['boundaryBottom']()
            : strategy['screenBottom']();
        } else if (isAboveTopBoundary()) {
          info.boundary.top
            ? strategy['boundaryTop']()
            : strategy['screenTop']();
        } else {
          info.my = moveY;
        }
      };

      return {
        mx: mx(),
        my: my()
      };
    };
    const gesture = useGesture(
      {
        onDrag: ({
          movement: [x, y],
          event: e
        }: {
          movement: [number, number];
          event: MouseEvent | TouchEvent;
        }) => {
          e.preventDefault();
          const touch = 'targetTouches' in e ? e.targetTouches[0] : null;
          const clientX = touch ? touch.clientX : (e as MouseEvent).clientX;
          const clientY = touch ? touch.clientY : (e as MouseEvent).clientY;
          clientX !== undefined &&
            clientY !== undefined &&
            getMovement(clientX, clientY, x, y);
          // console.log(info.mx, 'mx');
          // console.log(info.my, 'my');

          if (direction === 'y') {
            set({ y: info.my });
          } else if (direction === 'x') {
            set({ x: info.mx });
          } else {
            set({ x: info.mx, y: info.my });
          }
        },
        onDragEnd: ({ movement: [x, y], event: e }) => {
          e.preventDefault();
          const setX = (x: number) => set({ x });
          const setXY = (x: number, y: number) => set({ x, y });

          const handleMovement = (x: number) => {
            const strategy = {
              boundaryLeft() {
                if (
                  info.left - info.boundary.left + info.elWidth + x >
                  info.middleLine
                ) {
                  return info.boundary.right - info.left - info.elWidth;
                } else {
                  return -(info.left - info.boundary.left);
                }
              },
              screenLeft() {
                if (info.left + info.elWidth + x > info.middleLine) {
                  return x + info.screenWidth - (info.left + info.elWidth + x);
                }
                return -info.left;
              }
            };
            return info.boundary.left
              ? strategy['boundaryLeft']()
              : strategy['screenLeft']();
          };
          const handleMovementPosition =
            (handleMovement: (x: number) => number) =>
            (setX: (x: number) => void) =>
            (x: number) => {
              if (attract && direction !== 'y') {
                const movementX = handleMovement(x);
                setX(movementX);
                gesture.config!.drag!.initial = [movementX, info.my];
              } else {
                gesture.config!.drag!.initial = [info.mx, info.my];
              }
            };

          handleMovementPosition(handleMovement)(setX)(x);
        }
      },
      {
        domTarget: mydrag,
        eventOptions: {
          passive: false
        }
      }
    );

    return {
      mydrag,
      classes,
      getStyles
    };
  }
});
</script>
