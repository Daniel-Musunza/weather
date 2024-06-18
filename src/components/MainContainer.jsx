import React, { useState, useEffect, useRef } from 'react';
import WeatherDisplay from './WeatherDisplay';
import SearchForm from './SearchForm';
import { destination, daily_weather, destination_info, faqs, monthly_faqs, monthly_weather_description } from '../utils/weatherdata'
import MoreInfo from './MoreInfo';

const MainContainer = () => {
  const [WindowHeight, setwindowHeight] = useState(0);
  const [allowOverFlow, setAllowOverFlow] = useState(false);

  const data = {
    destination,
    daily_weather,
    destination_info,
    faqs, monthly_faqs,
    monthly_weather_description
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = window.scrollY;
      const windowHeight = window.innerHeight;
      setwindowHeight(windowHeight);

      if (scrollHeight > (windowHeight / 2)) {
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
      <div className="px-[10px] md:px-[8%] flex flex-col xl:flex-row justify-space-between gap-[30px] mt-[40px] w-[100%]">
        <div className={`w-[100%] xl:w-[70%] ${allowOverFlow ? 'overflow-y-auto xl:h-[200vh] ' : ''}`} style={{ scrollbarWidth: 'none', '-ms-overflow-style': 'none' }}>
          <WeatherDisplay data={data} />
        </div>
        <div className="w-[100%] xl:w-[30%]">
          <SearchForm destination={data?.destination} />
        </div>

      </div>
      <div className="px-[10px] md:px-[8%]  flex flex-col xl:flex-row justify-space-between w-[100%]">
        <MoreInfo />
      </div>
    </div>
  );
}

export default MainContainer;
