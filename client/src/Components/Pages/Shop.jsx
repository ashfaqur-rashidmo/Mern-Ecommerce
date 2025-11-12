import React, { useEffect, useState } from 'react'
import Title from '../Title.jsx'
import Container from "../Container.jsx"
import { serverUrl } from '../../../Config.js';
import axios from 'axios';
import ProductSideNav from '../ProductSideNav.jsx';
import PaginationProductList from '../PaginationProductList.jsx';

const Shop = () => {
  //   const [products, setProducts] = useState([]);
  //   const [loading, setLoading] = useState(false);
  //   const[total,setTotal] = useState(0)

  //   useEffect(()=> {
  //  try {
  //   setLoading(true)
  //   const fetchData = async () => {
  //     const response = await axios.get(serverUrl + 'api/product/list')
  //     const data = response.data

  //     if(data.success){
  //       setProducts(data.products)
  //       setTotal(data.total)
  //     }else{
  //      console.log("Product Fetching error",data.message);
       
  //     }
  //   }
  //   fetchData()
  //  } catch (error) {
  //   console.log("Error",error);
    
  //  }finally{
  //   setLoading(false)
  //  }
  // },[])
  // console.log(products);
  

  return (
    <Container>
      <Title>
        Available Products on Sale
      </Title>
      <div className='mt-5 flex gap-10'>
        {/* <div className='w-[20%] lg:w-[25%] hidden md:inline-flex h-full'>
          <ProductSideNav/>
        </div> */}
        <PaginationProductList/>
      </div>
    </Container>
  )
}

export default Shop