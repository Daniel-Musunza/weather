import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import WeatherRecords from './WeatherRecords';
import ImageView from './ImageView';
import WeatherRegions from './WeatherRegions';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import MonthTemp from './MonthTemp';
import { Card, Text, Button, Box } from '@mantine/core';

const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
};

const getCurrentDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
};

export const getWeatherIcon = (condition) => {
    switch (condition) {
        case 'Sunny':
            return "../../images/icons/sun-day-light-bright.svg";
        case 'Rainy':
            return "../../images/icons/sun-behind-rain-cloud.svg";
        case 'Cloudy':
            return "../../images/icons/cloudy.svg";
        case 'Snowy':
            return "../../images/icons/weather-snowy.svg";
        default:
            return "../../images/icons/sun-behind-rain-cloud.svg";
    }
};

const getWarmestMonths = (weatherData) => {
    // Group data by month
    const monthlyData = {};
    weatherData.forEach(data => {
        const [day, month, year] = data?.date?.split("/");
        const monthYear = `${month}/${year}`;
        if (!monthlyData[monthYear]) {
            monthlyData[monthYear] = [];
        }
        monthlyData[monthYear].push(data);
    });

    // Calculate average temperature and humidity for each month
    const monthlyAvgTemp = Object.keys(monthlyData).map(monthYear => {
        const totalTemp = monthlyData[monthYear].reduce((sum, data) => sum + data?.temperature, 0);
        const totalHumidity = monthlyData[monthYear].reduce((sum, data) => sum + data.humidity, 0);
        const avgTemp = totalTemp / monthlyData[monthYear].length;
        const avgHumidity = totalHumidity / monthlyData[monthYear].length;
        return { monthYear, avgTemp, avgHumidity };
    });

    // Sort months by average temperature in descending order
    monthlyAvgTemp.sort((a, b) => b.avgTemp - a.avgTemp);

    // Get the top 3 warmest months
    const warmestMonths = monthlyAvgTemp.slice(0, 4);
    return warmestMonths;
};

const getWeatherStatistics = (weatherData) => {
    if (!weatherData || weatherData.length === 0) return {};

    const highestTemp = weatherData.reduce((max, current) => (current?.temperature > max?.temperature ? current : max));
    const lowestTemp = weatherData.reduce((min, current) => (current?.temperature < min?.temperature ? current : min));

    const monthlyData = {};
    weatherData.forEach(data => {
        const [day, month, year] = data?.date?.split("/");
        const monthYear = `${year}-${month}`;
        if (!monthlyData[monthYear]) {
            monthlyData[monthYear] = { totalTemp: 0, count: 0 };
        }
        monthlyData[monthYear].totalTemp += data?.temperature;
        monthlyData[monthYear].count += 1;
    });

    const monthlyAvgTemp = Object.keys(monthlyData).map(monthYear => ({
        monthYear,
        avgTemp: monthlyData[monthYear].totalTemp / monthlyData[monthYear].count
    }));

    const warmestMonth = monthlyAvgTemp.reduce((max, current) => (current.avgTemp > max?.avgTemp ? current : max));
    const coldestMonth = monthlyAvgTemp.reduce((min, current) => (current.avgTemp < min?.avgTemp ? current : min));

    return {
        highestTemp,
        lowestTemp,
        warmestMonth,
        coldestMonth
    };
};

