import React, { useState } from 'react'
import LoginSignupImage from "../asset/login-animation.gif"
import { BiShow, BiHide } from "react-icons/bi";
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [data,setData] = useState({
    email: "",
    password: "",
  })
  console.log(data)

  const handleOnchange = (e) =>{
    const {name, value} = e.target
    setData((preve) =>{
      return{
        ...preve,
        [name]:value
      }
    })
  }

  const handleSubmit = async(e) =>{
    e.preventDefault()
    const {email , password} = data
    if(email && password){
      const fetchData = await fetch(
        `${process.env.REACT_APP_SERVER_DOMIN}/login`,
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
      toast(newData.message)

      if(newData.alert){
        setTimeout(() => {
          navigate("/")
        }, 1000);
      }
    }
    else{
     alert("please fill the required fields")
    }
  }

  const handleShowPassword = () =>{
    setShowPassword(preve => !preve)
  }





  return (
    <div className="pt-3 md:pt-4">
      <div className="w-full max-w-sm m-auto bg-white flex flex-col p-4 ">
        {/* <h1 className='text-center font-bold text-2xl'>Sign up</h1> */}
        <div className="w-20 rounded-full drop-shadow-md shadow-md overflow-hidden m-auto">
          <img src={LoginSignupImage} className="w-full relative" />
        </div>

        <form action="" className="w-full py-3 flex flex-col" onSubmit={handleSubmit} >
         
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
              type={showPassword? "text" : "password"}
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
              {showPassword? <BiShow />: <BiHide />}
            </span>
          </div>

          <button className=" w-full max-w-[150px] m-auto bg-red-500 hover:bg-red-600   cursor-pointer   rounded-full h-8 font-medium text-xl mt-3 text-white">
            Login
          </button>
        </form>

        <p className="text-sm mt-1  ">
          You don't have an account ?{" "}
          <Link to={"/signup"} className="text-blue-600 underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login