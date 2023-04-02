import React from 'react';
import { Drag } from './drag';

const DragDemo = () => {
  const btnStyle = {
    borderRadius: '25px',
    padding: '0 18px',
    fontSize: '14px',
    color: '#fff',
    display: 'inline-block',
    lineHeight: '36px',
    background: 'linear-gradient(135deg,#fa2c19 0,#fa6419 100%)',
  };
  return (
    <>
      <div className="demo">
        <h2>基础用法</h2>
        <Drag>
          <span style={btnStyle}>基础用法</span>
        </Drag>
        <h2>定向使用</h2>
        <Drag direction="x">
          <span style={btnStyle}>x定向</span>
        </Drag>
        <Drag direction="y">
          <span style={btnStyle}>y定向</span>
        </Drag>
        <h2>定向使用</h2>
        <Drag direction="x" attract>
          <span style={btnStyle}>自动贴边</span>
        </Drag>
      </div>
    </>
  );
};

export default DragDemo;
