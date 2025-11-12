import React from 'react'
import {cn} from "./Ui/cn.js"

const Title = ({children,className}) => {
  return (
    <h2 className={cn("text-2xl font-semibold",className)}>{children}</h2>
  )
}

export default Title