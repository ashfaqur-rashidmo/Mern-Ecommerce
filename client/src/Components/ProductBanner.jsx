import React from 'react'

const ProductBanner = ({itemsPerPageFormBanner}) => {
  return (
    <div className='flex flex-col md:flex-row w-full justify-between'>
      <div>
        Sorting Filter
      </div>
      <div className='flex items-center gap-2 text-black relative'>
        <label>Show</label>
        <select className='w-16 md:w-20 border-[1px] border-gray-200 py-1 px-4 cursor-pointer text-primary text-base block focus-within:outline-none focus-visible:border-primary' onChange={(e)=>itemsPerPageFormBanner(e.target.value)}>
          <option value="4">4</option>
          <option value="8">8</option>
          <option value="16">16</option>
          <option value="32">32</option>
        </select>
      </div>
    </div>
  )
}

export default ProductBanner