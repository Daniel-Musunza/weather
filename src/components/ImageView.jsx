import React, { useState, useEffect } from 'react';
import { Card, Text, Button } from '@mantine/core';

const ImageView = (props) => {

  const [destination, setDestination] = useState(0)
    const [departure, setDeparture] = useState(0)
    const [nights, setNights] = useState(7)
    const [departureDate, setDepartureDate] = useState(null);
    const [departureDDate, setDDepartureDate] = useState(null);
    const [roomsParams, setRoomsParams] = useState(null);
    const [rooms, setRooms] = useState([
        { adults: 2, children: 1 }
    ]);


    useEffect(() => {
        const today = new Date();
        const defaultDepartureDate = new Date(today.setDate(today.getDate() + 28));
        setDepartureDate(defaultDepartureDate.toISOString()); // Format date to YYYY-MM-DD
        setDDepartureDate(defaultDepartureDate.toISOString().split('T')[0]);
    }, []);

    const stations = [{ station: "Any Airport", id: 0 }];

    const [isModalOpen, setIsModalOpen] = useState(false);

   

    const allAdults = rooms.reduce((sum, room) => sum + room.adults, 0);
    const allChildren = rooms.reduce((sum, room) => sum + room.children, 0);

    useEffect(() => {
        const roomParams = rooms.map((room, index) => `adultsRoom${index + 1}=${room.adults}&childrenRoom${index + 1}=${room.children}`).join('&');
        setRoomsParams(roomParams);
    }, [rooms]);

  
 const link = props?.destination?.destination ? `https://www.itravelholidays.co.uk/holidays?destinationIds=${props?.destination?.destinationNumber}&selected=${departureDate}&departureAirports=${departure}&nights=${nights}&range=3&${roomsParams}`: 'https://www.itravelholidays.co.uk/searchhotels'
  const image = props?.image == "undefined" || props?.image == null ?  "https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg" : props?.image;

  return (
    <div className="flex flex-col lg:flex-row w-[100%] relative">


      <Card
        shadow="md"
        className='h-[250px] border-[1px] border-darkBlue-2 rounded-t-[15px] lg:rounded-tr-[0px] lg:rounded-s-[15px] relative w-full'
      >
        <img
          src={image}
          alt=""
          className="w-[100%] lg:w-[800px] h-full object-cover rounded-t-[15px] lg:rounded-tr-[0px] lg:rounded-s-[15px] relative"
        />

      </Card>
      <Card
        className='rounded-b-[15px] lg:rounded-bl-[0px] lg:rounded-e-[15px]  bg-[#002b49] flex flex-col gap-[10px] lg:gap-[5px] justify-between items-center lg:justify-start px-[20px] lg:pl-[40px] py-[40px] lg:pr-[80px] w-full '
      >
        <h1 className='flex flex-row gap-[5px] items-center text-[25px] text-white font-[700]'>
          <span>{`${props?.destination?.destination ? `Holidays in ${props?.destination?.destination} `:` Search Hotels`}`} </span>
          <img
            src="../../images/icons/plane-airplane-aircraft-flight-travel-vacation.svg"
            alt=""
            className='h-[25px] w-[25px] invert'
          />
        </h1>
        <Text className="text-white">Check out the best holiday offers!</Text>
        <div className="flex-grow flex flex-col justify-center items-center w-full">
      
          <a href={link}>
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
