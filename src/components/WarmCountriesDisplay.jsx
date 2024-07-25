import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import ImageView from './ImageView';
import 'chart.js/auto';
import { Text, Box } from '@mantine/core';
import { destinations } from '../utils/weatherdata';

const WarmCountriesDisplay = ({ data, warmCountriesData }) => {
    const navigate = useNavigate();
    
    const handleNavigation = (id, month) => {
        navigate(`/where-to-go/${month}/${id}`);
    };

    return (
        <div>
            <Box className="flex flex-col gap-[40px]  " >
                <Box className=" flex flex-col gap-[10px] mt-[30px]">
                    <Text>33 POSTS IN</Text>
                    <h1 className=' font-[900] text-[30px]'>Warm Destinations</h1>
                    <Box className="flex flex-row flex-wrap gap-[10px]">

                    {warmCountriesData?.map((x, index) => (
                                <div
                                onClick={() => handleNavigation(x?.id, x?.month)}
                                    className="flex relative flex-col py-2 w-full md:w-[48%] justify-center cursor-pointer"
                                    key={index}
                                >
                                      <button
                                      style={{fontWeight: 800}}
                                className='absolute top-4 text-center left-2 bg-[#1262af] px-[20px] py-[5px] text-white text-[13px] rounded-[8px] w-[fit-content]'
                            >
                                WARM DESTINATIONS
                            </button>
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
 
                    </Box>
                </Box>
               
            </Box>
        </div>
    )
    
}

export default WarmCountriesDisplay