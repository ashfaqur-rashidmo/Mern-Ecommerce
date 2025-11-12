import React, { useEffect, useState } from 'react'
import { serverUrl } from '../../Config'
import axios from 'axios'
import ProductBanner from './ProductBanner';
import Pagination from './Pagination';

const PaginationProductList = () => {
 

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const[total,setTotal] = useState(0)

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
       console.log("Product Fetching error",data.message);
       
      }
    }
    fetchData()
   } catch (error) {
    console.log("Error",error);
    
   }finally{
    setLoading(false)
   }
  },[])
  console.log(products);

   const[itemsPerPage,setItemsPerPage] = useState(8)
  const[type,setType] = useState("")
  const itemsPerPageFormBanner = (itemsPerPage) => {
    setItemsPerPage(itemsPerPage)
  }

  console.log('value',itemsPerPage);
  

  return (
    <div className='flex flex-col gap-5 w-full'>
      <ProductBanner itemsPerPageFormBanner={itemsPerPageFormBanner}/>
      <Pagination itemsPerPage={itemsPerPage} products={products}/>
    </div>
  )
}

export default PaginationProductList