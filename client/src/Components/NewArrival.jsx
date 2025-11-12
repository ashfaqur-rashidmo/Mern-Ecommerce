import React, { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../../Config";
import Title from "./Title.jsx";
import Slider from "react-slick";
import Product from "./Product.jsx";
import Loader from "./Loader.jsx"
import PrevArrow from "./PrevArrow.jsx";
import NextArrow from "./NextArrow.jsx";

const NewArrival = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const[total,setTotal] = useState(0)

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await axios.get(serverUrl + "api/product/list");
  //       const data = response.data;

  //       console.log(data.discountedPercentage);
  //       setProducts(data.products || []);
  //     } catch (error) {
  //       console.log("Product Fetching Error", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  useEffect(()=> {
   try {
    setLoading(true)
    const fetchData = async () => {
      const response = await axios.get(serverUrl + 'api/product/list')
      const data = response.data

      if(data.success){
        setProducts(data.products)
        setTotal(data.total)
      }else{
       console.log("Product Fetching error");
       
      }
    }
    fetchData()
   } catch (error) {
    console.log("Error",error);
    
   }finally{
    setLoading(false)
   }
  },[])

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow/>,
    prevArrow: <PrevArrow/>,
    responsive: [
      { breakpoint: 1025, settings: { slidesToShow: 3 } },
      { breakpoint: 769, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div>
      <Title className="mb-4">New Arrivals</Title>
      {loading ? (
        <Loader/>
      ) : (
        <Slider {...settings}>
          {products.map((item) => (
            <div key={item._id}>
              <Product item={item} />
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default NewArrival;
