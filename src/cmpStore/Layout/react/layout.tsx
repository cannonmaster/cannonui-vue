// @ts-ignore
import React, { FunctionComponent } from 'react';
import '../layout.scss';

export interface LayoutProps {}
const defaultProps = {} as LayoutProps;
export const Layout: FunctionComponent<
  Partial<LayoutProps> & React.HTMLAttributes<HTMLDivElement>
> = (props) => {
  const { children } = { ...defaultProps, ...props };
  return <div className="chihuoui-layout">Layout</div>;
};

Layout.defaultProps = defaultProps;
Layout.displayName = 'ChihuouiLayout';
