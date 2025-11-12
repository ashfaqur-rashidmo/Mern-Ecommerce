import React, { useEffect, useState } from 'react'
import Title from '../Title.jsx'
import Container from "../Container.jsx"
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { serverUrl } from '../../../Config.js'
import Loader from '../Loader.jsx'
import ProductInfo from '../ProductInfo.jsx'

const SingleProduct = () => {
  const {id} = useParams()
  // console.log(id);
  const[product,setProduct] = useState(null)
  const[loading,setLoading] = useState(false)
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${serverUrl}api/product/single?_id=${id}`);
        const data = response.data;
        
        if(data.success){
           console.log("data",data);
        }else{
          console.log("product match error");
          
        }
           
        // console.log(data.discountedPercentage);
        setProduct(data.product || []);
      } catch (error) {
        console.log("Product Fetching Error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  console.log(product);
  
  if (loading) return <Loader/>
  if (!product) return <p>Product not found.</p>
  
  return (
    <Container className="grid grid-cols-2 gap-10">
     <div className='w-full max-h-[500px] group overflow-hidden rounded-md'>
      <img src={product?.images[0]} alt="productImages" className='w-full h-full object-cover rounded-md group-hover:scale-110 transition-transform duration-500 ease-in-out'/>
     </div>
     <ProductInfo product={product}/>
    </Container>
  )
}

export default SingleProduct