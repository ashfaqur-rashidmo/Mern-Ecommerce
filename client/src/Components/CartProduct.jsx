import React from 'react'
import {ImCross} from "react-icons/im"
import toast from "react-hot-toast"
import PriceContainer from "./PriceContainer.jsx"
import AddToCartButton from "./AddToCartButton.jsx"
import PriceFormat from './PriceFormat.jsx'
import { useDispatch } from 'react-redux'
import { deleteToCart } from '../Redux/ProjectSlice.js'
import axios from 'axios'

const CartProduct = ({item}) => {
  const dispatch = useDispatch();
    console.log(item);

  const handlePlaceOrder = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/orders", {
        userId: userInfo._id,
        products: products.map(item => ({
          productId: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.images,
        })),
        totalAmount: total,
      });

      toast.success("Order placed successfully!");
      console.log("Order:", res.data);
    } catch (error) {
      toast.error("Error placing order!");
      console.error(error);
    }
  };    
    
  return (
    <div className='w-full grid grid-cols-5 mb-4 border py-2 px-6'>
      <div className='flex col-span-5 md:col-span-2 items-center gap-4 ml-4'>

          <ImCross onClick={()=>
            {
              dispatch(deleteToCart(item?._id))
              toast.success(
              `${item.name.substring(0,12)}...is deleted 
              successfully!`
              )}} 
              className='text-primary hover:text-red-500 cursor-pointer hoverEffect'/>  

          <img src={item?.images} alt="productImage" className='w-32 h-32 object-cover'/>
          <h1 className='font-semibold'>{item?.name}</h1>
      </div>
      <div className='col-span-5 md:col-span-3 flex items-center justify-between py-4 md:py-0 px-4 md:px-0 gap-6 md:gap-0'>
        <div className='flex w-1/3 items-center text-lg font-semibold'>
          <PriceContainer item={item} priceStyle="text-lg font-semibold"/>
        </div>
        <div className='w-1/3 flex items-center gap-6 text-lg'>
          <AddToCartButton item={item} className="border-red-600"/>
        </div>
        <div className='w-1/3 flex items-center'>
          <PriceFormat amount={item?.price * item?.quantity}/>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={handlePlaceOrder}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          Place Order
        </button>
      </div>
    </div>


    
  );
};


export default CartProduct