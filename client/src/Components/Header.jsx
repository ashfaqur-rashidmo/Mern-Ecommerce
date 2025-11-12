import React, { useContext, useState } from 'react';
import { logo } from '../../public/assets/images';
import Container from './Container';
import SearchInput from './searchInput';
import { IoMdCart, IoMdClose, IoMdMenu } from "react-icons/io";
import { FaUserAlt } from "react-icons/fa";
import { headerNavigation } from '../Constants';
import { Link, NavLink } from 'react-router-dom';
import { Button, Dialog, DialogPanel} from '@headlessui/react';
import  Title  from './Title.jsx';
import SocialIcons from './SocialIcons.jsx';
import { useSelector } from 'react-redux';
import { AuthContext } from '../Contexts/AuthContext.jsx';

const Header = () => {
  const { token, user, logout } = useContext(AuthContext);
  // const token = localStorage.getItem("token")
  const {products} = useSelector((state)=>state.orebi)
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className='border-b-[1px] border-slate-300 sticky top-0 z-40'>
      <Container className='py-7 flex items-center gap-x-3 md:gap-x-7 justify-between'>
        <Link to={"/"}>
          <img src={logo} alt="Logo" className='w-20' />
        </Link>

        <SearchInput />

        {/* Desktop Menu */}
        <div className='hidden md:inline-flex items-center gap-5 lg:gap-7 text-sm uppercase font-medium text-lightText'>
          {headerNavigation.map((item) => (
            <NavLink
              key={item.title}
              to={item.link}
              className='hover:text-primary hoverEffect cursor-pointer relative group overflow-hidden'
            >
              {item.title}
              <span className='absolute bottom-0 left-0 inline-block w-full h-px bg-primary -translate-x-[110%] group-hover:translate-x-0 hoverEffect' />
            </NavLink>
          ))}

          {token && (
          <Link to={"/cart"} className="relative text-2xl text-lightText hover:text-primary hoverEffect relative group">
            <IoMdCart />
            <span className="absolute -right-2 -top-1 w-3.5 h-3.5 group-hover:bg-primary text-white text-[10px] bg-lightText font-bold flex items-center justify-center rounded-full hoverEffect">
              {products?.length > 0 ? products.length : 0}
            </span>
          </Link>
)}

           {token ? (
        <Link to="/profile" className="hover:text-primary hoverEffect">
          Profile
        </Link>
      ) : (
        <Link to="/signin" className='text-xl hover:text-primary hoverEffect'>
          <FaUserAlt />
        </Link>
      )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={openMenu}
          className='text-2xl text-lightText hover:text-primary md:hidden hoverEffect'
        >
          <IoMdMenu />
        </button>

        {/* Dialog */}
        <Dialog open={isOpen} as="div" className="relative z-50 md:hidden text-white/80" onClose={closeMenu}>
          <div className="fixed inset-0 z-0 w-screen items-center justify-center p-4 bg-black/90">
            
              <DialogPanel
                transition
                className="w-[94%] space-y-4 bg-primary p-6 border border-lightText rounded-md absolute top-10"
              >
                <div className='flex justify-between'>
                <Title as="h3" className="text-lg font-medium text-gray-900">
                  Navigation Menu
                </Title>
                 
                  <Button
                    className="rounded-md bg-gray-700 hover:text-red-600 duration-300 px-3 py-1.5 text-sm font-semibold text-white hover:bg-gray-600 border border-white/20 hover:border-white/40"
                    onClick={closeMenu}
                  >
                    <IoMdClose/>
                  </Button>
                 </div>
                <div className="flex flex-col gap-5 mt-5">
                  {headerNavigation.map((item) => (
                    <NavLink
                      key={item.title}
                      to={item.link}
                      className=" hover:text-white duration-300
                       relative group flex items-center gap-2"
                      onClick={closeMenu}
                    >
                     <span className='h-2.5 w-2.5 rounded-full border border-white/80 inline-flex group-hover:border-white duration-300'/>{item.title}
                     <span className='absolute w-full h-[1px] bg-white/20 left-0 -bottom-1 group-hover:bg-white duration-300'/> 
                    </NavLink>
                  ))}
                  <NavLink to={"/signin"} className=" hover:text-white duration-300
                   relative group flex items-center gap-2">
                   <span className='h-2.5 w-2.5 rounded-full border border-white/80 inline-flex group-hover:border-white duration-300'/>
                    Sign In
                    <span className='absolute w-full h-[1px] bg-white/20 left-0 -bottom-1 group-hover:bg-white duration-300'/> 
                   </NavLink>
                   
                </div>
                {/* <div className="mt-6">
                  <Button
                    className="rounded-md bg-gray-700 hover:text-red-600 duration-300 px-3 py-1.5 text-sm font-semibold text-white hover:bg-gray-600 border border-white/20 hover:border-white/40"
                    onClick={closeMenu}
                  >
                    <IoMdClose/>
                  </Button>
                </div> */}
                <div className='mt-3'>
                <SocialIcons/>
                </div>
              </DialogPanel>
            </div>
          
        </Dialog>
      </Container>
    </div>
  );
};

export default Header;
