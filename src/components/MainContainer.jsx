import React, { useState, useEffect } from 'react';
import WeatherDisplay from './WeatherDisplay';
import SearchForm from './SearchForm';
import {destinations, daily_weather, destination_info, faqs, monthly_faqs, monthly_weather_description } from '../utils/weatherdata';
import MoreInfo from './MoreInfo';
import { useParams } from 'react-router-dom';
import MonthlyWeatherDisplay from './MonthlyWeatherDisplay';

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
  const filteredWeather = daily_weather.filter(x => parseDateToMonth(x.date) === month);

  // Get the country code for the target destination
  const targetCountryCode = getCountryCodeForDestination(targetDestination);

  // Filter weather data for other destinations in the same country as the target destination
  const filteredDestinations = destinations.filter(d => d.countryCode === targetCountryCode && d.destination !== targetDestination);

  // Aggregate data by destination
  const destinationData = {};

  // Add data for the target destination
  filteredWeather.forEach(x => {
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
  filteredDestinations.forEach(dest => {
      destinationData[dest.destination] = {
          tempSum: 0,
          waterTempSum: 0,
          humidSum: 0,
          sunnyHrsSum: 0,
          count: 0
      };

      filteredWeather.forEach(x => {
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


const MainContainer = () => {
  const [windowHeight, setWindowHeight] = useState(0);
  const [allowOverFlow, setAllowOverFlow] = useState(false);
  const [filteredData, setFilteredData] = useState({
    daily_weather: [],
    destination_info: [],
    faqs: [],
    monthly_faqs: [],
    monthly_weather_description: []
  });

  const { destination, month } = useParams(); // Destructure destination from useParams

  let weatherOtherDestinations = getWeatherOtherDestinations(daily_weather, month, destination);

  useEffect(() => {
    if (destination) {
      const filteredDestinations = {
        destination: destination,
        month: month,
        daily_weather: daily_weather.filter(d => d.destination === destination),
        destination_info: destination_info.filter(d => d.destination === destination),
        faqs: faqs.filter(d => d.destination === destination),
        monthly_faqs: monthly_faqs.filter(d => d.destination === destination),
        monthly_weather_description: monthly_weather_description.filter(d => d.destination === destination),
        weatherOtherDestinations
      };
      setFilteredData(filteredDestinations);
    }
  }, [destination]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = window.scrollY;
      const windowHeight = window.innerHeight;
      setWindowHeight(windowHeight);

      if (scrollHeight > windowHeight / 2) {
        setAllowOverFlow(true);
      } else {
        setAllowOverFlow(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      {destination ? (
        <>
          <div className="px-[10px] md:px-[8%] flex flex-col xl:flex-row justify-space-between gap-[30px] mt-[40px] w-[100%]">
            {/* ${allowOverFlow ? 'overflow-y-auto xl:h-[150vh]' : ''} */}
            <div className={`w-[100%] xl:w-[70%]  ${allowOverFlow ? 'overflow-y-auto xl:h-[300vh]' : ''} `} style={{ scrollbarWidth: 'none', '-ms-overflow-style': 'none' }}>
              {month ? (
                <MonthlyWeatherDisplay data={filteredData} />
              ) : (
                <WeatherDisplay data={filteredData} />
              )}

            </div>
            <div className="w-[100%] xl:w-[30%]">
              <SearchForm destination={destination} destinations={destinations}/>
            </div>
          </div>
          <div className="px-[10px] md:px-[8%] flex flex-col xl:flex-row justify-space-between w-[100%]">
            <MoreInfo />
          </div>
        </>
      ) : (
        <h1 className="text-red-600 align-middle">Please Choose Destination</h1>
      )}
    </div>
  );
};

export default MainContainer;
