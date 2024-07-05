import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
const MoreInfo = () => {
    const navigate = useNavigate();
    const [holidayblog, setHolidayBlog] = useState([]);
    const [newsblog, setNewsBlog] = useState([]);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {

            const response1 = await fetch(`https://travel-blog-drab.vercel.app/api/holiday-blog`);
            const response2 = await fetch(`https://travel-blog-drab.vercel.app/api/news`);
            if (!response1.ok) {
                throw new Error('Network response was not ok ' + response1.statusText);
            }

            const holidayBlog = await response1.json();
            const newsBlog = await response2.json();
            if (isMounted) {
                setHolidayBlog(holidayBlog.data)
                setNewsBlog(newsBlog.data)
            }
        };

        fetchData();
        return () => {
            isMounted = false; // Cleanup function to mark component as unmounted
        };
    }, []);

    const destiationCategory = [
        { name: "BEACHES" },
        { name: "WHERE TO GO ON VACATION" },
        { name: "WARM COUNTRIES" },
        { name: "WEATHER" },
        { name: "ATTRACTIONS" }
    ]

    const holidaysData = holidayblog?.filter(x => x.category === "WHERE TO GO ON VACATION")
        .map(x => {
            return {
                id: x._id,
                title: "WARM DESTINATIONS -",
                hint: "WHERE TO GO ON VACATION",
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
            month: x.month

        }
    });

    const handleHolidayNavigate = (month, id) => {
        navigate(`/where-to-go/month${month}/${id}#top`)
    }

    const handleWeatherNavigate = (destination) => {
        navigate(`/${destination}#top`)
    }

    const handleNewsNavigate = (id) => {
        navigate(`/news/news/${id}#top`)
    }

    return (
        <div className="flex flex-col lg:flex-row justify-between gap-[40px] mt-[80px] ">
            <div className="flex flex-col gap-[30px]">
                <div className="flex flex-col gap-[20px]">
                    <h1 className='text-[22px] font-[700] text-darkBlue-2'>Where to go on holiday:</h1>
                </div>
                <div className="flex flex-col gap-[20px]">
                    {holidaysData.map((obj) => (
                        <div onClick={() => handleHolidayNavigate(obj.month, obj.id)} className="flex flex-row gap-[20px] cursor-pointer" key={obj.id}>
                            <img src={obj.image} alt={obj.title} className='h-[100px] w-[100px] rounded-[8px]' />
                            <div className="flex flex-col gap-[3px]">
                                <h2 className='text-[15px] font-[700] text-darkBlue-2'>{obj.title}</h2>
                                <h2 className='text-[15px] font-[700] text-darkBlue-2'>{obj.hint}</h2>
                                <p className='text-darkBlue-2 font-[400]'>{obj.text}</p>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
            <div className="flex flex-col gap-[30px]">
                <div className="flex flex-col gap-[20px]">
                    <h1 className='text-[22px] font-[700] text-darkBlue-2'>Weather:</h1>
                </div>
                <div className="flex flex-col gap-[20px]">
                    {weatherData.map((obj, index) => (

                        <div onClick={() => handleWeatherNavigate(obj.destination)} className="flex flex-row gap-[20px] cursor-pointer" key={index}>

                            <img src={obj.image} alt=""
                                className='h-[100px] w-[100px] rounded-[8px] '
                            />
                            <div className="flex flex-col gap-[3px] ">
                                <h2 className='text-[15px] font-[700] text-darkBlue-2 '>{obj.title} - </h2>
                                <p className='text-darkBlue-2 font-[400]' >{obj.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-col gap-[30px]">
                <div className="flex flex-col gap-[20px]">
                    <h1 className='text-[22px] font-[700] text-darkBlue-2'>The news:</h1>
                </div>
                <div className="flex flex-col gap-[20px]">
                    {newsData.map((obj, index) => (

                        <div onClick={() => handleNewsNavigate(obj.id)} className="flex flex-row gap-[20px] cursor-pointer" key={index}>

                            <img src={obj.image} alt=""
                                className='h-[100px] w-[100px] rounded-[8px] '
                            />
                            <div className="flex flex-col gap-[3px] ">
                                <h2 className='text-[15px] font-[700] text-darkBlue-2 '>{obj.title}</h2>
                                <p className='text-darkBlue-2 font-[400]' >{obj.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MoreInfo