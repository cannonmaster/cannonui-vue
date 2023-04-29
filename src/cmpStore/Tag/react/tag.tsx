//@ts-ignore
import React, { FunctionComponent } from "react"
import "../tag.scss"

export interface TagProps {}
const defaultProps = {} as TagProps
export const Tag: FunctionComponent<
  Partial<TagProps> & React.HTMLAttributes<HTMLDivElement>
> = (props) => {
  const { children } = { ...defaultProps, ...props }
  return <div className="cannonui-tag">Tag</div>
}

Tag.defaultProps = defaultProps
Tag.displayName = "CannonuiTag"
