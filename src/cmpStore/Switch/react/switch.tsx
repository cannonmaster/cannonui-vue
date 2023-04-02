//@ts-ignore
import React, { useState, useEffect, FunctionComponent } from 'react';
import '../switch.scss';

export interface SwitchProps {
  isAsync: boolean;
  checked: boolean;
  disable: boolean;
  activeColor: string;
  inactiveColor: string;
  activeText: string;
  inactiveText: string;
  className: string;
  style: React.CSSProperties;
  onChange: (val: boolean, event: React.MouseEvent) => void;
}
const defaultProps = {
  active: false,
  checked: false,
  isAsync: false,
  activeColor: '#fa2c19',
  inactiveColor: '#ebebeb',
  activeText: '',
  inactiveText: '',
  className: '',
} as SwitchProps;
export const Switch: FunctionComponent<
  Partial<SwitchProps> & React.HTMLAttributes<HTMLDivElement>
> = (props) => {
  const {
    isAsync,
    checked,
    disable,
    activeColor,
    inactiveColor,
    activeText,
    inactiveText,
    onChange,
    className,
    style,
    children,
  } = { ...defaultProps, ...props };

  const [value, setValue] = useState(checked);
  const classes = () => `
    ${`chihuoui-switch`} ${value ? 'switch-open' : 'switch-close'} ${
    disable ? 'chihuoui-switch-disable' : ''
  } ${`chihuoui-switch-base`} ${className}
  `;
  const getStyles = () => {
    return {
      backgroundColor: value ? activeColor : inactiveColor,
      ...(style || {}),
    };
  };
  const onClick = (e: any) => {
    if (disable) {
      return;
    }
    if (!isAsync) {
      setValue(!value);
    }
    onChange && onChange(!value, e);
  };
  useEffect(() => {
    setValue(checked);
  }, [checked]);
  return (
    <div
      onClick={(e) => onClick(e)}
      style={getStyles()}
      className={classes()}
    >
      <div className="switch-button">
        {!value && <div className="close-line" />}
        {activeText && (
          <>
            {value ? (
              <div className={`chihuoui-switch-label open`}>{activeText}</div>
            ) : (
              <div className={`chihuoui-switch-label close`}>
                {inactiveText}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

Switch.defaultProps = defaultProps;
Switch.displayName = 'ChihuouiSwitch';
