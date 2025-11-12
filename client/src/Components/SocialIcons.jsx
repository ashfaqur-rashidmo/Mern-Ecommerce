import React from 'react'
import { FaGithub, FaLinkedin, FaYoutube, FaFacebook, FaEnvelope } from 'react-icons/fa'

const SocialIcons = () => {
    const linkData = [
        {  url: 'https://www.github.com', icon: <FaGithub/> },
        { url: 'https://www.linkedin.com', icon: <FaLinkedin/> },
        {  url: 'https://www.youtube.com', icon: <FaYoutube/> },
        {  url: 'https://www.facebook.com', icon: <FaFacebook/> },
        {  url: 'https://www.youtube.com', icon: <FaEnvelope/> }
    ]
  return (
    <div className='text-xl text-white/50 flex items-center gap-x-2'>{linkData.map((item,index)=>(
        <a key={index} target='blank' className='border border-white/20 inline-flex p-2 rounded-full hover:text-white hover:border-white'>{item.icon}</a>
    ))}</div>
  )
}

export default SocialIcons