import React from 'react'

const PriceFormat = ({amount,className}) => {
  const formattedAccount = new Number(amount).toLocaleString("en-US",{
    style:"currency",
    currency:"USD",
    minimumFractionDigit:2,
  });
  return (
    <span className='text-base font-medium'>{formattedAccount}</span>
  )
}

export default PriceFormat