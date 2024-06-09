import React, { useState } from 'react'
import icons from '../utils/icons'
import { Link } from 'react-router-dom'


const NavBar = () => {

    const[openToogle, setOpenToggle] = useState(false);
    const[showBars, setShowBars] = useState(true);
    const[showSearch, setShowSearch] = useState(true);

    const handleOpenToggle = (btn) => {
        if(!openToogle && btn === 'bars') {
            setShowBars(true);
            setShowSearch(false);
            setOpenToggle(true);
        }else if(!openToogle && btn === 'search') {
            setShowBars(false);
            setShowSearch(true);
            setOpenToggle(true);
        }else if(openToogle) {
            setShowBars(true);
            setShowSearch(true);
            setOpenToggle(false);
        }
    }

  return (
    <div className='flex flex-col gap-[30px] relative '>
      <div className="padding-x w-[100%] flex flex-row items-center justify-between py-[30px] shadow-md ">
        <div className="flex xl:hidden">
            {showBars && (
                <button
                onClick={() => handleOpenToggle('bars')}
                className='bg-lightBlue h-[40px] w-[40px] text-[20px] text-white rounded-[50%]'
                >{openToogle ? icons.markX : icons.bars}</button>
            )}
        </div>
        <div className="flex flex-row ">
            <h1 className='font-[600] text-[25px] text-darkBlue-2'>turystyczny <span className='text-[#3572EF]'>ninja</span></h1>
        </div>
        <div className="hidden xl:flex flex-row items-center justify-center gap-[40px]">
            <div className="flex flex-row items-center gap-[10px]">
                <img src="../../images/icons/coconut-tree-6-svgrepo-com.svg" alt="" 
                className='h-[25px] w-[25px]'
                />
                <Link to= "" className='font-[600] text-[18px] text-black'>Last Minute</Link>
            </div>
            <div className="flex flex-row items-center gap-[10px]">
                <img src="../../images/icons/all-inclusive.svg" alt="" 
                className='h-[25px] w-[25px]'
                />
                <Link to= "" className='font-[600] text-[18px] text-black'>All Inclusive</Link>
            </div>
            <div className="flex flex-row items-center gap-[10px]">
                <img src="../../images/icons/wakacje.svg" alt="" 
                className='h-[25px] w-[25px]'
                />
                <Link to= "" className='font-[600] text-[18px] text-black'>Holidays</Link>
            </div>
            <div className="flex flex-row items-center gap-[10px]">
                <img src="../../images/icons/first-minute.svg" alt="" 
                className='h-[25px] w-[25px]'
                />
                <Link to= "" className='font-[600] text-[18px] text-black'>Fast Minute</Link>
            </div>
        </div>
        <div className="hidden xl:flex">
        <div className="relative w-full">
            <input
                type="text"
                className="w-full pl-3 pr-10 py-2 border-[2px] border-[#7286D3] focus:outline-none rounded-[10px]"
                placeholder="Search the website"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <div className="flex items-center justify-center bg-[#7286D3] w-8 h-8 rounded-[10px]">
                    <span className='text-white'>{icons.search}</span>
                </div>
            </div>
        </div>
        </div>
        <div className="flex xl:hidden">
            {showSearch && (
                <button
                onClick={() => handleOpenToggle('search')}
                className='bg-lightBlue h-[40px] w-[40px] text-[20px] text-white rounded-[50%] flex flex-row justify-center items-center'
                >{openToogle ? icons.markX : icons.search}</button>
            )}
        </div>
      </div>
      <div className="padding-x hidden xl:flex flex-row items-center gap-[20px]">
        <Link to="" className='font-[600] text-[14px]'>BEACHES</Link>
         <Link to="" className='font-[600] text-[12px]'>WHERE TO GO ON VACATION</Link>
         <Link to="" className='font-[600] text-[12px]'>FLIGHTS</Link>
         <Link to="" className='font-[600] text-[12px]'>PRICES</Link>
         <Link to="" className='font-[600] text-[12px]'>WARM COUNTRIES</Link>
         <Link to="" className='font-[600] text-[12px]'>OPINIONS</Link>
         <Link to="" className='font-[600] text-[12px]'>ATTRACTIONS</Link>
      </div>
        {openToogle && (
            <div className="z-[999] px-[10px] absolute flex flex-col gap-[30px] w-[100%] bg-white mt-[100px] pb-[20px] shadow-sm">
               <div className="flex xl:hidden relative w-full">
                    <input
                        type="text"
                        className="w-full pl-3 pr-10 py-3 border-[2px] border-[#7286D3] focus:outline-none rounded-[10px]"
                        placeholder="Search..."
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <div className="flex items-center justify-center bg-[#7286D3] w-8 h-8 rounded-[10px]">
                            <span className='text-white'>{icons.search}</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-[20px]">
                    <div className="flex flex-row justify-between items-center gap-[10px]">
                        <div className="flex flex-row items-center gap-[10px]">
                            <img src="../../images/icons/coconut-tree-6-svgrepo-com.svg" alt="" 
                            className='h-[25px] w-[25px]'
                            />
                            <Link to= "" className='font-[600] text-[18px] text-black'>Last Minute</Link>
                        </div>
                        <div className="flex flex-row gap-[5px] items-center bg-[#ddd] px-[10px] py-[3px] rounded-[20px] ">
                            <span className='text-darkBlue-2 text-[12px]'>1107</span>
                            <p className='text-darkBlue-2 text-[12px] '>Offers</p>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between items-center gap-[10px]">
                        <div className="flex flex-row items-center gap-[10px]">
                            <img src="../../images/icons/all-inclusive.svg" alt="" 
                            className='h-[25px] w-[25px]'
                            />
                            <Link to= "" className='font-[600] text-[18px] text-black'>All Inclusive</Link>
                        </div>
                        <div className="flex flex-row gap-[5px] items-center bg-[#ddd] px-[10px] py-[3px] rounded-[20px] ">
                            <span className='text-darkBlue-2 text-[12px]'>1107</span>
                            <p className='text-darkBlue-2 text-[12px] '>Offers</p>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between items-center gap-[10px]">
                        <div className="flex flex-row items-center gap-[10px]">
                            <img src="../../images/icons/wakacje.svg" alt="" 
                            className='h-[25px] w-[25px]'
                            />
                            <Link to= "" className='font-[600] text-[18px] text-black'>Holidays</Link>
                        </div>
                        <div className="flex flex-row gap-[5px] items-center bg-[#ddd] px-[10px] py-[3px] rounded-[20px] ">
                            <span className='text-darkBlue-2 text-[12px]'>1107</span>
                            <p className='text-darkBlue-2 text-[12px] '>Offers</p>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between items-center gap-[10px]">
                        <div className="flex flex-row items-center gap-[10px]">
                            <img src="../../images/icons/first-minute.svg" alt="" 
                            className='h-[25px] w-[25px]'
                            />
                            <Link to= "" className='font-[600] text-[18px] text-black'>Fast Minute</Link>
                        </div>
                        <div className="flex flex-row gap-[5px] items-center bg-[#ddd] px-[10px] py-[3px] rounded-[20px] ">
                            <span className='text-darkBlue-2 text-[12px]'>1107</span>
                            <p className='text-darkBlue-2 text-[12px] '>Offers</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-[20px]">
                    <Link to="" className='font-[600] text-[14px]'>BEACHES</Link>
                    <Link to="" className='font-[600] text-[12px]'>WHERE TO GO ON VACATION</Link>
                    <Link to="" className='font-[600] text-[12px]'>FLIGHTS</Link>
                    <Link to="" className='font-[600] text-[12px]'>PRICES</Link>
                    <Link to="" className='font-[600] text-[12px]'>WARM COUNTRIES</Link>
                    <Link to="" className='font-[600] text-[12px]'>OPINIONS</Link>
                    <Link to="" className='font-[600] text-[12px]'>ATTRACTIONS</Link>
                </div>
            </div>
        )}
    </div>
  )
}

export default NavBar
