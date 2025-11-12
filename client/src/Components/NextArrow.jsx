import React from 'react'
import { FaLongArrowAltRight} from "react-icons/fa"

const NextArrow = (props) => {

    const {onClick} = props
  return (
    <div className='h-14 w-14 rounded-full text-white bg-black bg-opacity-40 hover:bg-opacity-100 hoverEffect flex items-center justify-center absolute top-[35%] right-2.5 z-10 cursor-pointer' onClick={onClick}>
     <FaLongArrowAltRight/>   
    </div>
  )
}

export default NextArrow