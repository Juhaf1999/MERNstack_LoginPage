import React from 'react'
import logo from "../asset/jalogo.png"
import { Link } from 'react-router-dom'

const Header = () => {
  return (
   <header className='fixed z-[1] shadow-md w-full h-16 px-2 md:px-4 bg-white'>
    <div className='flex justify-between'>
        <Link to={"/"}>
        <div className='h-14 '>
            <img src={logo} alt="" className='h-full'/>
        </div>
        </Link>

        <div className='flex items-center gap-4'>
            <Link to={"login"}>Login</Link>
            <Link to={"signup"}>Signup</Link>
        </div>
    </div>
   </header>
  )
}

export default Header