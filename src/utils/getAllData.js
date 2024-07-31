import allData from './allData.json';

export const getAllData = async () => {
  let weatherData;

  // Fetch weather data with fallback to allData
  try {
    const response1 = await fetch(`https://blogs.itravelholidays.co.uk/api/data`);
    if (!response1.ok) {
      throw new Error('Network response was not ok');
    }
    weatherData = await response1.json();
  } catch (err) {
    console.error('Failed to fetch weather data, using fallback data:', err);
    weatherData = allData;
  }

  // Fetch holiday blog data
  let holidayBlog;
  try {
    const response2 = await fetch(`https://blogs.itravelholidays.co.uk/api/blogs/al`);
    if (!response2.ok) {
      throw new Error('Network response was not ok: ' + response2.statusText);
    }
    holidayBlog = await response2.json();
  } catch (err) {
    console.error('Failed to fetch holiday blog data:', err);
  }

  // Fetch news blog data
  let newsBlog;
  try {
    const response3 = await fetch(`https://blogs.itravelholidays.co.uk/api/news`);
    if (!response3.ok) {
      throw new Error('Network response was not ok: ' + response3.statusText);
    }
    newsBlog = await response3.json();
  } catch (err) {
    console.error('Failed to fetch news blog data:', err);
  }

  // Fetch destinations data
  let iDestinations;
  try {
    const response4 = await fetch('https://strapi.itravelholidays.co.uk/merged/getdestinations', {
      method: 'GET',
      headers: {
        'XApiKey': 'pgH7QzFHJx4w46fI~5Uzi4RvtTwlEXp',
        'Content-Type': 'application/json'
      }
    });
    if (!response4.ok) {
      throw new Error('Network response was not ok: ' + response4.statusText);
    }
    iDestinations = await response4.json();
  } catch (err) {
    console.error('Failed to fetch destination data:', err);
  };

  return { weatherData, holidayBlog, newsBlog, iDestinations };
};
