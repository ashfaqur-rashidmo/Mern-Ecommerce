// import React, { useEffect, useState } from 'react'
// import Title from '../title'
// import {Link, useNavigate} from "react-router-dom"
// import toast from "react-hot-toast"
// import axios from "axios"
// import { serverUrl } from "../../../config.js"

// const SignIn = () => {

//     const [email, setEmail] = useState("")
//     const [password, setPassword] = useState("")
//     const[isLoading,setIsLoading] = useState(false)
  
//     // Error states
//     const [errClientEmail, setErrClientEmail] = useState("")
//     const [errClientPassword, setErrClientPassword] = useState("")

//      const navigate = useNavigate()
//       const token = localStorage.getItem("token")
    
//       useEffect(() => {
//         if (token) {
//           navigate("/")
//         }
//       }, [token]);

//         const handleEmail = (e) => {
//     setEmail(e.target.value)     
//     setErrClientEmail("")
//   }

//   const handlePassword = (e) => {
//     setPassword(e.target.value)   
//     setErrClientPassword("")
//   }

//     // Email validation
//   const emailValidation = (email) => {
//     return String(email)
//       .toLowerCase()
//       .match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)   
//   }

//   const handleSignIn = async(e) => {
//      e.preventDefault()
//      if(!email){
//       setErrClientEmail("Enter Your Email")
//      }
//      if(!password){
//       setErrClientPassword("Enter Your Password")
//      }
//      if(email && password){
//       try {
//         setIsLoading(true)
//         const response = await axios.post(serverUrl + 'api/user/login',
//           {
//           email:email,
//           password:password
//           }
//         )
//         const data = response.data
//         if(data.success){
      
          
//          localStorage.setItem("token",data.token)
//          toast.success(data.message)
//          navigate("/")
//         }else{
//          toast.error(data.message)
//         }
//       } catch (error) {
//         console.error("user login error",error)
//         toast.error(error.message)
//       }finally{
//         setIsLoading(false)
//       }
//      }
//   }

//   return (
//     <div className='w-full h-full flex items-center justify-center'>
//       <form className='w-full max-w-lg flex items-center justify-center border border-gray-300 my-20 rounded-md shadow-sm shadow-orange-400 mx-4'>
//         <div className='px-6 py-4 flex flex-col justify-center w-full'>
//           <Title className="underline underline-offset-4 decoration-[1px] mb-4 text-center">SignIn Page</Title>
//           <div className='flex flex-col gap-3'>
//              {/* Email */}
//             <div className='flex flex-col gap-0.5'>
//               <label htmlFor="email">Work Email</label>
//               <input 
//                 type="email"
//                 placeholder='example@gmail.com'
//                 onChange={handleEmail}
//                 value={email}
//                 className='w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border border-gray-400 outline-none'
//               />
//               {errClientEmail && (
//                 <p className='text-sm text-red-500 font-semibold'>
//                   <span className='font-bold italic mr-1'>!</span>{errClientEmail}
//                 </p>
//               )}
//             </div>

//             {/* Password */}
//             <div className='flex flex-col gap-0.5'>
//               <label htmlFor="password">Password</label>
//               <input 
//                 type="password"
//                 placeholder='Create Password'
//                 onChange={handlePassword}
//                 value={password}
//                 className='w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border border-gray-400 outline-none'
//               />
//               {errClientPassword && (
//                 <p className='text-sm text-red-500 font-semibold'>
//                   <span className='font-bold italic mr-1'>!</span>{errClientPassword}
//                 </p>
//               )}
//             </div>
//           <button
//           onClick={handleSignIn} 
//           disabled={isLoading} 
//           className='bg-primary/90 hover:bg-primary text-gray-200 hover:text-white cursor-pointer w-full text-base font-medium h-10 rounded-md hoverEffect disabled:bg-primary/40 disabled:cursor-not-allowed'>
//            {isLoading ? "Processing..." : "Sign In"}
//           </button>
//           <p className='text-sm text-center font-medium'>Don't have an Account? <Link to={"/signup"}><span className='hover:text-blue-600 underline underline-offset-2 decoration-[1px] hoverEffect'>Sign Up</span></Link></p>
//           </div>
//         </div>
//       </form>
//     </div>
//   )
// }

// export default SignIn

import React, { useEffect, useState } from "react";
import Title from '../Title.jsx'
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { serverUrl } from "../../../config.js";
import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext.jsx";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Error states
  const [errClientEmail, setErrClientEmail] = useState("");
  const [errClientPassword, setErrClientPassword] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

    const { login } = useContext(AuthContext);


  useEffect(() => {
    if (token) {
      navigate("/", { replace: true });
    }
  }, []);

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrClientEmail("");
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrClientPassword("");
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!email) {
      setErrClientEmail("Enter your email");
      return;
    }
    if (!password) {
      setErrClientPassword("Enter your password");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(`${serverUrl}api/user/login`, {
        email: email.trim(),
        password,
      });

      const data = response.data;
      if (data.success) {
        localStorage.setItem("token", data.token);
        login(data.user, data.token);
        toast.success(data.message);
        navigate("/", { replace: true });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <form
        onSubmit={handleSignIn}
        className="w-full max-w-lg flex flex-col border border-gray-300 my-20 rounded-md shadow-sm shadow-orange-400 mx-4 px-6 py-4"
      >
        <Title className="underline underline-offset-4 decoration-[1px] mb-4 text-center">
          Sign In
        </Title>

        {/* Email */}
        <div className="flex flex-col gap-1 mb-3">
          <label htmlFor="email">Work Email</label>
          <input
            type="email"
            placeholder="example@gmail.com"
            onChange={handleEmail}
            value={email}
            className="w-full h-10 px-4 text-base rounded-md border border-gray-400 outline-none placeholder:text-sm"
          />
          {errClientEmail && (
            <p className="text-sm text-red-500 font-semibold">
              <span className="font-bold italic mr-1">!</span>
              {errClientEmail}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1 mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            onChange={handlePassword}
            value={password}
            className="w-full h-10 px-4 text-base rounded-md border border-gray-400 outline-none placeholder:text-sm"
          />
          {errClientPassword && (
            <p className="text-sm text-red-500 font-semibold">
              <span className="font-bold italic mr-1">!</span>
              {errClientPassword}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-primary/90 hover:bg-primary text-gray-200 hover:text-white cursor-pointer w-full text-base font-medium h-10 rounded-md disabled:bg-primary/40 disabled:cursor-not-allowed transition-all"
        >
          {isLoading ? "Processing..." : "Sign In"}
        </button>

        <p className="text-sm text-center font-medium mt-3">
          Don't have an account?{" "}
          <Link to="/signup">
            <span className="hover:text-blue-600 underline underline-offset-2">
              Sign Up
            </span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
