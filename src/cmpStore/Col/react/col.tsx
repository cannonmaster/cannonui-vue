import React, {
  FunctionComponent,
  useState,
  useEffect,
  useContext,
  CSSProperties,
} from 'react';
import '../col.scss';
import DataContext from '@/cmpStore/Row/react/UserContext';
type et = 'col' | 'row';
export interface ColProps {
  span: string | number;
  offset: string | number;
  gutter: string | number;
  onClick: (e: any, type: et) => void;
}
const defaultProps = {
  span: 24,
  offset: 0,
  gutter: 0,
} as ColProps;
export const Col: FunctionComponent<
  Partial<ColProps> & Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'>
> = (props) => {
  const { gutter } = useContext(DataContext) as any;
  const { span, offset, onClick, children } = {
    ...defaultProps,
    ...props,
  };
  const [classes, setClasses] = useState('');
  const [styles, setStyles] = useState({});
  const getClass = () => {
    const classPrefix = 'chihuoui-col';
    return `
      ${classPrefix}
      ${classPrefix}-${span}
      ${classPrefix}-offset-${offset}
      ${gutter ? `${classPrefix}-gutter` : ''}
    `;
  };
  const getStyle = () => {
    const styles: CSSProperties = {};
    // styles.gap = `${(gutter as number) / 2}px`;
    // styles.paddingLeft = `${(gutter as number) / 2}px`;
    // styles.paddingRight = `${(gutter as number) / 2}px`;
    return styles;
  };
  useEffect(() => {
    // setClasses(getClass);
    // setStyles(getStyle);
  }, [span, gutter, offset]);
  return (
    <div
      className={getClass()}
      style={getStyle()}
      onClick={(e) => {
        onClick && onClick(e, 'col');
      }}
    >
      {children}
    </div>
  );
};

Col.defaultProps = defaultProps;
Col.displayName = 'ChihuouiCol';
