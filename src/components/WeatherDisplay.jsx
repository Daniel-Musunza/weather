import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import WeatherRecords from './WeatherRecords';
import ImageView from './ImageView';
import WeatherRegions from './WeatherRegions';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; 
import MonthTemp from './MonthTemp';

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

    const averageTemp = [
        { month: 'Jan', temp: 5 },
        { month: 'Feb', temp: 7 },
        { month: 'Mar', temp: 10 },
        { month: 'April', temp: 15 },
        { month: 'May', temp: 20 },
        { month: 'Jun', temp: 25 },
        { month: 'Jul', temp: 30 },
        { month: 'Aug', temp: 35 },
        { month: 'Sep', temp: 20 },
        { month: 'Oct', temp: 15 },
        { month: 'Nov', temp: 10 },
        { month: 'Dec', temp: 5 },
      ];

    const getCardsToShow = () => {
        if (window.innerWidth >= 1024) {
            return 4;
        } else if (window.innerWidth >= 768) {
            return 3;
        } else {
            return 5;
        }
    };

    const [currentIndex, setCurrentIndex] = useState(0);
    const [animationDirection, setAnimationDirection] = useState('');
    const [cardsToShow, setCardsToShow] = useState(getCardsToShow());

    useEffect(() => {
        const handleResize = () => setCardsToShow(getCardsToShow());
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handlePrev = () => {
        if (currentIndex > 0) {
            setAnimationDirection('slideRight');
            setCurrentIndex((prevIndex) => prevIndex - 1);
        }
    };

    const handleNext = () => {
        if (currentIndex < weatherData.length - cardsToShow) {
            setAnimationDirection('slideLeft');
            setCurrentIndex((prevIndex) => prevIndex + 1);
        }
    };

    const handlePrevSmall = () => {
        if (currentIndex > 0) {
            setAnimationDirection('slideRight');
            setCurrentIndex((prevIndex) => prevIndex - 1);
        }
    };

    const handleNextSmall = () => {
        if (currentIndex < weatherData.length - 1) {
            setAnimationDirection('slideLeft');
            setCurrentIndex((prevIndex) => prevIndex + 1);
        }
    };

    

    const displayedData = weatherData.slice(currentIndex, currentIndex + cardsToShow);

  return (
    <div className="flex flex-col gap-[40px] pb-[60px]">
        <div className="">
            <h2 className='text-[20px] font-[600] text-darkBlue'>Current weather in Mauritius</h2>
        </div>
        <div className="  flex flex-row flex-wrap gap-[10px] items-center justify-center border-[1px] border-[#ddd] rounded-[8px] p-[15px] bg-[whitesmoke] w-full">
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
            <div className="flex flex-col gap-[10px] w-[100%] sm1:w-[200px] lg:w-[300px] xl:w-[250px]">
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
            <div className="flex flex-col gap-[10px] w-[100%] sm1:w-[200px] lg:w-[300px] xl:w-[250px]">
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
        <div className="bg-white rounded-[6px] shadow-md p-[10px] flex flex-col items-center w-full overflow-hidden">
            <div className="flex flex-row items-center justify-center gap-[10px] md:gap-[20px]">
                <div className="shrink-0">
                    <button
                        onClick={handlePrev}
                        disabled={currentIndex === 0}
                        className="hidden md:block px-2 py-1 bg-blue-500 text-white rounded-[10px] disabled:opacity-50 shrink-0"
                    >
                        <img src="../../images/icons/triangle-left.svg" alt="Previous" className="h-[30px] w-[30px] shrink-0" />
                    </button>
                </div>
                <div className="w-full flex flex-row gap-[10px] overflow-hidden">
                    <div className={`flex flex-row gap-[10px] transition-transform duration-500 ${animationDirection === 'slideLeft' ? 'animate-slideLeft' : animationDirection === 'slideRight' ? 'animate-slideRight' : ''}`}>
                        {displayedData.map((data, index) => (
                            <div key={index} className="flex flex-col gap-[10px] min-w-[100px] md:min-w-[150px] lg:min-w-[200px] xl:min-w-[140px]">
                                <p className="text-[14px] text-darkBlue">{data.date}</p>
                                <div className="flex flex-col justify-center items-center bg-white py-[20px] px-[25px] rounded-lg border-[1px] border-[#ddd] shadow-md">
                                    <div className="flex flex-col items-center gap-[10px]">
                                        <img src={data.image} alt={data.condition} className="h-[60px] w-[60px]" />
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
                <div className="shrink-0">
                    <button
                        onClick={handleNext}
                        disabled={currentIndex >= weatherData.length - cardsToShow}
                        className="hidden md:block px-2 py-1 bg-blue-500 text-white rounded-[10px] disabled:opacity-50 shrink-0"
                    >
                        <img src="../../images/icons/triangle-right.svg" alt="Next" className="h-[30px] w-[30px] shrink-0" />
                    </button>
                </div>
            </div>
            <div className="flex md:hidden flex-row items-center justify-center gap-[20px] mt-[10px]">
                <button
                    onClick={handlePrevSmall}
                    disabled={currentIndex === 0}
                >
                    <img src="../../images/icons/arrow-left.svg" alt="Previous" className='h-[25px] w-[25px]' />
                </button>
                <button
                    onClick={handleNextSmall}
                    disabled={currentIndex >= weatherData.length - 1}
                >
                    <img src="../../images/icons/arrow-right.svg" alt="Next" className='h-[25px] w-[25px]' />
                </button>
            </div>
            <div className="hidden md:flex justify-center items-center w-full mt-[5px] px-[50px]">
                <div className="relative w-full h-10 flex items-center justify-center">
                    <div className="absolute w-full h-[0.5px] bg-[#E8C872] shadow-md"></div>
                    <div className="absolute flex justify-between w-full px-2">
                        {displayedData.map((data, index) => (
                            <div key={index} className="relative flex flex-col items-center">
                                <div className="w-2 h-2 bg-[#E8C872] rounded-full"></div>
                                <span className="absolute top-4 text-xs">{data.temp}°C</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        
        <div className="flex flex-col">
            <h1 className='font-[600] text-[20px] text-darkBlue-2'>When to go to Mauritius?</h1>
            <div className="flex flex-col gap-[20px] bg-[whitesmoke] border-[1px] border-[#ddd] rounded-[8px] p-[20px]">
                <p className='text-[14px] '>The warmest months in Mauritius</p>
                <div className="flex flex-row flex-wrap gap-[10px]">
                    <div className="bg-[#DBDFFD] flex flex-col justify-center items-center gap-[20px] py-[10px] px-[20px] rounded-[6px]  flex-grow basis-[calc(33.333%-20px)] sm:basis-[calc(50%-20px)] xs:basis-[calc(100%-20px)]">
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
                    <div className="bg-[#DBDFFD] flex flex-col justify-center items-center gap-[20px] py-[10px] px-[20px] rounded-[6px] flex-grow basis-[calc(33.333%-20px)] sm:basis-[calc(50%-20px)] xs:basis-[calc(100%-20px)] ">
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
                    <div className="bg-[#DBDFFD] flex flex-col justify-center items-center gap-[20px] py-[10px] px-[20px] rounded-[6px] flex-grow basis-[calc(33.333%-20px)] sm:basis-[calc(50%-20px)] xs:basis-[calc(100%-20px)] ">
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
                    <div className="bg-[#DBDFFD] flex flex-col justify-center items-center gap-[20px] py-[10px] px-[20px] rounded-[6px] flex-grow basis-[calc(33.333%-20px)] sm:basis-[calc(50%-20px)] xs:basis-[calc(100%-20px)] ">
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
        <div className="flex flex-col gap-[30px]">
          <h1 className='font-[600] text-[20px] text-darkBlue-2'>Year-round weather table</h1>
          <div className="overflow-auto ">
            <table className="table-auto w-full text-left bg-white shadow-md rounded-[8px] border-[1px] border-[#ddd] p-[20px]">
                <thead>
                <tr>
                    <th className=' py-[40px] px-[10px] border-l-[1px] border-l-[#ddd] rounded-[6px]'></th>
                    {averageTemp.map((data, index) => (
                    <th className='py-[40px] px-[10px]' key={index}>{data.month}</th>
                    ))}
                </tr>
                </thead>
                <tbody className='border border-[#ddd] space-y-4 p-[1px]'>
                    <tr className="mb-[40px]">
                        <td className='py-[10px] md:py-[30px] px-[20px]'>
                            <div className="flex flex-col gap-[5px] w-[150px]">
                                <img src="../../images/icons/temperature-hot.svg" alt="" 
                                className='h-[40px] w-[40px]'
                                />
                                <p className='text-darkBlue-2 text-[13px]  font-[500]'>Average temperature during the day</p>
                            </div>
                        </td>
                        <td colSpan={12}
                        className='py-[10px] md:py-[30px] px-[20px]'
                        >
                        <div className="relative w-full h-10 flex items-center justify-center">
                            <div className="absolute w-full h-[0.5px] bg-[#E8C872] shadow-md"></div>
                            <div className="absolute flex justify-between w-full px-2">
                            {averageTemp.map((data, index) => (
                                <div key={index} className="relative flex flex-col items-center">
                                <div className="w-2 h-2 bg-[#E8C872] rounded-full"></div>
                                <span className="absolute top-4 text-xs">{data.temp}°C</span>
                                </div>
                            ))}
                            </div>
                        </div>
                        </td>
                    </tr>
                    <tr className='py-[10px] md:py-[30px] px-[20px]'> 
                        <td className='py-[10px] md:py-[30px] px-[20px]'>
                            <div className="flex flex-col gap-[5px] justify-start w-[150px]">
                                <img src="../../images/icons/rain.svg" alt="" 
                                className='h-[40px] w-[40px]'
                                />
                                <p className='text-darkBlue-2 text-[13px] font-[500]'>Change of precipitation</p>
                            </div>
                        </td>
                        <td colSpan={12}
                        className='py-[10px] md:py-[30px] px-[20px]'
                        >
                        <div className="relative w-full h-10 flex items-center justify-center">
                            <div className="absolute w-full h-[0.5px] bg-[#3559E0] shadow-md"></div>
                            <div className="absolute flex justify-between w-full px-2">
                            {averageTemp.map((data, index) => (
                                <div key={index} className="relative flex flex-col items-center">
                                <div className="w-2 h-2 bg-[#3559E0] rounded-full"></div>
                                <span className="absolute top-4 text-xs">{data.temp}°C</span>
                                </div>
                            ))}
                            </div>
                        </div>
                        </td>
                    </tr>
                    <tr className='py-[10px] md:py-[30px] px-[20px]'>
                        <td className='py-[10px] md:py-[30px] px-[20px]'>
                            <div className="flex flex-col gap-[5px] justify-start w-[150px]">
                                <img src="../../images/icons/water.svg" alt="" 
                                className='h-[40px] w-[40px]'
                                />
                                <p className='text-darkBlue-2 text-[13px] font-[500]'>Temperature of water</p>
                            </div>
                        </td>
                        <td colSpan={12}
                        className='py-[10px] md:py-[30px] px-[20px]'
                        >
                        <div className="relative w-full h-10 flex items-center justify-center">
                            <div className="absolute w-full h-[0.5px] bg-[#3559E0] shadow-md"></div>
                            <div className="absolute flex justify-between w-full px-2">
                            {averageTemp.map((data, index) => (
                                <div key={index} className="relative flex flex-col items-center">
                                <div className="w-2 h-2 bg-[#3559E0] rounded-full"></div>
                                <span className="absolute top-4 text-xs">{data.temp}°C</span>
                                </div>
                            ))}
                            </div>
                        </div>
                        </td>
                    </tr>
                    <tr className='py-[10px] md:py-[30px] px-[20px]'>
                        <td className='py-[10px] md:py-[30px] px-[20px]'>
                            <div className="flex flex-col gap-[5px] justify-start w-[150px]">
                                <img src="../../images/icons/sun-day-light-bright.svg" alt="" 
                                className='h-[40px] w-[40px]'
                                />
                                <p className='text-darkBlue-2 text-[13px] font-[500]'>Sunny hours</p>
                            </div>
                        </td>
                        <td colSpan={12}
                        className='py-[10px] md:py-[30px] px-[20px]'
                        >
                        <div className="relative w-full h-10 flex items-center justify-center">
                            <div className="absolute w-full h-[0.5px] bg-[#E8C872] shadow-md"></div>
                            <div className="absolute flex justify-between w-full px-2">
                            {averageTemp.map((data, index) => (
                                <div key={index} className="relative flex flex-col items-center">
                                <div className="w-2 h-2 bg-[#E8C872] rounded-full"></div>
                                <span className="absolute top-4 text-xs">{data.temp}°C</span>
                                </div>
                            ))}
                            </div>
                        </div>
                        </td>
                    </tr>
                </tbody>
            </table>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-[40px]">
            <h2 className='font-[600] text-darkBlue-2 text-[22px]'>Check weather details for a specific month:</h2>
            <div className="flex flex-row flex-wrap gap-[20px] justify-center items-center ">
                {months.map((data, index) => (
                     <p key={index} className='px-[25px] py-[6px] rounded-[20px] border-[1px] border-darkBlue text-[14px] font-[600] text-darkBlue '>{data.name}</p>
                ))}
            </div>
        </div>
        <ImageView/>
        <MonthTemp/>
        <WeatherRecords/>
        <WeatherRegions/>
    </div>
  )
}

export default WeatherDisplay