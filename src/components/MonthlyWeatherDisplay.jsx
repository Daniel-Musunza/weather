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
    const tomorrowDate = new Date();
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    const dayAfterTomorrowDate = new Date();
    dayAfterTomorrowDate.setDate(dayAfterTomorrowDate.getDate() + 2);


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
    const monthData = data?.daily_weather.reduce((acc, x) => {
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
        <Box className="flex flex-col gap-[40px]  " >
            <Box className=" flex flex-col gap-[10px] mt-[30px]">
                <h1 className=' font-[900] text-[30px]'>{data.destination} weather</h1>
                <Box className="flex flex-row items-center gap-[10px]">
                    <Link to={`/`} style={{ backgroundColor: 'rgb(18 98 175)' }} className=' px-[20px] py-[5px] text-white text-[13px] font-[800] rounded-[8px]'>WEATHER</Link>
                    <span>
                        <img src="../../images/icons/angle-right.svg" alt=""
                            className='h-[20px] w-[20px]'
                        />
                    </span>
                    <Link style={{ backgroundColor: 'rgb(18 98 175)' }} to={`/${data.destination}`} className=' px-[20px] py-[5px] text-white text-[13px] font-[800] rounded-[8px] uppercase'>{data.destination}</Link>
                    <span>
                        <img src="../../images/icons/angle-right.svg" alt=""
                            className='h-[20px] w-[20px]'
                        />
                    </span>
                    <Text style={{ backgroundColor: 'rgb(18 98 175)' }} className=' px-[20px] py-[5px] text-white text-[13px] font-[800] rounded-[8px] uppercase'>{data.month}</Text>
                </Box>
            </Box>
            <Box className="">
                <h2 className='text-[20px] font-[600] '>Current weather in {data.destination} in {data.month}</h2>
            </Box>

            <Box className="flex flex-col gap-[10px] items-center justify-center border-[1px] border-[#ddd] rounded-[8px] p-[15px] bg-[whitesmoke] w-full">

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
                                                    {averageTemp[0]?.temp}
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
                                                    {averageHumidity[0]?.humid}
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
                                                    {averageWaterTemp[0]?.temp}
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
                                                    {averageSunnyHours[0]?.hrs}
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
                <ImageView destination={data?.destination} />
            </Box>

            <Box className="flex flex-col gap-[30px]" id="weather-in-regions-and-cities">
                <h1 className='font-[600] text-[20px] text-darkBlue-2'>Weather in the regions and cities near {data.destination} in {data.month}</h1>
                <Box className="overflow-auto " style={{ scrollbarWidth: 'none', '-ms-overflow-style': 'none' }}>
                    <table className="table-auto w-full text-left bg-white shadow-md rounded-[8px] border-[1px] border-[#ddd] p-[20px]">
                        <thead>
                            <tr>
                                <th className=' py-[40px] px-[10px] border-l-[1px] border-l-[#ddd] rounded-[6px]'></th>
                                <th className='py-[40px] px-[10px]'>
                                    <div className="flex flex-col gap-[5px] w-[150px]">
                                        <img src="../../images/icons/temperature-hot.svg" alt="" className='h-[40px] w-[40px]' />
                                        <span className='text-darkBlue-2 text-[13px] font-[500]'>Average temperature during the day</span>
                                    </div>
                                </th>
                                <th>
                                    <div className="flex flex-col gap-[5px] justify-start w-[150px]">
                                        <img src="../../images/icons/rain.svg" alt="" className='h-[40px] w-[40px]' />
                                        <span className='text-darkBlue-2 text-[13px] font-[500]'>Change of precipitation</span>
                                    </div>
                                </th>
                                <th>
                                    <div className="flex flex-col gap-[5px] justify-start w-[150px]">
                                        <img src="../../images/icons/water.svg" alt="" className='h-[40px] w-[40px]' />
                                        <span className='text-darkBlue-2 text-[13px] font-[500]'>Temperature of water</span>
                                    </div>
                                </th>
                                <th>
                                    <div className="flex flex-col gap-[5px] justify-start w-[150px]">
                                        <img src="../../images/icons/sun-day-light-bright.svg" alt="" className='h-[40px] w-[40px]' />
                                        <span className='text-darkBlue-2 text-[13px] font-[500]'>Sunny hours</span>
                                    </div>
                                </th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className='border border-[#ddd] space-y-4 p-[1px]'>
                            {weatherOtherDestinations?.filter(x => x.destination !== data.destination)
                                .map((x, index) => (
                                    <tr key={index} className="mb-[40px]">
                                        <td className='py-[10px] md:py-[30px] px-[20px]'>
                                            <span>{x.destination}</span>
                                        </td>
                                        <td className='py-[10px] md:py-[30px] px-[20px]'>
                                            <span>{x.averageTemp} °C</span>
                                        </td>
                                        <td className='py-[10px] md:py-[30px] px-[20px]'>
                                            <span>{x.averageHumidity} %</span>
                                        </td>
                                        <td className='py-[10px] md:py-[30px] px-[20px]'>
                                            <span>{x.averageWaterTemp} °C</span>
                                        </td>
                                        <td className='py-[10px] md:py-[30px] px-[20px]'>
                                            <span>{x.averageSunnyHours} hours</span>
                                        </td>
                                        <td>
                                            <a
                                                href={`/${x.destination}/${data?.month}`}
                                                className='flex justify-center bg-white border-[1px] border-[black] px-[20px] py-[5px] font-[600] text-[black] rounded-[20px] hover:text-[#8576FF] hover:border-[1px] hover:border-[#000000] cursor-pointer mr-4'
                                            >
                                                Check
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </Box>
            </Box>

            <SpecificMonthTemp daily_weather={data?.daily_weather} destination={data?.destination} month={data?.month} />
            <Box className="flex flex-col" >
                <ImageView destination={data?.destination} />
            </Box>
            <MonthWeatherRecords more_information={destination_info?.more_information} destination={data?.destination} month={data?.month} monthly_faqs={data?.monthly_faqs} weatherStats={weatherStats} />
            <WeatherRegions destination={data?.destination} weatherOtherDestinations={weatherOtherDestinations} month={data?.month} />
        </Box>

    )
}

export default MonthlyWeatherDisplay