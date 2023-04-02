import React, { useEffect, useState } from 'react';
import { InfiniteLoading } from './infiniteloading';
import '../demo.scss';
const InfiniteLoadingDemo = () => {
  const [data, setData] = useState<string[]>([]);
  useEffect(() => {
    for (let i = 0; i < 10; i++) {
      data.push(`${i}`);
    }
    setData([...data]);
  }, []);
  return (
    <>
      <div className="demo">
        <h2>基础用法</h2>
        <ul className="styleul">
          <InfiniteLoading
            onLoadData={async () => {
              await new Promise((res, rej) => {
                setTimeout(() => {
                  let len = data.length;
                  for (let i = len; i < len + 10; i++) {
                    data.push(`${i}`);
                  }
                  setData([...data]);
                  res(data);
                }, 100);
              });
            }}
            onRefresh={() => console.log('refresh')}
          >
            {data.map((item, index) => {
              return (
                <li className="styleli" key={index}>
                  {item}
                </li>
              );
            })}
          </InfiniteLoading>
        </ul>
      </div>
    </>
  );
};

export default InfiniteLoadingDemo;
