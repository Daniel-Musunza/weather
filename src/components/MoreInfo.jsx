import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { destinations } from '../utils/weatherdata';
const MoreInfo = ({holidaysData, weatherData, newsData}) => {
    const navigate = useNavigate();
   
    const handleHolidayNavigate =( month, id) => {
        navigate(`/where-to-go/${month}/${id}`)
    }

    const handleWeatherNavigate = async(destination) => {
        const name = await destinations?.find((x) => x.id === destination)?.destination;

        navigate(`/${name}`)
    }

    const handleNewsNavigate = (id, index) => {
        navigate(`/news/${index}/${id}`)
    }

    return (
        <div className="flex flex-col lg:flex-row justify-between gap-[40px] mt-[80px] ">
            <div className="flex flex-col gap-[30px]">
                <div className="flex flex-col gap-[20px]">
                    <h1 className='text-[22px] font-[700] text-darkBlue-2'>Where to go on holiday:</h1>
                </div>
                <div className="flex flex-col gap-[20px]">
                    {holidaysData?.map((obj) => (
                        <div onClick={() => handleHolidayNavigate(obj.month, obj.id)} className="flex flex-row gap-[20px] cursor-pointer" key={obj.id}>
                            <img src={obj.image} alt={obj.title} className='h-[100px] w-[100px] rounded-[8px]' />
                            <div className="flex flex-col gap-[3px]">
                                <h2 className='text-[15px] font-[700] text-darkBlue-2'>{obj.title}</h2>
                                <h2 className='text-[15px] font-[700] text-darkBlue-2'>{obj.hint}</h2>
                                <p className='text-darkBlue-2 font-[400]'>{obj.text}</p>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
            <div className="flex flex-col gap-[30px]">
                <div className="flex flex-col gap-[20px]">
                    <h1 className='text-[22px] font-[700] text-darkBlue-2'>Weather:</h1>
                </div>
                <div className="flex flex-col gap-[20px]">
                    {weatherData?.map((obj, index) => (

                        <div onClick={() => handleWeatherNavigate(obj.destination)} className="flex flex-row gap-[20px] cursor-pointer" key={index}>

                            <img src={obj.image} alt=""
                                className='h-[100px] w-[100px] rounded-[8px] '
                            />
                            <div className="flex flex-col gap-[3px] ">
                                <h2 className='text-[15px] font-[700] text-darkBlue-2 '>{obj.title} - </h2>
                                <p className='text-darkBlue-2 font-[400]' >{obj.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-col gap-[30px]">
                <div className="flex flex-col gap-[20px]">
                    <h1 className='text-[22px] font-[700] text-darkBlue-2'>Travel tips and Advice</h1>
                </div>
                <div className="flex flex-col gap-[20px]">
                    {newsData?.map((obj, index) => (

                        <div onClick={() => handleNewsNavigate(obj.id, index)} className="flex flex-row gap-[20px] cursor-pointer" key={index}>

                            <img src={obj.image} alt=""
                                className='h-[100px] w-[100px] rounded-[8px] '
                            />
                            <div className="flex flex-col gap-[3px] ">
                                <h2 className='text-[15px] font-[700] text-darkBlue-2 '>{obj.title}</h2>
                                <p className='text-darkBlue-2 font-[400]' >{obj.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MoreInfo