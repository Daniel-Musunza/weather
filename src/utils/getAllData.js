import allData from './allData.json';

export const getAllData = async () => {
  let weatherData;

  // Fetch weather data with fallback to allData
  try {
    const response1 = await fetch(`http://192.168.100.39:3000/api/data`);
    if (!response1.ok) {
      throw new Error('Network response was not ok');
    }
    weatherData = await response1.json();
  } catch (err) {
    console.error('Failed to fetch weather data, using fallback data:', err);
    weatherData = allData;
  }

  // Fetch holiday blog data
  const response2 = await fetch(`https://travel-blog-drab.vercel.app/api/holiday-blog`);
  if (!response2.ok) {
    throw new Error('Network response was not ok ' + response2.statusText);
  }
  const holidayBlog = await response2.json();

  // Fetch news blog data
  const response3 = await fetch(`https://travel-blog-drab.vercel.app/api/news`);
  if (!response3.ok) {
    throw new Error('Network response was not ok ' + response3.statusText);
  }
  const newsBlog = await response3.json();
  return { weatherData, holidayBlog, newsBlog };
};
