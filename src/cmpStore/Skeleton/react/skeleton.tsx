//@ts-ignore
import React, { FunctionComponent } from 'react';
import '../skeleton.scss';

export interface SkeletonProps {
  round?: boolean;
  animated?: boolean;
  width?: string;
  height?: string;
  loading?: boolean;
  row: number;
  title: boolean;
  children?: React.ReactNode;
}
const defaultProps = {
  round: false,
  animated: false,
  loading: false,
  height: '20px',
  width: '100px',
  title: false,
  row: 1,
} as SkeletonProps;
export const Skeleton: FunctionComponent<Partial<SkeletonProps>> = (props) => {
  const { loading, animated, round, height, width, title, row, children } = {
    ...defaultProps,
    ...props,
  };
  const getCls = (classname: string) => {
    return `
      ${classname}
      ${classname}--round
    `;
    // [classname]: true,
    // [`${classname}--round`]: round,
  };
  const styles = () => {};
  const data = (rowLen: number) => {
    return Array.from({ length: rowLen }, (v, i) => i);
  };
  return (
    <>
      {loading ? (
        <div>{children}</div>
      ) : (
        <div className={getCls('skeleton')}>
          {animated && <div className="skeleton-animation" />}
          <div className="content">
            <div
              className="content-line"
              style={{ width }}
            >
              {title && <div className="title" />}
              {data(row).map((item, index) => {
                return (
                  <div
                    key={index}
                    className={getCls('blockLine')}
                    style={{ height }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

Skeleton.defaultProps = defaultProps;
Skeleton.displayName = 'ChihuouiSkeleton';
