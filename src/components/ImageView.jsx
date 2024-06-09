import React from 'react'

const ImageView = () => {
  return (
        <div className="flex flex-col md1:flex-row w-[100%] relative">
            <div className="absolute z-[1] ">
                <p className='text-white font-[700] rounded-tl-[30px] rounded-br-[20px] bg-darkBlue-2 py-[13px] px-[20px]'>from PLN 5,717</p>
            </div>
            <img src="../../images/photos/upload_6539018e83284.jpg" alt="" 
            className='h-[250px] border-[1px] border-darkBlue-2 rounded-t-[30px] md1:rounded-tr-[0px] md1:rounded-s-[30px] relative'
            />
            <div className="rounded-b-[30px] md1:rounded-bl-[0px] md1:rounded-e-[30px] h-[250px] bg-darkBlue-2 flex flex-col gap-[10px] xl:gap-[5px] justify-between items-center md1:justify-start px-[20px] pl-[20px] md1:pl-[40px] py-[40px] md1:pr-[180px] w-[100%]">
                <h1 className='flex flex-row gap-[5px] items-center text-[25px] text-white font-[700]'>
                    <span>Holidays in Mauritius </span>
                    <img src="../../images/icons/plane-airplane-aircraft-flight-travel-vacation.svg" alt="" 
                    className='h-[25px] w-[25px] invert '
                    />
                </h1>
                <p className='text-white'>
                    Check out the best holiday offers!
                </p>
                <div className="flex-grow flex flex-col justify-center items-center w-full">
                    <button className='flex flex-row justify-center items-center gap-[20px] bg-[#FBA834] px-[45px] py-[9px] text-darkBlue-2 text-[15px] rounded-[20px] outline-none'>
                        <span className='font-[900]'>See offers</span>
                        <img src="../../images/icons/triangle-right.svg" alt="" className='h-[20px] w-[20px]' />
                    </button>
                </div>
            </div>
    </div>
  )
}

export default ImageView