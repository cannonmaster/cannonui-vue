//@ts-ignore
import React, { FunctionComponent, HTMLAttributes } from 'react';
import '../price.scss';

export interface PriceProps {
  children: React.ReactNode;
  price: number | string;
  needSymbol: boolean;
  thounds: boolean;
  decimalPoint: number;
  symbol: string;
  symbolPosition: string;
  className: string;
  size: string;
}
const defaultProps = {
  children: '',
  needSymbol: true,
  price: 0,
  symbol: '¥',
  thounds: true,
  symbolPosition: 'before',
  size: 'small',
  decimalPoint: 2,
  className: '',
} as PriceProps;
export const Price: FunctionComponent<Partial<PriceProps>> = (props) => {
  const {
    price,
    needSymbol,
    symbol,
    symbolPosition,
    decimalPoint,
    thounds,
    size,
    className,
    children,
  } = { ...defaultProps, ...props };
  const replaceSpecialChar = (symbol: string) => {
    let res = symbol;
    res = symbol.replace(/&quot;/g, '"');
    res = symbol.replace(/&amp;/g, '&');
    res = symbol.replace(/&lt;/g, '<');
    res = symbol.replace(/&gt;/g, '>');
    res = symbol.replace(/&nbsp;/g, ' ');
    res = symbol.replace(/&yen;/g, '¥');
    return res;
  };
  const showSymbol = () => {
    return { __html: (needSymbol ? replaceSpecialChar(symbol) : '') || '' };
  };
  const checkPoint = (num: string | number) => String(num).indexOf('.') > -1;
  const formatThousands = (num: number | string) => {
    num = Number(num);
    if (num === 0) return 0;
    if (checkPoint(num)) {
      num = num.toFixed(decimalPoint);
      num = num.split('.')[0];
    }

    if (!checkPoint(num)) {
      num = num.toString();
    }

    if (thounds) {
      num = (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    }

    return num;
  };
  const formatDecimal = (num: string | number) => {
    let res: string | number = Number(num);
    if (Number(num) === 0) return String(0);

    if (checkPoint(num)) {
      res = Number(num).toFixed(decimalPoint);
      res = String(num).split('.')[1];
    }

    if (!checkPoint(num)) {
      res = String(0);
    }
    res = `0.${res}`;
    res = Number(res).toFixed(decimalPoint);
    return String(res).substring(2, String(res).length);
  };
  return (
    <div className={`chihuoui-price ${className}`}>
      {needSymbol ? (
        <div
          className={`chihuoui-price__symbol`}
          dangerouslySetInnerHTML={showSymbol()}
        />
      ) : (
        ''
      )}
      <div className="chihuoui-price__number">{formatThousands(price)}</div>
      {decimalPoint !== 0 && <div className="chihuoui-price__point">.</div>}
      <div className="chihuoui-price__decimal">{formatDecimal(price)}</div>
    </div>
  );
};

Price.defaultProps = defaultProps;
Price.displayName = 'ChihuouiPrice';
