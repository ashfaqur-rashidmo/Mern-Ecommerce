import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from "react-hot-toast"
import { serverUrl } from '../../config'
import Loader from '../Components/Loader'
import Title from '../Components/Title'
import { IoMdAdd } from 'react-icons/io'
import { FaTrash } from "react-icons/fa6";
import Newuserform from '../Components/Newuserform'


const Users = ({token}) => {
  const[userList,setUserList] = useState([])
  const[isLoading,setLoading] = useState(false)
  const[selectedUser,setSelectedUser] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const getUsersList = async()=>{
    try {
      setLoading(true)
      const response = await axios.get(serverUrl + 'api/user/users',{
        headers:{
          token,
          "Content-Type":"application/json"
        }
      });
      const data = response?.data
      if(data.success){
        setUserList(data.users)
      }
      else{
        toast.error(data.message)
      }
      console.log(data)
    } catch (error) {
      console.log("Users list fetching List",error?.message)
      toast.error(error.message)
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(()=>{
    getUsersList()
  },[]);

  const handleRemoveUser = async(_id) => {
    const confirmRemoval = window.confirm("Are you sure you want to remove this?")
    if(confirmRemoval){
      toast.success("User removed Successfully")
    try {
      const response = await axios.post(serverUrl + "api/user/remove",{
        _id,
      })

      const data = response.data
      if(data.success){
        toast.success(data.message)
        await getUsersList()
      }

      else{
       toast.error(data.error)
      }

    } catch (error) {
      console.log("User remove error",error);
      toast.error(Error.message)
    }
    finally{
      setLoading(false)
    }
  }
  }

  const openLoginForm = () => {
    setSelectedUser(null)
    setIsOpen(true)
  }

  const closeLoginForm = () => {
    setIsOpen(false)
  }

  console.log(selectedUser);
  

  return (
    <div>
      {isLoading ? (
        <Loader/>
      ):(
        <div>
          <div className='flex justify-between max-w-3xl'>
            <Title>Users List</Title>
            <button onClick={openLoginForm} className='flex items-center gap-1 bg-black/80 text-white px-6 text-sm font-medium py-1.5 hover:bg-black duration-300 transition-colors'>Add user <IoMdAdd/></button>
          </div>
          {userList?.length > 0 ? (
            <div className='max-w-3xl flex flex-col gap-2 mt-4'>
            <div className='grid grid-cols-[2fr_1fr_1fr] md:grid grid-cols-[2fr_2fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm my-1.5'>
              <b className='hidden md:inline-block font-semibold'>Name</b>
              <b>Email</b>
              <b className='hidden md:inline-block font-semibold'>Admin</b>
              <b className='text-center'>Action</b>
              <b className='text-center'>Edit</b>
            </div>
            {userList.map((item)=>(
              <div key={item._id} className='grid grid-cols-[2fr_1fr_1fr] md:grid grid-cols-[2fr_2fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm my-1.5'>
                <p className='hidden md:inline-block font-semibold'>{item.name}</p>
                <p className='font-medium'>{item.email}</p>
                <p className={item.isAdmin ? "font-bold hidden md:inline-block" : "font-normal hidden md:inline-block"}>{item.isAdmin ? "Admin" : "User"}</p>
                <FaTrash onClick={()=> handleRemoveUser(item._id)} className='text-lg cursor-pointer text-black/60 hover:text-red-600 duration-300 ease-in-out text-center w-full'/>
                <button onClick={()=>{
                  setSelectedUser(item);
                setIsOpen(true)
                }} 
                  className='text-base cursor-pointer hover:text-green-600 duration-300 ease-in-out'>Edit</button>
              </div>
              

            ))}
            </div>):( 
          <div className='mt-2'>
            <p className='mb-4'>You have no user in your Database</p>
          
          {/* <button className='flex items-center gap-1 bg-black/80 text-white px-6 text-sm font-medium py-1.5 hover:bg-black duration-300 transition-colors'>Add user </button> */}
          </div>
          )}
        </div>
      )}
      <Newuserform 
      isOpen={isOpen} 
      setIsOpen={setIsOpen} 
      close={closeLoginForm} 
      getUsersList={getUsersList} 
      setSelectedUser={setSelectedUser}
      selectedUser = {selectedUser}/>
    </div>
  )
}

export default Users