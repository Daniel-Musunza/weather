import React, { useState, useEffect } from 'react'
import icons from '../utils/icons'
import { destinations } from '../utils/weatherdata'
import RoomsModal from './RoomsModal'

const SearchBar = () => {

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

    const alldestinations = [{ destination: "Any Destination", id: 0 }, ...destinations];

    const stations = [{ station: "Any Airport", id: 0 }];

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const allAdults = rooms.reduce((sum, room) => sum + room.adults, 0);
    const allChildren = rooms.reduce((sum, room) => sum + room.children, 0);

    useEffect(() => {
        const roomParams = rooms.map((room, index) => `adultsRoom${index + 1}=${room.adults}&childrenRoom${index + 1}=${room.children}`).join('&');
        setRoomsParams(roomParams);
    }, [rooms]);

    const url = `https://www.itravelholidays.co.uk/holidays?destinationIds=${destination}&selected=${departureDate}&departureAirports=${departure}&nights=${nights}&range=3&${roomsParams}`;


    return (
        <div className='flex flex-col gap-[20px] sticky top-[100px]'>
            {isModalOpen && (<RoomsModal isOpen={isModalOpen} onClose={closeModal} rooms={rooms} setRooms={setRooms} />)}
            <div className="flex flex-row items-center gap-4">
                <div className="flex flex-col gap-1">
                    <label htmlFor="" className='text-white'>Where to?</label>
                    <div className="relative w-[300px]">
                        <select
                            className="w-full pr-3 pl-10 py-2 border border-darkBlue focus:outline-none rounded"
                            value={destination}
                            onChange={(e) => {
                                e.preventDefault();
                                setDestination(e.target.value);
                            }}
                        >
                            {alldestinations?.map((dest, index) => (
                                <option key={index} value={dest.id}>
                                    {dest.destination}
                                </option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <div className="flex items-center justify-center w-8 h-8">
                                <span className='text-black'>{icons.location}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="" className='text-white'>Where from?</label>
                    <div className="relative w-full">
                        <select
                            className="w-full pr-3 pl-10 py-2 border border-darkBlue focus:outline-none rounded"
                            value={departure}
                            onChange={(e) => {
                                e.preventDefault();
                                setDeparture(e.target.value);
                            }}
                        >
                            {stations?.map((x, index) => (
                                <option key={index} value={x.id}>
                                    {x.station}
                                </option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <div className="flex items-center justify-center w-8 h-8">
                                <img src="../../images/icons/plane.svg" alt=""
                                    className='h-5 w-5'
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row items-center justify-center">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="" className='text-white'>When?</label>
                        <div className="w-full">
                            <input type="date" name="" id=""
                                className="w-full pl-3 py-2 border border-darkBlue focus:outline-none rounded"
                                value={departureDDate}
                                onChange={(e) => {
                                    e.preventDefault();
                                    setDDepartureDate(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="" className='text-white'>Nights</label>
                        <div className="relative w-full">
                            <input type="number" name="" id="" placeholder='7' min={1}
                                value={nights}
                                onChange={(e) => {
                                    e.preventDefault();
                                    setNights(e.target.value);
                                }}
                                className="w-full pl-3 py-2 border border-darkBlue focus:outline-none rounded"
                            />
                          

                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="" className='text-white'>Guest</label>
                    <div className="relative w-full" onClick={openModal}>
                        <input
                            type="text"
                            className="w-full pr-3 pl-10 py-2 border border-darkBlue focus:outline-none rounded"
                            placeholder="1 Room, 2 Adults"
                            value={`${rooms.length} Room${rooms.length > 1 ? `s` : ''}, ${allAdults} Adult${allAdults > 1 ? `s` : ''}, ${allChildren} Child${allChildren > 1 ? `ren` : ''}`}
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <div className="flex items-center justify-center w-8 h-8">
                                <img src="../../images/icons/person-male.svg" alt=""
                                    className='h-5 w-5'
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <a
                    href={url}
                    className="flex flex-row items-center mt-6"

                >
                    <button
                        className='bg-[#c70227] text-sm font-semibold px-[55px] py-[10px] rounded-lg text-[#fff]'
                        style={{ hover: 'rgba(179, 2, 35, 1)' }}
                    >
                        SEARCH
                    </button>
                </a>

            </div>
            <div className="flex flex-row items-center gap-4">
                <div className="flex flex-row items-center gap-[10px]">
                    <input type="checkbox" name="" id=""
                        className='h-[20px] w-[20px]'
                    />
                    <label htmlFor="" className='text-[13px] text-white'>All Inclusive</label>
                </div>
                <div className="flex flex-row items-center gap-[10px]">
                    <input type="checkbox" name="" id=""
                        className='h-[20px] w-[20px]'
                    />
                    <label htmlFor="" className='text-[13px] text-white'>Last Minute</label>
                </div>
            </div>
        </div>

    )
}

export default SearchBar