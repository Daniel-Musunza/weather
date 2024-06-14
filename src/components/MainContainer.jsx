import React, { useState, useEffect, useRef } from 'react';
import WeatherDisplay from './WeatherDisplay';
import SearchForm from './SearchForm';
import { destination, daily_weather, destination_info, faqs, monthly_faqs, monthly_weather_description } from '../utils/weatherdata'

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

    <div className="padding-x  flex flex-col xl:flex-row justify-center gap-[30px] mt-[40px] w-[100%]">
      <div className={`w-[100%] xl:w-[70%] ${allowOverFlow ? 'overflow-y-auto xl:h-[150vh] ' : ''}`} style={{ scrollbarWidth: 'none', '-ms-overflow-style': 'none' }}>
        <WeatherDisplay data={data}/>
      </div>
      <div className="w-[100%] xl:w-[30%]">
        <SearchForm />
      </div>
    </div>
  );
}

export default MainContainer;
