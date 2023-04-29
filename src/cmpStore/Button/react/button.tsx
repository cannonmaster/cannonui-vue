//@ts-ignore
import React, { FunctionComponent } from "react"
import "../button.scss"

export interface ButtonProps {}
const defaultProps = {} as ButtonProps
export const Button: FunctionComponent<
  Partial<ButtonProps> & React.HTMLAttributes<HTMLDivElement>
> = (props) => {
  const { children } = { ...defaultProps, ...props }
  return <div className="cannonui-button">Button</div>
}

Button.defaultProps = defaultProps
Button.displayName = "CannonuiButton"
