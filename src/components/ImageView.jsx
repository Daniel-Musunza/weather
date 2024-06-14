import React from 'react';
import { Card, Text, Button } from '@mantine/core';

const ImageView = (props) => {
  return (
    <div className="flex flex-col md:flex-row w-full relative">
      <div className="absolute z-10">
        <Text
          className='rounded-tl-[15px] rounded-br-[20px] text-white bg-darkBlue-2 py-[13px] px-[20px]'
          color="white"
          weight={700}
        >
          from PLN 5,717
        </Text>
      </div>
      
      <Card
        shadow="md"
        className='h-[250px] border-[1px] border-darkBlue-2 rounded-t-[15px] md:rounded-tr-[0px] md:rounded-s-[15px] relative'
      >
        <img src="../../images/photos/upload_6539018e83284.jpg" alt="" 
        className="w-[100%] md:w-[800px] h-full object-cover rounded-t-[15px] md:rounded-tr-[0px] md:rounded-s-[15px] " />
      </Card>
      <Card
        className='rounded-b-[15px] md:rounded-bl-[0px] md:rounded-e-[15px]  bg-darkBlue-2 flex flex-col gap-[10px] md:gap-[5px] justify-between items-center md:justify-start px-[20px] md:pl-[40px] py-[40px] md:pr-[80px] w-full '
      >
        <h1 className='flex flex-row gap-[5px] items-center text-[25px] text-white font-[700]'>
          <span>Holidays in {props.destination} </span>
          <img
            src="../../images/icons/plane-airplane-aircraft-flight-travel-vacation.svg"
            alt=""
            className='h-[25px] w-[25px] invert'
          />
        </h1>
        <Text className="text-white">Check out the best holiday offers!</Text>
        <div className="flex-grow flex flex-col justify-center items-center w-full">
        <div
            className='inline-flex cursor-pointer flex-row items-center bg-[#FBA834] px-[45px] py-[9px] text-darkBlue-2 text-[15px] rounded-[20px] outline-none'
            variant="gradient"
            color="yellow"
        >
            <span className='font-[900]'>See offers</span>
            <img
                src="../../images/icons/triangle-right.svg"
                alt=""
                className='h-[20px] w-[20px]' 
            />
        </div>
        </div>
      </Card>
    </div>
  );
};

export default ImageView;
