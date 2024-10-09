import React, { useState } from "react";
import LoginSignupImage from "../asset/login-animation.gif";
import { BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Signup = () => {
  const navigator = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  console.log(data);

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleShowPassword = () => {
    setShowPassword((preve) => !preve);
  };

  const handleConfirmPassword = () => {
    setShowConfirmPassword((preve) => !preve);
  };
  console.log();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, email, password, confirmPassword } = data;

    if (firstName && email && password && confirmPassword) {
      if (password === confirmPassword) {
        const fetchData = await fetch(
          `${process.env.REACT_APP_SERVER_DOMIN}/signup`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        const newData = await fetchData.json();
        console.log(newData);
        // alert(newData.message)
        toast(newData.message);
        if (newData.alert) {
          setTimeout(() => {
            navigator("/login")
          }, 1000);
        }
      } else {
        alert("Password or Confirm password not equal");
      }
    } else {
      alert("Please enter required fields");
    }
  };
  return (
    <div className="pt-3 md:pt-4">
      <div className="w-full max-w-sm m-auto bg-white flex flex-col p-4 ">
        {/* <h1 className='text-center font-bold text-2xl'>Sign up</h1> */}
        <div className="w-20 rounded-full drop-shadow-md shadow-md overflow-hidden m-auto">
          <img src={LoginSignupImage} className="w-full relative" />
        </div>

        <form
          action=""
          className="w-full py-3 flex flex-col"
          onSubmit={handleSubmit}
        >
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="w-full bg-slate-200 px-2 py-1 rounded mt-1 mb-3 focus-within:outline-blue-300"
            value={data.firstName}
            onChange={handleOnchange}
          />

          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="w-full bg-slate-200 px-2 py-1 rounded mt-1 mb-3 focus-within:outline-blue-300"
            value={data.lastName}
            onChange={handleOnchange}
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full bg-slate-200 px-2 py-1 rounded mt-1 mb-3 focus-within:outline-blue-300"
            value={data.email}
            onChange={handleOnchange}
          />

          <label htmlFor="password">Password</label>
          <div className="flex  bg-slate-200 px-2 py-1 rounded mt-1 mb-3 focus-within:outline focus-within:outline-blue-300  ">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className=" w-full bg-slate-200 outline-none"
              value={data.password}
              onChange={handleOnchange}
            />
            <span
              className="flex text-xl cursor-pointer"
              onClick={handleShowPassword}
            >
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="flex  bg-slate-200 px-2 py-1 rounded mt-1 mb-3 focus-within:outline focus-within:outline-blue-300  ">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              className=" w-full bg-slate-200 outline-none"
              value={data.confirmPassword}
              onChange={handleOnchange}
            />
            <span
              className="flex text-xl cursor-pointer"
              onClick={handleConfirmPassword}
            >
              {showConfirmPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <button className=" w-full max-w-[150px] m-auto bg-red-500 hover:bg-red-600   cursor-pointer   rounded-full h-8 font-medium text-xl mt-3 text-white">
            Sign up
          </button>
        </form>

        <p className="text-sm mt-1  ">
          Already have an account ?{" "}
          <Link to={"/login"} className="text-blue-600 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
