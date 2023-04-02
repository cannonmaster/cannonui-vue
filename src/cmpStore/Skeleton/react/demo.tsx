import React, { useRef } from 'react';
import { Skeleton } from './skeleton';
const SkeletonDemo = () => {
  const loading = useRef(false);
  return (
    <>
      <div className="demo">
        <h2>基础用法</h2>
        <Skeleton
          row="6"
          animated
          round
          loading={loading.current}
          height="20px"
          width="300px"
        ></Skeleton>
      </div>
    </>
  );
};

export default SkeletonDemo;
