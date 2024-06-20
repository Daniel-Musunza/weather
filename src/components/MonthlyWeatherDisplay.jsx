import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import WeatherRecords from './WeatherRecords';
import ImageView from './ImageView';
import WeatherRegions from './WeatherRegions';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import MonthTemp from './MonthTemp';
import { Card, Text, Button, Box } from '@mantine/core';
import SpecificMonthTemp from './SpecificMonthTemp';
import MonthWeatherRecords from './MonthWeatherRecords';

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

const MonthlyWeatherDisplay = ({ data }) => {
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
    console.log(data)
    const month_weather_description = data?.monthly_weather_description[0]?.weather_description;

    // Example usage:
    const weatherStats = getWeatherStatistics(data?.daily_weather);

    const months = [
        { name: 'January', id: 1 }, { name: 'February', id: 2 }, { name: 'March', id: 3 },
        { name: 'April', id: 4 }, { name: 'May', id: 5 }, { name: 'June', id: 6 },
        { name: 'July', id: 7 }, { name: 'August', id: 8 }, { name: 'September', id: 9 },
        { name: 'October', id: 10 }, { name: 'November', id: 11 }, { name: 'December', id: 12 }
    ];

    const currentMonth = months.find(m => m.name === data.month);


    const previousMonth = months.find(m => m.id === currentMonth?.id - 1);
    const nextMonth = months.find(m => m.id === currentMonth?.id + 1)

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

    const handleMonthNavigation = (month) => {
        navigate(`/${data.destination}/${month}`);
        window.location.reload();
    };


    return (
        <Box className="flex flex-col gap-[40px]  " >
            <Box className=" flex flex-col gap-[10px] mt-[30px]">
                <h1 className='text-darkBlue-2 font-[900] text-[30px]'>{data.destination} weather</h1>
                <Box className="flex flex-row items-center gap-[10px]">
                    <Link to={`/`} className='bg-[#11009E] px-[20px] py-[5px] text-white text-[13px] font-[800] rounded-[8px]'>WEATHER</Link>
                    <span>
                        <img src="../../images/icons/angle-right.svg" alt=""
                            className='h-[20px] w-[20px]'
                        />
                    </span>
                    <Link to={`/${data.destination}`} className='bg-[#11009E] px-[20px] py-[5px] text-white text-[13px] font-[800] rounded-[8px] uppercase'>{data.destination}</Link>
                    <span>
                        <img src="../../images/icons/angle-right.svg" alt=""
                            className='h-[20px] w-[20px]'
                        />
                    </span>
                    <Text className='bg-[#11009E] px-[20px] py-[5px] text-white text-[13px] font-[800] rounded-[8px] uppercase'>{data.month}</Text>
                </Box>
            </Box>
            <Box className="">
                <h2 className='text-[20px] font-[600] text-darkBlue'>Current weather in {data.destination} in {data.month}</h2>
            </Box>

            <Box className="flex flex-col gap-[10px] items-center justify-center border-[1px] border-[#ddd] rounded-[8px] p-[15px] bg-[whitesmoke] w-full">
                {/* Today's weather */}

                {/* Tomorrow's weather */}
                <Box className="flex flex-row flex-wrap w-[100%]">
                    <Box className="w-[100%] md:w-[54%]">
                        <div>
                            <Box className="flex gap-[10px] w-[100%] flex-grow justify-between">
                                <Text className='text-[14px] text-darkBlue mb-5'>Average weather data for the month of {data.month} in {data.destination}</Text>
                            </Box>
                            <Box className='flex flex-wrap flex-row gap-[20px] '>
                                <Box className="flex flex-col gap-[10px] w-[100%] md:w-[200px] lg:w-[300px] xl:w-[200px] justify-between">

                                    <Box className="flex flex-col gap-10 bg-white py-[25px] px-[20px] rounded-lg border-[1px] border-[#ddd] shadow-md w-[100%]">
                                        <Box className="flex flex-row justify-between">
                                            <Box className="flex items-center ">
                                                {/* Change the icon source dynamically based on weather condition */}
                                                <img
                                                    src="../../images/icons/thermometer-temperature.svg"
                                                    alt="Air temperature"
                                                    className="h-[40px] w-[40px]"
                                                />

                                            </Box>
                                            <Box className="">
                                                <Text className="text-4xl font-extrabold text-darkBlue-2">
                                                    {tomorrowWeather?.temperature}
                                                    <span className="align-super text-[15px]">°C</span>
                                                </Text>
                                            </Box>
                                        </Box>

                                        <Text className="text-[14px] font-[600] text-darkBlue-2">Air temperature</Text>
                                    </Box>

                                </Box>
                                {/* The day after tomorrow's weather */}
                                <Box className="flex flex-col gap-[10px] w-[100%] md:w-[200px] lg:w-[300px] xl:w-[200px] justify-between">

                                    <Box className="flex flex-col gap-10 bg-white py-[25px] px-[20px] rounded-lg border-[1px] border-[#ddd] shadow-md w-[100%]">
                                        <Box className="flex flex-row justify-between">
                                            <Box className="flex flex-col items-center gap-[15px]">
                                                {/* Change the icon source dynamically based on weather condition */}
                                                <img
                                                    src="../../images/icons/clouds.svg"
                                                    alt="Change of precipitation"
                                                    className="h-[40px] w-[40px]"
                                                />

                                            </Box>
                                            <Box className="">
                                                <Text className="text-4xl font-extrabold text-darkBlue-2">
                                                    {dayAfterTomorrowWeather?.temperature}
                                                    <span className="align-super text-[15px]">%</span>
                                                </Text>
                                            </Box>
                                        </Box>
                                        <Text className="text-[14px] font-[600] text-darkBlue-2">Change of precipitation</Text>
                                    </Box>
                                </Box>
                                <Box className="flex flex-col gap-[10px] w-[100%] md:w-[200px] lg:w-[300px] xl:w-[200px] justify-between">

                                    <Box className="flex flex-col gap-10 bg-white py-[25px] px-[20px] rounded-lg border-[1px] border-[#ddd] shadow-md w-[100%]">
                                        <Box className="flex flex-row justify-between">
                                            <Box className="flex flex-col items-center gap-[15px]">
                                                {/* Change the icon source dynamically based on weather condition */}
                                                <img
                                                    src="../../images/icons/water.svg"
                                                    alt="Temperature of water"
                                                    className="h-[40px] w-[40px]"
                                                />

                                            </Box>
                                            <Box className="">
                                                <Text className="text-4xl font-extrabold text-darkBlue-2">
                                                    {tomorrowWeather?.temperature}
                                                    <span className="align-super text-[15px]">°C</span>
                                                </Text>
                                            </Box>
                                        </Box>
                                        <Text className="text-[14px] font-[600] text-darkBlue-2">Temperature of water</Text>
                                    </Box>
                                </Box>
                                {/* The day after tomorrow's weather */}
                                <Box className="flex flex-col gap-[10px] w-[100%] md:w-[200px] lg:w-[300px] xl:w-[200px] justify-between">

                                    <Box className="flex flex-col gap-10 bg-white py-[25px] px-[20px] rounded-lg border-[1px] border-[#ddd] shadow-md w-[100%]">
                                        <Box className="flex flex-row justify-between">
                                            <Box className="flex flex-col items-center gap-[15px]">
                                                {/* Change the icon source dynamically based on weather condition */}
                                                <img
                                                    src="../../images/icons/sun-day-light-bright.svg"
                                                    alt="Sunny Hours"
                                                    className="h-[40px] w-[40px]"
                                                />
                                            </Box>
                                            <Box className="">
                                                <Text className="text-4xl font-extrabold text-darkBlue-2">
                                                    {dayAfterTomorrowWeather?.temperature}
                                                    <span className="align-super text-[15px]">hrs</span>
                                                </Text>
                                            </Box>
                                        </Box>
                                        <Text className="text-[14px] font-[600] text-darkBlue-2">Sunny Hours</Text>
                                    </Box>
                                </Box>
                            </Box>
                            <Box className='py-2'>
                                <Text> {month_weather_description}</Text>
                            </Box>
                            <Box className="flex flex-row justify-between cursor-pointer gap-[10px]">
                                {previousMonth ? (
                                    <Link
                                        className='flex justify-between bg-white border-[1px] border-[black] px-[20px] py-[5px] font-[600] text-[black] rounded-[20px] hover:text-[#8576FF] hover:border-[1px] hover:border-[#000000]'
                                        onClick={() => handleMonthNavigation(previousMonth.name)}
                                    >
                                        <span>
                                            <img src="../../images/icons/triangle-left.svg" alt="" width="30px" />
                                        </span>
                                        <Text> weather in {previousMonth.name}</Text>

                                    </Link>
                                ) : (
                                    <div></div>
                                )}

                                {nextMonth ? (
                                    <Link
                                        className='flex justify-between bg-white border-[1px] border-[black] px-[20px] py-[5px] font-[600] text-[black] rounded-[20px] hover:text-[#8576FF] hover:border-[1px] hover:border-[#000000]'
                                        onClick={() => handleMonthNavigation(nextMonth.name)}
                                    >
                                        <Text> weather in {nextMonth.name}</Text>
                                        <span>
                                            <img src="../../images/icons/triangle-right.svg" alt="" width="30px" />
                                        </span>
                                    </Link>
                                ) : (
                                    <div></div>
                                )}


                            </Box>
                        </div>
                    </Box>
                    <Box className="w-[100%]  md:w-[40%]  md:mx-[20px] ">
                        <Box className="flex gap-[10px] w-[100%] flex-grow justify-between">
                            <Text className='text-[14px] text-darkBlue mb-5'>Check other months</Text>
                        </Box>
                        <Box className='flex flex-col h-[89%] gap-[10px]  py-[25px] px-[20px] bg-white rounded-lg border-[1px] border-[#ddd] shadow-md '>
                            {months
                                .filter((month => month.name !== data.month))
                                .map((m, index) => (
                                    <div onClick={() => handleMonthNavigation(m.name)} key={index} className="flex justify-between hover:bg-[#a9bbf5] cursor-pointer rounded-md px-[10px] py-[1px]">
                                        <p > {m.name} in {data.destination} </p>
                                        <span>
                                            <img src="../../images/icons/triangle-right.svg" alt="" width="20px" />
                                        </span>
                                    </div>
                                ))}
                            <Link
                                className='flex justify-center bg-white border-[1px] border-[black] px-[20px] py-[5px]  text-[black] rounded-[20px] hover:text-[#8576FF] hover:border-[1px] hover:border-[#000000]'
                                to={`/${data.destination}`}
                            >
                                <Text className='text-center'> Check the current and year-round weather</Text>

                            </Link>
                        </Box>



                    </Box>
                </Box>

            </Box>

            <Box className="flex flex-col  md:items-start md:flex-row gap-[20px]">
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

                </Box>
            </Box>
            <Box className="flex flex-col" >
                <ImageView destination={data?.destination} />
            </Box>

            <Box className="flex flex-col gap-[30px]" id="year-round-weather-table">
                <h1 className='font-[600] text-[20px] text-darkBlue-2'>Weather in the regions and cities of {data.destination} in {data.month}</h1>
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

            <SpecificMonthTemp daily_weather={data?.daily_weather} destination={data?.destination} month={data?.month} />
            <Box className="flex flex-col" >
                <ImageView destination={data?.destination} />
            </Box>
            <MonthWeatherRecords more_information={destination_info?.more_information} destination={data?.destination} faqs={data?.faqs} weatherStats={weatherStats} />
            <WeatherRegions destination={data?.destination} />
        </Box>

    )
}

export default MonthlyWeatherDisplay