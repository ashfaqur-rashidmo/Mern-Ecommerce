

import React, { useEffect, useState } from "react";
import Title from '../Title.jsx'
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { serverUrl } from "../../../config.js";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Error states
  const [errName, setErrName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/", { replace: true });
    }
  }, []);

  const emailValidation = (email) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name) return setErrName("Name is required");
    if (!email) return setErrEmail("Email is required");
    if (!emailValidation(email)) return setErrEmail("Enter a valid email");
    if (!password) return setErrPassword("Password is required");
    if (!checked) return toast.error("You must accept terms & privacy");

    try {
      setIsLoading(true);
      const response = await axios.post(`${serverUrl}api/user/register`, {
        name: name.trim(),
        email: email.trim(),
        password,
      });

      const data = response.data;
      if (data.success) {
        toast.success(data.message);
        navigate("/signin");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("SignUp error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <form
        onSubmit={handleSignUp}
        className="w-full max-w-lg flex flex-col border border-gray-300 my-20 rounded-md shadow-sm shadow-orange-400 mx-4 px-6 py-4"
      >
        <Title className="underline underline-offset-4 decoration-[1px] mb-4 text-center">
          Create Your Account
        </Title>

        {/* Name */}
        <div className="flex flex-col gap-1 mb-3">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            placeholder="Ex: John Doe"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrName("");
            }}
            className="w-full h-10 px-4 text-base rounded-md border border-gray-400 outline-none placeholder:text-sm"
          />
          {errName && (
            <p className="text-sm text-red-500 font-semibold">
              <span className="font-bold italic mr-1">!</span>
              {errName}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1 mb-3">
          <label htmlFor="email">Work Email</label>
          <input
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrEmail("");
            }}
            className="w-full h-10 px-4 text-base rounded-md border border-gray-400 outline-none placeholder:text-sm"
          />
          {errEmail && (
            <p className="text-sm text-red-500 font-semibold">
              <span className="font-bold italic mr-1">!</span>
              {errEmail}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1 mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Create Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrPassword("");
            }}
            className="w-full h-10 px-4 text-base rounded-md border border-gray-400 outline-none placeholder:text-sm"
          />
          {errPassword && (
            <p className="text-sm text-red-500 font-semibold">
              <span className="font-bold italic mr-1">!</span>
              {errPassword}
            </p>
          )}
        </div>

        {/* Terms */}
        <div className="flex items-center gap-2 mb-3">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          />
          <p className="text-sm text-primary">
            I agree to the OMEGA{" "}
            <span className="text-blue-500">Terms of Conditions</span> and{" "}
            <span className="text-blue-500">Privacy Policy</span>
          </p>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-primary/90 hover:bg-primary text-gray-200 hover:text-white cursor-pointer w-full text-base font-medium h-10 rounded-md disabled:bg-primary/40 disabled:cursor-not-allowed transition-all"
        >
          {isLoading ? "Processing..." : "Create Account"}
        </button>

        <p className="text-sm text-center font-medium mt-3">
          Already have an account?{" "}
          <Link to="/signin">
            <span className="hover:text-blue-600 underline underline-offset-2">
              Sign In
            </span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;

