import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import WeatherRecords from './WeatherRecords';
import ImageView from './ImageView';
import WeatherRegions from './WeatherRegions';

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

    const months = [
        { name: 'January' }, { name: 'February' }, { name: 'March' },
        { name: 'April' }, { name: 'May' }, { name: 'June' },
        { name: 'July' }, { name: 'August' }, { name: 'September' },
        { name: 'October' }, { name: 'November' }, { name: 'December' }
    ];

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
    <div className="flex flex-col gap-[40px] pb-[200px] ">
        <div className="">
            <h2 className='text-[20px] font-[600] text-darkBlue'>Current weather in Mauritius</h2>
        </div>
        <div className="  flex flex-row gap-[10px] items-center justify-center border-[1px] border-[#ddd] rounded-[8px] p-[15px] bg-[whitesmoke] w-full">
            <div className="flex flex-col gap-[10px] flex-grow">
                <p className='text-[14px] text-darkBlue'>Now: 07/06/2024 - local time: 21:20</p>
                <div className="flex flex-1 gap-[30px] bg-white py-[25px] px-[20px] rounded-lg border-[1px] border-[#ddd] shadow-md ">
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
            <div className="flex flex-col gap-[10px] w-[200px] lg:w-[300px] xl:w-[200px]">
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
            <div className="flex flex-col gap-[10px] w-[200px] lg:w-[300px] xl:w-[200px]">
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
        <div className="flex flex-row gap-[20px]">
            <div className="flex flex-row flex-nowrap ">
                <p className='text-[18px] font-[800] text-darkBlue-2'>Go to:</p>
            </div>
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
            <ImageView/>
        </div>
        <div className="flex flex-col">
            <h2 className='text-[22px] font-[700] text-darkBlue-2'>Long-term weather forecast</h2>
        </div>
        <div className="bg-white rounded-[6px] shadow-md p-[10px] flex flex-row gap-[10px] items-center w-full">
            <div>
                <button
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className="px-2 py-1 bg-blue-500 text-white rounded-[10px] disabled:opacity-50"
                >
                    <img src="../../images/icons/triangle-left.svg" alt=""
                    className='h-[30px] w-[30px]'
                     />
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
                    className="px-2 py-1 bg-blue-500 text-white rounded-[10px] disabled:opacity-50"
                >
                    <img src="../../images/icons/triangle-right.svg" alt=""
                    className='h-[30px] w-[30px]'
                     />
                </button>
            </div>
        </div>
        <div className="flex flex-col">
            <h1 className='font-[600] text-[20px] text-darkBlue-2'>When to go to Mauritius?</h1>
            <div className="flex flex-col gap-[20px] bg-[whitesmoke] border-[1px] border-[#ddd] rounded-[8px] p-[20px]">
                <p className='text-[14px] '>The warmest months in Mauritius</p>
                <div className="flex flex-row gap-[10px]">
                    <div className="bg-[#DBDFFD] flex flex-col justify-center items-center gap-[20px] py-[10px] px-[20px] rounded-[6px] ">
                        <p className='text-darkBlue-2 font-[600]'>February</p>
                        <div className="flex flex-row items-center gap-[10px]">
                            <div className="flex flex-row items-center gap-[10px]">
                                <img src="../../images/icons/temperature-hot.svg" alt=""
                                className='h-[25px] w-[25px]' 
                                />
                                <span className='text-[16px] font-[600] text-darkBlue-2'>18°C</span>
                            </div>
                            <div className="flex flex-row items-center gap-[10px]">
                                <img src="../../images/icons/rain.svg" alt=""
                                className='h-[25px] w-[25px]' 
                                />
                                <span className='text-[16px] font-[600] text-darkBlue-2'>thirty%</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#DBDFFD] flex flex-col justify-center items-center gap-[20px] py-[10px] px-[20px] rounded-[6px] ">
                        <p className='text-darkBlue-2 font-[600]'>March</p>
                        <div className="flex flex-row items-center gap-[10px]">
                            <div className="flex flex-row items-center gap-[10px]">
                                <img src="../../images/icons/temperature-hot.svg" alt=""
                                className='h-[25px] w-[25px]' 
                                />
                                <span className='text-[16px] font-[600] text-darkBlue-2'>28°C</span>
                            </div>
                            <div className="flex flex-row items-center gap-[10px]">
                                <img src="../../images/icons/rain.svg" alt=""
                                className='h-[25px] w-[25px]' 
                                />
                                <span className='text-[16px] font-[600] text-darkBlue-2'>23°C</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#DBDFFD] flex flex-col justify-center items-center gap-[20px] py-[10px] px-[20px] rounded-[6px] ">
                        <p className='text-darkBlue-2 font-[600]'>January</p>
                        <div className="flex flex-row items-center gap-[10px]">
                            <div className="flex flex-row items-center gap-[10px]">
                                <img src="../../images/icons/temperature-hot.svg" alt=""
                                className='h-[25px] w-[25px]' 
                                />
                                <span className='text-[16px] font-[600] text-darkBlue-2'>28°C</span>
                            </div>
                            <div className="flex flex-row items-center gap-[10px]">
                                <img src="../../images/icons/rain.svg" alt=""
                                className='h-[25px] w-[25px]' 
                                />
                                <span className='text-[16px] font-[600] text-darkBlue-2'>31°C</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#DBDFFD] flex flex-col justify-center items-center gap-[20px] py-[10px] px-[20px] rounded-[6px] ">
                        <p className='text-darkBlue-2 font-[600]'>April</p>
                        <div className="flex flex-row items-center gap-[10px]">
                            <div className="flex flex-row items-center gap-[10px]">
                                <img src="../../images/icons/temperature-hot.svg" alt=""
                                className='h-[25px] w-[25px]' 
                                />
                                <span className='text-[16px] font-[600] text-darkBlue-2'>27°C</span>
                            </div>
                            <div className="flex flex-row items-center gap-[10px]">
                                <img src="../../images/icons/rain.svg" alt=""
                                className='h-[25px] w-[25px]' 
                                />
                                <span className='text-[16px] font-[600] text-darkBlue-2'>10°C</span>
                            </div>
                        </div>
                    </div>                      
                </div>
                <p className='text-darkBlue-2 text-[15px]'>To know when is the best time to go to Mauritius, remember that the island is located in the southern hemisphere. This means that the seasons are opposite to those in our climate. When it's winter here, it's summer in Mauritius, and when it's summer in our climatic conditions, it's winter on the island. Of course, the definition of winter in a climate similar to that of Africa is completely different from the one we know from our reality. Before we book a paradise luxury holiday on a unique island, let's check the weather tables for given months. And of course, let's determine our own needs - beachgoers need different weather, and lovers of water sports or other forms of active recreation need a completely different one. Mauritius has a tropical climate, but its location makes the climate difficult to define. Moreover, the weather in the north and south of the island may be different at the same time. There is no classic rainy season on the island, but it is worth being aware that there are months when there is quite a lot of rainfall and it may make it difficult to visit or enjoy attractions. So if we are wondering when to go to Mauritius, let's take into account when the rainy weather occurs.</p>
            </div>
        </div>
        {/* table */}
        <div className="flex flex-col justify-center items-center gap-[40px]">
            <h2 className='font-[600] text-darkBlue-2 text-[22px]'>Check weather details for a specific month:</h2>
            <div className="flex flex-row flex-wrap gap-[20px] justify-center items-center ">
                {months.map((data, index) => (
                     <p key={index} className='px-[25px] py-[6px] rounded-[20px] border-[1px] border-darkBlue text-[14px] font-[600] text-darkBlue '>{data.name}</p>
                ))}
            </div>
        </div>
        <ImageView/>
        <div className="flex flex-col justify-center items-center bg-white rounded-[6px] shadow-md p-[10px] gap-[40px]  ">
            <h2 className='font-[400] text-darkBlue-2 text-[14px]'>Select a month to check what the weather was like in Mauritius in previous years</h2>
            <div className="flex flex-row flex-wrap gap-[10px] justify-center items-center ">
                {months.map((data, index) => (
                     <p key={index} className='px-[10px] py-[3px] rounded-[20px] border-[1px] border-darkBlue text-[14px] font-[600] text-darkBlue '>{data.name}</p>
                ))}
            </div>
            <div className="flex flex-row gap-[10px] items-center">
                <div>
                    <button
                        onClick={handlePrev}
                        disabled={currentIndex === 0}
                        className="px-2 py-1 bg-blue-500 text-white rounded-[10px] disabled:opacity-50"
                    >
                        <img src="../../images/icons/triangle-left.svg" alt=""
                        className='h-[30px] w-[30px]'
                        />
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
                        className="px-2 py-1 bg-blue-500 text-white rounded-[10px] disabled:opacity-50"
                    >
                        <img src="../../images/icons/triangle-right.svg" alt=""
                        className='h-[30px] w-[30px]'
                        />
                    </button>
                </div>
            </div>
        </div>
        <WeatherRecords/>
        <WeatherRegions/>
    </div>
  )
}

export default WeatherDisplay