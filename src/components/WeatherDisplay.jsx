import React from 'react'

const WeatherDisplay = () => {
  return (
    <div className="flex flex-col">
        <div className="">
            <h2 className='text-[20px] font-[600] text-darkBlue'>Current weather in Mauritius</h2>
        </div>
        <div className=" mt-[30px] flex flex-row gap-[10px] items-center border-[1px] border-[#ddd] rounded-[8px] p-[15px] bg-[whitesmoke] w-max">
            <div className="flex flex-col gap-[10px]">
                <p className='text-[14px] text-darkBlue'>Now: 07/06/2024 - local time: 21:20</p>
                <div className="flex flex-row gap-[30px] bg-white py-[25px] px-[20px] rounded-lg border-[1px] border-[#ddd] shadow-md w-[350px]">
                    <div className="flex flex-col items-center gap-[15px]">
                        <img
                            src="../../images/icons/weather-color-moon-stars.svg"
                            alt=""
                            className="h-[60px] w-[60px]"
                        />
                        <p className="text-[17px] font-[600] text-darkBlue-2">Sunny</p>
                    </div>
                    <div className="">
                        <p className="text-5xl font-extrabold text-darkBlue-2">
                        18
                        <span className="align-super text-2xl">°C</span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-[10px]">
                <p className='text-[14px] text-darkBlue'>Tomorrow</p>
                <div className="flex flex-row gap-[30px] bg-white py-[25px] px-[20px] rounded-lg border-[1px] border-[#ddd] shadow-md w-[100%]">
                    <div className="flex flex-col items-center gap-[15px]">
                        <img
                            src="../../images/icons/sun-behind-rain-cloud.svg"
                            alt=""
                            className="h-[60px] w-[60px]"
                        />
                        <p className="text-[17px] font-[600] text-darkBlue-2">Rainy</p>
                    </div>
                    <div className="">
                        <p className="text-5xl font-extrabold text-darkBlue-2">
                        22
                        <span className="align-super text-2xl">°C</span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-[10px]">
                <p className='text-[14px] text-darkBlue'>The day after tomorrow</p>
                <div className="flex flex-row gap-[30px] bg-white py-[25px] px-[20px] rounded-lg border-[1px] border-[#ddd] shadow-md w-[100%]">
                    <div className="flex flex-col items-center gap-[15px]">
                        <img
                            src="../../images/icons/sun-behind-rain-cloud.svg"
                            alt=""
                            className="h-[60px] w-[60px]"
                        />
                        <p className="text-[17px] font-[600] text-darkBlue-2">Rainy</p>
                    </div>
                    <div className="">
                        <p className="text-5xl font-extrabold text-darkBlue-2">
                        24
                        <span className="align-super text-2xl">°C</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default WeatherDisplay