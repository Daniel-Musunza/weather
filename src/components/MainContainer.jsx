import React, { useState, useEffect } from 'react';
import WeatherDisplay from './WeatherDisplay';
import SearchForm from './SearchForm';
import { daily_weather, destination_info, faqs, monthly_faqs, monthly_weather_description } from '../utils/weatherdata';
import MoreInfo from './MoreInfo';
import { useParams } from 'react-router-dom';

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

  const { destination } = useParams(); // Destructure destination from useParams

  useEffect(() => {
    if (destination) {
      const filteredDestinations = {
        destination: destination,
        daily_weather: daily_weather.filter(d => d.destination === destination),
        destination_info: destination_info.filter(d => d.destination === destination),
        faqs: faqs.filter(d => d.destination === destination),
        monthly_faqs: monthly_faqs.filter(d => d.destination === destination),
        monthly_weather_description: monthly_weather_description.filter(d => d.destination === destination)
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
            <div className={`w-[100%] xl:w-[70%] `} style={{ scrollbarWidth: 'none', '-ms-overflow-style': 'none' }}>
              <WeatherDisplay data={filteredData} />
            </div>
            <div className="w-[100%] xl:w-[30%]">
              <SearchForm destination={destination} />
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
