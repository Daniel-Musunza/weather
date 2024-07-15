export const getAllData = async () => {
  const endDate = new Date();
  endDate.setDate(endDate.getDate());
  const endDateString = endDate.toISOString().split('T')[0];

  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 1);
  startDate.setDate(startDate.getDate() + 1);
  const startDateString = startDate.toISOString().split('T')[0];

  const response1 = await fetch(`https://travel-blog-drab.vercel.app/api/data`);
  //   if (!response1.ok) {
  //     throw new Error('Network response was not ok ' + response1.statusText);
  //   }

  console.log(response1);

  const response2 = await fetch(`https://travel-blog-drab.vercel.app/api/holiday-blog`);

  if (!response2.ok) {
    throw new Error('Network response was not ok ' + response2.statusText);
  }

  const response3 = await fetch(`https://travel-blog-drab.vercel.app/api/news`);
  if (!response3.ok) {
    throw new Error('Network response was not ok ' + response3.statusText);
  }

  const weatherData = await response1.json();
  const holidayBlog = await response2.json();
  const newsBlog = await response3.json();

  return { weatherData, holidayBlog, newsBlog };

};
