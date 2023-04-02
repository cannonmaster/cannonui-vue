import React, { useState } from 'react';
import { Switch } from './switch';

const SwitchDemo = () => {
  const [asyncChecked, setAsyncChecked] = useState<Boolean>(false);
  const onChange = (value: boolean, e: any) => {
    console.log(value, 'value ------');
  };
  const onChangeAsync = (value: Boolean, e: any) => {
    setTimeout(() => {
      setAsyncChecked(value);
    }, 2000);
  };
  return (
    <>
      <div className="demo">
        <h2>基础用法</h2>
        <Switch checked={false} />
        <h2>禁用状态</h2>
        <Switch disable checked={true} />
        <h2>onChange</h2>
        <Switch checked={false} onChange={(value, e) => onChange(value, e)} />
        <h2>异步控制</h2>
        <Switch
          isAsync={true}
          checked={asyncChecked}
          onChange={(value, e) => onChangeAsync(value, e)}
        />
        <h2>自定义颜色</h2>
        <Switch checked={false} activeColor="cyan" />
        <h2>自定义文字</h2>
        <Switch activeText="开" inactiveText="关" />
      </div>
    </>
  );
};

export default SwitchDemo;
