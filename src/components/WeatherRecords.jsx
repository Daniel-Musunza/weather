import React, { useState } from 'react'
import icons from '../utils/icons'
import ImageView from './ImageView';

const WeatherRecords = (props) => {

    const faqs = props?.faqs

    const [viewQuestionId, setViewQuestionId] = useState(null);

    const handleViewQuestion = (index) => {
        setViewQuestionId(viewQuestionId === index ? null : index);
    }

    const formatMonthYear = (monthYear) => {
        if (monthYear) {

            const [year, month] = monthYear.split("-");
            const date = new Date(year, month - 1);
            return date.toLocaleString('default', { month: 'long', year: 'numeric' });
        }
    };

    const renderFormattedHTML = (htmlString) => {
        return { __html: htmlString };
    };

    return (
        <div className="flex flex-col gap-[30px]">
            <div className="flex flex-col gap-[30px]" id="weather-records">
                <div className="">
                    <h2 className='text-[22px] font-[600] text-darkBlue-2'>Weather records</h2>
                </div>
                <div className="flex flex-col gap-[20px] border-[1px] border-[#ddd] rounded-[8px] p-[15px] bg-[whitesmoke] w-full">
                    <p className='text-[14px] text-darkBlue-2  '>Temperature records in {props?.destination}</p>
                    <div className="flex flex-row flex-nowrap gap-[10px] items-center justify-center">
                        <div className="flex flex-col md:flex-row gap-[10px] w-[100%]">
                            <div className="w-full flex flex-col justify-center items-center gap-[15px] bg-white py-[25px] px-[20px] rounded-lg border-[1px] border-[#ddd] shadow-md">
                                <div className="flex flex-row justify-center items-center gap-[10px]">
                                    <img src="../../images/icons/thermometer-temperature.svg" alt="" className="h-[40px] w-[30px]" />
                                    <div>
                                        <p className="text-[30px] font-extrabold text-darkBlue-2">
                                            {props?.weatherStats.highestTemp?.temperature}
                                            <span className="align-super text-[14px]">°C</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center items-center gap-[10px]">
                                    <p className="text-darkBlue-2 font-[600] text-[14px]">{props?.weatherStats.highestTemp?.date}</p>
                                    <p className="flex flex-row justify-center items-center text-[12px] font-[400] text-darkBlue-2">The highest temperature</p>
                                </div>
                            </div>
                            <div className="w-full flex flex-col justify-center items-center gap-[15px] bg-white py-[25px] px-[20px] rounded-lg border-[1px] border-[#ddd] shadow-md">
                                <div className="flex flex-row justify-center items-center gap-[10px]">
                                    <img src="../../images/icons/thermometer-temperature.svg" alt="" className="h-[40px] w-[30px]" />
                                    <div>
                                        <p className="text-[30px] font-extrabold text-darkBlue-2">
                                            {props?.weatherStats.lowestTemp?.temperature}
                                            <span className="align-super text-[14px]">°C</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center items-center gap-[10px]">
                                    <p className="text-darkBlue-2 font-[600] text-[14px]">{props?.weatherStats.lowestTemp?.date}</p>
                                    <p className="flex flex-row justify-center items-center text-[12px] font-[400] text-darkBlue-2">Lowest temperature</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-[10px] w-[100%]">
                            <div className="w-full flex flex-col justify-center items-center gap-[15px] bg-white py-[25px] px-[20px] rounded-lg border-[1px] border-[#ddd] shadow-md">
                                <div className="flex flex-row justify-center items-center gap-[10px]">
                                    <img src="../../images/icons/thermometer-temperature.svg" alt="" className="h-[40px] w-[30px]" />
                                    <div>
                                        <p className="text-[30px] font-extrabold text-darkBlue-2">
                                            {props?.weatherStats.warmestMonth?.avgTemp.toFixed(1)}
                                            <span className="align-super text-[14px]">°C</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center items-center gap-[10px]">
                                    <p className="text-darkBlue-2 font-[600] text-[14px]">{new Date(`01/${formatMonthYear(props?.weatherStats.warmestMonth?.monthYear)}`).toLocaleString('default', { month: 'long', year: 'numeric' })}</p>
                                    <p className="flex flex-row justify-center items-center text-[12px] font-[400] text-darkBlue-2">The warmest month</p>
                                </div>
                            </div>
                            <div className="w-full flex flex-col justify-center items-center gap-[15px] bg-white py-[25px] px-[20px] rounded-lg border-[1px] border-[#ddd] shadow-md">
                                <div className="flex flex-row justify-center items-center gap-[10px]">
                                    <img src="../../images/icons/thermometer-temperature.svg" alt="" className="h-[40px] w-[30px]" />
                                    <div>
                                        <p className="text-[30px] font-extrabold text-darkBlue-2">
                                            {props?.weatherStats.coldestMonth?.avgTemp.toFixed(1)}
                                            <span className="align-super text-[14px]">°C</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center items-center gap-[10px]">
                                    <p className="text-darkBlue-2 font-[600] text-[14px]">{new Date(`01/${formatMonthYear(props?.weatherStats.coldestMonth?.monthYear)}`).toLocaleString('default', { month: 'long', year: 'numeric' })}</p>
                                    <p className="flex flex-row justify-center items-center text-[12px] font-[400] text-darkBlue-2">The coldest month</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className='text-[14px] text-darkBlue-2'>Weather records are based on data we collect from 2023. We do not include previous years in our analyses.</p>
                </div>
            </div>
            <div className="flex flex-col gap-[30px]" id="temperatures-and-climate" >
                <div>
                    <h2 class='text-[22px] font-[600] text-darkBlue-2' >Temperatures and climate in {props?.destination}</h2>
                    <div class="flex flex-col  gap-[5px]">
                        <img src={props?.destination_info?.cover_image} className='w-full' alt=""
                            class='rounded-[20px] h-[300px] md:h-[350px] lg:h-[400px] xl:h-[500px]'
                        />
                        <p class='flex flex-row justify-center items-center'>{props?.destination} weather</p>
                    </div>
                    <p className='text-[14px] text-darkBlue-2'>
                      {props?.destination_info?.more_information}
                    </p></div>
            </div>
            <div className="flex flex-col gap-[20px]" id="faq">
                <div className="">
                    <h2 className='text-[22px] font-[600] text-darkBlue-2'>FAQ </h2>
                </div>
                {faqs?.map((data, index) => (
                    <div key={index} className="flex flex-row justify-between bg-white p-[20px] rounded-[6px] shadow-md border-[1px]" >
                        <div className="flex flex-col gap-[20px]">
                            <p className='text-darkBlue-2 font-[600] text-[18px] '>{data.question}</p>
                            <div className={`transition-max-height duration-500 ease-in-out overflow-hidden ${viewQuestionId === index ? 'max-h-40' : 'max-h-0'}`}>
                                <p className='text-sm text-darkBlue-2 mt-2'>{data.answer}</p>
                            </div>
                        </div>
                        <div className="">
                            <button
                                onClick={() => handleViewQuestion(index)}
                                className='bg-[#C4DDFF] py-[5px] px-[8px] border-[1px] rounded-[4px]  '
                            >{viewQuestionId === index ? icons.angleUp : icons.angleDown}</button>
                        </div>
                    </div>
                ))}
            </div>
            <ImageView destination={props?.destination} image={props?.destination_info?.cover_image}/>
        </div>

    )
}

export default WeatherRecords
