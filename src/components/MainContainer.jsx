import React, { useState, useEffect } from 'react';
import WeatherDisplay from './WeatherDisplay';
import SearchForm from './SearchForm';
import { destinations } from '../utils/weatherdata';
import MoreInfo from './MoreInfo';
import { useParams } from 'react-router-dom';
import MonthlyWeatherDisplay from './MonthlyWeatherDisplay';
import WhereToGoDisplay from './WhereToGoDisplay';
import NewsDisplay from './NewsDisplay';
import NewsAds from './NewsAds';
import { Sticky } from "gestalt";

import { getAllData } from '../utils/getAllData';

const getWeatherOtherDestinations = (daily_weather, month, targetDestination) => {
  // Helper function to parse date in "DD/MM/YYYY" format and return the month in 'long' format
  const parseDateToMonth = (dateString) => {
    const [day, month, year] = dateString.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    if (!isNaN(date)) {
      return date.toLocaleString('default', { month: 'long' });
    }
    return null;
  };

  // Helper function to get country code for a given destination
  const getCountryCodeForDestination = (destination) => {
    const destinationData = destinations?.find(d => d.destination === destination);
    return destinationData ? destinationData.countryCode : null;
  };

  // Filter the weather data for the specified month
  const filteredWeather = daily_weather?.filter(x => parseDateToMonth(x.date) === month);

  // Get the country code for the target destination
  const targetCountryCode = getCountryCodeForDestination(targetDestination);

  // Filter weather data for other destinations in the same country as the target destination
  const filteredDestinations = destinations?.filter(d => d.countryCode === targetCountryCode && d.destination !== targetDestination);

  // Aggregate data by destination
  const destinationData = {};

  // Add data for the target destination
  filteredWeather?.forEach(x => {
    if (x.destination === targetDestination) {
      if (!destinationData[targetDestination]) {
        destinationData[targetDestination] = {
          tempSum: 0,
          waterTempSum: 0,
          humidSum: 0,
          sunnyHrsSum: 0,
          count: 0
        };
      }
      destinationData[targetDestination].tempSum += x.temperature;
      destinationData[targetDestination].waterTempSum += x.water_temperature;
      destinationData[targetDestination].humidSum += x.humidity;
      if (x.condition === "Sunny") {
        destinationData[targetDestination].sunnyHrsSum += x.condition_hours;
      }
      destinationData[targetDestination].count += 1;
    }
  });

  // Add data for each filtered destination
  filteredDestinations?.forEach(dest => {
    destinationData[dest.destination] = {
      tempSum: 0,
      waterTempSum: 0,
      humidSum: 0,
      sunnyHrsSum: 0,
      count: 0
    };

    filteredWeather?.forEach(x => {
      if (x.destination === dest.destination) {
        destinationData[dest.destination].tempSum += x.temperature;
        destinationData[dest.destination].waterTempSum += x.water_temperature;
        destinationData[dest.destination].humidSum += x.humidity;
        if (x.condition === "Sunny") {
          destinationData[dest.destination].sunnyHrsSum += x.condition_hours;
        }
        destinationData[dest.destination].count += 1;
      }
    });
  });

  // Calculate averages for each destination
  const result = Object.keys(destinationData).map(destination => {
    const data = destinationData[destination];
    return {
      destination: destination,
      averageTemp: (data.tempSum / data.count).toFixed(2),
      averageWaterTemp: (data.waterTempSum / data.count).toFixed(2),
      averageHumidity: (data.humidSum / data.count).toFixed(0),
      averageSunnyHours: (data.sunnyHrsSum / data.count).toFixed(0)
    };
  });

  return result;
};

const months = [
  { name: 'January', id: 1 }, { name: 'February', id: 2 }, { name: 'March', id: 3 },
  { name: 'April', id: 4 }, { name: 'May', id: 5 }, { name: 'June', id: 6 },
  { name: 'July', id: 7 }, { name: 'August', id: 8 }, { name: 'September', id: 9 },
  { name: 'October', id: 10 }, { name: 'November', id: 11 }, { name: 'December', id: 12 }
];

const getMonth = (number) => {
  return months.find(m => m.id == number)
}

