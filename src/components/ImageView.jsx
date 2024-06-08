import React from 'react'

const ImageView = () => {
  return (
        <div className="flex flex-row">
            <div className="absolute z-[1] ">
                <p className='text-white font-[700] rounded-tl-[30px] rounded-br-[20px] bg-darkBlue-2 py-[13px] px-[20px]'>from PLN 5,717</p>
            </div>
            <img src="../../images/photos/upload_6539018e83284.jpg" alt="" 
            className='h-[250px] border-[1px] border-darkBlue-2 rounded-s-[30px] relative'
            />
            <div className="rounded-e-[30px] h-[250px] bg-darkBlue-2 flex flex-col gap-[40px] pl-[40px] py-[40px] p pr-[180px]">
                <h1 className='text-[25px] text-white font-[700]'>Holidays in Mauritius <span>✈</span></h1>
                <p className='  text-white'>Check out the best holiday offers!</p>
                <div className="">
                    <button
                    className='flex flex-row justify-center items-center gap-[20px] bg-[#FBA834] px-[45px] py-[9px] text-darkBlue-2 text-[15px] rounded-[20px] outline-none'
                    >
                    <span className='font-[900]'>See offers</span>
                    <img src="../../images/icons/triangle-right.svg" alt="" 
                    className='h-[20px] w-[20px]'
                    />
                    </button>
                </div>
                
            </div>
    </div>
  )
}

export default ImageView