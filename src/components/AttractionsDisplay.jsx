import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import ImageView from './ImageView';
import 'chart.js/auto';
import { Text, Box } from '@mantine/core';
import { destinations } from '../utils/weatherdata';

const AttractionsDisplay = ({ data, attractionsData }) => {
    const navigate = useNavigate();

    const handleNavigation = (id) => {
        navigate(`/where-to-go/ATTRACTIONS/${id}`);
    };

    return (
        <div>
            <Box className="flex flex-col gap-[40px]  " >
                <Box className=" flex flex-col gap-[10px] mt-[30px]">
                 
                    <Box className="flex flex-row flex-wrap gap-[10px]">

                        {attractionsData?.map((x, index) => (
                            <div
                                onClick={() => handleNavigation(x?.id)}
                                className="flex relative flex-col py-2 w-full md:w-[48%] justify-center cursor-pointer"
                                key={index}
                            >
                                <button
                                    style={{ fontWeight: 800 }}
                                    className='absolute top-4 text-center left-2 bg-[#1262af] px-[20px] py-[5px] text-white text-[13px] rounded-[8px] w-[fit-content]'
                                >
                                    ATTRACTIONS
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

export default AttractionsDisplay