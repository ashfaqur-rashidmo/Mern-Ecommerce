import React from 'react'
import { saleImg1, saleImg2, saleImg3 } from '../../public/assets/images'
import { Link } from 'react-router-dom'

const Sale = () => {
  return (
    <div className='w-full h-auto md:h-[550px] py-10 flex flex-col md:flex-row items-center justify-between gap-10'>

        <div className='w-full md:w-1/2 h-[250px] md:h-full border border-gray-300 rounded-md overflow-hidden relative group'>
            <img src={saleImg1} alt="saleimgone" className='w-full h-full object-cover group-hover:scale-110 duration-500 ease-in-out'/>
            <div className='absolute top-0 left-0 w-full h-full bg-black/40 flex items-center justify-center text-white/80 text-lg font-semibold opacity-0 group-hover:opacity-100 duration-500 ease-in-out'>
              <div className='flex flex-col items-center gap-2'>
                <p className='text-sm md:text-lg font-medium text-white'>10% sales ongoing on phone </p>
                <p className='text-sm md:text-xl font-semibold'>offers on limited time</p>
                <Link to={"/shop"} className='bg-white/70 text-black px-8 py-2.5 rounded-md hover:bg-white duration-300 font-medium'>Shop Now</Link>
              </div>
            </div>
        </div>
        
        <div className='w-full md:w-1/2 h-auto flex flex-col justify-between gap-10 md:gap-0'>
         <div className='w-full h-[250px] md:h-[46%] border border-gray-300 rounded-md overflow-hidden relative group'>
          <img src={saleImg2} alt="saleimg2" className='w-full h-full object-cover group-hover:scale-110 duration-500 ease-in-out'/>
           <div className='absolute top-0 left-0 w-full h-full bg-black/40 flex items-center text-white/80 text-lg font-semibold opacity-0 group-hover:opacity-100 duration-500 ease-in-out'>
              <div className='flex flex-col items-center gap-2 p-10'>
                <p className='text-sm md:text-lg font-medium text-white'>10% sales ongoing on phone </p>
                <p className='text-sm md:text-xl font-semibold'>offers on limited time</p>
                <Link to={"/shop"} className='bg-white/70 text-black px-8 py-2.5 rounded-md hover:bg-white duration-300 font-medium'>Shop Now</Link>
              </div>
            </div>
          </div>
          
          <div>
            <div className='w-full h-[250px] md:h-[46%] border border-gray-300 rounded-md overflow-hidden relative group'>
          <img src={saleImg3} alt="saleimg2" className='w-full h-full object-cover group-hover:scale-110 duration-500 ease-in-out'/>
           <div className='absolute top-0 left-0 w-full h-full bg-black/40 flex items-center text-white/80 text-lg font-semibold opacity-0 group-hover:opacity-100 duration-500 ease-in-out'>
              <div className='flex flex-col items-center gap-2 p-10'>
                <p className='text-sm md:text-lg font-medium text-white'>10% sales ongoing on phone </p>
                <p className='text-sm md:text-xl font-semibold'>offers on limited time</p>
                <Link to={"/shop"} className='bg-white/70 text-black px-8 py-2.5 rounded-md hover:bg-white duration-300 font-medium'>Shop Now</Link>
              </div>
            </div>
          </div>
            </div>   
        </div>
    </div>
  )
}

export default Sale