import React, { useEffect, useState } from 'react'
import PriceFormat from './PriceFormat'
import { twMerge } from 'tailwind-merge'
import { useSelector } from 'react-redux';

const PriceContainer = ({item,className,priceStyle}) => {
  console.log(item);
  const {products} = useSelector((state)=>state.orebi)
  const [cartProduct,setCartProduct] = useState(null)

  useEffect(()=>{
    const existingProduct = products.find((product)=>
    product?._id === item?._id)
    setCartProduct(existingProduct);
    
  },[item,products])

  const discountedPrice = cartProduct ? cartProduct.quantity * item?.price : item?.price

  const regularPrice = cartProduct ? (item?.price * cartProduct.quantity) + (item?.discountedPercentage
 * (item?.price * cartProduct.quantity))/100  : item?.price + (item?.discountedPercentage
 * item?.price)/100
  
  return (
   <div className={twMerge("flex items-center gap-2",className)}>
    
     <PriceFormat amount={regularPrice} className={twMerge("text-base font-normal text-lightText line-through",priceStyle)}/>

    <PriceFormat amount={discountedPrice} className={twMerge("text-primary font-semibold",priceStyle)}/>
   </div>
  )
}

export default PriceContainer