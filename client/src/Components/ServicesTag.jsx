import React from 'react'
import Container from './Container'
import { TbTruckDelivery } from 'react-icons/tb'
import { HiOutlineCurrencyDollar } from 'react-icons/hi'
import { BiSupport } from 'react-icons/bi'
import { MdOutlinePayment } from 'react-icons/md'

const ServicesTag = () => {
   const services = [
    {
        title: "Free Delivery",
        description: "Free shipping on all orders",
        icon: TbTruckDelivery
    },
    {
        title: "Returns",
        description: "Back guarantee after 7 days",
        icon: HiOutlineCurrencyDollar
    },
    {
        title: "Support 24/7",
        description: "Support online 24 hours a day",
        icon: BiSupport
    },
    {
        title: "Payments",
        description: "100% payment security",
        icon: MdOutlinePayment
    }
]


  return (
    <div className='bg-[#f4f4f4] '>
      <Container className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 place-items-center md:place-items-start">
        {
          services.map((item, index)=>  (
            <div key={index} className='flex items-center gap-2'>
              <span className='text-5xl text-blue-600'><item.icon/></span>
              <div >
                <h3 className='text-base uppercase font-bold'>{item.title}</h3>
                <p className='text-sm font-medium max-w-[160px] tracking-wide text-gray-600'>{item.description}</p>
              </div>
            </div>
          ))
        }
      </Container>
    </div>
  )
}

export default ServicesTag