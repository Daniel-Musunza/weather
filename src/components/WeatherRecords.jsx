import React, { useState } from 'react'
import icons from '../utils/icons'
import ImageView from './ImageView';

const WeatherRecords = () => {

    const faqs = [
        {
            question:"When is the best time to holiday in Mauritius?",
            ans: "It is best to travel to Mauritius from June to December, when the air temperature is ideal for sunbathing and rainfall is negligible.",
        },
        {
            question:"When is the rainy season in Mauritius?",
            ans: "The rainy season in Mauritius starts at the end of December and lasts until April. During this period, rainfall is much more frequent."
        },
        {
            question:"Which month in Mauritius is the warmest?",
            ans: "It is hottest in February, but during this period there is a high risk of rainfall in Mauritius. It is definitely better in November, where the temperature is slightly lower and the risk of precipitation is negligible."
        },
        {
            question:"When is the water in Mauritius the warmest?",
            ans: "From November to March, the water temperature is as high as 28 degrees."
        },
    ]

   
    const[viewQuestionId, setViewQuestionId] = useState(null);

    const handleViewQuestion = (index) => {
        setViewQuestionId(viewQuestionId === index ? null : index);
    }

  return (
    <div className="flex flex-col gap-[30px]">
        <div className="flex flex-col gap-[30px]">
            <div className="">
                <h2 className='text-[22px] font-[600] text-darkBlue-2'>Weather records</h2>
            </div>
            <div className="flex flex-col gap-[20px] border-[1px] border-[#ddd] rounded-[8px] p-[15px] bg-[whitesmoke] w-full">
                <p className='text-[14px] text-darkBlue-2  '>Temperature records in Mauritius</p>
                <div className="  flex flex-row gap-[10px] items-center justify-center ">
                    <div className="flex flex-col gap-[15px] bg-white py-[25px] px-[20px] rounded-lg border-[1px] border-[#ddd] shadow-md ">
                        <div className="flex flex-row justify-center items-center gap-[10px]">
                            <img
                                src="../../images/icons/thermometer-temperature.svg"
                                alt=""
                                className="h-[40px] w-[40px]"
                            />
                            <div className="">
                                <p className="text-[30px] font-extrabold text-darkBlue-2">
                                22
                                <span className="align-super text-[15px]">°C</span>
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-center gap-[10px] ">
                            <p className='text-darkBlue-2 font-[600] '>13/02/2024</p>
                            <p className="text-[14px] font-[400] text-darkBlue-2">The highest temperature</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-[15px] bg-white py-[25px] px-[20px] rounded-lg border-[1px] border-[#ddd] shadow-md ">
                        <div className="flex flex-row justify-center items-center gap-[10px]">
                            <img
                                src="../../images/icons/thermometer-temperature.svg"
                                alt=""
                                className="h-[40px] w-[40px]"
                            />
                            <div className="">
                                <p className="text-[30px] font-extrabold text-darkBlue-2">
                                22
                                <span className="align-super text-[15px]">°C</span>
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-center gap-[10px] ">
                            <p className='text-darkBlue-2 font-[600] '>13/02/2024</p>
                            <p className="text-[14px] font-[400] text-darkBlue-2">The highest temperature</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-[15px] bg-white py-[25px] px-[20px] rounded-lg border-[1px] border-[#ddd] shadow-md ">
                        <div className="flex flex-row justify-center items-center gap-[10px]">
                            <img
                                src="../../images/icons/thermometer-temperature.svg"
                                alt=""
                                className="h-[40px] w-[40px]"
                            />
                            <div className="">
                                <p className="text-[30px] font-extrabold text-darkBlue-2">
                                22
                                <span className="align-super text-[15px]">°C</span>
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-center gap-[10px] ">
                            <p className='text-darkBlue-2 font-[600] '>13/02/2024</p>
                            <p className="text-[14px] font-[400] text-darkBlue-2">The highest temperature</p>
                        </div>
                    </div>
                </div>
                <p className='text-[14px] text-darkBlue-2'>Weather records are based on data we collect from 2023. We do not include previous years in our analyses.</p>
            </div>
        </div>
        <div className="flex flex-col gap-[30px]">
            <h2 className='text-[22px] font-[600] text-darkBlue-2' >Temperatures and climate in Mauritius</h2>
            <div className="flex flex-col  gap-[5px]">
                <img src="../../images/photos/upload_6539018e83284.jpg" alt=""
                className='rounded-[20px] h-[500px]'
                />
                <p className='flex flex-row justify-center items-center'>Mauritius weather / Serenity-H / shutterstock.com</p>
            </div>
            <p className='text-[14px] text-darkBlue-2'>
                Paradise islands at the end of the world are perfect travel destinations for people looking for exoticism, sun and extraordinary landscapes. One of them is Mauritius - a small island located in the Indian Ocean about a thousand kilometers from Madagascar. Tourists from all over the world will find everything they need for a perfect holiday here. When to go to Mauritius? It is worth checking what the weather on the island is like over the course of twelve months. Mauritius is located far from the most popular tourist destinations, which means that it is still a bit wild, untrodden and simply beautiful. The island was perfectly described by Mark Twain, who stated that God first created Mauritius, and only then paradise. Virtually everything is paradise on the island - the extraordinary sandy beaches of Mauritius, crystalline, azure water and unique, exotic nature. If we don't know when is the best time to go to Mauritius, it is good to gain some knowledge about the climate on the island.
            </p>
        </div>
        <div className="flex flex-col gap-[20px]">
            {faqs.map((data, index) => (
                <div key={index} className="flex flex-row justify-between bg-white p-[20px] rounded-[6px] shadow-md border-[1px]" >
                    <div className="flex flex-col gap-[20px]">
                        <p className='text-darkBlue-2 font-[600] text-[18px] '>{data.question}</p>
                        <div className={`transition-max-height duration-500 ease-in-out overflow-hidden ${viewQuestionId === index ? 'max-h-40' : 'max-h-0'}`}>
                            <p className='text-sm text-darkBlue-2 mt-2'>{data.ans}</p>
                        </div>
                    </div>
                    <div className="">
                        <button
                        onClick={() => handleViewQuestion(index)}
                        className='bg-[#C4DDFF] py-[5px] px-[8px] border-[1px] rounded-[4px]  '
                        >{viewQuestionId === index ? icons.angleUp : icons.angleDown}</button>
                    </div>
                </div>
            ))}
        </div>
        <ImageView/>
    </div>
    
  )
}

export default WeatherRecords