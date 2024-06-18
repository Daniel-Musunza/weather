
import React from 'react'
import icons from '../utils/icons'

const SearchForm = (props) => {
    return (
        <div className="flex flex-col sticky xl:mt-[170px] ">
            <div className="flex flex-col gap-[40px] w-[100%]">
                <p>Check the weather for another direction</p>

                <input
                    type="text"
                    className="w-full pl-3 pr-10 py-2 border-[2px] border-[#7286D3] focus:outline-none rounded-[10px]"
                    placeholder="Name of country, region or city..."
                />
                <form action=""
                    className='bg-darkBlue p-[20px] flex flex-col gap-[40px]'
                >
                    <div className="flex flex-row justify-center items-center">
                        <h1 className=' text-white text-[25px] font-[600]'>Find your dream holiday in {props.destination}</h1>
                    </div>
                    <div className="flex flex-col  gap-4">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="" className='text-white font-[600] '>Direction</label>
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    className="w-full pr-3 pl-10 py-2 border border-darkBlue focus:outline-none rounded"
                                    placeholder="Country, region"
                                />
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <div className="flex items-center justify-center w-8 h-8">
                                        <span className='text-black'>{icons.location}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row justify-between gap-1">
                            <div className="flex flex-col w-full md:w-1/2">
                                <label htmlFor="departure" className='text-white font-[600]'>Departure date</label>
                                <input
                                    type="date"
                                    id="departure"
                                    className="w-full pl-3 py-2 border border-darkBlue focus:outline-none rounded"
                                />
                            </div>
                            <div className="flex flex-col w-full md:w-1/2">
                                <label htmlFor="return" className='text-white font-[600]'>Back to</label>
                                <input
                                    type="date"
                                    id="return"
                                    className="w-full pl-3 py-2 border border-darkBlue focus:outline-none rounded"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="" className='text-white font-[600] '>Departure from</label>
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    className="w-full pl-10 pr-3 py-2 border border-darkBlue focus:outline-none rounded"
                                    placeholder="Downolne"
                                />
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <div className="flex items-center justify-center w-8 h-8">
                                        <img src="../../images/icons/plane.svg" alt=""
                                            className='h-5 w-5'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="" className='text-white font-[600] '>Participants</label>
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    className="w-full pr-3 pl-10 py-2 border border-darkBlue focus:outline-none rounded"
                                    placeholder="2 people"
                                />
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <div className="flex items-center justify-center w-8 h-8">
                                        <img src="../../images/icons/person-male.svg" alt=""
                                            className='h-5 w-5'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row items-center gap-4">
                            <div className="flex flex-row items-center gap-[10px]">
                                <input type="checkbox" name="" id=""
                                    className='h-[20px] w-[20px]'
                                />
                                <label htmlFor="" className='text-[13px] text-white'>All Inclusive</label>
                            </div>
                            <div className="flex flex-row items-center gap-[10px]">
                                <input type="checkbox" name="" id=""
                                    className='h-[20px] w-[20px]'
                                />
                                <label htmlFor="" className='text-[13px] text-white'>Last Minute</label>
                            </div>
                        </div>
                        <div className="flex flex-row items-center mt-6 ">
                            <button
                                className='w-[100%] bg-[#E8C872] text-sm font-semibold px-[55px] py-[10px] rounded'
                            >SEARCH</button>
                        </div>
                    </div>
                </form>
                <div className="flex flex-col gap-[20px]">
                    <div className="flex flex-row justify-between items-center px-[15px] py-[12px] border-[1px] border-lightBlue-2 rounded-[10px] w-[100%] ">
                        <div className="flex flex-row gap-[10px] justify-center items-center">
                            <img src="../../images/icons/all-inclusive.svg" alt=""
                                className='h-[25px] w-[25px] '
                            />
                            <span>Maurtius holidays</span>
                        </div>
                        <div className="">
                            <img src="../../images/icons/triangle-right.svg" alt=""
                                className='h-[25px] w-[25px]  text-[#E8AA42] '
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchForm