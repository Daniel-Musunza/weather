import React, { useState, useEffect } from 'react';
import WeatherDisplay from './WeatherDisplay';
import SearchForm from './SearchForm';
import SearchFormBlogs from './SearchFormBlogs';
import { destinations } from '../utils/weatherdata';
import MoreInfo from './MoreInfo';
import { useParams } from 'react-router-dom';
import MonthlyWeatherDisplay from './MonthlyWeatherDisplay';
import WhereToGoBlogsDisplay from './WhereToGoBlogsDisplay';
import WarmCountriesDisplay from './WarmCountriesDisplay';
import WhereToGoDisplay from './WhereToGoDisplay';
import NewsDisplay from './NewsDisplay';
import NewsAds from './NewsAds';
import { Sticky } from "gestalt";

import { Text, Box } from '@mantine/core';

import { getAllData } from '../utils/getAllData';
import AttractionsDisplay from './AttractionsDisplay';
import BeachesDisplay from './BeachesDisplay';

const getWeatherOtherDestinations = (allWeather, month, targetDestination) => {

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

  // Get the country code for the target destination
  const targetCountryCode = getCountryCodeForDestination(targetDestination);

  // Filter weather data for other destinations in the same country as the target destination
  const filteredDestinations = destinations?.filter(d => d.countryCode === targetCountryCode && d.destination !== targetDestination);

  // Aggregate data by destination
  const destinationData = {};
  // Add data for the target destination

  // Add data for each filtered destination
  filteredDestinations?.forEach(dest => {
    destinationData[dest.destination] = {
      tempSum: 0,
      waterTempSum: 0,
      humidSum: 0,
      sunnyHrsSum: 0,
      count: 0
    };


    const oneDestinationWeather = allWeather?.data?.find(x => x.destination._id === dest.id)

    const daily_weather = oneDestinationWeather?.weatherData[0]?.data.map((x) => {
      let condition = 'Cloudy';
      let condition_hours = null;

      if (x.prcp > 0 || x.tavg < 10) {
        condition = 'Rainy';
        condition_hours = x.prcp;
      } else if (x.tsun > 0 || x.tavg > 20) {
        condition = 'Sunny';
        condition_hours = x.tsun;
      } else if (x.snow > 0) {
        condition = 'Snowy';
        condition_hours = x.snow;
      } else if (x.wspd > 20) {
        condition = 'Windy';
        condition_hours = x.wspd;
      }

      const date = new Date(x.date);
      const currentDate = new Date();
      if (date.getFullYear() < currentDate.getFullYear()) {
        date.setFullYear(currentDate.getFullYear());
      }

      return {
        date: date.toLocaleDateString('en-GB'),
        temperature: x.tavg,
        water_temperature: x.tmin,
        humidity: x.prcp,
        condition: condition,
        condition_hours: condition_hours,
      };

    });


    const filteredWeather = daily_weather?.filter(x => parseDateToMonth(x.date) === month);

    filteredWeather?.forEach(x => {
      destinationData[dest.destination].tempSum += parseFloat(x.temperature);
      destinationData[dest.destination].waterTempSum += parseFloat(x.water_temperature);
      destinationData[dest.destination].humidSum += parseFloat(x.humidity);
      if (x.condition === "Sunny") {
        destinationData[dest.destination].sunnyHrsSum += parseFloat(x.condition_hours);
      }
      destinationData[dest.destination].count += 1;

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

const MainContainer = ({ setMetadata }) => {
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

  const { destination, monthName, wtgblogs, wcblogs, month, news, attractions, beaches, id } = useParams();

  const getData = async () => {
    const fetchedData = await getAllData();

    const destinationName = destination;

    const data = fetchedData?.weatherData?.data.find((x) => x?.destination.name === destination);

    const allWeatherData = fetchedData?.weatherData;
    const holidayBlog = fetchedData?.holidayBlog;
    const newsBlog = fetchedData?.newsBlog;

    const dailyWeather = data?.weatherData[0]?.data?.map((x) => {
      let condition = 'Cloudy';
      let condition_hours = null;

      if (x.prcp > 0 || x.tavg < 10) {
        condition = 'Rainy';
        condition_hours = x.prcp;
      } else if (x.tsun > 0 || x.tavg > 20) {
        condition = 'Sunny';
        condition_hours = x.tsun;
      } else if (x.snow > 0) {
        condition = 'Snowy';
        condition_hours = x.snow;
      } else if (x.wspd > 20) {
        condition = 'Windy';
        condition_hours = x.wspd;
      }

      const date = new Date(x.date);
      const currentDate = new Date();
      if (date.getFullYear() < currentDate.getFullYear()) {
        date.setFullYear(currentDate.getFullYear());
      }

      return {
        destination: destination,
        date: date.toLocaleDateString('en-GB'),
        temperature: x.tavg,
        water_temperature: x.tmin,
        humidity: x.prcp,
        condition: condition,
        condition_hours: condition_hours,
      };
    });

    const destinationInfo = [
      {
        destination: destination,
        weather_description: data?.content?.weatherInfo,
        more_information: data?.content?.destinationInfo,
        cover_image: data?.content?.image,
      },
    ];

    const faqs = data?.faq?.faqs?.map((x) => ({
      destination: destination,
      question: x.question,
      answer: x.answer,
    })) || [
        {
          destination: destination,
          question: data?.faq?.question || 'No question available',
          answer: data?.faq?.answer || 'No answer available',
        },
      ];


    const monthlyFaqs = data?.monthFaq?.find(y => {
      const name = getMonth(parseInt(y.month))?.name;
      return name == month;
    })?.faqs?.map((x) => ({
      month: month,
      destination: destination,
      question: x.question,
      answer: x.answer,
    }));

    const monthlyContent = data?.monthContent?.map((x) => ({
      destination: destination,
      month: getMonth(x.month)?.name,
      weather_description: x.weatherInfo,
      more_information: '',
    }));

    if (Array.isArray(data?.monthContent) && month) {

      const thismonth = data?.monthContent?.find((x) => getMonth(parseInt(x.month))?.name == month);



      setMetadata({
        destination: destinationName,
        month: month,
        monthlyMetaTitle: thismonth?.metaTitle,
        monthlyMetaDescription: thismonth?.metaDescription,
        monthlyMetaKeyWords: thismonth?.metaKeyWords
      });


    } 
    // else if (monthName) {

    //   const thisblog = holidayBlog?.data?.find(x => x._id === id)

    //   setMetadata({
    //     id: id,
    //     monthName: getMonth(monthName)?.name,
    //     metaTitle: thisblog?.metaTitle,
    //     metaDescription: thisblog?.metaDescription,
    //     metaKeyWords: thisblog?.metaKeyWords
    //   });

    // } 
    else if (news) {

      const thisnews = newsBlog?.data?.find(x => x._id === id)

      setMetadata({
        id: id,
        metaTitle: thisnews?.metaTitle,
        metaDescription: thisnews?.metaDescription,
        metaKeyWords: thisnews?.metaKeyWords
      });

    } else if (data?.content) {

      setMetadata({
        destination: destinationName,
        destinationMetaTitle: data?.content?.metaTitle,
        destinationMetaDescription: data?.content?.metaDescription,
        destinationMetaKeyWords: data?.content?.metaKeyWords
      });

    }

    return {
      dailyWeather,
      destinationInfo,
      faqs,
      monthlyFaqs,
      monthlyContent,
      newsBlog,
      holidayBlog,
      allWeatherData,
    };

  };

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      const data = await getData();

      let weatherOtherDestinations = getWeatherOtherDestinations(data?.allWeatherData, month, destination);

      if (isMounted && destination) {
        const filteredDestinations = {
          destination: destination,
          month: month,
          daily_weather: data?.dailyWeather,
          destination_info: data?.destinationInfo,
          faqs: data?.faqs,
          monthly_faqs: data?.monthlyFaqs,
          monthly_weather_description: data?.monthlyContent,
          weatherOtherDestinations,
        };

        setFilteredData(filteredDestinations);
        setHolidayBlog(data?.holidayBlog.data);
        setNewsBlog(data?.newsBlog.data);
      } else if (isMounted) {
        setHolidayBlog(data?.holidayBlog.data);
        setNewsBlog(data?.newsBlog.data);
      }

      setAllWeatherData(data?.allWeatherData);
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [destination]);


  const holidaysData = holidayblog?.WhereToGo?.filter(x => x.category === "other").map(x => ({
    id: x._id,
    title: "WARM DESTINATIONS -",
    hint: "WHERE TO GO ON VACATION",
    description: x.overViewDescription,
    content: x.content,
    text: x.overViewHeading,
    image: x.coverImage,
    month: x.month,
  }));

  const warmCountriesData = holidayblog?.WhereToGo?.filter(x => x.category === "WARM COUNTRIES").map(x => ({
    id: x._id,
    title: "WARM DESTINATIONS -",
    hint: "WHERE TO GO ON VACATION",
    description: x.overViewDescription,
    content: x.content,
    text: x.overViewHeading,
    image: x.coverImage,
    month: x.month,
  }));

  const attractionsData = holidayblog?.BeachAndAtrractions?.filter(x => x.category === "ATTRACTION").map(x => ({
    id: x._id,
    title: "ATTRACTION -",
    hint: "ATTRACTION",
    description: x.overViewDescription,
    content: x.content,
    text: x.overViewHeading,
    image: x.coverImage,
    month: x.month,
  }));

  const beachesData = holidayblog?.BeachAndAtrractions?.filter(x => x.category === "BEACH").map(x => ({
    id: x._id,
    title: "BEACHES -",
    hint: "BEACHES",
    description: x.overViewDescription,
    content: x.content,
    text: x.overViewHeading,
    image: x.coverImage,
    month: x.month,
  }));

  const allBlogsFormated = {holidaysData, warmCountriesData, attractionsData , beachesData}

  const weatherData = holidayblog?.featuredWeather?.map(x => ({
    id: x._id,
    title: "WEATHER",
    text: x.heading,
    image: x.coverImage,
    month: x.month,
    destination: x.destination,
    category: x.category,
  }));

  const newsData = newsblog?.map(x => ({
    id: x._id,
    title: "Travel tips and Advice",
    text: x.heading,
    image: x.image,
    month: x.month,
    info: x.info,
    content: x.subNews,
  }));

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
              <WhereToGoDisplay data={allWeatherData} holidaysData={allBlogsFormated} />
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
      ) : wtgblogs ? (
        <>
          <div className="relative px-[10px] md:px-[8%] flex flex-col xl:flex-row justify-space-between gap-[30px] mt-[40px] w-[100%]">
            <div className={` relative w-[100%] xl:w-[70%]`}>
              <WhereToGoBlogsDisplay data={allWeatherData} holidaysData={holidaysData} />
            </div>

            <div className={`relative w-full md:w-[30%] md:right-0 flex flex-col`}>
              <div className="sticky top-0">
                <SearchFormBlogs destination={destination} destinations={destinations} />
              </div>

            </div>

          </div>
          <div className=" relative px-[10px] md:px-[8%] flex flex-col xl:flex-row justify-space-between w-[100%]">
            <MoreInfo holidaysData={holidaysData} weatherData={weatherData} newsData={newsData} />
          </div>
        </>
      ) : wcblogs ? (
        <>
          <div className="relative px-[10px] md:px-[8%] flex flex-col xl:flex-row justify-space-between gap-[30px] mt-[40px] w-[100%]">
            <div className={` relative w-[100%] xl:w-[70%]`}>
              <WarmCountriesDisplay data={allWeatherData} warmCountriesData={warmCountriesData} />
            </div>

            <div className={`relative w-full md:w-[30%] md:right-0 flex flex-col`}>
              <div className="sticky top-0">
                <SearchFormBlogs destination={destination} destinations={destinations} />
              </div>

            </div>

          </div>
          <div className=" relative px-[10px] md:px-[8%] flex flex-col xl:flex-row justify-space-between w-[100%]">
            <MoreInfo holidaysData={holidaysData} weatherData={weatherData} newsData={newsData} />
          </div>
        </>
      ) : attractions ? (
        <>
          <div className="relative px-[10px] md:px-[8%] flex flex-col gap-[30px] mt-[40px] w-[100%]">
            <Text>{attractionsData?.length} POSTS IN</Text>
            <h1 className=' font-[900] text-[30px]'>Attractions</h1>



            <img src="https://app.travellead.pl/accounts/default1/7dzgm6zybqk/e464a1b0.png" alt="" />
            <img src="https://wakacje.postaffiliatepro.com/accounts/default1/banners/3cd0dc1c.png" alt="" />
            <h2 className=' font-[700] text-[25px]'>Perfect destinations for sightseeing enthusiasts</h2>

            <Text
              className='py-2'
              style={{ whiteSpace: 'normal', overflowWrap: 'break-word', wordWrap: 'break-word' }}
            >
              A dream vacation, just like the most beautiful places in the world, can mean something different to everyone. Some people are satisfied with exotic conditions, sunny weather and the possibility of sunbathing under palm trees. Others are interested in tourist attractions that allow you to learn about the history, culture and unique atmosphere of a given place. Before you decide to go to a specific place, it is worth checking out interesting places to visit. It is best to check those that are recommended by other travelers. Proven places are definitely better than those about which you will not find any opinions.
            </Text>
            <Text
              className='py-2'
              style={{ whiteSpace: 'normal', overflowWrap: 'break-word', wordWrap: 'break-word' }}
            >
              If we want to see the most beautiful places in the world, we don't have to fly thousands of kilometers from Poland. In practically every country or region we can find beautiful places that captivate with amazing views and provide the highest level of experience. When planning vacation trips, it is worth paying attention to the most beautiful monuments in the world, UNESCO monuments, famous national parks and natural monuments, places related to historical events or those where you can encounter unusual phenomena, such as colored sand, black beach, red water and other places that are simply worth recommending and seeing.</Text>
          </div>
          <div className="relative px-[10px] md:px-[8%] flex flex-col xl:flex-row justify-space-between gap-[30px] mt-[40px] w-[100%]">
            <div className={` relative w-[100%] xl:w-[70%]`}>
              <AttractionsDisplay data={allWeatherData} attractionsData={attractionsData} />
            </div>

            <div className={`relative w-full md:w-[30%] md:right-0 flex flex-col`}>
              <div className="sticky top-0">
                <SearchFormBlogs destination={destination} destinations={destinations} />
              </div>
            </div>

          </div>
          <div className=" relative px-[10px] md:px-[8%] flex flex-col xl:flex-row justify-space-between w-[100%]">
            <MoreInfo holidaysData={holidaysData} weatherData={weatherData} newsData={newsData} />
          </div>
        </>
      ) : beaches ? (
        <>
          <div className="relative px-[10px] md:px-[8%] flex flex-col xl:flex-row justify-space-between gap-[30px] mt-[40px] w-[100%]">
            <div className={` relative w-[100%] xl:w-[70%]`}>
              <BeachesDisplay data={allWeatherData} beachesData={beachesData} />
            </div>

            <div className={`relative w-full md:w-[30%] md:right-0 flex flex-col`}>
              <div className="sticky top-0">
                <SearchFormBlogs destination={destination} destinations={destinations} />
              </div>

            </div>

          </div>
          <div className=" relative px-[10px] md:px-[8%] flex flex-col xl:flex-row justify-space-between w-[100%]">
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

