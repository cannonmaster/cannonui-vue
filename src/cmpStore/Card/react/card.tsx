//@ts-ignore
import React, { FunctionComponent } from 'react';
import Price from '@/cmpStore/Price/react';
import '../card.scss';

export interface CardProps {
  imgUrl: string;
  title: string;
  price: string;
  vipPrice: string;
  shopDesc: string;
  delivery: string;
  shopName: string;
  className: string;
  style: React.CSSProperties;
  prolistTpl: React.ReactNode;
  shopTagTpl: React.ReactNode;
  originTpl: React.ReactNode;
  footerTpl: React.ReactNode;
}
const defaultProps = {} as CardProps;
export const Card: FunctionComponent<
  Partial<CardProps> & React.HTMLAttributes<HTMLDivElement>
> = (props) => {
  const {
    children,
    className,
    style,
    imgUrl,
    title,
    price,
    vipPrice,
    shopDesc,
    delivery,
    shopName,
    shopTagTpl,
    originTpl,
    prolistTpl,
    footerTpl,
    ...rest
  } = { ...defaultProps, ...props };
  return (
    <div
      className={`chihuoui-card ${className}`}
      style={style}
    >
      <div className="chihuoui-card__left">
        <img
          src={imgUrl}
          alt=""
        />
      </div>
      <div className="chihuoui-card__right">
        <div className="chihuoui-card__right-title">{title}</div>
        {prolistTpl}
        <div className="chihuoui-card__right-price">
          {/* @ts-ignore */}
          <Price price={price} />
          {originTpl || (
            // @ts-ignore
            <Price
              className={`chihuoui-card__right-price-origin`}
              price={vipPrice}
            />
          )}
        </div>
        <div className="chihuoui-card__right-other">
          {shopTagTpl || (
            <>
              <span>{shopDesc}</span>
              <span>{delivery}</span>
            </>
          )}
        </div>
        <div className="chihuoui-card__right-shop">
          <div className="chihuoui-card__right-shop-name">{shopName}</div>
          {footerTpl}
        </div>
      </div>
    </div>
  );
};

Card.defaultProps = defaultProps;
Card.displayName = 'ChihuouiCard';
