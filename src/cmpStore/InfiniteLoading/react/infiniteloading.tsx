//@ts-ignore
import React, { useEffect, useState, useRef, FunctionComponent } from 'react';
import '../infiniteloading.scss';
import { useDrag, useScroll } from '@use-gesture/react';
import { useSpring, animated } from '@react-spring/web';
export interface InfiniteLoadingProps {
  containerId?: string;
  onRefresh?: () => void;
  onLoadData?: () => void;
  isRefreshAvailable?: boolean;
  threshold?: number;
}
const defaultProps = {
  containerId: '',
  isRefreshAvailable: true,
  threshold: 20,
} as InfiniteLoadingProps;
export const InfiniteLoading: FunctionComponent<
  Partial<InfiniteLoadingProps> & React.HTMLAttributes<HTMLDivElement>
> = (props) => {
  const {
    children,
    threshold,
    containerId,
    isRefreshAvailable,
    onRefresh,
    onLoadData,
  } = {
    ...defaultProps,
    ...props,
  };
  const scroller = useRef<HTMLDivElement>(null);
  const top = useRef(0);
  const prevOffsetY = useRef(0);
  const infiniteTop = useRef<HTMLDivElement>(null);
  const topHeight = useRef(0);
  const isTouching = useRef(false);
  const topRefreshHeight = useRef(0);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const styles = () => {
    return {
      height: top.current < 0 ? 0 : `${top.current}px`,
      transition: isTouching.current
        ? 'height 0 cubic-bezier(0.25,0.1,0.25,1)'
        : 'height .2s cubic-bezier(0.25,0.1,0.25,1)',
    };
  };
  const getParentEle = (el: HTMLElement) => {
    return containerId
      ? document.querySelector(`#${containerId}`)
      : el && el.parentNode;
  };
  const scrollY = useRef(0);
  const drag = useDrag(
    async ({
      dragging,
      movement: [moveX, moveY],
      offset: [offsetX, offsetY],
    }) => {
      const { scrollHeight, clientHeight } = scroller.current as HTMLElement;

      if (isRefreshAvailable) {
        const infiniteTopEl = infiniteTop.current as HTMLDivElement;

        if (dragging) {
          if (moveY < topRefreshHeight.current && !isTouching.current) {
            if (offsetY > 0) infiniteTopEl.style.height = `${moveY}px`;
          } else {
            if (offsetY > 0)
              infiniteTopEl.style.height = `${topRefreshHeight.current}px`;
          }
          top.current = moveY;
        } else {
          if (top.current >= topRefreshHeight.current && offsetY > 0) {
            onRefresh && (await onRefresh());
          }
          infiniteTopEl.style.height = '0px';
          top.current = 0;
          isTouching.current = false;
        }
      }

      if (offsetY < 0) {
        if (
          Math.abs(offsetY) <=
          scrollHeight - clientHeight - (threshold as number)
        ) {
          scrollY.current = offsetY;
          (
            scroller.current as HTMLDivElement
          ).style.transform = `translate3d(0, ${scrollY.current}px,0)`;
        } else {
          if (!isLoadingData && !dragging) {
            setIsLoadingData(true);
            (
              scroller.current as HTMLDivElement
            ).style.transform = `translate3d(0, ${
              -scrollHeight + clientHeight - 30
            }px,0)`;
            onLoadData && (await onLoadData());
            console.log('loaded data');

            setIsLoadingData(false);
          }
        }
      }
    },
    { delay: true }
  );
  useEffect(() => {
    const parentEle = getParentEle(
      scroller.current as HTMLElement
    ) as HTMLElement;
    parentEle.style.overflow = 'hidden';
    topHeight.current = (
      (infiniteTop.current as HTMLDivElement).firstElementChild as HTMLElement
    ).offsetHeight;
    topRefreshHeight.current = topHeight.current + 10;
  }, [infiniteTop.current?.firstElementChild]);

  return (
    <div className="chihuoui-infiniteloading" ref={scroller} {...drag()}>
      <div className="infinite-top" style={styles()} ref={infiniteTop}>
        <div className="top-content">
          <span className="title">下拉加载</span>
        </div>
      </div>
      <div className="infinite-body">{children}</div>
      <div className="infinite-bottom">
        {isLoadingData ? (
          <div className="bottom-content">
            <span className="title">加载...</span>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

InfiniteLoading.defaultProps = defaultProps;
InfiniteLoading.displayName = 'ChihuouiInfiniteLoading';
