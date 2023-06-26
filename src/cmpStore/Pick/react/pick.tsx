//@ts-ignore
import React, { FunctionComponent } from "react"
import "../pick.scss"

export interface PickProps {}
const defaultProps = {} as PickProps
export const Pick: FunctionComponent<
  Partial<PickProps> & React.HTMLAttributes<HTMLDivElement>
> = (props) => {
  const { children } = { ...defaultProps, ...props }
  return <div className="cannonui-pick">Pick</div>
}

Pick.defaultProps = defaultProps
Pick.displayName = "CannonuiPick"
