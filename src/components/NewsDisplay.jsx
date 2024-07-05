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

const NewsDisplay = ({ data, allowOverFlow }) => {
    const navigate = useNavigate();
    const tomorrowDate = new Date();
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    const dayAfterTomorrowDate = new Date();
    dayAfterTomorrowDate.setDate(dayAfterTomorrowDate.getDate() + 2);

    const { destination, monthName, id } = useParams();

    const destination_info = data?.destination_info ? [0] : {};


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
    // className={`${allowOverFlow ? 'overflow-y-auto xl:h-[200vh]' : ''} `} style={{ scrollbarWidth: 'none', '-ms-overflow-style': 'none' }}
    return (
        <div className={`${allowOverFlow ? 'overflow-y-auto xl:h-[200vh]' : ''} `} style={{ scrollbarWidth: 'none', '-ms-overflow-style': 'none' }}>

            <Box className="flex flex-col gap-[40px]" >

                <Box className="flex flex-col" >
                    <div className="w-full flex justify-center flex-col">
                        <img
                            className='rounded-lg'
                            src="https://turystycznyninja.pl/wp-content/uploads/2024/07/venice-beach-basen-1470558124-1200-800-1250x833.jpg"
                            alt=""
                        />
                        <Text className='text-[12px] align-middle'> A good Tunisian option for last minute. From PLN 1,861/person with All Inclusive</Text>
                    </div>
                </Box>
                <Box className="flex flex-col w-full p-2 rounded-lg gap-2">
                    <Text
                        style={{ backgroundColor: 'rgb(18 98 175)' }}
                        className='px-[20px] py-[5px] text-white text-[13px] font-[800] rounded-[8px] w-[110px]'
                    >
                        The News
                    </Text>
                    <div className="flex flex-col text-[20px]">
                        <Text
                            className='text-[30px] font-[800] py-2'
                            style={{ whiteSpace: 'normal', overflowWrap: 'break-word', wordWrap: 'break-word' }}
                        >
                            A good Tunisian option for last minute. From PLN 1,861/person with All Inclusive
                        </Text>
                        <Text
                            className='py-2'
                            style={{ whiteSpace: 'normal', overflowWrap: 'break-word', wordWrap: 'break-word' }}
                        >
                            Or maybe a vacation in Tunisia as an alternative to European vacation destinations? We are sure that Venice Beach will meet your expectations, Djerba will offer wonderful weather, and most importantly - the price is very attractive here.
                        </Text>
                        <Text
                            className='text-[25px] font-[700] py-4'
                            style={{ whiteSpace: 'normal', overflowWrap: 'break-word', wordWrap: 'break-word' }}
                        >
                            Venice Beach – Tunisia, Djerba, Midoun (from PLN 1,861/person)
                        </Text>
                        <Box className="flex flex-col py-2" >
                            <div className="w-full flex justify-center flex-col items-center">
                                <img
                                    className='rounded-lg'
                                    src="https://turystycznyninja.pl/wp-content/uploads/2024/07/venice-beach-basen-1470558165-1200-800-1280x720.jpg"
                                    alt=""
                                />
                                <Text className='text-[12px]'> Venice Beach, Tunisia / wakacje.pl</Text>
                                <Text
                                    className='py-2'
                                    style={{ whiteSpace: 'normal', overflowWrap: 'break-word', wordWrap: 'break-word' }}
                                >
                                    Venice Beach is another place that has appeared in our articles many times, but we have found another opportunity for a cheap vacation, so we are informing you! At the moment, you will have to pay only PLN 1,861 for one participant, and that with All Inclusive. And if you like risk - wait until tomorrow, watch the price, and you may save an additional PLN 200-300 per person if the offer does not sell out.

                                    As part of the described offer in Venice Beach you will rest for a week. And what is important - in a good standard, 500 meters from the beach, with full All Incl., with an outdoor pool, with animations and many other amenities and attractions. Of course, as usual, we strongly encourage you to fully familiarize yourself with all the details of the offer. So if you like saving money and good rest - choose the rated 7.9/10 Venice Beach for last minute in Tunisia .
                                </Text>
                            </div>
                        </Box>
                    </div>
                </Box>

                <ImageView destination={data?.destination} />
                <div className="flex flex-col text-[20px]">
                    <div className='w-full py-[15px] px-[10px] flex flex-wrap justify-between gap-4'>
                        <div className="relative py-2 bg-cover bg-center h-[250px] w-full md:w-[48%] flex flex-col justify-end rounded-xl bg-[url('https://turystycznyninja.pl/wp-content/uploads/2024/07/novel-centre-point-1521261051-1200-800-900x600.jpg')]">
                            <button
                                className='absolute top-2 text-center left-2 bg-[#1262af] px-[20px] py-[5px] text-white text-[13px] rounded-[8px] w-[80px]'
                            >
                                Previous
                            </button>
                            <Text
                                className='py-2 font-bold text-white px-2'
                                style={{ whiteSpace: 'normal', overflowWrap: 'break-word', wordWrap: 'break-word' }}
                            >
                               Total luxury for a holiday in Famagusta, Cyprus. HB option from PLN 1,819/person.
                            </Text>
                        </div>
                        <div className="relative  py-2 bg-cover bg-center h-[250px] rounded-xl w-full md:w-[48%] flex flex-col justify-end bg-[url('https://turystycznyninja.pl/wp-content/uploads/2024/07/palm-beach-basen-1074170714-1200-800-900x600.jpg')]">
                            <button
                                className='absolute top-2 text-center right-2 bg-[#1262af] px-[20px] py-[5px] text-white text-[13px] rounded-[8px] w-[80px]'
                            >
                                Next
                            </button>
                            <Text
                                className='py-2 font-bold text-white px-2'
                                style={{ whiteSpace: 'normal', overflowWrap: 'break-word', wordWrap: 'break-word' }}
                            >
                              Romantic holiday in Kos from 2,237 PLN/person. Adults only hotel + HB. 100 meters from the beach.
                            </Text>
                        </div>
                    </div>

                    <Text className='text-[30px] font-[800] py-2'>Featured Posts:</Text>

                    <div className='w-full py-[15px] flex flex-wrap justify-between'>
                        <div className="flex flex-col  py-2 w-full md:w-[48%] justify-center">
                       
                            <img
                                src="https://turystycznyninja.pl/wp-content/uploads/2024/05/chrysoula-studios-obiekt-basen-788841909-1200-800.jpg"
                                alt="All Inclusive on the Greek island of Lesbos"
                                className="rounded-lg"
                            />
                            <Text
                                className='py-2 font-bold'
                                style={{ whiteSpace: 'normal', overflowWrap: 'break-word', wordWrap: 'break-word' }}
                            >
                                All Inclusive on the Greek island of Lesbos. Offer for June from PLN 1,597/person.
                                POSTED BY NINJA 2 MINUTES READ
                            </Text>
                        </div>

                        <div className="flex flex-col py-2 w-full md:w-[48%]">
                           
                            <img
                                src="https://turystycznyninja.pl/wp-content/uploads/2023/10/neptune-village-beach-resort-spa-basen-plaza-1493694542-830-550.jpg"
                                alt="Neptune Village – a Kenyan option for a cheap stay"
                                className="rounded-lg"
                            />
                            <Text
                                className='py-2 font-bold'
                                style={{ whiteSpace: 'normal', overflowWrap: 'break-word', wordWrap: 'break-word' }}
                            >
                                Neptune Village – a Kenyan option for a cheap stay 🐒🌴 From PLN 3,979 per person
                            </Text>
                        </div>
                    </div>
                </div>


            </Box>
        </div>
    )
}

export default NewsDisplay