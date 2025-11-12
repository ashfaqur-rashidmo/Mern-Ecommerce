import React, { useEffect } from 'react'
import Navbar from './Components/Navbar'
import SideBar from './Components/SideBar'
import { useState } from 'react'
import {Route, Routes} from "react-router-dom"
import Home from "./Pages/Home.jsx"
import Add from "./Pages/Add.jsx"
import Users from "./Pages/Users.jsx"
import List from "./Pages/List.jsx"
import Orders from "./Pages/Orders.jsx"
import Login from './Components/Login.jsx'
import AddOrder from './Pages/AddOrder.jsx'


const App = () => {
  const[token,setToken] = useState(localStorage.getItem('token') ? localStorage.getItem("token"):"")

useEffect(()=>{
   localStorage.setItem('token',token)
},[token])

  return (
    <main className='w-full bg-gray-50 min-h-screen'>
     {
      token === '' ? ( <Login setToken={setToken}/> ): (
         <>
     <Navbar token={token} setToken={setToken}/>
    <div className='flex w-full'>
      <div className='w-[18%] fixed min-h-screen border-r-2'>
      <SideBar/>  
      </div>
      <div className='flex-1 px-5 py-2 ml-[18%]'>
        {/* Routes */}
        <Routes>
          <Route path='/' element={<Home token={token}/>}/>
          <Route path='/add' element={<Add token={token}/>}/>
          <Route path='/list' element={<List token={token}/>}/>
          <Route path='/orders' element={<Orders token={token}/>}/>
          <Route path='/users' element={<Users token={token}/>}/>
          <Route path='/order' element={<AddOrder token={token}/>}/>
        </Routes>
      </div>
    </div>
   
    </>
    )
     }
    </main>
  )
}

export default App

