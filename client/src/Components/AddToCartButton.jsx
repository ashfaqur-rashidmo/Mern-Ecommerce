import React, { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import toast from "react-hot-toast"
import {useDispatch, useSelector} from "react-redux"
import { addToCart, increaseQuantity,decreaseQuantity } from '../Redux/ProjectSlice'
import { FaMinus, FaPlus } from "react-icons/fa6";


const AddToCart = ({item,className}) => {
  const dispatch = useDispatch()

  const handleAddToCart = () => {
    dispatch(addToCart(item));
    toast.success(`${item.name} added successfully`)
    console.log(item.quantity);
    
  }

  const {products} = useSelector((state)=>state.orebi)
  
  const[cartProduct,setCarProduct] = useState(null)

useEffect(()=>{
  const existingProduct = products.find((product)=>
  product?._id === item?._id)
  setCarProduct(existingProduct);
  
},[item,products])

console.log(cartProduct);

const handleIncreaseQuantity = () => {
  dispatch(increaseQuantity(item?._id))
  toast.success(`${item.name} increased successfully`)
}

const handleDecreaseQuantity = () => {
  dispatch(decreaseQuantity(item?._id))
 toast.success(`${item.name} Decreased successfully`)
}
console.log(cartProduct);

  return (
   <div className='h-12'>
   {cartProduct ? (
    <div className='w-full h-full flex items-center gap-2'>
      <button
      disabled={cartProduct.quantity === 1}
      onClick={handleDecreaseQuantity} className='w-6 h-6 border inline-flex items-center justify-center border-gray-400 rounded-sm cursor-pointer hover:bg-gray-900 hover:text-white hoverEffect
      disabled:text-gray-400 disabled:border-gray-200 disabled:hover:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-400
      '>
        <FaMinus className='text-sm'/>
        </button>
      <p className='text-base font-semibold w-6 text-center'>{cartProduct.quantity}</p>
         <button onClick={handleIncreaseQuantity} className='w-6 h-6 border inline-flex items-center justify-center border-gray-400 rounded-sm cursor-pointer hover:bg-gray-900 hover:text-white hoverEffect'>
          <FaPlus className='text-sm'/>
          </button>
    </div>
  ) : (
     <button onClick={handleAddToCart} className={twMerge("bg-primary/90 text-white/90 text-sm font-medium py-2 w-full rounded-md mt-2 hover:text-white hover:bg-primary hoverEffect",className)}>
      Add To Cart  
    </button>
   )}
   </div>
  )
}

export default AddToCart