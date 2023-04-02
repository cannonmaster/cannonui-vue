//@ts-ignore
import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  FunctionComponent,
} from 'react';
import '../swiper.scss';
import classNames from 'classnames';
import { getRect } from '@/utils/react_useClientRect';
export const DataContext = React.createContext({});
type Parent = {
  propSwiper: SwiperProps;
  size?: number | string;
};
interface IStyle {
  width?: string;
  height?: string;
  transform?: string;
}
export interface SwiperProps {
  direction: string;
  initPage: number;
  autoPlay: number | string;
  loop: boolean;
  width: number;
  height: number;
  isCenter: boolean;
  duration: number;
  isPreventDefault: boolean;
  isStopPropagation: boolean;
  className?: string;
  onChange?: (currPage: number) => void;
  paginationColor: string;
  paginationVisible: boolean;
  touchable: boolean;
  pageContent?: any;
}
const defaultProps = {
  direction: 'horizontal',
  loop: true,
  autoPlay: 0,
  initPage: 0,
  className: '',
  width: typeof window === 'object' ? window.innerWidth : 375,
  height: 0,
  isCenter: false,
  paginationVisible: false,
  paginationColor: '#fff',
  duration: 600,
  touchable: true,
  isPreventDefault: true,
  isStopPropagation: true,
} as SwiperProps;
const DISTANCE = 5;
export const Swiper: FunctionComponent<
  Partial<SwiperProps> & Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>
