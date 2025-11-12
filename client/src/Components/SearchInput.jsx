import React, { useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { IoIosClose } from "react-icons/io";

const SearchInput = () => {
  const [search, setSearch] = useState("");


  return (
    <div className="flex-1 h-10 relative">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search your product here ..."
        className="w-full h-full border border-lightText rounded-full outline-none pl-4 pr-10 text-primary focus-visible:border-blue-500"
       
      />
       
      {search ? (
        <IoIosClose onClick={()=>setSearch("")} className="text-xl absolute top-2.5 right-4 hover:text-red-600 cursor-pointer duration-300"/>
      ) : (
        <CiSearch className="text-xl absolute top-2.5 right-4"/>
      )}
    </div>
  );
};

export default SearchInput;
