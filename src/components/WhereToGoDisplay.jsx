import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import WeatherRecords from './WeatherRecords';
import ImageView from './ImageView';
import WeatherRegions from './WeatherRegions';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import MonthTemp from './MonthTemp';
import { Card, Text, Button, Box, Title } from '@mantine/core';
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

    const { destination, monthName, id } = useParams();

    const destination_info = data?.destination_info?[0] : {};


    const months = [
        { name: 'January', id: 1 }, { name: 'February', id: 2 }, { name: 'March', id: 3 },
        { name: 'April', id: 4 }, { name: 'May', id: 5 }, { name: 'June', id: 6 },
        { name: 'July', id: 7 }, { name: 'August', id: 8 }, { name: 'September', id: 9 },
        { name: 'October', id: 10 }, { name: 'November', id: 11 }, { name: 'December', id: 12 }
    ];

    const currentMonth = months.find(m => m.name === data.month);


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



    const weatherOtherDestinations = data.weatherOtherDestinations;

    return (
        <div className={`${allowOverFlow ? 'overflow-y-auto xl:h-[200vh]' : ''} `} style={{ scrollbarWidth: 'none', '-ms-overflow-style': 'none' }}>
            <Box className="flex flex-col gap-[40px]  " >
                <Box className=" flex flex-col gap-[10px] mt-[30px]">
                    <h1 className=' font-[900] text-[30px]'>Heading?</h1>
                    <Box className="flex flex-row items-center gap-[10px]">
                        <div style={{ backgroundColor: 'rgb(18 98 175)' }} className=' px-[20px] py-[5px] text-white  text-[11px] md:text-[13px] font-[700] rounded-[8px]'>WHERE TO GO</div>
                        <span>
                            <img src="../../images/icons/angle-right.svg" alt=""
                                className='h-[20px] w-[20px]'
                            />
                        </span>
                        <div style={{ backgroundColor: 'rgb(18 98 175)' }} className=' px-[20px] py-[5px] text-white text-[11px] md:text-[13px] font-[700] rounded-[8px] uppercase'>MONTH</div>
                        <span>
                            <img src="../../images/icons/angle-right.svg" alt=""
                                className='h-[20px] w-[20px]'
                            />
                        </span>
                        <Text style={{ backgroundColor: 'rgb(18 98 175)' }} className=' px-[20px] py-[5px] text-white text-[11px] md:text-[13px] font-[700] rounded-[8px] uppercase'>June</Text>
                    </Box>
                </Box>
                <Box className="flex flex-col" >
                    <div className="w-full flex justify-center flex-col">
                        <img
                            className='rounded-lg'
                            src=" https://turystycznyninja.pl/wp-content/uploads/2023/12/Gdzie-na-wakacje-w-maju-shutterstock.com-Netfalls-Remy-Musser.jpg"
                            alt=""
                        />
                        <Text className='text-[12px] align-middle'> Where to go on vacation in May 2024? / Netfalls Remy Musser / shutterstock.com</Text>
                    </div>
                    <div className='mt-[20px]'>
                        May is the time when spring begins to bloom in our climate, while in many places in the world it is the perfect time for sunbathing, sea bathing and active recreation in a hot climate. A holiday in May is a great idea for people who do not like to travel during the peak tourist season. The choice of places to go in May to stay warm is really big. So if you want to visit many places, or relax in a hotel with a sea view, be sure to check out our suggestions.
                    </div>

                </Box>
                <Box className="flex flex-col border-dashed border-[black] border-[2px] w-full p-2 rounded-lg gap-2">
                    <Text className='text-nowrap text-[18px] font-[700] ml-[60px]'>Contents: </Text>
                    <div className="flex flex-col w-full text-[16px] ml-[30px]">
                        <ol className='flex flex-col gap-2'>
                            <li onClick={() => handleNavigation('weather-in-regions-and-cities')} className='flex hover:text-[#0073ff]  '><span className="text-[#0073ff] mx-2 " >1. </span> <Link to="">Where to go on holiday in May? Greece</Link></li>
                            <li className='flex hover:text-[#0073ff] '><span className="text-[#0073ff] mx-2">2. </span> <Link to="">Where to go on holiday in May? Cyprus</Link></li>
                        </ol>
                    </div>

                </Box>

                <Box className="flex flex-col" >
                    <Text className='text-nowrap text-[18px] font-[700] p-2'>Where to go on holiday in May? Greece </Text>
                    <Box className='w-full bg-white py-[15px] px-[10px] rounded-lg border-[1px] border-[#ddd] shadow-md w-[100%]'>
                        <Text className='text-nowrap text-[18px] font-[600]'>Greece </Text>
                        <div className="w-full flex justify-center flex-col">
                            <img
                                className='rounded-lg'
                                src=" https://turystycznyninja.pl/wp-content/uploads/2023/12/Gdzie-na-wakacje-w-maju-shutterstock.com-Netfalls-Remy-Musser.jpg"
                                alt=""
                            />
                            <Text className='text-[12px]'> weather in may</Text>
                        </div>
                        <div className='mt-[20px]'>
                            <Text>
                                When asked where to go on holiday in May, one of the best destinations seems to be Greece. In May, we can count on excellent weather conditions here - it is almost summer here, and the air temperature remains at 25 degrees Celsius. We can choose from both continental Greece with many places worth visiting, as well as Greek islands, which attract tourists from all over the world practically all year round. If you are wondering where to go abroad in May, it is a good idea to consider one of the Greek islands. We can choose from beautiful Crete, rich in monuments, Rhodes full of natural wealth, Mykonos with beautiful Greek beaches , Santorini with a holiday atmosphere and charming towns located right by the sea and with stunning blue roofs. It is worth adding here that holidays in Greece in May are relatively cheap compared to holidays in more distant and exotic places in the world. Last minute holidays in Greece are particularly worth considering . Before leaving, it is worth checking what is worth bringing from Greece . It is a country that guarantees great weather conditions, beautiful views, perfect for a week's vacation.
                            </Text>
                        </div>
                        <div className='mt-[20px]'>
                            <Box className='flex flex-wrap flex-row gap-[20px] justify-center'>
                                <Box className="flex flex-col gap-[10px] w-[100%] md:w-[150px] lg:w-[200px] xl:w-[150px] justify-between">

                                    <Box className="flex flex-col gap-10 bg-white py-[15px] px-[10px] rounded-lg border-[1px] border-[#ddd] shadow-md w-[100%]">
                                        <Box className="flex flex-row justify-between">
                                            <Box className="flex items-center ">
                                                {/* Change the icon source dynamically based on weather condition */}
                                                <img
                                                    src="../../images/icons/thermometer-temperature.svg"
                                                    alt="Air temperature"
                                                    className="h-[20px] w-[20px]"
                                                />

                                            </Box>
                                            <Box className="">
                                                <Text className="text-2xl font-extrabold text-darkBlue-2">
                                                    {averageTemp[0]?.temp}
                                                    <span className="align-super text-[10px]">°C</span>
                                                </Text>
                                            </Box>
                                        </Box>

                                        <Text className="text-[10px] font-[600] text-darkBlue-2">Air temperature</Text>
                                    </Box>

                                </Box>
                                {/* The day after tomorrow's weather */}
                                <Box className="flex flex-col gap-[10px] w-[100%] md:w-[150px] lg:w-[200px] xl:w-[150px] justify-between">

                                    <Box className="flex flex-col gap-10 bg-white py-[15px] px-[10px] rounded-lg border-[1px] border-[#ddd] shadow-md w-[100%]">
                                        <Box className="flex flex-row justify-between">
                                            <Box className="flex flex-col items-center gap-[15px]">
                                                {/* Change the icon source dynamically based on weather condition */}
                                                <img
                                                    src="../../images/icons/clouds.svg"
                                                    alt="Change of precipitation"
                                                    className="h-[20px] w-[20px]"
                                                />

                                            </Box>
                                            <Box className="">
                                                <Text className="text-2xl font-extrabold text-darkBlue-2">
                                                    {averageHumidity[0]?.humid}
                                                    <span className="align-super text-[10px]">%</span>
                                                </Text>
                                            </Box>
                                        </Box>
                                        <Text className="text-[10px] font-[600] text-darkBlue-2">Change of precipitation</Text>
                                    </Box>
                                </Box>
                                <Box className="flex flex-col gap-[10px] w-[100%] md:w-[150px] lg:w-[200px] xl:w-[150px] justify-between">

                                    <Box className="flex flex-col gap-10 bg-white py-[15px] px-[10px] rounded-lg border-[1px] border-[#ddd] shadow-md w-[100%]">
                                        <Box className="flex flex-row justify-between">
                                            <Box className="flex flex-col items-center gap-[15px]">
                                                {/* Change the icon source dynamically based on weather condition */}
                                                <img
                                                    src="../../images/icons/water.svg"
                                                    alt="Temperature of water"
                                                    className="h-[20px] w-[20px]"
                                                />

                                            </Box>
                                            <Box className="">
                                                <Text className="text-2xl font-extrabold text-darkBlue-2">
                                                    {averageWaterTemp[0]?.temp}
                                                    <span className="align-super text-[10px]">°C</span>
                                                </Text>
                                            </Box>
                                        </Box>
                                        <Text className="text-[10px] font-[600] text-darkBlue-2">Temperature of water</Text>
                                    </Box>
                                </Box>
                                {/* The day after tomorrow's weather */}
                                <Box className="flex flex-col gap-[10px] w-[100%] md:w-[150px] lg:w-[200px] xl:w-[150px] justify-between">

                                    <Box className="flex flex-col gap-10 bg-white py-[15px] px-[10px] rounded-lg border-[1px] border-[#ddd] shadow-md w-[100%]">
                                        <Box className="flex flex-row justify-between">
                                            <Box className="flex flex-col items-center gap-[15px]">
                                                {/* Change the icon source dynamically based on weather condition */}
                                                <img
                                                    src="../../images/icons/sun-day-light-bright.svg"
                                                    alt="Sunny Hours"
                                                    className="h-[20px] w-[20px]"
                                                />
                                            </Box>
                                            <Box className="">
                                                <Text className="text-2xl font-extrabold text-darkBlue-2">
                                                    {averageSunnyHours[0]?.hrs}
                                                    <span className="align-super text-[10px]">hrs</span>
                                                </Text>
                                            </Box>
                                        </Box>
                                        <Text className="text-[10px] font-[600] text-darkBlue-2">Sunny Hours</Text>
                                    </Box>
                                </Box>
                                <Box className="flex flex-col gap-[10px] w-[100%] md:w-[150px] lg:w-[200px] xl:w-[150px] justify-between">

                                    <Link to={`/${data.destination}/${data?.month}`} className="flex flex-col gap-10 bg-white py-[15px] px-[10px] rounded-lg border-[1px] border-[#ddd] shadow-md w-[100%] h-full justify-center items-center">

                                        <Text className="text-[10px] font-[600] text-darkBlue-2">Check detailed weather</Text>
                                    </Link>
                                </Box>
                            </Box>
                        </div>
                        <div className="mt-[20px]">
                            <ImageView destination={data?.destination} />
                        </div>

                    </Box>

                </Box>

            </Box>
        </div>
    )
}

export default WhereToGoDisplay