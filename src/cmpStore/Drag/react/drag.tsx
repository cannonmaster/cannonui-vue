//@ts-ignore
import React, { useEffect, useState, FunctionComponent, useRef } from 'react';
import '../drag.scss';
import { useDrag } from '@use-gesture/react';
import { useSpring, animated } from '@react-spring/web';
export interface DragProps {
  attract: boolean;
  direction: 'x' | 'y' | undefined;
  boundary: {
    left: number;
    right: number;
    top: number;
    bottom: number;
  };
  className: string;
  style: React.CSSProperties;
}
const defaultProps = {
  attract: false,
  boundary: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  direction: undefined,
  className: '',
} as DragProps;
export const Drag: FunctionComponent<
  Partial<DragProps> & React.HTMLAttributes<HTMLDivElement>
> = (props) => {
  const { attract, boundary, direction, className, style, children } = {
    ...defaultProps,
    ...props,
  };

  const [boundaryState, setBoundary] = useState(boundary);
  const drag = useRef<HTMLDivElement>(null);
  const [currentStyle, api] = useSpring(() => ({
    x: 0,
    y: 0,
    touchAction: 'none',
  }));
  const middleLine = useRef(0);
  const getInfo = () => {
    const el = drag.current;
    if (el) {
      const { offsetLeft, offsetHeight, offsetTop, offsetWidth } = el;
      const { clientWidth, clientHeight } = document.documentElement;
      const { top, left, right, bottom } = boundary;
      setBoundary({
        top: -offsetTop + top,
        right: clientWidth - offsetWidth - offsetLeft - right,
        left: -offsetLeft + left,
        bottom: clientHeight - offsetHeight - bottom - offsetTop,
      });

      middleLine.current =
        clientWidth -
        offsetWidth -
        offsetLeft -
        (clientWidth - offsetWidth) / 2;
    }
  };
  const bind = useDrag(
    ({ down, last, offset: [x, y] }) => {
      api.start({ x, y, immediate: down });
      if (last) {
        if (direction !== 'y' && props.attract) {
          if (x < middleLine.current) {
            api.start({ x: boundaryState.left, y, immediate: down });
          } else {
            api.start({ x: boundaryState.right, y, immediate: down });
          }
        }
      }
    },
    {
      from: () => [currentStyle.x.get(), currentStyle.y.get()],
      axis: direction,
    }
  );

  useEffect(() => {
    getInfo();
  }, [drag]);

  return (
    <div
      style={style}
      className={`chihuoui-drag ${className}`}
      ref={drag}
    >
      <animated.div
        style={currentStyle}
        {...bind()}
        className="div"
      >
        {children}
      </animated.div>
    </div>
  );
};

Drag.defaultProps = defaultProps;
Drag.displayName = 'ChihuouiDrag';
