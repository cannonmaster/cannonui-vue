//@ts-ignore
import React, { FunctionComponent } from "react"
import "../pickcolumn.scss"

export interface PickColumnProps {}
const defaultProps = {} as PickColumnProps
export const PickColumn: FunctionComponent<
  Partial<PickColumnProps> & React.HTMLAttributes<HTMLDivElement>
> = (props) => {
  const { children } = { ...defaultProps, ...props }
  return <div className="cannonui-pickcolumn">PickColumn</div>
}

PickColumn.defaultProps = defaultProps
PickColumn.displayName = "CannonuiPickColumn"
