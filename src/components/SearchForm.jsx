
import React from 'react'
import icons from '../utils/icons'

const SearchForm = ({ destination, destinations }) => {

    return (
        <div className="flex flex-col sticky xl:mt-[170px] ">
            <div className="flex flex-col gap-[40px] w-[100%]">
                <p>Check the weather for another direction</p>

                <input
                    type="text"
                    className="w-full pl-3 pr-10 py-2 border-[2px] border-[#7286D3] focus:outline-none rounded-[10px]"
                    placeholder="Name of country, region or city..."
                />
                <form style={{ backgroundImage: 'linear-gradient(90deg, rgb(116, 235, 213), rgb(159, 172, 230))' }} action=""
                    className='p-[20px] flex flex-col gap-[40px]'
                >
                    <div className="flex flex-row justify-center items-center">
                        <h1 className=' text-white text-[25px] font-[600]'>Book Hotel only in {destination}</h1>
                    </div>
                    <div className="flex flex-col  gap-4">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="" className='text-white font-[600] '>Where to ?</label>
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    className="w-full pr-3 pl-10 py-2 border border-darkBlue focus:outline-none rounded"
                                    placeholder="Select Destination"
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
                                <label htmlFor="departure" className='text-white font-[600]'>Checkin Date</label>
                                <input
                                    type="date"
                                    id="departure"
                                    className="w-full pl-3 py-2 border border-darkBlue focus:outline-none rounded"
                                />
                            </div>
                            <div className="flex flex-col w-full md:w-1/2">
                                <label htmlFor="return" className='text-white font-[600]'>Checkout Date</label>
                                <input
                                    type="date"
                                    id="return"
                                    className="w-full pl-3 py-2 border border-darkBlue focus:outline-none rounded"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="" className='text-white font-[600] '>Nights </label>
                            <div className="relative w-full">
                                <input
                                    type="number"
                                    min={1}
                                    className="w-full pl-10 pr-3 py-2 border border-darkBlue focus:outline-none rounded"
                                    placeholder="7"
                                />
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <div className="flex items-center justify-center w-8 h-8">
                                        <img src="https://www.svgheart.com/wp-content/uploads/2020/05/moon-free-svg-file.png" alt=""
                                            className='h-5 w-5'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="" className='text-white font-[600] '>Guests</label>
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    className="w-full pr-3 pl-10 py-2 border border-darkBlue focus:outline-none rounded"
                                    placeholder="1 Room, 2 Adults"
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
                        
                        <div className="flex flex-row items-center mt-6 ">
                            <button
                                className='w-[100%] bg-[#c70227] text-sm text-white font-semibold px-[55px] py-[10px] rounded'
                            >SEARCH</button>
                        </div>
                    </div>
                </form>
                <div className="flex flex-col gap-[20px]">
                    {destinations?.slice(0, 10)
                        .map((d) => (
                            <a href={`/${d.destination}`} className="flex flex-row justify-between items-center px-[15px] py-[12px] border-[1px] border-lightBlue-2 rounded-[10px] w-[100%] ">
                                <div className="flex flex-row gap-[10px] justify-center items-center">
                                    <img src="../../images/icons/all-inclusive.svg" alt=""
                                        className='h-[25px] w-[25px] '
                                    />
                                    <span>{d.destination} holidays</span>
                                </div>
                                <div className="">
                                    <img src="../../images/icons/triangle-right.svg" alt=""
                                        className='h-[25px] w-[25px]  text-[#E8AA42] '
                                    />
                                </div>
                            </a>
                        ))}

                    <a href={`/`} className="flex flex-row justify-between items-center px-[15px] py-[12px] border-[1px] border-lightBlue-2 rounded-[10px] w-[100%] bg-lightBlue-2 ">
                        <div className="flex flex-row gap-[10px] justify-center items-center">
                            <img src="../../images/icons/all-inclusive.svg" alt=""
                                className='h-[25px] w-[25px] '
                            />
                            <span>More holidays</span>
                        </div>
                        <div className="">
                            <img src="../../images/icons/triangle-right.svg" alt=""
                                className='h-[25px] w-[25px]  text-[#E8AA42] '
                            />
                        </div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default SearchForm