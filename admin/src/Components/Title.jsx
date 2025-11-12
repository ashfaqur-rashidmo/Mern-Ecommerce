import React from 'react'

const Title = ({ children, className }) => {
  return (
    <h2 className={`text-3xl font-bold ${className}`}>{children}</h2>
  )
}

export default Title
