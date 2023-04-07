//@ts-ignore
import React, { FunctionComponent, useContext } from 'react';
import { DataContext } from '@/cmpStore/Swiper/react/swiper';
import '../swiperitem.scss';
interface IStyle {
  width?: string;
  height?: string;
  transform?: string;
}
export interface SwiperItemProps {
  direction?: string;
  size?: 0;
}
const defaultProps = {
  direction: 'horizontal',
} as SwiperItemProps;
export const SwiperItem = React.forwardRef<
  HTMLDivElement,
  Partial<SwiperItemProps> & React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  const _props = { ...defaultProps, ...props };
  const { children, direction, size } = _props;
  const parent: any = useContext(DataContext);
  const style = () => {
    const style: IStyle = {};
    const _direction = parent?.propSwiper?.direction || direction;
    const _size = parent?.size || size;
    if (_size) {
      style[_direction === 'horizontal' ? 'width' : 'height'] = `${_size}px`;
    }
    return style;
  };
  return (
    <div
      style={style()}
      className="chihuoui-swiperitem"
    >
      {children}
    </div>
  );
});

SwiperItem.defaultProps = defaultProps;
SwiperItem.displayName = 'ChihuouiSwiperItem';
