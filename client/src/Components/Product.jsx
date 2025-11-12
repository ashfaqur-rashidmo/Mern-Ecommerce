import React from 'react'
import Badge from './Badge'
import PriceContainer from './PriceContainer'
import AddToCart from './AddToCartButton'
import { Link } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'
 
const Product = ({item,className}) => {
    
  return (
   <div className={twMerge('w-full group pr-2.5 relative',className)}>
    <div className='h-80 border border-gray-300 rounded-tr-md rounded-tl-md overflow-hidden relative'>
        <Link to={`/product/${item?._id}`} className='h-full w-full overflow-hidden bg-[#f3f3f3]'>
         <img src={item?.images[0]} alt="productImages" className='w-full h-full group-hover:scale-110 duration-300'/>
        </Link>
      <div className='absolute top-2 right-2'>
        {!item?.offer && <Badge title='Sale'/>}
      </div>
    </div>
    <div className='py-6 flex flex-col gap-1 border-[1px] border-t-0 border-gray-300 px-4 rounded-md'>
      <p className='text-lg text-primary font-bold'>{item?.name}</p>
      <PriceContainer item={item}/>
      <AddToCart item={item}/>
    </div>
   </div>
  )
}

export default Product