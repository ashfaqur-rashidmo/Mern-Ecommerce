import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io';
import Input, { Label } from './Ui/Input';
import toast from "react-hot-toast"
import axios from "axios"
import { serverUrl } from '../../config.js';

const Newuserform = ({isOpen,
    setIsOpen,
    close,
    closeLoginForm,
    selectedUser,
    getUsersList})=> {
  
   const[formData,setFormData] = useState({
    name:"",
    email:"",
    password:""
   });

   useEffect(()=>{
    // if user exist
    if(selectedUser){
      setFormData({
        _id:selectedUser?._id || null,
      name:selectedUser?.name || "",
      email:selectedUser?.email || "",
      password:""
      })
    }
    else{
      // Add new user
      setFormData({
        name:"",
        email:"",
        password:""
      })
    }
   },[selectedUser]);
  
   const handleChange = (e) => {
    const{name,value} = e.target;
    setFormData((prevData)=>({
      ...prevData,
      [name]:value,
    }));

   }

   const handleAddOrUpdate = async(e)=> {
    e.preventDefault();
    try {
      let response;
      if(selectedUser){
        response = await axios.put(`${serverUrl}api/user/update/${selectedUser?._id}`,formData)
      }
      else{
        response = await axios.post(`${serverUrl}api/user/register`,formData)
      }

      const data = await response.data;
      console.log(data);
      
      if(data.success){
       toast.success(data.message)
       setIsOpen(false)
       getUsersList()
      }else{
        toast.error(data.message)
      }

    } catch (error) {
      console.log("User Save Error",error);
      toast.error(error.response.data.message || "An error Occurred")
      
    }
   }

  return (
    <>
     

      {isOpen && 
       <div className="fixed w-full min-h-screen bg-black/70 top-0 left-0">
        <Dialog open={isOpen} as="div" onClose={close} className="relative z-10 focus:outline-none">
        <div className='fixed inset-0 z-10 w-screen overflow-auto'>
            <div className='flex min-h-full items-center justify-center p-4'>
             <DialogPanel className="w-full max-w-xl rounded-lg px-10 py-5 bg-white shadow-md shadow-orange-200 border border-gray-300">
               
                 <div className='flex items-center justify-between'>
                     <DialogTitle>
                  {selectedUser ? "Edit User" : "Add User"}   
                </DialogTitle>
                <IoMdClose onClick={()=>setIsOpen(false)} className='text-lg hover:text-red-600 duration-300 cursor-pointer'/>
                 </div>
               <div className='mt-3'>
                
                <form onSubmit={handleAddOrUpdate} className='flex flex-col'>
                    <div className='flex flex-col gap-1 w-full'>
                     <Label>Enter Name</Label>
                    <Input id="name" 
                    type="name" 
                    name="name" 
                    placeholder="Enter Your Name" 
                    onChange={handleChange}
                    value={formData.name}
                    />
                    </div>
                    <div className='flex flex-col gap-1 w-full'>
                     <Label>Enter Email</Label>
                    <Input id="email" 
                    type="email" 
                    name="email" 
                    placeholder="Enter Your Email" 
                    onChange={handleChange}
                    value={formData.email}
                    />
                    </div>
                    <div className='flex flex-col gap-1 w-full'>
                     <Label>Enter Password</Label>
                    <Input id="password" 
                    type="password" 
                    name="password" 
                    placeholder="Enter Your Password" 
                    onChange={handleChange}
                    value={formData.password}
                    />
                    </div>
                    <button type='submit' className='bg-black/80 text-white py-2 w-32 mt-4 rounded-md font-semibold hover:bg-black transition duration-300'>Submit</button>
                </form>
               </div>
            </DialogPanel>   
            </div>
        </div>
      </Dialog>  
       </div>
    }
    </>
  )
}

export default Newuserform;