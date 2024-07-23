import React from 'react';
import { Card, Text, Button } from '@mantine/core';

const ImageView = (props) => {

  const image = props?.image == "undefined" || props?.image == null ?  "https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg" : props?.image;

  return (
    <div className="flex flex-col md:flex-row w-fit relative">


      <Card
        shadow="md"
        className='h-[250px] border-[1px] border-darkBlue-2 rounded-t-[15px] md:rounded-tr-[0px] md:rounded-s-[15px] relative max-w-fit'
      >
        <img
          src={image}
          alt=""
          className="w-[100%] md:w-[800px] h-full object-cover rounded-t-[15px] md:rounded-tr-[0px] md:rounded-s-[15px] relative"
        />

      </Card>
      <Card
        className='rounded-b-[15px] md:rounded-bl-[0px] md:rounded-e-[15px]  bg-[#002b49] flex flex-col gap-[10px] md:gap-[5px] justify-between items-center md:justify-start px-[20px] md:pl-[40px] py-[40px] md:pr-[80px] w-full '
      >
        <h1 className='flex flex-row gap-[5px] items-center text-[25px] text-white font-[700]'>
          <span>Holidays in {props?.destination} </span>
          <img
            src="../../images/icons/plane-airplane-aircraft-flight-travel-vacation.svg"
            alt=""
            className='h-[25px] w-[25px] invert'
          />
        </h1>
        <Text className="text-white">Check out the best holiday offers!</Text>
        <div className="flex-grow flex flex-col justify-center items-center w-full">
          <a href="https://www.itravelholidays.co.uk/hoteloffers/AE/175">
            <div
              className='inline-flex cursor-pointer flex-row items-center bg-[#c70227]  text-white px-[45px] py-[9px] text-[15px] rounded-[20px] outline-none'
              variant="gradient"
              color="yellow"
            >

              <span className='font-[900]'>See offers</span>
              {/* <img
                src="../../images/icons/triangle-right.svg"
                alt=""
                className='h-[20px] w-[20px]'
              /> */}

            </div>
          </a>
        </div>
      </Card>
    </div>
  );
};

export default ImageView;
