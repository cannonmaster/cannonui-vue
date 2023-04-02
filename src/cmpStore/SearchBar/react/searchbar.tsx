//@ts-ignore
import { log } from 'console';
import React, { FunctionComponent, useEffect, useState, useRef } from 'react';
import '../searchbar.scss';
type TIconDirection = 'in-left' | 'out-left' | 'in-right' | 'out-right';
export interface SearchBarProps {
  value?: number | string;
  leftinIcon?: React.ReactNode;
  readOnly?: boolean;
  disabled?: boolean;
  placeholder?: string;
  shape?: 'square' | 'round';
  actionText?: React.ReactNode;
  background?: string;
  maxLength?: number;
  label?: string;
  align?: string;
  autoFocus?: boolean;
  clearable?: boolean;
  leftoutIcon?: React.ReactNode;
  rightinIcon?: React.ReactNode;
  rightoutIcon?: React.ReactNode;
  inputBackground?: string;
  onChange?: (value: string, e: Event) => void;
  onCancel?: () => void;
  onFocus?: (value: string, e: Event) => void;
  onBlur?: (value: string, e: Event) => void;
  onClear: (e: Event) => void;
  onClickInput?: (e: Event) => void;
  onClickLeftoutIcon?: (value: string, e: Event) => void;
  onClickRightoutIcon: (value: string, e: Event) => void;
  onClickRightinIcon: (value: string, e: Event) => void;
  onClickLeftinIcon?: (value: string, event: Event) => void;
}
const defaultProps = {
  placeholder: '',
  shape: 'square',
  disabled: false,
  autoFocus: false,
  maxLength: 9999,
  clearable: true,
  align: 'left',
  label: '',
  readOnly: false,
} as SearchBarProps;
export const SearchBar: FunctionComponent<
  Partial<SearchBarProps> &
    Omit<
      React.HTMLAttributes<HTMLDivElement>,
      'onChange' | 'onFocus' | 'onBlur'
    >
> = (props) => {
  const searchRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(() => props.value);
  const {
    align,
    clearable,
    onClickLeftinIcon,
    leftinIcon,
    readOnly,
    children,
    placeholder,
    shape,
    className,
    disabled,
    actionText,
    leftoutIcon,
    rightinIcon,
    rightoutIcon,
    maxLength,
    autoFocus,
    onCancel,
    onChange,
    onFocus,
    onBlur,
    onClear,
    onClickInput,
    onClickRightoutIcon,
    onClickRightinIcon,
    onClickLeftoutIcon,
  } = {
    ...defaultProps,
    ...props,
  };
  const alignClass = `${align}`;
  const change = (event: Event) => {
    const { value } = event.target as any;
    onChange && onChange?.(value, event);
    setValue(value);
  };
  const focus = (e: Event) => {
    const { value } = e.target as any;
    onFocus && onFocus(value, e);
  };
  const blur = (e: Event) => {
    const search = searchRef.current;
    search && search.blur();
    const { value } = e.target as any;
    onBlur && onBlur(value, e);
  };

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);
  useEffect(() => {
    if (autoFocus) {
      const search = searchRef.current;
      search && search.focus();
    }
  }, [autoFocus]);

  const renderField = () => {
    return (
      <input
        className={`chihuoui-searchbar__input chihuoui-searchbar__input-${alignClass} ${
          shape === 'round' ? 'chihuoui-searchbar__round' : ''
        } ${clearable ? 'chihuoui-searchbar__input-clear' : ''}`}
        ref={searchRef}
        style={{ ...props.style, background: props.inputBackground }}
        value={value || ''}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        maxLength={maxLength}
        onChange={(e: any) => change(e)}
        onFocus={(e: any) => focus(e)}
        onBlur={(e: any) => blur(e)}
        onClick={(e: any) => clickInput(e)}
      />
    );
  };
  const clickInput = (e: any) => {
    onClickInput && onClickInput(e);
  };
  const clickLeftIcon = (flag: TIconDirection, event: Event) => {
    if (flag === 'in-left') {
      onClickLeftinIcon && onClickLeftinIcon(value as string, event);
    } else {
      onClickLeftoutIcon && onClickLeftoutIcon(value as string, event);
    }
  };
  const renderLeftinIcon = () => {
    if (!leftinIcon) return null;
    return (
      <div
        className={`chihuoui-searchbar__leftin-icon chihuoui-searchbar__icon`}
        onClick={(e: any) => {
          clickLeftIcon('in-left', e);
        }}
      >
        {leftinIcon}
      </div>
    );
  };
  const renderLeftoutIcon = () => {
    if (!leftoutIcon) return null;
    return (
      <div
        className={`chihuoui-input__leftout-icon`}
        onClick={(e: any) => clickLeftIcon('out-left', e)}
      >
        {leftoutIcon}
      </div>
    );
  };
  const renderRightinIcon = () => {
    if (!rightinIcon) return null;

    return (
      <div
        className={`chihuoui-input__rightin-icon chihuoui-input__icon`}
        onClick={(e: any) => clickRightIcon('in-right', e)}
      >
        {rightinIcon}
      </div>
    );
  };
  const renderRightoutIcon = () => {
    if (!rightoutIcon) return null;

    return (
      <div
        className={`chihuoui-input-rightout-icon`}
        onClick={(e: any) => clickRightIcon('out-right', e)}
      ></div>
    );
  };
  const clickRightIcon = (flat: TIconDirection, e: Event) => {
    if (flat === 'in-right') {
      onClickRightinIcon && onClickRightinIcon(value as string, e);
    } else {
      onClickRightoutIcon && onClickRightoutIcon(value as string, e);
    }
  };
  const handleClear = () => {
    return (
      <div
        className={`chihuoui-searchbar__clear ${
          rightinIcon ? 'pos-right' : ''
        }`}
        onClick={(e: any) => clearVal(e)}
      >
        Clear
      </div>
    );
  };
  const cancel = () => {
    onCancel && onCancel();
  };
  const clearVal = (e: Event) => {
    if (disabled || readOnly) return;
    console.log('clicked');
    setValue('');
    onClear && onClear(e);
  };
  const renderRightLabel = () => {
    if (actionText) {
      return (
        <div
          className={`chihuoui-input__action-text`}
          onClick={cancel}
        >
          {actionText}
        </div>
      );
    }
  };
  return (
    <div
      className={`chihuoui-searchbar ${
        disabled ? 'chihuoui-searchbar__disabled' : ''
      } ${className || ''}`}
      style={{ ...props.style, background: props.background }}
    >
      {renderLeftoutIcon()}
      <div className={`chihuoui-searchbar__content`}>
        {renderLeftinIcon()}
        {renderField()}
        {renderRightinIcon()}
        {clearable && value && handleClear()}
      </div>
      {renderRightoutIcon()}
      {renderRightLabel()}
    </div>
  );
};

SearchBar.defaultProps = defaultProps;
SearchBar.displayName = 'ChihuouiSearchBar';
