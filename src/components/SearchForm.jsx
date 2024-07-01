import React, { useState, useEffect } from 'react'
import icons from '../utils/icons'
import { destinations } from '../utils/weatherdata'
import RoomsModal from './RoomsModal'
import { Link, useNavigate } from 'react-router-dom'

const SearchForm = ({ destination, destinations }) => {
    const navigate = useNavigate();
    const [selectDestination, setSelectDestination] = useState(0)
    const [searchDestination, setDestination] = useState(0)
    const [nights, setNights] = useState(7)
    const [departureDate, setDepartureDate] = useState(null);
    const [departureDDate, setDDepartureDate] = useState(null);
    const [checkoutDate, setCheckOutDate] = useState(null);
    const [checkoutDDate, setCheckoutDDate] = useState(null);
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


    useEffect(() => {
        if (departureDate) {
            const dep = new Date(departureDate);
            const checkout = new Date(dep);
            checkout.setDate(dep.getDate() + nights);
            setCheckOutDate(checkout.toISOString());
            setCheckoutDDate(checkout.toISOString().split('T')[0]);
        }
    }, [departureDate, nights]);

    const alldestinations = [{ destination: "Any Destination", id: 0 }, ...destinations];


    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const allAdults = rooms.reduce((sum, room) => sum + room.adults, 0);
    const allChildren = rooms.reduce((sum, room) => sum + room.children, 0);

    useEffect(() => {
        const roomParams = rooms.map((room, index) => `adultsRoom${index + 1}=${room.adults}&childrenRoom${index + 1}=${room.children}`).join('&');
        setRoomsParams(roomParams);
    }, [rooms]);

    const url = `https://www.itravelholidays.co.uk/hotels?destinationIds=${searchDestination}&selected=${departureDate}&departureAirports=0&nights=${nights}&range=3&${roomsParams}`;
    // https://www.itravelholidays.co.uk/hotels?destinationIds=968&destinationIds=0&selected=2024-07-24T14%3A33%3A42.802Z&departureAirports=0&nights=7&range=3&adultsRoom1=2&childrenRoom1=1&whereto=Dubai%2C+United+Arab+Emirates&searchtype=hotel&sessionId=W8LNO7VL5&childrenRoom1=0

    return (
        <div className="flex flex-col sticky  ">
            {isModalOpen && (<RoomsModal isOpen={isModalOpen} onClose={closeModal} rooms={rooms} setRooms={setRooms} />)}
            <div className="flex flex-col gap-[40px] w-[100%]">

                <div style={{ backgroundImage: 'linear-gradient(90deg, rgb(116, 235, 213), rgb(159, 172, 230))' }}
                    className='p-[20px] flex flex-col gap-[40px]'
                >
                    <div className="flex flex-row justify-center items-center">
                        <h1 className=' text-white text-[25px] font-[600]'>Book Hotel only in {destination}</h1>
                    </div>
                    <div className="flex flex-col  gap-4">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="" className='text-white font-[600] '>Where to ?</label>
                            <div className="relative w-full">

                                <select
                                    className="w-full pr-3 pl-10 py-2 border border-darkBlue focus:outline-none rounded"
                                    value={searchDestination}
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
                        <div className="flex flex-col md:flex-row justify-between gap-1">
                            <div className="flex flex-col w-full md:w-1/2">
                                <label htmlFor="departure" className='text-white font-[600]'>Checkin Date</label>

                                <input type="date" name="" id=""
                                    className="w-full pl-3 py-2 border border-darkBlue focus:outline-none rounded"
                                    value={departureDDate}
                                    onChange={(e) => {
                                        e.preventDefault();
                                        setDDepartureDate(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="flex flex-col w-full md:w-1/2">
                                <label htmlFor="return" className='text-white font-[600]'>Checkout Date</label>

                                <input type="date" name="" id=""
                                    className="w-full pl-3 py-2 border border-darkBlue focus:outline-none rounded"
                                    value={checkoutDDate}
                                    onChange={(e) => {
                                        e.preventDefault();
                                        setCheckoutDDate(e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="" className='text-white font-[600] '>Nights </label>
                            <div className="relative w-full">
                                <input
                                    type="number"
                                    min={1}
                                    className="w-full pl-10 pr-3 py-2 border border-darkBlue focus:outline-none rounded"
                                    placeholder="7"
                                    value={nights}
                                    onChange={(e) => {
                                        e.preventDefault();
                                        setNights(e.target.value);
                                    }}
                                />
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <div className="flex items-center justify-center w-8 h-8">
                                        <img src="https://www.svgheart.com/wp-content/uploads/2020/05/moon-free-svg-file.png" alt=""
                                            className='h-5 w-5'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="" className='text-white font-[600] '>Guests</label>
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

                        <a href={url} className="flex flex-row items-center mt-6 ">
                            <button
                                className='w-[100%] bg-[#c70227] text-sm text-white font-semibold px-[55px] py-[10px] rounded'
                            >SEARCH</button>
                        </a>
                    </div>
                </div>


                <p>Check the weather for another destination</p>
                <select
                    className="w-full pl-3 pr-10 py-2 border-[2px] border-[#7286D3] focus:outline-none rounded-[10px]"
                    value={selectDestination}
                    onChange={(e) => {
                        e.preventDefault();
                        setSelectDestination(e.target.value);
                        navigate(`/${e.target.value}`)
                    }}
                >
                    <option value="">Name of Destination...</option>
                    {destinations?.map((dest, index) => (
                        <option key={index} value={dest.destination}>

                            {dest.destination}
                        </option>
                    ))}
                </select>

                <div className="flex flex-col gap-[20px]">
                    {destinations?.slice(0, 10)
                        .map((d) => (
                            <a href={`/${d.destination}`} className="flex flex-row justify-between items-center px-[15px] py-[12px] border-[1px] border-lightBlue-2 rounded-[10px] w-[100%] ">
                                <div className="flex flex-row gap-[10px] justify-center items-center">
                                    <img src="../../images/icons/all-inclusive.svg" alt=""
                                        className='h-[25px] w-[25px] '
                                    />
                                    <span>{d.destination} holidays</span>
                                </div>
                                <div className="">
                                    <img src="../../images/icons/triangle-right.svg" alt=""
                                        className='h-[25px] w-[25px]  text-[#E8AA42] '
                                    />
                                </div>
                            </a>
                        ))}

                    <a href={`/`} className="flex flex-row justify-between items-center px-[15px] py-[12px] border-[1px] border-lightBlue-2 rounded-[10px] w-[100%] bg-lightBlue-2 ">
                        <div className="flex flex-row gap-[10px] justify-center items-center">
                            <img src="../../images/icons/all-inclusive.svg" alt=""
                                className='h-[25px] w-[25px] '
                            />
                            <span>More holidays</span>
                        </div>
                        <div className="">
                            <img src="../../images/icons/triangle-right.svg" alt=""
                                className='h-[25px] w-[25px]  text-[#E8AA42] '
                            />
                        </div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default SearchForm