import React, { useState } from 'react'
import ReactPaginate from 'react-paginate'
import Product from './Product'

function Items({ currentItems }) {
  return (
    <>
      {currentItems && currentItems.map((item) => (
        <Product key={item._id} item={item} />
      ))}
    </>
  )
}

const Pagination = ({ itemsPerPage, products }) => {
  const [itemOffset, setItemOffset] = useState(0)
  const endOffset = itemOffset + itemsPerPage
  const currentItems = products.slice(itemOffset, endOffset)
  const pageCount = Math.ceil(products.length / itemsPerPage)

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length
    setItemOffset(newOffset)
  }

  const itemStart = itemOffset + 1

  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-5 lg:gap-5'>
        <Items currentItems={currentItems} />
      </div>
      <div className='flex flex-col md:flex-row justify-center md:justify-between items-center'>
        <ReactPaginate
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel=""
          nextAriaLabel=""
          pageLinkClassName='w-9 h-9 border-[1px] border-gray-300 hover:border-black duration-300 flex items-center justify-center'
          pageClassName='mr-3'
          containerClassName='flex text-base font-semibold py-5 items-center'
          activeClassName='bg-black text-white'
        />
        <p>
          Products from {itemStart} to {Math.min(endOffset, products.length)} of {products.length}
        </p>
      </div>
    </div>
  )
}

export default Pagination
