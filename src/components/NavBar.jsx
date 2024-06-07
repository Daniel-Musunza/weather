import React from 'react'
import icons from '../utils/icons'
import { Link } from 'react-router-dom'


const NavBar = () => {
  return (
    <div className='flex flex-col '>
      <div className="padding-x w-[100%] flex flex-row items-center justify-between py-[30px] shadow-md ">
        <div className="flex flex-row ">
            <h1>turystyczny <span>ninja</span></h1>
        </div>
        <div className="flex flex-row items-center justify-center gap-[40px]">
            <div className="flex flex-row items-center gap-[10px]">
                <img src="../../images/icons/coconut-tree-6-svgrepo-com.svg" alt="" 
                className='h-[25px] w-[25px]'
                />
                <Link to= "" className='font-[600] text-[18px] text-black'>Last Minute</Link>
            </div>
            <div className="flex flex-row items-center gap-[10px]">
                <img src="../../images/icons/coconut-tree-6-svgrepo-com.svg" alt="" 
                className='h-[25px] w-[25px]'
                />
                <Link to= "" className='font-[600] text-[18px] text-black'>All Inclusive</Link>
            </div>
            <div className="flex flex-row items-center gap-[10px]">
                <img src="../../images/icons/coconut-tree-6-svgrepo-com.svg" alt="" 
                className='h-[25px] w-[25px]'
                />
                <Link to= "" className='font-[600] text-[18px] text-black'>Holidays</Link>
            </div>
            <div className="flex flex-row items-center gap-[10px]">
                <img src="../../images/icons/coconut-tree-6-svgrepo-com.svg" alt="" 
                className='h-[25px] w-[25px]'
                />
                <Link to= "" className='font-[600] text-[18px] text-black'>Fast Minute</Link>
            </div>
        </div>
        <div className="">
        <div className="relative w-full">
            <input
                type="text"
                className="w-full pl-3 pr-10 py-2 border-[2px] border-[#7286D3] focus:outline-none rounded-[10px]"
                placeholder="Search..."
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <div className="flex items-center justify-center bg-[#7286D3] w-8 h-8 rounded-[10px]">
                    <span className='text-white'>{icons.search}</span>
                </div>
            </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default NavBar
