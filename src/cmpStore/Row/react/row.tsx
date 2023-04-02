// import React from 'react';
import type { FunctionComponent, CSSProperties } from 'react';
import DataContext from './UserContext';
import '../row.scss';
export interface RowProps {
  offset: number | string;
  gutter: number | string;
  align: string;
  justify: string;
  type: string;
  onClick: (e: any, et: 'row' | 'col') => void;
}
const defaultProps: RowProps = {
  offset: '0',
  gutter: '0',
  align: 'flex-center',
  justify: 'center',
  type: 'flex',
} as RowProps;
export const Row: FunctionComponent<
  Partial<RowProps> & Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'>
> = (props) => {
  const { type, gutter, onClick, align, justify, offset, children } = {
    ...defaultProps,
    ...props,
  };
  const context = {
    gutter,
  };
  const prefixCls = 'chihuoui-row';
  const gClasses = (key: string, val: string | number) => {
    return key ? prefixCls + '-' + key + '-' + val : prefixCls + '-' + val;
  };
  const getClasses = () => `
    ${gClasses('', type)}
    ${gClasses('align', align)}
    ${gClasses('justify', justify)}
    ${gClasses('offset', offset)}
  `;
  const getStyles = () => {
    const styles: CSSProperties = {};
    styles.gap = `${(gutter as number) / 2}px`;
    return styles;
  };
  return (
    //@ts-ignore
    <DataContext.Provider value={context}>
      <div
        style={getStyles()}
        className={getClasses()}
        onClick={(e: any) => onClick && onClick(e, 'row')}
      >
        {children}
      </div>
    </DataContext.Provider>
  );
};

Row.defaultProps = defaultProps;
Row.displayName = 'ChihuouiRow';
