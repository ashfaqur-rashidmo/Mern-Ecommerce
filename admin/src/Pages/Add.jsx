import React from 'react'
import Title from "../Components/Title.jsx"
import {IoMdAdd, IoMdAddCircleOutline, IoMdArrowDown, IoMdCloudUpload} from "react-icons/io"
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useState } from 'react'
import Input, {Label} from "../Components/Ui/Input.jsx"
import toast from "react-hot-toast"
import axios from "axios"
import {serverUrl} from "../../config.js"
import { useNavigate } from 'react-router-dom';

const Add = ({token}) => {
  const[loading,setLoading] = useState(false)
  const[formData,setFormData] = useState({
    name:"",
    description:"",
    brand:"",
    price:"",
    discountedPercentage:"",
    _type:"",
    category:"",
    offer:false,
    isAvailable:true,
    badge:false,
    tags:[],
    image1:null,
    image2:null
  })

  const navigate = useNavigate()

  const handleImageChange = (e) => {
   const {id,files} = e.target;
   setFormData({
    ...formData,
    [id]: files[0]
   })    
  }

   const handleChange = (e) => {
    const {name,value,_type,checked} = e.target
    if(_type === "checkbox"){
      setFormData({
        ...formData,
       [name]: checked
      })
       
    }else{
      setFormData({...formData,[name]: value})
    }
   };

   
   const handleUploadProduct = async(e) => {
    e.preventDefault()
    console.log(formData);
    try {
      setLoading(true)
      const data = new FormData()
      Object.entries(formData).forEach(([key,value])=>{
        if(value instanceof File){
          data.append(key,value)
        }else{
          data.append(key,value)
        }
       
        })
        const response = await axios.post(serverUrl + 'api/product/add',data,{
          headers:{
           token,
           "Content-Type":"multipart/form-data",
          }
        })

        const responseData = await response.data
        if(responseData.success){
          toast.success(responseData.message)
          navigate("/list")
        }else{
          toast.error(responseData.message)
        }
      //  console.log(data);
    } catch (error) {
      console.log("product data uploading error",error);
      toast.error(error.message)
    }finally{
      setLoading(false)
    }
    
   } 
  // console.log(formData);
  

  return (
    <form onSubmit={handleUploadProduct} className='flex flex-col items-start gap-3 w-full pb-10'>
      <Title>Upload Products to Database</Title>
      <div className='flex flex-wrap items-center gap-5'>
        {['image1','image2'].map((imageId)=>(
       <label htmlFor={imageId} key={imageId}>
        <div className='text-gray-500 border-2 border-dashed border-gray-500 px-4 py-2 hover:bg-black duration-300 ease-in-out cursor-pointer rounded-md'>
          {formData[imageId] ? (
           <img src={URL.createObjectURL(formData[imageId])} alt="preview" className='w-20 h-20 object-cover mb-2 rounded-md'/>
          ) : (
            <IoMdCloudUpload className='text-5xl'/>
          )}
         
          <input type="file" hidden id={imageId} onChange={handleImageChange}/>
          <p>{formData[imageId] ? "Change" : "Upload"}</p>
        </div>
       </label>
        ))}
        
      </div>
      <div className='flex flex-col w-full gap-1'>
        <Label htmlFor="name">Product Name</Label>
        <Input type="text" 
        placeholder="Enter Product Name here..." 
        name="name"
        onChange={handleChange}
        />
      </div>
      <div className='flex flex-col w-full gap-1'>
        <Label htmlFor="description">Product Description</Label>
        <textarea type="text" 
        placeholder="Enter Product Name here..."
        name="description"
        onChange={handleChange}
        rows={4}
        className='border px-4 py-2 border-gray-500 rounded-md max-w-lg resize-none'
        />
      </div>
      <div className='flex flex-col w-full gap-1'>
        <Label htmlFor="name">Product Brand</Label>
        <Input type="brand" 
        placeholder="Enter Product Brand here..." 
        name="brand"
        onChange={handleChange}
        />
      </div>
      <div className='flex flex-col md:flex-row items-center gap-3 md:gap-5'>
      <div className='flex flex-col w-full gap-1'>
        <Label htmlFor="price">Product Price</Label>
        <Input type="number" 
        placeholder="Enter Product Price" 
        name="price"
        onChange={handleChange}
        />
      </div>
      <div className='flex flex-col w-full gap-1'>
        <Label htmlFor="discountedPercentage">Product Discount Percentage</Label>
        <Input type="number" 
        placeholder="discount percentage %" 
        name="discountedPercentage"
        onChange={handleChange}
        />
      </div>
      </div>
      <div className='flex flex-col md:flex-row items-center gap-2 md:gap-5'>
        <div className='flex flex-col w-full gap-1'>
        <Label htmlFor="offer">Product Type</Label>
        <select name="offer" onChange={handleChange} className='border px-4 py-2 border-gray-500 rounded-md max-w-[160px]'>
         <option value="">select type</option>
         <option value="New Arrivals">New Arrivals</option>
         <option value="Best Sellers">Best Sellers</option>
         <option value="Special Offers">Special Offers</option>
         <option value="Promotions">Promotions</option>
         
        </select>
      </div>
      <div className='flex flex-col w-full gap-1'>
        <Label htmlFor="category">Product Category</Label>
        <select name="category" onChange={handleChange} className='border px-4 py-2 border-gray-500 rounded-md max-w-[160px]'>
         <option value="">select category</option>
         <option value="Men">Men</option>
         <option value="Women">Women</option>
         <option value="Kids">Kids</option>
         <option value="Accessories">Accessories</option>
         <option value="Others">Others</option>
         
        </select>
      </div>
      <div className='flex flex-col w-full gap-1'>
        <Label htmlFor="offer">Offer</Label>
        <select name="offer" onChange={handleChange} className='border px-4 py-2 border-gray-500 rounded-md max-w-[160px]'>
         <option value="false">False</option>
         <option value="true">True</option>
         
         
        </select>
      </div>
      <div className='flex flex-col w-full gap-1'>
        <Label htmlFor="isAvailable">Available</Label>
        <select name="isAvailable" onChange={handleChange} className='border px-4 py-2 border-gray-500 rounded-md max-w-[160px]'>
         <option value="false">True</option>
         <option value="true">False</option>
         
         
        </select>
      </div>
      <div className='flex flex-col w-full gap-1'>
        <Label htmlFor="badge">Badge</Label>
        <select name="badge" onChange={handleChange} className='border px-4 py-2 border-gray-500 rounded-md max-w-[160px]'>
         <option value="false">False</option>
         <option value="true">True</option>
         
         
        </select>
      </div>
     
      </div>
       <div className='flex flex-col gap-1 items-start'>
        <Label htmlFor="tags">Tags</Label>
        <div>
        {['Fashion','Electronics','Sports','Accessories','Others'].map((tag)=>(
          <div key={tag} className='flex items-center gap-2'>
            <input type="checkbox" id={tag.toLowerCase()} name='tags' value={tag} className='cursor-pointer' onChange={(e)=>{
              if(e.target.checked){
               setFormData((prevData)=> ({
                ...prevData,
                tags:[...prevData.tags,tag]
               }))
              }else{
                setFormData((prevData)=>({
                  ...prevData,
                  tags:prevData.tags.filter((t) => t!==tag)
                }))
              }
            }}/>
            <p>{tag}</p>
          </div>
        ))}
        </div>
      </div>
      <button disabled={loading} className='bg-black/80 text-white uppercase font-semibold flex items-center justify-center gap-1 tracking-wide w-44 py-2.5 rounded-md hover:bg-black duration-300 ease-in-out disabled:bg-gray-400 disabled:cursor-not-allowed' type='submit'>
      Add{""}
      {loading ? (
        <span><AiOutlineLoading3Quarters className='text-black animate-spin'/></span>
      ) : (
        <IoMdAdd/>
      )}
      </button>
    </form>
  )
}

export default Add