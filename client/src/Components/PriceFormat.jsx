import React from 'react'

const PriceFormat = ({ amount, className }) => {
  const formattedAmount = Number(amount).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  return (
    <span className={`text-base font-medium ${className || ''}`}>
      {formattedAmount}
    </span>
  )
}

export default PriceFormat
