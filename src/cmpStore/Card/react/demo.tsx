import React from 'react';
import { Card } from './card';

const CardDemo = () => {
  const state = {
    imgUrl:
      '//img10.360buyimg.com/n2/s240x240_jfs/t1/210890/22/4728/163829/6163a590Eb7c6f4b5/6390526d49791cb9.jpg!q70.jpg',
    title: '测试',
    price: '388',
    vipPrice: '378',
    shopDesc: '测试',
    delivery: '测试',
    shopName: '测试',
  };
  return (
    <>
      <div className="demo">
        <h2>基础用法</h2>
        {/* @ts-ignore */}
        <Card
          imgUrl={state.imgUrl}
          title={state.title}
          price={state.price}
          vipPrice={state.vipPrice}
          shopDesc={state.shopDesc}
          delivery={state.delivery}
          shopName={state.shopName}
        />
        {/* @ts-ignore */}
        <Card
          imgUrl={state.imgUrl}
          title={state.title}
          price={state.price}
          vipPrice={state.vipPrice}
          shopDesc={state.shopDesc}
          delivery={state.delivery}
          shopName={state.shopName}
        />
      </div>
    </>
  );
};

export default CardDemo;
