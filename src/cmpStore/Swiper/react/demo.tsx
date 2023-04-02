import React, { useState } from 'react';
import { Swiper } from './swiper';
import { SwiperItem } from '@/cmpStore/SwiperItem/react/swiperitem';
import '../demo.scss';
const SwiperDemo = () => {
  const [paginationColor, setPaginationColor] = useState('#426543');
  const [initPage, setInitPage] = useState(0);
  const [height, setHeight] = useState(150);
  const onChange = () => {};
  const list = [
    'https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg',
    'https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg',
    'https://storage.360buyimg.com/jdc-article/welcomenutui.jpg',
    'https://storage.360buyimg.com/jdc-article/fristfabu.jpg',
  ];
  return (
    <>
      <div className="demo padding">
        <h2>基础用法</h2>
        <div
          className="demo-box"
          style={{ height: 150 }}
        >
          {/* @ts-ignore */}
          <Swiper
            height={height}
            paginationColor={paginationColor}
            autoPlay="2000"
            initPage={initPage}
            onChange={onChange}
            paginationVisible
          >
            {list.map((item) => {
              return (
                // @ts-ignore
                <SwiperItem key={item}>
                  <img src={item} />
                </SwiperItem>
              );
            })}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default SwiperDemo;
