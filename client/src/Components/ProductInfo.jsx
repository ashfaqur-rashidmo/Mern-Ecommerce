import React from 'react'
import Title from './Title'
import PriceContainer from './PriceContainer'
import AddToCartButton from './AddToCartButton'

const ProductInfo = ({product}) => {
  return (
    <div className='flex flex-col justify-center gap-5'>
        <Title className="text-4xl">{product.name}</Title>
        <PriceContainer item={product} priceStyle="text-lg"/>
        <p className='text-base text-gray-600'>{product.description}</p>
        <p className='font-semibold'>Be the first to leave a review</p>
        <div>
          <p className='text-base font-semibold'>
           <span className='text-lightText font-normal mr-1'>Category:</span>
           {product.category}   
         </p>
         <p className='text-base font-semibold'>
          <span className='text-lightText font-normal mr-1'>Brand:</span>
          {product.brand}   
         </p>  
        </div>
        <AddToCartButton item={product} className="py-3 text-base font-semibold tracking-wide"/>
    </div>
  )
}

export default ProductInfo