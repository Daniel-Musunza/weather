import React, { useState, useEffect } from 'react'
const NewsAds = () => {

    return (
        <div className="flex flex-col sticky w-full md:w-[350px]">
            <div className="flex flex-col gap-[40px] w-[100%]">
                <div className="flex flex-col  py-2 w-full justify-center">

                    <img
                        src="https://turystycznyninja.pl/wp-content/uploads/2023/03/Google_News_Banner.png"
                        alt=""
                        className="rounded-lg"
                    />

                </div>

                <div className="flex flex-col py-2 w-full ">

                    <img
                        src="https://www.itravelholidays.co.uk/_next/image?url=%2Fsingleoffer.png&w=1920&q=75"
                        alt=""
                        className="rounded-lg"
                    />

                </div>
            </div>
        </div>
    )
}

export default NewsAds