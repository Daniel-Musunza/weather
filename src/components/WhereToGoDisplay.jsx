import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
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
    weatherData?.forEach(data => {
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

const getWeatherStatistics = (weatherData, payloadMonth) => {
    if (!weatherData || weatherData.length === 0) return {};

    const months = [
        { name: 'January', value: '01' }, { name: 'February', value: '02' }, { name: 'March', value: '03' },
        { name: 'April', value: '04' }, { name: 'May', value: '05' }, { name: 'June', value: '06' },
        { name: 'July', value: '07' }, { name: 'August', value: '08' }, { name: 'September', value: '09' },
        { name: 'October', value: '10' }, { name: 'November', value: '11' }, { name: 'December', value: '12' }
    ];

    const parsedMonth = months.find(m => m.name.toLowerCase() === payloadMonth.toLowerCase())?.value;


    const filteredData = weatherData.filter(data => {

        const [day, month, year] = data?.date?.split("/");

        return month === parsedMonth;
    });

    let highestTemp = "";
    let lowestTemp = "";

    if (filteredData.length > 1) {
        highestTemp = filteredData.reduce((max, current) => (current?.temperature > max?.temperature ? current : max), filteredData[0]);
        lowestTemp = filteredData.reduce((min, current) => (current?.temperature < min?.temperature ? current : min), filteredData[0]);

    }

    // Find the highest and lowest temperatures in the filtered data

    const monthlyData = {};
    weatherData?.forEach(data => {
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

const WhereToGoDisplay = ({ data, allowOverFlow }) => {
    const navigate = useNavigate();
    const tomorrowDate = new Date();
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    const dayAfterTomorrowDate = new Date();
    dayAfterTomorrowDate.setDate(dayAfterTomorrowDate.getDate() + 2);

    const { destination, monthName, month } = useParams();

    const destination_info = data?.destination_info[0];

    const month_weather_description = data?.monthly_weather_description?.find(
        x => x?.month === data?.month
    )?.weather_description ?? '';

    // Example usage:
    const weatherStats = getWeatherStatistics(data?.daily_weather, data?.month);

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
            return date.toLocaleString('default', { month: 'long' });
        }
        return null;
    };

    // Step 1: Group data by month and calculate the sum of temperatures and the count of days for each month
    const monthData = data?.daily_weather?.reduce((acc, x) => {
        const month = parseDateToMonth(x.date);


        if (month === data?.month) {
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
    if (data?.daily_weather?.length > 0) {
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
    }

    const getCardsToShow = () => {
        if (window.innerWidth >= 1024) {
            return 4;
        } else if (window.innerWidth >= 768) {
            return 4;
        } else {
            return 5;
        }
    };

    const [cardsToShow, setCardsToShow] = useState(getCardsToShow());

    useEffect(() => {
        const handleResize = () => setCardsToShow(getCardsToShow());
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleNavigation = (sectionId) => {
        navigate(`/${data.destination}/${data?.month}#${sectionId}`);
        document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
    };

    const handleMonthNavigation = (month) => {
        navigate(`/${data.destination}/${month}`);
        window.location.reload();
    };

    const weatherOtherDestinations = data.weatherOtherDestinations;

    return (
        <div className={`${allowOverFlow ? 'overflow-y-auto xl:h-[200vh]' : ''} `} style={{ scrollbarWidth: 'none', '-ms-overflow-style': 'none' }}>
            <Box className="flex flex-col gap-[40px]  " >
                <Box className=" flex flex-col gap-[10px] mt-[30px]">
                    <h1 className=' font-[900] text-[30px]'>Where to go on holiday in {month} 2024?</h1>
                    <Box className="flex flex-row items-center gap-[10px]">
                        <div style={{ backgroundColor: 'rgb(18 98 175)' }} className=' px-[20px] py-[5px] text-white text-[13px] font-[800] rounded-[8px]'>WHERE TO GO</div>
                        <span>
                            <img src="../../images/icons/angle-right.svg" alt=""
                                className='h-[20px] w-[20px]'
                            />
                        </span>
                        <div style={{ backgroundColor: 'rgb(18 98 175)' }} className=' px-[20px] py-[5px] text-white text-[13px] font-[800] rounded-[8px] uppercase'>MONTH</div>
                        <span>
                            <img src="../../images/icons/angle-right.svg" alt=""
                                className='h-[20px] w-[20px]'
                            />
                        </span>
                        <Text style={{ backgroundColor: 'rgb(18 98 175)' }} className=' px-[20px] py-[5px] text-white text-[13px] font-[800] rounded-[8px] uppercase'>{month}</Text>
                    </Box>
                </Box>

                <Box className="flex flex-col  md:items-start md:flex-row gap-[20px]">
                    <Box className="flex flex-row flex-nowrap ">
                        <Text className='text-nowrap text-[18px] font-[800]'>Go to:</Text>
                    </Box>
                    <Box className="flex flex-row flex-wrap justify-center items-center md:items-start cursor-pointer gap-[10px]">
                        <a
                            className='border-[1px] border-lightBlue py-[10px] px-[15px] font-[600] text-[grey] rounded-[15px] hover:text-[#8576FF] hover:border-[1px] hover:border-[#000000]'
                            onClick={() => handleNavigation('weather-in-regions-and-cities')}
                        >
                            Weather in regions and cities
                        </a>
                        <a
                            className='border-[1px] border-lightBlue py-[10px] px-[15px] font-[600] text-[grey] rounded-[15px] hover:text-[#8576FF] hover:border-[1px] hover:border-[#000000]'
                            onClick={() => handleNavigation('historic-weather')}
                        >
                            Historic weather
                        </a>
                        <a
                            className='border-[1px] border-lightBlue py-[10px] px-[15px] font-[600] text-[grey] rounded-[15px] hover:text-[#8576FF] hover:border-[1px] hover:border-[#000000]'
                            onClick={() => handleNavigation('weather-records')}
                        >
                            Weather records
                        </a>
                        <a
                            className='border-[1px] border-lightBlue py-[10px] px-[15px] font-[600] text-[grey] rounded-[15px] hover:text-[#8576FF] hover:border-[1px] hover:border-[#000000]'
                            onClick={() => handleNavigation('faq')}
                        >
                            FAQ
                        </a>
                    </Box>
                </Box>
                <Box className="flex flex-col" >
                    {/* <ImageView destination={data?.destination} /> */}
                </Box>

            </Box>
        </div>
    )
}

export default WhereToGoDisplay