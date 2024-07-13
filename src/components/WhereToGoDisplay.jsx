import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import ImageView from './ImageView';
import 'chart.js/auto';
import { Text, Box } from '@mantine/core';
import { destinations } from '../utils/weatherdata';


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

const WeatherComponent = ({ destination, data, parseDateToMonth, monthName }) => {
    const [averageWeatherData, setAverageWeatherData] = useState(null);

    const getAverageWeather = async (destination) => {

        const destinationName = destination;

        const dailyweather = data?.find((x) => x.destination.name === destinationName)?.weatherData;

        const dailyWeather = dailyweather?.data.map((x) => {
            let condition = 'Cloudy'; // Default condition
            let condition_hours = null;

            if (x.prcp > 0 || x.tavg < 10) { // Assuming average temperature below 10°C indicates Rainy
                condition = 'Rainy';
                condition_hours = x.prcp; // Assuming prcp can represent rain hours, adjust if necessary
            } else if (x.tsun > 0 || x.tavg > 20) { // Assuming average temperature above 20°C indicates Sunny
                condition = 'Sunny';
                condition_hours = x.tsun;
            } else if (x.snow > 0) {
                condition = 'Snowy';
                condition_hours = x.snow; // Assuming snow can represent snow hours
            } else if (x.wspd > 20) { // Assuming wind speed over 20 km/h is considered windy
                condition = 'Windy';
                condition_hours = x.wspd; // Assuming wind speed can represent windy hours, adjust if necessary
            }

            // Adjust the date to the current year if it is from the previous year
            const date = new Date(x.date);
            const currentDate = new Date();

            if (date.getFullYear() < currentDate.getFullYear()) {
                date.setFullYear(currentDate.getFullYear());
            }


            return {
                destination: destination, // Static destination, modify as necessary
                date: date.toLocaleDateString("en-GB"), // Convert date to "DD/MM/YYYY" format
                temperature: x.tavg, // Using average temperature
                water_temperature: x.tmin, // Static value, replace with actual if available
                humidity: x.prcp, // Assuming `prcp` key for humidity, replace if incorrect
                condition: condition,
                condition_hours: condition_hours
            };
        });

        let averageTemp = [];
        let averageWaterTemp = [];
        let averageHumidity = [];
        let averageSunnyHours = [];

        const monthData = dailyWeather?.reduce((acc, x) => {
            const month = parseDateToMonth(x.date);

            if (month == monthName) {
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
        if (dailyWeather?.length > 0) {
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

      
        return { averageTemp, averageWaterTemp, averageHumidity, averageSunnyHours };
    };


    useEffect(() => {

        if (destination || destination !== "undefined") {
            const fetchData = async (destination) => {
                const data = await getAverageWeather(destination);
                setAverageWeatherData(data);
            };

            fetchData(destination);
        }
    }, [destination]);

    if (!averageWeatherData) {
        return <div>Loading...</div>;
    }

    return (
        <div className='mt-[20px]'>
            <Box className='flex flex-wrap flex-row gap-[20px] justify-center'>
                <Box className="flex flex-col gap-[10px] w-[100%] md:w-[150px] lg:w-[200px] xl:w-[150px] justify-between">
                    <Box className="flex flex-col gap-10 bg-white py-[15px] px-[10px] rounded-lg border-[1px] border-[#ddd] shadow-md w-[100%]">
                        <Box className="flex flex-row justify-between">
                            <Box className="flex items-center ">
                                <img
                                    src="../../images/icons/thermometer-temperature.svg"
                                    alt="Air temperature"
                                    className="h-[20px] w-[20px]"
                                />
                            </Box>
                            <Box className="">
                                <Text className="text-2xl font-extrabold text-darkBlue-2">
                                    {Array.isArray(averageWeatherData.averageTemp) && averageWeatherData.averageTemp[0]?.temp || 'N/A'}
                                    <span className="align-super text-[10px]">°C</span>
                                </Text>
                            </Box>
                        </Box>
                        <Text className="text-[10px] font-[600] text-darkBlue-2">Air temperature</Text>
                    </Box>
                </Box>
                <Box className="flex flex-col gap-[10px] w-[100%] md:w-[150px] lg:w-[200px] xl:w-[150px] justify-between">
                    <Box className="flex flex-col gap-10 bg-white py-[15px] px-[10px] rounded-lg border-[1px] border-[#ddd] shadow-md w-[100%]">
                        <Box className="flex flex-row justify-between">
                            <Box className="flex flex-col items-center gap-[15px]">
                                <img
                                    src="../../images/icons/clouds.svg"
                                    alt="Change of precipitation"
                                    className="h-[20px] w-[20px]"
                                />
                            </Box>
                            <Box className="">
                                <Text className="text-2xl font-extrabold text-darkBlue-2">
                                    {Array.isArray(averageWeatherData.averageHumidity) && averageWeatherData.averageHumidity[0]?.humid || 'N/A'}
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
                                <img
                                    src="../../images/icons/water.svg"
                                    alt="Temperature of water"
                                    className="h-[20px] w-[20px]"
                                />
                            </Box>
                            <Box className="">
                                <Text className="text-2xl font-extrabold text-darkBlue-2">
                                    {Array.isArray(averageWeatherData.averageWaterTemp) && averageWeatherData.averageWaterTemp[0]?.temp || 'N/A'}
                                    <span className="align-super text-[10px]">°C</span>
                                </Text>
                            </Box>
                        </Box>
                        <Text className="text-[10px] font-[600] text-darkBlue-2">Temperature of water</Text>
                    </Box>
                </Box>
                <Box className="flex flex-col gap-[10px] w-[100%] md:w-[150px] lg:w-[200px] xl:w-[150px] justify-between">
                    <Box className="flex flex-col gap-10 bg-white py-[15px] px-[10px] rounded-lg border-[1px] border-[#ddd] shadow-md w-[100%]">
                        <Box className="flex flex-row justify-between">
                            <Box className="flex flex-col items-center gap-[15px]">
                                <img
                                    src="../../images/icons/sun-day-light-bright.svg"
                                    alt="Sunny Hours"
                                    className="h-[20px] w-[20px]"
                                />
                            </Box>
                            <Box className="">
                                <Text className="text-2xl font-extrabold text-darkBlue-2">
                                    {Array.isArray(averageWeatherData.averageSunnyHours) && averageWeatherData.averageSunnyHours[0]?.hrs || 'N/A'}
                                    <span className="align-super text-[10px]">hrs</span>
                                </Text>
                            </Box>
                        </Box>
                        <Text className="text-[10px] font-[600] text-darkBlue-2">Sunny Hours</Text>
                    </Box>
                </Box>
                <Box className="flex flex-col gap-[10px] w-[100%] md:w-[150px] lg:w-[200px] xl:w-[150px] justify-between">
                    <Link to={`/${destination}/${monthName}`} className="flex flex-col gap-10 bg-white py-[15px] px-[10px] rounded-lg border-[1px] border-[#ddd] shadow-md w-[100%] h-full justify-center items-center">
                        <Text className="text-[10px] font-[600] text-darkBlue-2">Check detailed weather</Text>
                    </Link>
                </Box>
            </Box>
        </div>
    );
};


const WhereToGoDisplay = ({ data, holidaysData }) => {
    const navigate = useNavigate();
    const tomorrowDate = new Date();
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    const dayAfterTomorrowDate = new Date();
    dayAfterTomorrowDate.setDate(dayAfterTomorrowDate.getDate() + 2);

    const { monthName, id } = useParams();

    const destination_info = Array.isArray(data?.destination_info) ? data?.destination_info[0] : ""

    const months = [
        { name: 'January', id: 1 }, { name: 'February', id: 2 }, { name: 'March', id: 3 },
        { name: 'April', id: 4 }, { name: 'May', id: 5 }, { name: 'June', id: 6 },
        { name: 'July', id: 7 }, { name: 'August', id: 8 }, { name: 'September', id: 9 },
        { name: 'October', id: 10 }, { name: 'November', id: 11 }, { name: 'December', id: 12 }
    ];

    const getMonth = () => {
        return months.find(m => m.id == monthName)?.name
    }

    const parseDateToMonth = (dateString) => {
        const [day, month, year] = dateString.split('/').map(Number);
        const date = new Date(year, month - 1, day);
        if (!isNaN(date)) {
            return month;
        }
        return null;
    };

    const getDestination = (number) => {
        return destinations?.find((x) => x.id === number)?.destination;
    }


    const handleNavigation = (sectionId) => {
        navigate(`/where-to-go/${monthName}/${id}#${sectionId}`);
        document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
    };

    const currentHoliday = holidaysData?.find((x) => x.id === id)

    return (
        <div>
            <Box className="flex flex-col gap-[40px]  " >
                <Box className=" flex flex-col gap-[10px] mt-[30px]">
                    <h1 className=' font-[900] text-[30px]'>{currentHoliday?.text}?</h1>
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
                        <Text style={{ backgroundColor: 'rgb(18 98 175)' }} className=' px-[20px] py-[5px] text-white text-[11px] md:text-[13px] font-[700] rounded-[8px] uppercase'>{getMonth()}</Text>
                    </Box>
                </Box>
                <Box className="flex flex-col" >
                    <div className="w-full flex justify-center flex-col">
                        <img
                            className='rounded-lg'
                            src={currentHoliday?.image}
                            alt=""
                        />
                        <Text className='text-[12px]  text-center'> {currentHoliday?.text}</Text>
                    </div>
                    <div className='mt-[20px]'>
                        {currentHoliday?.description}
                    </div>

                </Box>
                <Box className="flex flex-col border-dashed border-[black] border-[2px] w-full p-2 rounded-lg gap-2">
                    <Text className='text-nowrap text-[18px] font-[700] ml-[60px]'>Contents: </Text>
                    <div className="flex flex-col w-full text-[16px] ml-[30px]">
                        <ol className='flex flex-col gap-2'>

                            {currentHoliday?.content.map((x, index) => (
                                <li key={index} onClick={() => handleNavigation(`${x.destination}`)} className='flex hover:text-[#0073ff]  '><span className="text-[#0073ff] mx-2 " >{index + 1}. </span> <Link to="">{x.text}</Link></li>
                            ))}
                        </ol>
                    </div>

                </Box>

                {currentHoliday?.content.map((x, index) => (
                    <Box className="flex flex-col" id={`${x.destination}`} key={index}>
                        <Text className='text-nowrap text-[18px] font-[700] p-2'>{x.subHeading} </Text>
                        <Box className='w-full bg-white py-[15px] px-[10px] rounded-lg border-[1px] border-[#ddd] shadow-md'>
                            <Text className='text-nowrap text-[18px] font-[600]'>{getDestination(x.destination)}</Text>
                            <div className="w-full flex justify-center flex-col">
                                <img
                                    className='rounded-lg'
                                    src={x.image}
                                    alt=""
                                />
                                <Text className='text-[12px] text-center'> weather in {getMonth()}</Text>
                            </div>
                            <div className='mt-[20px]'>
                                <Text>{x.weatherInfo} </Text>
                            </div>

                            <WeatherComponent destination={getDestination(x.destination)} getDestination={getDestination} data={data} parseDateToMonth={parseDateToMonth} monthName={monthName} />
                            <div className="mt-[20px]">
                                <ImageView destination={getDestination(x.destination)} image={x.image} />
                            </div>

                        </Box>
                    </Box>
                ))}
            </Box>
        </div>
    )
}

export default WhereToGoDisplay