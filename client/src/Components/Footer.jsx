import React from 'react'
import Container from './Container'
import Title from './Title'
import SocialIcons from './SocialIcons'
import {Link} from 'react-router-dom'
import { payment } from '../../public/assets/images'

const shopArray = [
  {
    title: "Accessories",
    link: "/accessories"
  },
  {
    title: "Shop",
    link: "/shop"
  },
  {
    title: "Electronics",
    link: "/shop"
  },
  {
    title: "Home Appliances",
    link: "/shop"
  },
  {
    title: "New Arrivals",
    link: "/shop"
  }
]

const Account = [
  {
    title: "Profile",
    link: "/profile"
  },
  {
    title: "Orders",
    link: "/order"
  },
  {
    title: "Address",
    link: "/address"
  },
  {
    title: "Account Details",
    link: "/profile"
  },
  {
    title: "Privacy",
    link: "/profile"
  }
]
const Footer = () => {

  return (
    <div className='w-full bg-[#1b1b1b] py-20 text-white/80'>
      <Container className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
        <div className='col-span-2'>
          <Title className="text-xl">More about My shop</Title>
          <div className='flex flex-col gap-6'>
            <p className='text-base w-full lg:w-[80%]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus dicta nam, totam sint quaerat est adipisci reiciendis sit provident tenetur.</p>
            <SocialIcons/>
          </div>
        </div>
        <div>
          <Title className="text-xl">Shop</Title>
          <div className='flex flex-col gap-2'>
            {shopArray.map((item, index) => (
              <Link key={index} href={item.link} className='text-base text-lightText hover:text-white hover:underline decoration-[1px] transition-all duration-300'>{item.title}</Link>
            ))}
          </div>
        </div>
         <div>
          <Title className="text-xl">Your Account</Title>
          <div className='flex flex-col gap-2'>
            {Account.map((item, index) => (
              <Link key={index} href={item.link} className='text-base text-lightText hover:text-white hover:underline decoration-[1px] transition-all duration-300'>{item.title}</Link>
            ))}
          </div>
        </div>
        <div className='col-span-2 flex flex-col items-center w-full'>
          <Title className="text-xl mb-6">Subscribe to our newsletter.</Title>
          <div>
            <p className='text-lightText text-center'>Lorem ipsum dolor sit amet consectetur.</p>
            <div className='flex items-center gap-2'>
              <input type="text" placeholder='insert your email...' className='w-full h-12 border-b border-gray-400 bg-transparent px-4 text-white text-lg placeholder:text-base outline-none'/>
              <button className='px-6 py-2 bg-primary/70 border border-transparent hover:border-gray-500 duration-300'>Submit</button>
            </div>
            <img src={payment} alt="" />
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Footer