const MainContainer = () => {

  const [filteredData, setFilteredData] = useState({
    daily_weather: [],
    destination_info: [],
    faqs: [],
    monthly_faqs: [],
    monthly_weather_description: [],

  });
  const [holidayblog, setHolidayBlog] = useState([]);
  const [newsblog, setNewsBlog] = useState([]);
  const [allWeatherData, setAllWeatherData] = useState([]);

  const { destination, monthName, month, news } = useParams(); // Destructure destination from useParams

  const getData = async (destination) => {
    try {

      const fetchedData = await getAllData()

      const data = fetchedData?.weatherData?.data.find((x) => x?.destination.name === destination);

      const allWeatherData= fetchedData?.weatherData?.data;

      const holidayBlog = fetchedData?.holidayBlog;
      const newsBlog = fetchedData?.newsBlog;

      const dailyWeather = data?.weatherData.data.map((x) => {
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


      const destinationInfo = [{
        destination: destination,
        weather_description: data?.content.weatherInfo,
        more_information: data?.content.destinationInfo,
        cover_image: data?.content.image
      }]

      const faqs = data?.faq?.map(x => {
        return {
          destination: destination,
          question: x.question,
          answer: x.answer,
        }
      })

      const monthlyFaqs = data?.monthFaq?.map(x => {
        return {
          month: getMonth(x.month)?.name,
          destination: destination,
          question: x.question,
          answer: x.answer,
        }
      })

      const monthlyContent = data?.monthContent?.map(x => {
        return {
          destination: destination,
          month: getMonth(x.month)?.name,
          weather_description: x.weatherInfo,
          more_information: ""
        }
      })

      return { dailyWeather, destinationInfo, faqs, monthlyFaqs, monthlyContent, newsBlog, holidayBlog, allWeatherData };
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      const data = await getData(destination);
     
      let weatherOtherDestinations = getWeatherOtherDestinations(data?.dailyWeather, month, destination);

      if (isMounted && destination) {

        const filteredDestinations = {
          destination: destination,
          month: month,
          daily_weather: data?.dailyWeather,
          destination_info: data?.destinationInfo,
          faqs: data?.faqs,
          monthly_faqs: data?.monthlyFaqs,
          monthly_weather_description: data?.monthlyContent,
          weatherOtherDestinations
        };

        setFilteredData(filteredDestinations);
        setHolidayBlog(data?.holidayBlog.data)
        setNewsBlog(data?.newsBlog.data)
      } else if (isMounted) {
        setHolidayBlog(data?.holidayBlog.data)
        setNewsBlog(data?.newsBlog.data)
      }

      setAllWeatherData(data?.allWeatherData)
    };

    fetchData();

    return () => {
      isMounted = false; // Cleanup function to mark component as unmounted
    };
  }, [destination]);


  const holidaysData = holidayblog?.filter(x => x.category === "WHERE TO GO ON VACATION")
    .map(x => {
      return {
        id: x._id,
        title: "WARM DESTINATIONS -",
        hint: "WHERE TO GO ON VACATION",
        description: x.overViewDescription,
        content: x.WeatherHolidayContent,
        text: x.overViewHeading,
        image: x.coverImage,
        month: x.month

      }
    });

  const weatherData = holidayblog?.filter(x => x.category === "WEATHER")
    .map(x => {
      return {
        id: x._id,
        title: "WEATHER",
        text: x.overViewHeading,
        image: x.coverImage,
        month: x.month,
        destination: x.destination,
        category: x.category
      }
    });

  const newsData = newsblog?.map(x => {
    return {
      id: x._id,
      title: "THE NEWS",
      text: x.heading,
      image: x.image,
      month: x.month,
      info: x.info,
      content: x.subNews
    }
  });

  return (
    <div>
      {destination && !monthName ? (
        <div className="">
          <div className="relative px-[10px] md:px-[8%] flex flex-col xl:flex-row justify-space-between gap-[30px] mt-[40px] w-[100%]">
            <div className='relative w-[100%] md:w-[70%]'>
              {month && !monthName ? (
                <MonthlyWeatherDisplay data={filteredData} />
              ) : (
                <WeatherDisplay data={filteredData} />
              )}
            </div>

            <div className={`relative w-full md:w-[30%] md:right-0 flex flex-col`}>
              <div className="sticky top-0">
                <SearchForm destination={destination} destinations={destinations} />
              </div>

            </div>

          </div>
          <div className="relative px-[10px] md:px-[8%] flex flex-col xl:flex-row justify-space-between w-[100%]">
            <MoreInfo holidaysData={holidaysData} weatherData={weatherData} newsData={newsData} />
          </div>
        </div>
      ) : monthName ? (
        <>
          <div className="relative px-[10px] md:px-[8%] flex flex-col xl:flex-row justify-space-between gap-[30px] mt-[40px] w-[100%]">
            <div className={` relative w-[100%] xl:w-[70%]`}>
              <WhereToGoDisplay data={allWeatherData} holidaysData={holidaysData} />
            </div>

            <div className={`relative w-full md:w-[30%] md:right-0 flex flex-col`}>
              <div className="sticky top-0">
                <SearchForm destination={destination} destinations={destinations} />
              </div>

            </div>

          </div>
          <div className=" relative px-[10px] md:px-[8%] flex flex-col xl:flex-row justify-space-between w-[100%]">
            <MoreInfo holidaysData={holidaysData} weatherData={weatherData} newsData={newsData} />
          </div>
        </>
      ) : news ? (
        <>
          <div className="relative px-[10px] md:px-[8%] flex flex-col xl:flex-row justify-space-between gap-[30px] mt-[40px] w-[100%]">
            <div className={`relative w-[100%] xl:w-[70%]`}>
              <NewsDisplay data={filteredData} newsData={newsData} />
            </div>
            <div className={`relative w-full md:w-[30%] md:right-0 flex flex-col`}>
              <div className="sticky top-0">
                <NewsAds />
              </div>

            </div>

          </div>
          <div className="relative px-[10px] md:px-[8%] flex flex-col xl:flex-row justify-space-between w-[100%]">
            <MoreInfo holidaysData={holidaysData} weatherData={weatherData} newsData={newsData} />
          </div>
        </>
      ) : (
        <h1 className="text-red-600 align-middle">Please Choose Destination</h1>
      )}
    </div>
  );

};

export default MainContainer;