const WeatherDisplay = ({data}) => {
    const navigate = useNavigate();
    const currentTime = getCurrentTime();
    const currentDate = getCurrentDate();
    const tomorrowDate = new Date();
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    const dayAfterTomorrowDate = new Date();
    dayAfterTomorrowDate.setDate(dayAfterTomorrowDate.getDate() + 2);

    // Format next two days' dates in DD/MM/YYYY format
    const tomorrowDateString = `${String(tomorrowDate.getDate()).padStart(2, '0')}/${String(tomorrowDate.getMonth() + 1).padStart(2, '0')}/${tomorrowDate.getFullYear()}`;
    const dayAfterTomorrowDateString = `${String(dayAfterTomorrowDate.getDate()).padStart(2, '0')}/${String(dayAfterTomorrowDate.getMonth() + 1).padStart(2, '0')}/${dayAfterTomorrowDate.getFullYear()}`;

    // Filter weather data for today, tomorrow, and the day after tomorrow
    const todayWeather = data.daily_weather.find(weather => weather?.date === currentDate);
    const tomorrowWeather = data.daily_weather.find(weather => weather?.date === tomorrowDateString);
    const dayAfterTomorrowWeather = data.daily_weather.find(weather => weather?.date === dayAfterTomorrowDateString);

    const warmestMonths = getWarmestMonths(data?.daily_weather);

    const destination_info = data?.destination_info[0];

    // Example usage:
    const weatherStats = getWeatherStatistics(data?.daily_weather);

    const months = [
        { name: 'January' }, { name: 'February' }, { name: 'March' },
        { name: 'April' }, { name: 'May' }, { name: 'June' },
        { name: 'July' }, { name: 'August' }, { name: 'September' },
        { name: 'October' }, { name: 'November' }, { name: 'December' }
    ];

    let averageTemp = [];

    let averageWaterTemp = [];

    let averageHumidity = [];

    let averageSunnyHours = [];

    // Function to parse date in "DD/MM/YYYY" format and return the month in 'short' format
    const parseDateToMonth = (dateString) => {
        const [day, month, year] = dateString.split('/').map(Number);
        const date = new Date(year, month - 1, day);
        if (!isNaN(date)) {
            return date.toLocaleString('default', { month: 'short' });
        }
        return null;
    };

    // Step 1: Group data by month and calculate the sum of temperatures and the count of days for each month
    const monthData = data?.daily_weather.reduce((acc, x) => {
        const month = parseDateToMonth(x.date);

        if (month) {
            if (!acc[month]) {
                acc[month] = { month: month, tempSum: 0, waterTempSum: 0, humidSum: 0, sunnyHrsSum: 0, count: 0 };
            }

            acc[month].tempSum += x.temperature;
            acc[month].waterTempSum += x.water_temperature;
            acc[month].humidSum += x.humidity;
            if (x.condition === "Sunny") {
                acc[month].sunnyHrsSum += x.condition_hours;
            }
            acc[month].count += 1;
        }

        return acc;
    }, {});

    // Step 2: Calculate the average temperature for each month and format the result
    averageTemp = Object.keys(monthData).map(month => ({
        month: month,
        temp: (monthData[month].tempSum / monthData[month].count).toFixed(2)
    }));

    averageWaterTemp = Object.keys(monthData).map(month => ({
        month: month,
        temp: (monthData[month].waterTempSum / monthData[month].count).toFixed(2)
    }));

    averageHumidity = Object.keys(monthData).map(month => ({
        month: month,
        humid: (monthData[month].humidSum / monthData[month].count).toFixed(0)
    }));

    averageSunnyHours = Object.keys(monthData).map(month => ({
        month: month,
        hrs: (monthData[month].sunnyHrsSum / monthData[month].count).toFixed(0)
    }));

    const getCardsToShow = () => {
        if (window.innerWidth >= 1024) {
            return 4;
        } else if (window.innerWidth >= 768) {
            return 4;
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
        if (currentIndex < data?.daily_weather.length - cardsToShow) {
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
        if (currentIndex < data?.daily_weather.length - 1) {
            setAnimationDirection('slideLeft');
            setCurrentIndex((prevIndex) => prevIndex + 1);
        }
    };


    // flex flex-col gap-[40px] pb-[60px]
    const displayedData = data?.daily_weather.slice(currentIndex, currentIndex + cardsToShow);

    const handleNavigation = (sectionId) => {
        navigate(`/${data.destination}#${sectionId}`);
        document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <Box className="flex flex-col gap-[40px]  " >
            <Box className=" flex flex-col gap-[10px] mt-[30px]">
                <h1 className='text-darkBlue-2 font-[900] text-[30px]'>{data.destination} weather</h1>
                <Box className="flex flex-row items-center gap-[10px]">
                    <Text className='bg-[#11009E] px-[20px] py-[5px] text-white text-[13px] font-[800] rounded-[8px]'>WEATHER</Text>
                    <span>
                        <img src="../../images/icons/angle-right.svg" alt=""
                            className='h-[20px] w-[20px]'
                        />
                    </span>
                    <Text className='bg-[#11009E] px-[20px] py-[5px] text-white text-[13px] font-[800] rounded-[8px] uppercase'>{data.destination}</Text>
                </Box>
            </Box>
            <Box className="">
                <h2 className='text-[20px] font-[600] text-darkBlue'>Current weather in {data.destination}</h2>
            </Box>

            <Box className="flex flex-col md:flex-row flex-wrap md:flex-nowrap gap-[10px] items-center justify-center border-[1px] border-[#ddd] rounded-[8px] p-[15px] bg-[whitesmoke] w-full">
                {/* Today's weather */}
                <Box className="flex flex-col gap-[10px] w-[100%] flex-grow justify-between">
                    <Text className='text-[14px] text-darkBlue mb-5'>Now: {currentDate} - local time: {currentTime}</Text>
                    <Box className="flex flex-1 gap-[30px] bg-white py-[25px] px-[20px] rounded-lg border-[1px] border-[#ddd] shadow-md ">
                        <Box className="flex flex-col items-center gap-[15px]">
                            {/* Change the icon source dynamically based on weather condition */}
                            <img
                                src={getWeatherIcon(todayWeather?.condition)}
                                alt={todayWeather?.condition}
                                className="h-[60px] w-[60px]"
                            />
                            <Text className="text-[17px] font-[600] text-darkBlue-2">{todayWeather?.condition}</Text>
                        </Box>
                        <Box className="">
                            <Text className="text-5xl font-extrabold text-darkBlue-2">
                                {todayWeather?.temperature}
                                <span className="align-super text-2xl">°C</span>
                            </Text>
                        </Box>
                    </Box>
                </Box>
                {/* Tomorrow's weather */}
                <Box className="flex flex-col sm1:flex-row gap-[10px] w-[100%]">
                    <Box className="flex flex-col gap-[10px] w-[100%] md:w-[200px] lg:w-[300px] xl:w-[200px] justify-between">
                        <Text className='text-[14px] text-darkBlue'>Tomorrow: {tomorrowDateString}</Text>
                        <Box className="flex flex-row gap-[30px] bg-white py-[25px] px-[20px] rounded-lg border-[1px] border-[#ddd] shadow-md w-[100%]">
                            <Box className="flex flex-col items-center gap-[15px]">
                                {/* Change the icon source dynamically based on weather condition */}
                                <img
                                    src={getWeatherIcon(tomorrowWeather?.condition)}
                                    alt={tomorrowWeather?.condition}
                                    className="h-[60px] w-[60px]"
                                />
                                <Text className="text-[17px] font-[600] text-darkBlue-2">{tomorrowWeather?.condition}</Text>
                            </Box>
                            <Box className="">
                                <Text className="text-5xl font-extrabold text-darkBlue-2">
                                    {tomorrowWeather?.temperature}
                                    <span className="align-super text-2xl">°C</span>
                                </Text>
                            </Box>
                        </Box>
                    </Box>
                    {/* The day after tomorrow's weather */}
                    <Box className="flex flex-col gap-[10px] w-[100%] md:w-[200px] lg:w-[300px] xl:w-[200px] justify-between">
                        <Text className='text-[14px] text-darkBlue'>The day after tomorrow: {dayAfterTomorrowDateString}</Text>
                        <Box className="flex flex-row gap-[30px] bg-white py-[25px] px-[20px] rounded-lg border-[1px] border-[#ddd] shadow-md w-[100%]">
                            <Box className="flex flex-col items-center gap-[15px]">
                                {/* Change the icon source dynamically based on weather condition */}
                                <img
                                    src={getWeatherIcon(dayAfterTomorrowWeather?.condition)}
                                    alt={dayAfterTomorrowWeather?.condition}
                                    className="h-[60px] w-[60px]"
                                />
                                <Text className="text-[17px] font-[600] text-darkBlue-2">{dayAfterTomorrowWeather?.condition}</Text>
                            </Box>
                            <Box className="">
                                <Text className="text-5xl font-extrabold text-darkBlue-2">
                                    {dayAfterTomorrowWeather?.temperature}
                                    <span className="align-super text-2xl">°C</span>
                                </Text>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Box className="flex flex-col justify-center items-center md:items-start md:flex-row gap-[20px]">
                <Box className="flex flex-row flex-nowrap ">
                    <Text className='text-nowrap text-[18px] font-[800] text-darkBlue-2'>Go to:</Text>
                </Box>
                <Box className="flex flex-row flex-wrap justify-center items-center md:items-start cursor-pointer gap-[10px]">
                    <a
                        className='border-[1px] border-lightBlue py-[10px] px-[15px] font-[600] text-[grey] rounded-[15px] hover:text-[#8576FF] hover:border-[1px] hover:border-[#000000]'
                        onClick={() => handleNavigation('long-term-weather-forecast')}
                    >
                        Long-term weather forecast
                    </a>
                    <a
                        className='border-[1px] border-lightBlue py-[10px] px-[15px] font-[600] text-[grey] rounded-[15px] hover:text-[#8576FF] hover:border-[1px] hover:border-[#000000]'
                        onClick={() => handleNavigation('when-to-go')}
                    >
                        When to go?
                    </a>
                    <a
                        className='border-[1px] border-lightBlue py-[10px] px-[15px] font-[600] text-[grey] rounded-[15px] hover:text-[#8576FF] hover:border-[1px] hover:border-[#000000]'
                        onClick={() => handleNavigation('year-round-weather-table')}>Year-round weather table
                    </a>
                    <a
                        className='border-[1px] border-lightBlue py-[10px] px-[15px] font-[600] text-[grey] rounded-[15px] hover:text-[#8576FF] hover:border-[1px] hover:border-[#000000]'
                        onClick={() => handleNavigation('historic-weather')}>Historic weather
                    </a>
                    <a
                        className='border-[1px] border-lightBlue py-[10px] px-[15px] font-[600] text-[grey] rounded-[15px] hover:text-[#8576FF] hover:border-[1px] hover:border-[#000000]'
                        onClick={() => handleNavigation('weather-records')}>Weather records
                    </a>
                    <a
                        className='border-[1px] border-lightBlue py-[10px] px-[15px] font-[600] text-[grey] rounded-[15px] hover:text-[#8576FF] hover:border-[1px] hover:border-[#000000]'
                        onClick={() => handleNavigation('temperatures-and-climate')}>Temperatures and climate
                    </a>
                    <a
                        className='border-[1px] border-lightBlue py-[10px] px-[15px] font-[600] text-[grey] rounded-[15px] hover:text-[#8576FF] hover:border-[1px] hover:border-[#000000]'
                        onClick={() => handleNavigation('faq')}>FAQ
                    </a>
                </Box>
            </Box>
            <Box className="flex flex-col" >
                <ImageView destination={data?.destination} />
            </Box>
            <Box className="flex flex-col gap-[20px]" id="long-term-weather-forecast">
                <Box className="flex flex-col">
                    <h2 className='text-[22px] font-[700] text-darkBlue-2'>Long-term weather forecast</h2>
                </Box>
                <Box className="bg-white rounded-[6px] shadow-md p-[10px] flex flex-col items-center w-full overflow-hidden">
                    <Box className="flex flex-row  justify-center gap-[10px] md:gap-[20px]">
                        <Box className="shrink-0 mt-[50px]">
                            <button
                                onClick={handlePrev}
                                disabled={currentIndex === 0}
                                className="hidden md:block px-2 py-1 bg-blue-500 text-white rounded-[10px] disabled:opacity-50 shrink-0"
                            >
                                <img src="../../images/icons/triangle-left.svg" alt="Previous" className="h-[30px] w-[30px] shrink-0" />
                            </button>
                        </Box>
                        <Box className="w-full flex flex-row gap-[10px] overflow-hidden">
                            <Box className={`flex flex-row gap-[10px] transition-transform duration-500 ${animationDirection === 'slideLeft' ? 'animate-slideLeft' : animationDirection === 'slideRight' ? 'animate-slideRight' : ''}`}>
                                {displayedData.map((data, index) => (
                                    <Box key={index} className="flex flex-col gap-[10px] min-w-[100px] md:min-w-[150px] lg:min-w-[200px] xl:min-w-[140px]">
                                        <Text className="text-[14px] text-darkBlue">{data?.date}</Text>
                                        <Box className="flex flex-col justify-center items-center bg-white py-[20px] px-[25px] rounded-lg border-[1px] border-[#ddd] shadow-md">
                                            <Box className="flex flex-col items-center gap-[10px]">
                                                <img src={getWeatherIcon(data.condition)} alt={data.condition} className="h-[60px] w-[60px]" />
                                            </Box>
                                            <Box>
                                                <Text className="text-[40px] font-extrabold text-darkBlue-2">
                                                    {data?.temperature}
                                                    <span className="align-super text-[18px]">°C</span>
                                                </Text>
                                            </Box>
                                            <Text className="text-[17px] font-[600] text-darkBlue-2">{data.condition}</Text>
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                        <Box className="shrink-0 mt-[50px]">
                            <button
                                onClick={handleNext}
                                disabled={currentIndex >= data?.daily_weather.length - cardsToShow}
                                className="hidden md:block px-2 py-1 bg-blue-500 text-white rounded-[10px] disabled:opacity-50 shrink-0"
                            >
                                <img src="../../images/icons/triangle-right.svg" alt="Next" className="h-[30px] w-[30px] shrink-0" />
                            </button>
                        </Box>
                    </Box>
                    <Box className="flex md:hidden flex-row items-center justify-center gap-[20px] mt-[10px]">
                        <button
                            onClick={handlePrevSmall}
                            disabled={currentIndex === 0}
                        >
                            <img src="../../images/icons/arrow-left.svg" alt="Previous" className='h-[25px] w-[25px]' />
                        </button>
                        <button
                            onClick={handleNextSmall}
                            disabled={currentIndex >= data?.daily_weather.length - 1}
                        >
                            <img src="../../images/icons/arrow-right.svg" alt="Next" className='h-[25px] w-[25px]' />
                        </button>
                    </Box>
                    <Box className="hidden md:flex justify-center items-center w-full mt-[5px] px-[50px]">
                        <Box className="relative w-full h-10 flex items-center justify-center">
                            <Box className="absolute w-full h-[0.5px] bg-[#E8C872] shadow-md"></Box>
                            <Box className="absolute flex justify-between w-full px-2">
                                {displayedData.map((data, index) => (
                                    <Box key={index} className="relative flex flex-col items-center">
                                        <Box className="w-2 h-2 bg-[#E8C872] rounded-full " style={{ marginTop: `-${data?.temperature - 18}px` }}></Box>
                                        <span className="absolute top-4 text-xs">{data?.temperature}°C</span>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Box className="flex flex-col gap-[20px]" id="when-to-go">
                <h1 className='font-[600] text-[20px] text-darkBlue-2'>When to go to {data?.destination}?</h1>
                <Box className="flex flex-col gap-[20px] bg-[whitesmoke] border-[1px] border-[#ddd] rounded-[8px] p-[20px]">
                    <Text className='text-[14px] '>The warmest months in {data?.destination}</Text>
                    <Box className="flex flex-col sm1:flex-row flex-nowrap justify-center items-center gap-[10px]">
                        {warmestMonths
                            .map((monthData, index) => {
                                const [month, year] = monthData?.monthYear?.split("/");
                                const monthName = new Date(`${year}-${month}-01`).toLocaleString('default', { month: 'long' });

                                return (
                                    <Box key={index} className="bg-[#DBDFFD] flex flex-col justify-center items-center gap-[20px] py-[10px] px-[20px] rounded-[6px] flex-grow basis-[calc(33.333%-20px)] sm:basis-[calc(50%-20px)] xs:basis-[calc(100%-20px)]">
                                        <Text className='text-darkBlue-2 font-[600]'>{monthName}</Text>
                                        <Box className="flex flex-row items-center gap-[10px]">
                                            <Box className="flex flex-row items-center gap-[5px]">
                                                <img src="../../images/icons/temperature-hot.svg" alt="" className='h-[25px] w-[25px]' />
                                                <span className='text-[16px] font-[600] text-darkBlue-2'>{monthData?.avgTemp.toFixed(1)}°C</span>
                                            </Box>
                                            <Box className="flex flex-row items-center gap-[5px]">
                                                <img src="../../images/icons/rain.svg" alt="" className='h-[25px] w-[25px]' />
                                                <span className='text-[16px] font-[600] text-darkBlue-2'>{monthData.avgHumidity.toFixed(1)}%</span>
                                            </Box>
                                        </Box>
                                    </Box>
                                );
                            })}
                    </Box>
                    <Text className='text-darkBlue-2 text-[15px]'>{destination_info?.weather_description}</Text>
                </Box>
            </Box>
            {/* table */}
            <Box className="flex flex-col gap-[30px]" id="year-round-weather-table">
                <h1 className='font-[600] text-[20px] text-darkBlue-2'>Year-round weather table</h1>
                <Box className="overflow-auto " style={{ scrollbarWidth: 'none', '-ms-overflow-style': 'none' }}>
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
                                    <Box className="flex flex-col gap-[5px] w-[150px]">
                                        <img src="../../images/icons/temperature-hot.svg" alt=""
                                            className='h-[40px] w-[40px]'
                                        />
                                        <Text className='text-darkBlue-2 text-[13px]  font-[500]'>Average temperature during the day</Text>
                                    </Box>
                                </td>
                                <td colSpan={12}
                                    className='py-[10px] md:py-[30px] px-[20px]'
                                >
                                    <Box className="relative w-full h-10 flex items-center justify-center">
                                        <Box className="absolute w-full h-[0.5px] bg-[#E8C872] shadow-md"></Box>
                                        <Box className="absolute flex justify-between w-full px-2">
                                            {averageTemp.map((data, index) => (
                                                <Box key={index} className="relative flex flex-col items-center">
                                                    <Box
                                                        className={`w-2 h-2 bg-[#E8C872] rounded-full `}
                                                        style={{ marginTop: `-${data?.temp - 18}px` }}
                                                    ></Box>
                                                    <span className="absolute top-4 text-xs">{data.temp}°C</span>
                                                </Box>
                                            ))}

                                        </Box>
                                    </Box>
                                </td>
                            </tr>
                            <tr className='py-[10px] md:py-[30px] px-[20px]'>
                                <td className='py-[10px] md:py-[30px] px-[20px]'>
                                    <Box className="flex flex-col gap-[5px] justify-start w-[150px]">
                                        <img src="../../images/icons/rain.svg" alt=""
                                            className='h-[40px] w-[40px]'
                                        />
                                        <Text className='text-darkBlue-2 text-[13px] font-[500]'>Change of precipitation</Text>
                                    </Box>
                                </td>
                                <td colSpan={12}
                                    className='py-[10px] md:py-[30px] px-[20px]'
                                >
                                    <Box className="relative w-full h-10 flex items-center justify-center">
                                        <Box className="absolute w-full h-[0.5px] bg-[#3559E0] shadow-md"></Box>
                                        <Box className="absolute flex justify-between w-full px-2">
                                            {averageHumidity.map((data, index) => (
                                                <Box key={index} className="relative flex flex-col items-center">
                                                    <Box className="w-2 h-2 bg-[#3559E0] rounded-full"
                                                    style={{ marginTop: `-${data?.humid - 40}px` }}
                                                    ></Box>
                                                    <span className="absolute top-4 text-xs">{data.humid}% </span>
                                                </Box>
                                            ))}
                                        </Box>
                                    </Box>
                                </td>
                            </tr>
                            <tr className='py-[10px] md:py-[30px] px-[20px]'>
                                <td className='py-[10px] md:py-[30px] px-[20px]'>
                                    <Box className="flex flex-col gap-[5px] justify-start w-[150px]">
                                        <img src="../../images/icons/water.svg" alt=""
                                            className='h-[40px] w-[40px]'
                                        />
                                        <Text className='text-darkBlue-2 text-[13px] font-[500]'>Temperature of water</Text>
                                    </Box>
                                </td>
                                <td colSpan={12}
                                    className='py-[10px] md:py-[30px] px-[20px]'
                                >
                                    <Box className="relative w-full h-10 flex items-center justify-center">
                                        <Box className="absolute w-full h-[0.5px] bg-[#3559E0] shadow-md"></Box>
                                        <Box className="absolute flex justify-between w-full px-2">
                                            {averageWaterTemp.map((data, index) => (
                                                <Box key={index} className="relative flex flex-col items-center">
                                                    <Box className="w-2 h-2 bg-[#3559E0] rounded-full"
                                                        style={{ marginTop: `-${data?.temp - 5}px` }}
                                                    ></Box>
                                                    <span className="absolute top-4 text-xs">{data.temp}°C</span>
                                                </Box>
                                            ))}
                                        </Box>
                                    </Box>
                                </td>
                            </tr>
                            <tr className='py-[10px] md:py-[30px] px-[20px]'>
                                <td className='py-[10px] md:py-[30px] px-[20px]'>
                                    <Box className="flex flex-col gap-[5px] justify-start w-[150px]">
                                        <img src="../../images/icons/sun-day-light-bright.svg" alt=""
                                            className='h-[40px] w-[40px]'
                                        />
                                        <Text className='text-darkBlue-2 text-[13px] font-[500]'>Sunny hours</Text>
                                    </Box>
                                </td>
                                <td colSpan={12}
                                    className='py-[10px] md:py-[30px] px-[20px]'
                                >
                                    <Box className="relative w-full h-10 flex items-center justify-center">
                                        <Box className="absolute w-full h-[0.5px] bg-[#E8C872] shadow-md"></Box>
                                        <Box className="absolute flex justify-between w-full px-2">
                                            {averageSunnyHours.map((data, index) => (
                                                <Box key={index} className="relative flex flex-col items-center">
                                                    <Box className="w-2 h-2 bg-[#E8C872] rounded-full"
                                                        style={{ marginTop: `-${data?.hrs - 5}px` }}
                                                    ></Box>
                                                    <span className="absolute top-4 text-xs">{data.hrs}hrs</span>
                                                </Box>
                                            ))}
                                        </Box>
                                    </Box>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </Box>
            </Box>
            <Box className="flex flex-col justify-center items-center gap-[40px]" id="historic-weather">
                <h2 className='font-[600] text-darkBlue-2 text-[20px]'>Check weather details for a specific month:</h2>
                <Box className="grid grid-cols-2 gap-[20px] sm:flex sm:flex-wrap sm:gap-[10px] sm:justify-center sm:items-center">
                    {months.map((x, index) => (
                        <Link to={`/${data.destination}/${x.name}`}>
                            <Text key={index} className="w-[100%]  sm:w-auto flex flex-row justify-center items-center px-[15px] sm1:px-[25px] py-[6px] rounded-[20px] border-[1px] border-darkBlue text-[14px] font-[600] text-darkBlue cursor-pointer">
                                {x.name}
                            </Text>
                        </Link>
                    ))}
                </Box>
            </Box>
            <ImageView destination={data?.destination} />
            <MonthTemp daily_weather={data?.daily_weather} />
            <WeatherRecords more_information={destination_info?.more_information} destination={data?.destination} faqs={data?.faqs} weatherStats={weatherStats} />
            <WeatherRegions destination={data?.destination} />
        </Box>

    )
}

export default WeatherDisplay