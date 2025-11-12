import React, { useState } from 'react'
import "slick-carousel/slick/slick.css";
import Slider from "react-slick";
import {BannerData} from '../Constants/index.js'
import Container from './Container.jsx';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
    
    const navigate = useNavigate();
    const [dotActive,setDotActive] = useState(0);
    const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    beforeChange:  (current, next) => {
      setDotActive(next);
      
    },
    appendDots: (dots) => (
        <div style={{
            position: "absolute",
            bottom: "30px",
            left: "50%",
            transform: "translateX(-50%)",
        }}>
        <ul style={{
            margin: "0px",
            display: "flex",
            alignItems: "center",
            gap: "10px"
        }}>
         {" "}
         {dots}{" "}
        </ul>

        </div>
    ),
    customPaging: (i) => (
        <div style={i===dotActive ? {
            width: "30px",
            height: "6px",
            backgroundColor: "#000",
            borderRadius: "10px"
        } : {
            width: "20px",
            height: "6px",
            backgroundColor: "#ccc",
            borderRadius: "10px"
        }}/>
    ),
    responsive: [
        {
            breakpoint: 640,
            settings: {
            dots: true,
            appendDots: (dots) => (
                <div style={{
                    position: "absolute",
                    bottom: "20px",
                    left: "50%",
                    transform: "translateX(-50%)",
                }}>
                <ul style={{
                    margin: "0px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px"
                }}>
                 {" "}
                 {dots}{" "}
                </ul>
    
                </div>
            )
            }
        }
    ]
  };
  return (
    <div className='w-full max-h-[600px]'>
    <Slider {...settings}>
     {BannerData.map((item,index)=>(
        <div key={index} className='relative '>
            <img src={item.image} alt="bannerImage" className='h-full lg:h-[600px] w-full object-cover'/>
            <div className='absolute top-0 left-0 w-full h-full bg-black/20'>
                <Container className="flex flex-col justify-center gap-2 md:gap-3 h-full">
                    <p className='w-24 bg-red-600 text-white text-xs uppercase text-center font-medium tracking-wide rounded-md'>{item.sale}</p>
                    <h2 className='text-xl md:text-5xl max-w-sm md:max-w-xl font-bold md:leading-[55px]'>{item.title}</h2>
                    <p className='text-xs md:text-base uppercase font-medium'>{item.description}</p>
                    <p className='font-medium text-sm md:text-base'><span className='md:
                    text-xl font-bold text-blue-700 md:ml-2'>${item.from}</span></p>
                    <button onClick={()=>navigate("/shop")} className='w-24 md:w-44 py-2 md:py-0 md:h-12 bg-black/80 text-white rounded-md text-xs  md:text-sm uppercase font-semibold hover:bg-black hoverEffect'>Shop Now</button>
                </Container>
            </div>
        </div>
     ))}
    </Slider>
    </div>
     
  )
}

export default Banner