> = React.forwardRef((props, ref) => {
  const container = useRef<any>(null);
  const innerRef = useRef<any>(null);
  const propSwiper = { ...defaultProps, ...props };
  const { children, isCenter, direction, onChange, className, pageContent } =
    propSwiper;
  const _swiper = useRef<any>({
    moving: false,
    autoplayTimer: null,
    width: 0,
    height: 0,
    offset: 0,
    size: 0,
  });
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  let [active, setActive] = useState(0);
  const [rect, setRect] = useState(null as any | null);
  const [offset, setOffset] = useState(0);
  const [ready, setReady] = useState(false);
  const [touch, setTouch] = useState({
    startX: 0,
    startY: 0,
    deltaX: 0,
    deltaY: 0,
    offsetX: 0,
    offsetY: 0,
    stateDirection: '',
    delta: 0,
    touchTime: 0,
  });
  const [childOffset, setChildOffset] = useState<number[]>([]);
  const isVertical = propSwiper.direction === 'vertical';
  const contentClass = classNames({
    'chihuoui-swiper__inner': true,
    '__vertical': isVertical,
  });
  let size = isVertical ? height : width;
  const { childs, childCount } = useMemo(() => {
    let childCount = 0;
    const childs = React.Children.map(props.children, (child) => {
      if (!React.isValidElement(child)) return null;
      childCount++;
      return child;
    });
    return {
      childs,
      childCount,
    };
  }, [props.children]);
  const parent: Parent = {
    propSwiper,
    size,
  };
  let trackSize = childCount * Number(size);
  const init = (active: number = +propSwiper.initPage) => {
    const rect = getRect(container?.current);
    const _active = Math.max(Math.min(childCount - 1, active), 0);
    const _width = propSwiper.width ? propSwiper.width : rect.width;
    const _height = propSwiper.height ? propSwiper.height : rect.height;
    size = isVertical ? height : width;
    trackSize = childCount * Number(size);
    const targetOffset = getOffset(_active);
    _swiper.current.moving = true;
    if (ready) {
      _swiper.current.moving = false;
    }
    setRect(rect);
    setActive(_active);
    setWidth(_width);
    setHeight(_height);
    setOffset(targetOffset);
    setReady(true);
  };
  useEffect(() => {
    _swiper.current.activePagination = (active + childCount) % childCount;
  }, [active]);
  useEffect(() => {
    if (ready) {
      getStyle();
    }
  }, [isVertical, width, height, offset, ready]);
  useEffect(() => {
    if (ready) {
      stopAutoPlay();
      autoPlay();
    }
    return () => {
      setReady(false);
    };
  }, [ready]);
  useEffect(() => {
    stopAutoPlay();
    autoPlay();
  }, [children]);
  useEffect(() => {
    init();
  }, [propSwiper.initPage]);

  useEffect(() => {
    const target = container.current;
    target.addEventListener('touchstart', onTouchStart, false);
    target.addEventListener('touchmove', onTouchMove, false);
    target.addEventListener('touchend', onTouchEnd, false);

    return () => {
      target.removeEventListener('touchstart', onTouchStart, false);
      target.removeEventListener('touchmove', onTouchMove, false);
      target.removeEventListener('touchend', onTouchEnd, false);
    };
  });
  useEffect(() => {
    return () => {
      stopAutoPlay();
    };
  }, []);
  React.useImperativeHandle(ref, () => {
    return {
      to,
      next,
      prev,
    };
  });
  const itemStyle = (index: any) => {
    const style: IStyle = {};
    const _direction = propSwiper.direction || direction;
    const _size = size;
    if (_size) {
      style[_direction === 'horizontal' ? 'width' : 'height'] = `${_size}px`;
    }
    const offset = childOffset[index];
    if (offset) {
      style.transform = `translate3D${
        _direction === 'horizontal'
          ? `(
        ${offset}px,0,0
      )`
          : `(0,${offset}px,0)`
      }`;
    }
    return style;
  };
  const getStyle = (moveOffset = offset) => {
    const target = innerRef.current;

    let _offset = 0;
    if (!isCenter) {
      _offset = moveOffset;
    } else {
      // _size 默认容器rect 高/宽，如果用户自动宽/高，则以用户为准
      const _size = isVertical ? height : width;
      // 1. val， 如果用户没有自定义宽/高，则val=0, 这里用来获取用户自定义宽/高 与 容器的宽/高的差
      // 2. 如果用户自定义的active 最后一张，那么就是往左边移动（负），如果不是最后一张，则往右边移动（正）
      const val = isVertical
        ? (rect as DOMRect).height - _size
        : (rect as DOMRect).width - _size;
      _offset =
        moveOffset +
        (active === childCount - 1 && !props.loop ? -val / 2 : val / 2);
    }

    target.style.transform = `translate3D${
      !isVertical ? `(${_offset}px,0,0)` : `(0,${_offset}px,0)`
    }`;
    target.style.transitionDuration = `${
      _swiper.current.moving ? 0 : props.duration
    }ms`;
    target.style[isVertical ? 'height' : 'width'] = `${
      Number(size) * childCount
    }px`;
    target.style[isVertical ? 'width' : 'height'] = `${
      isVertical ? width : height
    }px`;
  };
  const touchReset = () => {
    touch.startX = 0;
    touch.startY = 0;
    touch.deltaX = 0;
    touch.deltaY = 0;
    touch.offsetX = 0;
    touch.offsetY = 0;
    touch.delta = 0;
    touch.stateDirection = '';
    touch.touchTime = 0;
  };
  const getDirection = (x: number, y: number) => {
    if (x > y && x > DISTANCE) return 'horizontal';
    if (y > x && y > DISTANCE) {
      return 'vertical';
    }
    return '';
  };
  const touchstart = (e: TouchEvent) => {
    touchReset();
    touch.startX = e.touches[0].clientX;
    touch.startY = e.touches[0].clientY;
  };
  const touchMove = (e: TouchEvent) => {
    touch.deltaX = e.touches[0].clientX - touch.startX;
    touch.deltaY = e.touches[0].clientY - touch.startY;
    touch.offsetX = Math.abs(touch.deltaX);
    touch.offsetY = Math.abs(touch.deltaY);
    touch.delta = isVertical ? touch.deltaY : touch.deltaX;
    if (!touch.stateDirection) {
      touch.stateDirection = getDirection(touch.offsetX, touch.offsetY);
    }
  };
  const onTouchStart = (e: TouchEvent) => {
    if (props.isPreventDefault) e.preventDefault();
    if (props.isStopPropagation) e.stopPropagation();
    if (!props.touchable) return;
    touchstart(e);
    touch.touchTime = Date.now();
    stopAutoPlay();
    resetPosition();
  };
  const onTouchMove = (e: TouchEvent) => {
    if (props.touchable && _swiper.current.moving) {
      touchMove(e);
      if (touch.stateDirection === props.direction) {
        move({
          offset: touch.delta,
        });
      }
    }
  };
  const onTouchEnd = (e: TouchEvent) => {
    if (!props.touchable || !_swiper.current.moving) return;
    const speed = touch.delta / (Date.now() - touch.touchTime);
    const isShouldMove =
      Math.abs(speed) > 0.3 || Math.abs(touch.delta) > +(size / 2).toFixed(2);
    let pace = 0;
    _swiper.current.moving = false;
    if (isShouldMove && touch.stateDirection === props.direction) {
      const offset = isVertical ? touch.offsetY : touch.offsetX;
      if (props.loop) {
        if (offset > 0) {
          pace = touch.delta > 0 ? -1 : 1;
        } else {
          pace = 0;
        }
      } else {
        pace = -Math[touch.delta > 0 ? 'ceil' : 'floor'](touch.delta / size);
      }
      move({
        pace,
        isEmit: true,
      });
    } else if (touch.delta) {
      move({ pace: 0 });
    } else {
      getStyle();
    }
    autoPlay();
  };

  const resetPosition = () => {
    _swiper.current.moving = true;
    if (active <= -1) {
      move({ pace: childCount });
    }
    if (active >= childCount) {
      move({ pace: -childCount });
    }
  };

  const minOffset = (() => {
    if (rect) {
      const base = isVertical ? rect.height : rect.width;
      return base - Number(size) * childCount;
    }
    return 0;
  })();
  const getOffset = (active: number, offset = 0) => {
    let currentPosition = active * Number(size);
    //确认offset偏移在有效范围，有效范围就是 0 - 最大偏移
    if (!props.loop) {
      currentPosition = Math.min(currentPosition, -minOffset);
    }
    let targetOffset = offset - currentPosition;
    if (!props.loop) {
      targetOffset = range(targetOffset, minOffset, 0);
    }
    return targetOffset;
  };
  const getActive = (pace: number) => {
    if (pace) {
      const _active = active + pace;
      if (props.loop) {
        return range(_active, -1, childCount);
      }
      return range(_active, 0, childCount - 1);
    }
    return active;
  };
  const range = (num: number, min: number, max: number) => {
    return Math.min(Math.max(num, min), max);
  };
  const move = ({
    pace = 0,
    offset = 0,
    isEmit = false,
    movingStatus = false,
  }) => {
    if (childCount <= 1) return;
    const targetActive = getActive(pace);
    const targetOffset = getOffset(targetActive, offset);

    if (props.loop) {
      if (
        Array.isArray(children) &&
        children[0] &&
        targetOffset !== minOffset
      ) {
        const rightBound = targetOffset < minOffset;
        childOffset[0] = rightBound ? trackSize : 0;
      }

      if (
        Array.isArray(children) &&
        children[childCount - 1] &&
        targetOffset !== 0
      ) {
        const leftBound = targetOffset > 0;
        childOffset[childCount - 1] = leftBound ? -trackSize : 0;
      }
      setChildOffset(childOffset);
    }

    if (isEmit && active !== targetActive) {
      props.onChange &&
        props.onChange((targetActive + childCount) % childCount);
    }
    active = targetActive;
    setActive(targetActive);
    setOffset(targetOffset);
    getStyle(targetOffset);
  };
  const prev = () => {
    resetPosition();
    touchReset();
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        _swiper.current.moving = false;
        move({
          pace: -1,
          isEmit: true,
        });
      });
    });
  };
  const next = () => {
    // 处理首尾图片
    resetPosition();
    touchReset();
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        _swiper.current.moving = false;
        move({
          pace: 1,
          isEmit: true,
        });
      });
    });
  };
  const to = (index: number) => {
    resetPosition();
    touchReset();
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        _swiper.current.moving = false;
        let targetIndex;
        if (props.loop && childCount === index) {
          targetIndex = active === 0 ? 0 : index;
        } else {
          targetIndex = index % childCount;
        }
        move({
          pace: targetIndex - active,
          isEmit: true,
        });
      });
    });
  };
  const stopAutoPlay = () => {
    clearTimeout(_swiper.current.autoplayTimer);
    _swiper.current.autoplayTimer = null;
  };
  const autoPlay = () => {
    if (propSwiper.autoPlay <= 0 || childCount <= 1) return;
    // 每次都先清除上一次
    stopAutoPlay();
    _swiper.current.autoplayTimer = setTimeout(() => {
      next();
      autoPlay();
    }, Number(propSwiper.autoPlay));
  };
  return (
    //@ts-ignore
    <DataContext.Provider value={parent}>
      <div
        className={`chihuoui-swiper ${className}`}
        ref={container}
      >
        <div
          className={contentClass}
          ref={innerRef}
        >
          {React.Children.map(childs, (child: any, index: number) => {
            return (
              <div
                className="item-wrapper"
                style={itemStyle(index)}
                key={index}
              >
                {child}
              </div>
            );
          })}
        </div>
        {propSwiper.paginationVisible && !('pageContent' in propSwiper) ? (
          <div
            className={classNames({
              'chihuoui-swiper__pagination': true,
              'chihuoui-swiper__pagination-verticle': isVertical,
            })}
          >
            {React.Children.map(childs, (item: any, index: number) => {
              return (
                <i
                  style={
                    (active + childCount) % childCount === index
                      ? {
                          backgroundColor: propSwiper.paginationColor,
                        }
                      : undefined
                  }
                  className={classNames({
                    'chihuoui-swiper__pagination-item': true,
                    active: (active + childCount) % childCount === index,
                  })}
                  key={index}
                />
              );
            })}
          </div>
        ) : (
          <div>{pageContent}</div>
        )}
      </div>
    </DataContext.Provider>
  );
});

Swiper.defaultProps = defaultProps;
Swiper.displayName = 'ChihuouiSwiper';
