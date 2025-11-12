import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { serverUrl } from '../../config'
import Title from '../Components/Title'
import Loader from '../Components/Loader'
import { Link } from 'react-router-dom'
import PriceFormat from '../Components/PriceFormat'
import {IoMdClose} from "react-icons/io"


const List = ({token}) => {
  const[list,setList] = useState([])
  const[loading,setLoading] = useState(false)
  const fetchProductList = async() => {
    try {
      setLoading(true)
      const response = await axios.get(serverUrl+'api/product/list')
      const data = response.data
      console.log("data",data);
      if(data.success){
        setList(data.products)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log("product List fetching error",error);
      toast.error(error.message)
      
    }finally{
      setLoading(false)
    }
  }
  useEffect(()=>{
    fetchProductList()
  },[])

  const handleRemoveProduct = async (item) => {
    // console.log(_id);
    const confirmRemoval = window.confirm(`Are You sure You Want to remove ${item.name}?`)
    if(confirmRemoval){
      try {
        setLoading(true)
        const response = await axios.post(serverUrl + 'api/product/remove',{
          _id:item._id
        },{headers:{token}})

        const data = response.data
        if(data.success){
          toast.success(data.message)
          await fetchProductList()
        }else{
          toast.error(data.message)
        }

      } catch (error) {
        console.log("Product Removal Error",error);
        toast.error(error.message)
      }finally{
        setLoading(false)
      }
    }
  }

  return (
    <div>
      {loading ? (<div><Loader/></div> ) : (
        <>
        <div className='flex justify-between'>
          <Title>Product List</Title>
          <Link to="/add" className='text-sm font-medium hover:text-blue-600 duration-300 cursor-pointer'>Add products +</Link>
        </div>
        {list.length > 0 ? 
        <div className='flex flex-col gap-2 mt-2'>
        <div className='grid grid-cols-6 items-center py-2 px-3 border bg-gray-100 text-sm font-semibold'>
  <b className="text-left">Image</b>
  <b className="text-left">Name</b>
  <b className="hidden md:block text-center">Category</b>
  <b className="text-center">Price</b>
  <b className="text-center">Action</b>
  <b className="text-center">Edit</b>
  </div>
       {list.map((item) => (
  <div 
    key={item._id} 
    className='grid grid-cols-6 items-center py-2 px-3 border bg-white text-sm'
  >
    <img 
      src={item.images[0]} 
      alt="product_image" 
      className='w-16 h-16 object-cover bg-white rounded-sm mx-auto'
    />
    <p className='font-semibold line-clamp-1 text-left'>{item.name}</p>
    <p className='hidden md:block font-medium text-center'>{item.category}</p> 
    <div className='text-center'>
      <PriceFormat amount={item.price}/>
    </div>
    <div className='flex justify-center'>
      <IoMdClose 
        onClick={() => handleRemoveProduct(item)} 
        className='text-lg cursor-pointer hover:text-red-600 duration-300 ease-in-out'
      />
    </div>
    <Link 
      to={"/add"} 
      className='hover:text-green-600 duration-300 ease-in-out text-center font-medium'
    >
      Edit
    </Link>
  </div>
))}
        </div> :
        <div>
          <p className='mb-4 text-red-600 font-medium tracking-wide'>You have no Products in your Database</p>
          <Link to={"/add"} className='bg-black/80 text-white py-2.5 px-4 rounded-md hover:bg-black duration-300'>Add Products</Link>
        </div>
        }
        </>
      )}
    </div>
  )
}

export default List