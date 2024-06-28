import React, { useEffect, useState } from 'react';
import { getWeatherIcon } from '../components/WeatherDisplay';

const MonthTemp = (props) => {
    const months = [
        { name: 'January', value: 0 }, { name: 'February', value: 1 }, { name: 'March', value: 2 },
        { name: 'April', value: 3 }, { name: 'May', value: 4 }, { name: 'June', value: 5 },
        { name: 'July', value: 6 }, { name: 'August', value: 7 }, { name: 'September', value: 8 },
        { name: 'October', value: 9 }, { name: 'November', value: 10 }, { name: 'December', value: 11 }
    ];

    const getCardsToShow = () => {
        if (window.innerWidth >= 1024) {
            return 4;
        } else if (window.innerWidth >= 768) {
            return 3;
        } else {
            return 5;
        }
    };

    const [currentIndex, setCurrentIndex] = useState(0);
    const [animationDirection, setAnimationDirection] = useState('');
    const [cardsToShow, setCardsToShow] = useState(getCardsToShow());
    const [filteredWeather, setFilteredWeather] = useState(props?.daily_weather);
    const [selectedMonth, setSelectedMonth] = useState(null);

    useEffect(() => {
        const handleResize = () => setCardsToShow(getCardsToShow());
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handlePrev = () => {
        if (currentIndex > 0) {
            setAnimationDirection('slideRight');
            setCurrentIndex((prevIndex) => prevIndex - 1);
        }
    };

    const handleNext = () => {
        if (currentIndex < filteredWeather.length - cardsToShow) {
            setAnimationDirection('slideLeft');
            setCurrentIndex((prevIndex) => prevIndex + 1);
        }
    };

    const handlePrevSmall = () => {
        if (currentIndex > 0) {
            setAnimationDirection('slideRight');
            setCurrentIndex((prevIndex) => prevIndex - 1);
        }
    };

    const handleNextSmall = () => {
        if (currentIndex < filteredWeather.length - 1) {
            setAnimationDirection('slideLeft');
            setCurrentIndex((prevIndex) => prevIndex + 1);
        }
    };

    const handleMonthClick = (month) => {
        setSelectedMonth(month);
        setCurrentIndex(0);
        const filteredData = props.daily_weather?.filter(data => {
            const date = new Date(data?.date?.split('/').reverse().join('/'));
            return date.getMonth() === month.value;
        });
        setFilteredWeather(filteredData);
    };
    
    const displayedData = filteredWeather.length>0 ? filteredWeather.slice(currentIndex, currentIndex + cardsToShow) : props?.daily_weather?.slice(currentIndex, currentIndex + cardsToShow);

    return (
        <div className="flex flex-col justify-center items-center bg-white rounded-[6px] shadow-md p-[10px] gap-[40px] w-full overflow-hidden">
            <h2 className='font-[400] text-darkBlue-2 text-[14px]'>Select a month to check what the weather was like in {props?.destination} in previous years</h2>
            <div className="flex flex-row flex-wrap gap-[10px] justify-center items-center">
                {months.map((data, index) => (
                    <p
                        key={index}
                        className={`px-[10px] py-[3px] rounded-[20px] shadow-md text-[14px] font-[600] cursor-pointer ${selectedMonth === data ? 'bg-blue-500 text-white' : 'bg-[#EEF2FF] text-darkBlue'}`}
                        onClick={() => handleMonthClick(data)}
                    >
                        {data.name}
                    </p>
                ))}
            </div>
            <div className="flex flex-col justify-center items-center w-full overflow-hidden">
                <div className="flex flex-row justify-center gap-[10px] md:gap-[20px]">
                    <div className="shrink-0 mt-[50px]">
                        <button
                            onClick={handlePrev}
                            disabled={currentIndex === 0}
                            className="hidden md:block px-2 py-1 bg-blue-500 text-white rounded-[10px] disabled:opacity-50 shrink-0"
                        >
                            <img src="../../images/icons/triangle-left.svg" alt="Previous" className="h-[30px] w-[30px] shrink-0" />
                        </button>
                    </div>
                    <div className="w-full flex flex-row gap-[10px] overflow-hidden">
                        <div className={`flex flex-row gap-[10px] transition-transform duration-500 ${animationDirection === 'slideLeft' ? 'animate-slideLeft' : animationDirection === 'slideRight' ? 'animate-slideRight' : ''}`}>
                            {displayedData?.map((data, index) => (
                                <div key={index} className="flex flex-col gap-[10px] min-w-[100px] md:min-w-[150px] lg:min-w-[200px] xl:min-w-[140px]">
                                    <p className="text-[14px] text-darkBlue">{data?.date}</p>
                                    <div className="flex flex-col justify-center items-center bg-white py-[20px] px-[25px] rounded-lg border-[1px] border-[#ddd] shadow-md">
                                        <div className="flex flex-col items-center gap-[10px]">
                                            <img src={getWeatherIcon(data.condition)} alt={data.condition} className="h-[60px] w-[60px]" />
                                        </div>
                                        <div>
                                            <p className="text-[40px] font-extrabold text-darkBlue-2">
                                                {data?.temperature}
                                                <span className="align-super text-[18px]">°C</span>
                                            </p>
                                        </div>
                                        <p className="text-[17px] font-[600] text-darkBlue-2">{data.condition}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="shrink-0 mt-[50px]">
                        <button
                            onClick={handleNext}
                            disabled={currentIndex >= filteredWeather.length - cardsToShow}
                            className="hidden md:block px-2 py-1 bg-blue-500 text-white rounded-[10px] disabled:opacity-50 shrink-0"
                        >
                            <img src="../../images/icons/triangle-right.svg" alt="Next" className="h-[30px] w-[30px] shrink-0" />
                        </button>
                    </div>
                </div>
                <div className="flex md:hidden flex-row items-center justify-center gap-[20px] mt-[10px]">
                    <button
                        onClick={handlePrevSmall}
                        disabled={currentIndex === 0}
                    >
                        <img src="../../images/icons/arrow-left.svg" alt="Previous" className='h-[25px] w-[25px]' />
                    </button>
                    <button
                        onClick={handleNextSmall}
                        disabled={currentIndex >= filteredWeather.length - 1}
                    >
                        <img src="../../images/icons/arrow-right.svg" alt="Next" className='h-[25px] w-[25px]' />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MonthTemp;
