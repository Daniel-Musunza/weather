import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import WeatherRecords from './WeatherRecords';
import ImageView from './ImageView';
import WeatherRegions from './WeatherRegions';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { Card, Text, Button, Box, Title } from '@mantine/core';

const NewsDisplay = ({ data, newsData }) => {
    const navigate = useNavigate();
    const tomorrowDate = new Date();
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    const dayAfterTomorrowDate = new Date();
    dayAfterTomorrowDate.setDate(dayAfterTomorrowDate.getDate() + 2);

    const { news, id } = useParams();

    const months = [
        { name: 'January', id: 1 }, { name: 'February', id: 2 }, { name: 'March', id: 3 },
        { name: 'April', id: 4 }, { name: 'May', id: 5 }, { name: 'June', id: 6 },
        { name: 'July', id: 7 }, { name: 'August', id: 8 }, { name: 'September', id: 9 },
        { name: 'October', id: 10 }, { name: 'November', id: 11 }, { name: 'December', id: 12 }
    ];
    // Function to parse date in "DD/MM/YYYY" format and return the month in 'short' format
    const parseDateToMonth = (dateString) => {
        const [day, month, year] = dateString.split('/').map(Number);
        const date = new Date(year, month - 1, day);
        if (!isNaN(date)) {
            return date.toLocaleString('default', { month: 'long' });
        }
        return null;
    };

    const handleNavigation = (sectionId) => {
        navigate(`/${data.destination}/${data?.month}#${sectionId}`);
        document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
    };

    const currentNews = newsData?.find((x) => x.id === id);
    const currentIndex = newsData?.findIndex((x) => x.id === id);
    const lastIndex = newsData?.length - 1;

    const previousNews = newsData?.[currentIndex - 1] ?? newsData?.[lastIndex];
    const nextNews = newsData?.[currentIndex + 1] ?? newsData?.[0];

    const handleNewsNavigate = (id, index) => {
        navigate(`/news/${index}/${id}`)
    }

    return (
        <div>

            <Box className="flex flex-col gap-[40px]" >

                <Box className="flex flex-col" >
                    <div className="w-full flex justify-center flex-col">
                        <img
                            className='rounded-lg'
                            src={currentNews?.image}
                            alt=""
                        />
                        <Text className='text-[12px] align-middle'> {currentNews?.text}</Text>
                    </div>
                </Box>
                <Box className="flex flex-col w-full p-2 rounded-lg gap-2">
                    <Text
                        style={{ backgroundColor: 'rgb(18 98 175)' }}
                        className='px-[20px] py-[5px] text-white text-[13px] font-[800] rounded-[8px] w-[110px]'
                    >
                        The News
                    </Text>

                    {currentNews?.content.map((x, index) => (
                        <div className="flex flex-col text-[20px]" key={index}>
                            <Text
                                className='text-[30px] font-[800] py-2'
                                style={{ whiteSpace: 'normal', overflowWrap: 'break-word', wordWrap: 'break-word' }}
                            >
                                {x.subHeading}
                            </Text>
                            {/* <Text
                                className='py-2'
                                style={{ whiteSpace: 'normal', overflowWrap: 'break-word', wordWrap: 'break-word' }}
                            >
                               {x.subText}
                            </Text>
                            <Text
                                className='text-[25px] font-[700] py-4'
                                style={{ whiteSpace: 'normal', overflowWrap: 'break-word', wordWrap: 'break-word' }}
                            >
                                Venice Beach – Tunisia, Djerba, Midoun (from PLN 1,861/person)
                            </Text> */}
                            <Box className="flex flex-col py-2" >
                                <div className="w-full flex justify-center flex-col items-center">
                                    <img
                                        className='rounded-lg'
                                        src={x.subImage}
                                        alt=""
                                    />
                                    <Text className='text-[12px]'> {x.subHeading}</Text>
                                    <Text
                                        className='py-2'
                                        style={{ whiteSpace: 'normal', overflowWrap: 'break-word', wordWrap: 'break-word' }}
                                    >

                                        {x.subText} </Text>
                                </div>
                            </Box>
                        </div>
                    ))}

                </Box>

                <ImageView destination="Any Destination" image={currentNews?.image} />

                <div className="flex flex-col text-[20px]">
                    <div className='w-full py-[15px] px-[10px] flex flex-wrap justify-between gap-4'>

                        <div
                            onClick={() => handleNewsNavigate(previousNews?.id, news - 1)}
                            style={{ backgroundImage: `url(${previousNews?.image})` }}
                            className="relative py-2 bg-cover bg-center h-[250px] w-full md:w-[48%] flex flex-col justify-end rounded-xl"
                        >
                            <button
                                className='absolute top-2 text-center left-2 bg-[#1262af] px-[20px] py-[5px] text-white text-[13px] rounded-[8px] w-[80px]'
                            >
                                Previous
                            </button>
                            <div
                                style={{ backgroundColor: 'rgba(84, 83, 83, 0.492)' }}
                                className="w-full -mb-[8px] rounded-b-xl"
                            >
                                <Text
                                    className='py-2 font-bold text-white px-2'
                                    style={{ whiteSpace: 'normal', overflowWrap: 'break-word', wordWrap: 'break-word' }}
                                >
                                    {previousNews?.text}
                                </Text>
                            </div>

                        </div>
                        <div
                            onClick={() => handleNewsNavigate(nextNews?.id, news + 1)}
                            style={{ backgroundImage: `url(${nextNews?.image})` }}
                            className="relative  py-2 bg-cover bg-center h-[250px] rounded-xl w-full md:w-[48%] flex flex-col justify-end ')]"
                        >
                            <button
                                className='absolute top-2 text-center right-2 bg-[#1262af] px-[20px] py-[5px] text-white text-[13px] rounded-[8px] w-[80px]'
                            >
                                Next
                            </button>
                            <div
                                style={{ backgroundColor: 'rgba(84, 83, 83, 0.492)' }}
                                className="w-full -mb-[8px] rounded-b-xl"
                            >
                                <Text
                                    className='py-2 font-bold text-white px-2'
                                    style={{ whiteSpace: 'normal', overflowWrap: 'break-word', wordWrap: 'break-word' }}
                                >
                                    {nextNews?.text}
                                </Text>
                            </div>
                        </div>
                    </div>

                    <Text className='text-[30px] font-[800] py-2'>Featured Posts:</Text>

                    <div className='w-full py-[15px] flex flex-wrap justify-between'>
                        {newsData?.slice(0, 2)
                            .map((x, index) => (
                                <div
                                    onClick={() => handleNewsNavigate(x?.id, index)}
                                    className="flex flex-col py-2 w-full md:w-[48%] justify-center cursor-pointer"
                                    key={index}
                                >
                                    <img
                                        src={x.image}
                                        alt="All Inclusive on the Greek island of Lesbos"
                                        className="rounded-lg"
                                    />
                                    <Text
                                        className='py-2 font-bold'
                                        style={{ whiteSpace: 'normal', overflowWrap: 'break-word', wordWrap: 'break-word' }}
                                    >
                                        {x.text}
                                    </Text>
                                </div>
                            ))}


                    </div>
                </div>

            </Box>
        </div>
    )
}

export default NewsDisplay