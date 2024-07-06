import React, { useState, useEffect, Fragment } from 'react';
import { destinations } from '../utils/weatherdata';
import { Outlet, useParams } from 'react-router-dom';

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

const DataLayout = ({props}) => {
  const [windowHeight, setWindowHeight] = useState(0);
  const [allowOverFlow, setAllowOverFlow] = useState(false);
  const [filteredData, setFilteredData] = useState({
    daily_weather: [],
    destination_info: [],
    faqs: [],
    monthly_faqs: [],
    monthly_weather_description: [],

  });


  const { destination, monthName, month, news } = useParams(); // Destructure destination from useParams

  const getData = async (destination) => {
    try {
      const destinationObj = destinations?.find((x) => x.destination === destination);

      const destination_id = destinationObj?.id;

      if (!destination_id || destination_id === "undefined") {
        return;
      }
      // Calculate endDate (day after tomorrow)
      const endDate = new Date();
      endDate.setDate(endDate.getDate());
      const endDateString = endDate.toISOString().split('T')[0];

      // Calculate startDate (day after the day after tomorrow of the previous year)
      const startDate = new Date();
      startDate.setFullYear(startDate.getFullYear() - 1);
      startDate.setDate(startDate.getDate() + 1);
      const startDateString = startDate.toISOString().split('T')[0];

      const response2 = await fetch(`https://travel-blog-drab.vercel.app/api/destination/${destination_id}?startDate=${startDateString}&endDate=${endDateString}`);

      if (!response2.ok) {
        throw new Error('Network response was not ok ' + response2.statusText);
      }

      const data = await response2.json();

      const dailyWeather = data?.data?.weatherData.data.map((x) => {
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

      const destinationInfo = data?.data?.destinationContent?.map(x => {
        return {
          destination: destination,
          weather_description: x.weatherInfo,
          more_information: x.destinationInfo,
          cover_image: x.image
        }
      })

      const faqs = data?.data?.destinationFaq?.map(x => {
        return {
          destination: destination,
          question: x.question,
          answer: x.answer,
        }
      })

      const monthlyFaqs = data?.data?.monthFaq?.map(x => {
        return {
          month: getMonth(x.month)?.name,
          destination: destination,
          question: x.question,
          answer: x.answer,
        }
      })

      const monthlyContent = data?.data?.monthContent?.map(x => {
        return {
          destination: destination,
          month: getMonth(x.month)?.name,
          weather_description: x.weatherInfo,
          more_information: ""
        }
      })

      return { dailyWeather, destinationInfo, faqs, monthlyFaqs, monthlyContent };
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
          weatherOtherDestinations,
        };
        setFilteredData(filteredDestinations);
      }
    };

    fetchData();

    return () => {
      isMounted = false; // Cleanup function to mark component as unmounted
    };
  }, [destination]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = window.scrollY;
      const windowHeight = window.innerHeight;
      if (scrollHeight > windowHeight / 3 && scrollHeight < windowHeight * 6) {
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
  
  // ${allowOverFlow ? 'fixed top-2 right-[20px]' : 'relative'}

  return (
    <Fragment>
    	{/* {props.children} */}
        <Outlet/>
    </Fragment>
  );

};

export default DataLayout;

