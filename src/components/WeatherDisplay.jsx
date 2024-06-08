import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const WeatherDisplay = () => {

    const weatherData = [
        {
            date:"13/06/2024",
            image:"../../images/icons/sun-behind-rain-cloud.svg",
            temp: "26",
            condition: "Rainy"
        },
        {
            date:"13/06/2024",
            image:"../../images/icons/sun-behind-rain-cloud.svg",
            temp: "22",
            condition: "Rainy"
        },
        {
            date:"13/06/2024",
            image:"../../images/icons/sun-behind-rain-cloud.svg",
            temp: "22",
            condition: "Rainy"
        },
        {
            date:"13/06/2024",
            image:"../../images/icons/sun-behind-rain-cloud.svg",
            temp: "22",
            condition: "Rainy"
        },
        {
            date:"13/06/2024",
            image:"../../images/icons/sun-behind-rain-cloud.svg",
            temp: "22",
            condition: "Rainy"
        },
        {
            date:"13/06/2024",
            image:"../../images/icons/sun-behind-rain-cloud.svg",
            temp: "23",
            condition: "Rainy"
        },
        {
            date:"13/06/2024",
            image:"../../images/icons/sun-behind-rain-cloud.svg",
            temp: "22",
            condition: "Rainy"
        },
        {
            date:"13/06/2024",
            image:"../../images/icons/sun-behind-rain-cloud.svg",
            temp: "22",
            condition: "Rainy"
        },
        {
            date:"13/06/2024",
            image:"../../images/icons/sun-behind-rain-cloud.svg",
            temp: "20",
            condition: "Rainy"
        },{
            date:"13/06/2024",
            image:"../../images/icons/sun-behind-rain-cloud.svg",
            temp: "24",
            condition: "Rainy"
        }
    ]

    const [currentIndex, setCurrentIndex] = useState(0);
    const [animationDirection, setAnimationDirection] = useState('');

    const handlePrev = () => {
        if (currentIndex > 0) {
            setAnimationDirection('slideRight');
            setCurrentIndex((prevIndex) => prevIndex - 1);
        }
    };

    const handleNext = () => {
        if (currentIndex < weatherData.length - 6) {
            setAnimationDirection('slideLeft');
            setCurrentIndex((prevIndex) => prevIndex + 1);
        }
    };

  return (
    <div className="flex flex-col gap-[40px] pb-[200px]">
        <div className="">
            <h2 className='text-[20px] font-[600] text-darkBlue'>Current weather in Mauritius</h2>
        </div>
        <div className="  flex flex-row gap-[10px] items-center border-[1px] border-[#ddd] rounded-[8px] p-[15px] bg-[whitesmoke] w-max">
            <div className="flex flex-col gap-[10px]">
                <p className='text-[14px] text-darkBlue'>Now: 07/06/2024 - local time: 21:20</p>
                <div className="flex flex-row gap-[30px] bg-white py-[25px] px-[20px] rounded-lg border-[1px] border-[#ddd] shadow-md w-[350px]">
                    <div className="flex flex-col items-center gap-[15px]">
                        <img
                            src="../../images/icons/weather-color-moon-stars.svg"
                            alt=""
                            className="h-[60px] w-[60px]"
                        />
                        <p className="text-[17px] font-[600] text-darkBlue-2">Sunny</p>
                    </div>
                    <div className="">
                        <p className="text-5xl font-extrabold text-darkBlue-2">
                        18
                        <span className="align-super text-2xl">°C</span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-[10px]">
                <p className='text-[14px] text-darkBlue'>Tomorrow</p>
                <div className="flex flex-row gap-[30px] bg-white py-[25px] px-[20px] rounded-lg border-[1px] border-[#ddd] shadow-md w-[100%]">
                    <div className="flex flex-col items-center gap-[15px]">
                        <img
                            src="../../images/icons/sun-behind-rain-cloud.svg"
                            alt=""
                            className="h-[60px] w-[60px]"
                        />
                        <p className="text-[17px] font-[600] text-darkBlue-2">Rainy</p>
                    </div>
                    <div className="">
                        <p className="text-5xl font-extrabold text-darkBlue-2">
                        22
                        <span className="align-super text-2xl">°C</span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-[10px]">
                <p className='text-[14px] text-darkBlue'>The day after tomorrow</p>
                <div className="flex flex-row gap-[30px] bg-white py-[25px] px-[20px] rounded-lg border-[1px] border-[#ddd] shadow-md w-[100%]">
                    <div className="flex flex-col items-center gap-[15px]">
                        <img
                            src="../../images/icons/sun-behind-rain-cloud.svg"
                            alt=""
                            className="h-[60px] w-[60px]"
                        />
                        <p className="text-[17px] font-[600] text-darkBlue-2">Rainy</p>
                    </div>
                    <div className="">
                        <p className="text-5xl font-extrabold text-darkBlue-2">
                        24
                        <span className="align-super text-2xl">°C</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div className="flex flex-row gap-[40px]">
            <p className='text-[20px] font-[800] text-darkBlue-2'>Go to:</p>
            <div className="flex flex-row flex-wrap gap-[10px]">
                <Link
                className='border-[1px] border-lightBlue py-[10px] px-[15px] font-[600] text-[grey] rounded-[15px] hover:text-[#8576FF] hover:border-[1px] hover:border-[#000000]'
                 to="">Long-term weather forecast
                </Link>
                <Link
                className='border-[1px] border-lightBlue py-[10px] px-[15px] font-[600] text-[grey] rounded-[15px] hover:text-[#8576FF] hover:border-[1px] hover:border-[#000000]'
                 to="">When to go?
                </Link>
                <Link
                className='border-[1px] border-lightBlue py-[10px] px-[15px] font-[600] text-[grey] rounded-[15px] hover:text-[#8576FF] hover:border-[1px] hover:border-[#000000]'
                 to="">Year-round weather table
                </Link>
                <Link
                className='border-[1px] border-lightBlue py-[10px] px-[15px] font-[600] text-[grey] rounded-[15px] hover:text-[#8576FF] hover:border-[1px] hover:border-[#000000]'
                 to="">Historic weather
                </Link>
                <Link
                className='border-[1px] border-lightBlue py-[10px] px-[15px] font-[600] text-[grey] rounded-[15px] hover:text-[#8576FF] hover:border-[1px] hover:border-[#000000]'
                 to="">Weather records
                </Link>
                <Link
                className='border-[1px] border-lightBlue py-[10px] px-[15px] font-[600] text-[grey] rounded-[15px] hover:text-[#8576FF] hover:border-[1px] hover:border-[#000000]'
                 to="">Temperatures and climate
                </Link>
                <Link
                className='border-[1px] border-lightBlue py-[10px] px-[15px] font-[600] text-[grey] rounded-[15px] hover:text-[#8576FF] hover:border-[1px] hover:border-[#000000]'
                 to="">FAQ
                </Link>
            </div>
        </div>
        <div className="flex flex-col">
            <div className="flex flex-row">
                <div className="absolute z-[1] ">
                    <p className='text-white font-[700] rounded-tl-[30px] rounded-br-[20px] bg-darkBlue-2 py-[13px] px-[20px]'>from PLN 5,717</p>
                </div>
                <img src="../../images/photos/upload_6539018e83284.jpg" alt="" 
                className='h-[250px] border-[1px] border-darkBlue-2 rounded-s-[30px] relative'
                />
                <div className="rounded-e-[30px] h-[250px] bg-darkBlue-2 flex flex-col gap-[40px] pl-[40px] py-[40px] p pr-[180px]">
                    <h1 className='text-[25px] text-white font-[700]'>Holidays in Mauritius <span>✈</span></h1>
                    <p className='  text-white'>Check out the best holiday offers!</p>
                    <div className="">
                        <button
                        className='flex flex-row justify-center items-center gap-[20px] bg-[#FBA834] px-[45px] py-[9px] text-darkBlue-2 text-[15px] rounded-[20px] outline-none'
                        >
                        <span className='font-[900]'>See offers</span>
                        <img src="../../images/icons/triangle-right.svg" alt="" 
                        className='h-[20px] w-[20px]'
                        />
                        </button>
                    </div>
                    
                </div>
            </div>
        </div>
        <div className="flex flex-col">
            <h2 className='text-[22px] font-[700] text-darkBlue-2'>Long-term weather forecast</h2>
        </div>
        <div className="bg-white rounded-[6px] shadow-md p-[10px] flex flex-row gap-[10px] items-center">
            <div>
                <button
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                    Prev
                </button>
            </div>
            <div className="w-[700px] flex flex-row gap-[10px] overflow-hidden">
                <div className={`flex flex-row gap-[10px] transition-transform ${animationDirection === 'slideLeft' ? 'animate-slideLeft' : animationDirection === 'slideRight' ? 'animate-slideRight' : ''}`}>
                    {weatherData.slice(currentIndex, currentIndex + 6).map((data, index) => (
                        <div key={index} className="flex flex-col gap-[10px] min-w-[100px]">
                            <p className="text-[14px] text-darkBlue">{data.date}</p>
                            <div className="flex flex-col justify-center items-center bg-white py-[20px] px-[25px] rounded-lg border-[1px] border-[#ddd] shadow-md">
                                <div className="flex flex-col items-center gap-[10px]">
                                    <img
                                        src={data.image}
                                        alt={data.condition}
                                        className="h-[60px] w-[60px]"
                                    />
                                </div>
                                <div>
                                    <p className="text-[40px] font-extrabold text-darkBlue-2">
                                        {data.temp}
                                        <span className="align-super text-[18px]">°C</span>
                                    </p>
                                </div>
                                <p className="text-[17px] font-[600] text-darkBlue-2">{data.condition}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <button
                    onClick={handleNext}
                    disabled={currentIndex >= weatherData.length - 6}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    </div>
  )
}

export default WeatherDisplay