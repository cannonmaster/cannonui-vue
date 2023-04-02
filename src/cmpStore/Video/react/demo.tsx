import { log } from 'console';
import React, { useState } from 'react';
import { Video } from './video';

const VideoDemo = () => {
  const [source, setSource] = useState({
    src: 'https://storage.360buyimg.com/nutui/video/video_NutUI.mp4',
    type: 'video/mp4',
  });
  const options = {
    autoplay: false,
    muted: true,
    controls: true,
    poster:
      'https://img12.360buyimg.com/ling/s345x208_jfs/t1/168105/33/8417/54825/603df06dEfcddc4cb/21f9f5d0a1b3dad4.jpg.webp',
  };
  const onPlayFuc = (elm: HTMLVideoElement) => {
    console.log('play', elm);
  };
  return (
    <>
      <div className="demo">
        <h2>基础用法</h2>
        {/* @ts-ignore */}
        <Video
          source={source}
          options={options}
          onPlayFuc={onPlayFuc}
        ></Video>
      </div>
    </>
  );
};

export default VideoDemo;
