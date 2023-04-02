import React from 'react';
import { Price } from './price';
const PriceDemo = () => {
  return (
    <div className="demo">
      <h2>基础用法</h2>
      {/*@ts-ignore*/}
      <Price
        price={1000000}
        needSymbol={false}
      />
      <h2>带符号用法</h2>
      {/*@ts-ignore*/}
      <Price
        price={1000000}
        needSymbol={true}
      />
      <h2>一般用法</h2>
      {/*@ts-ignore*/}
      <Price
        price={1000000}
        needSymbol={true}
        thounds={false}
      />
    </div>
  );
};

export default PriceDemo;
