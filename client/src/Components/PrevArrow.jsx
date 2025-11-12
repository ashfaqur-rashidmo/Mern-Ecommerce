import React from 'react'
import {FaLongArrowAltLeft} from "react-icons/fa"

const PrevArrow = (props) => {

    const {onClick} = props
  return (
    <div className='h-14 w-14 rounded-full text-white bg-black bg-opacity-40 hover:bg-opacity-100 hoverEffect flex items-center justify-center absolute top-[35%] left-0 z-10 cursor-pointer' onClick={onClick}>
     <FaLongArrowAltLeft/>   
    </div>
  )
}

export default PrevArrow