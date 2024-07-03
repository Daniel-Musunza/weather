import React from 'react'
import { Link } from 'react-router-dom'
import icons from '../utils/icons'

const Footer = () => {

    const words = [
        "Last Minute",
        "Holidays",
        "All Inclusive",
        "First Minute",
        "Beaches",
        "Weather",
        "Where to go on vacation",
        "Flights",
        "Prices",
        "Ideas",
        "Warm countries",
        "Opinions",
        "Attractions",
        "Direction finder",
        "App",
        "Accommodation"
      ];
  return (
    <div className="padding-x flex flex-col gap-[40px] mb-[50px] md:mb-[0px] ">
        <div className="flex  flex-col xl:flex-row gap-[50px] justify-between">
            <div className="flex flex-row ">
                <h1 className='font-[600] text-[25px] text-darkBlue-2'>turystyczny <span className='text-[#3572EF]'>ninja</span></h1>
            </div>
            <div className="flex flex-row flex-wrap md1:flex-nowrap gap-[20px]">
                <Link to=""
                className='flex flex-row justify-center items-center gap-[5px] text-darkBlue-2 '
                >
                    <span>{icons.twitter}</span>
                    <span className='text-[18px] font-[700]'>Twitter</span>
                </Link>
                <Link to=""
                className='flex flex-row justify-center items-center gap-[5px] text-darkBlue-2 '
                >
                    <span>{icons.facebook}</span>
                    <span className='text-[18px] font-[700]'>Facebook</span>
                </Link>
                <Link to=""
                className='flex flex-row justify-center items-center gap-[5px] text-darkBlue-2 '
                >
                    <span>{icons.pininterest}</span>
                    <span className='text-[18px] font-[700]'>Pinterest</span>
                </Link>
                <Link to=""
                className='flex flex-row justify-center items-center gap-[5px] text-darkBlue-2 '
                >
                    <span>{icons.youtube}</span>
                    <span className='text-[18px] font-[700]'>Youtube</span>
                </Link>
                <Link to=""
                className='flex flex-row justify-center items-center gap-[5px] text-darkBlue-2 '
                >
                    <span>{icons.insta}</span>
                    <span className='text-[18px] font-[700]'>Instagram</span>
                </Link>
                <Link to=""
                className='flex flex-row justify-center items-center gap-[5px] text-darkBlue-2 '
                >
                    <span>{icons.tumblr}</span>
                    <span className='text-[18px] font-[700]'>Tumblr</span>
                </Link>
                <Link to=""
                className='flex flex-row justify-center items-center gap-[5px] text-darkBlue-2 '
                >
                    <span>{icons.rss}</span>
                    <span className='text-[18px] font-[700]'>Rss</span>
                </Link>
                <Link to=""
                className='flex flex-row justify-center items-center gap-[5px] text-darkBlue-2 '
                >
                    <span>{icons.tiktok}</span>
                    <span className='text-[18px] font-[700]'>TikTok</span>
                </Link>
            </div>
        </div>
        <div className="p-4 flex flex-col md:flex-row justify-center items-center md:flex-wrap gap-[20px]">
            {words.map((word, index) => (
                <p key={index} className="text-base font-[700] text-darkBlue-2">
                {word}
                </p>
            ))}
        </div>
        <div className="flex flex-col gap-[20px]">
            <p className='text-darkBlue-2 font-[700] text-[17px] '>We are a partner</p>
            <p className='text-darkBlue-2 font-[600]'>All links to holiday offers that we include in articles, entries, rankings and lists lead to the website of our partner Wakacje.pl. Ninja Tourist Service is not an organizer of trips or tourist events.</p>
            <p className='italic'>If you click on links on TurystycznyNinja or use them to complete a product purchase, we may receive money from the seller. However, this does not affect which offers are published. The information and prices posted on the website do not constitute a commercial offer within the meaning of the provisions of the Civil Code.</p>
        </div>
        <div className="flex flex-col-reverse md:flex-row gap-[30px]  justify-between items-center border-t-[1px] border-t-[#ddd] py-[30px]">
            <p className='text-darkBlue-2 font-[500]'>Copyright © 2019-2022 TurystycznyNinja</p>
            <div className="flex justify-center items-center flex-col sm1:flex-row gap-[20px]">
                <Link to="" className='text-darkBlue-2'>Home</Link>
                <Link to="" className='text-darkBlue-2'>Opinions</Link>
                <Link to="" className='text-darkBlue-2'>Sitemap</Link>
                <Link to="" className='text-darkBlue-2'>contact</Link>
                <Link to="" className='text-darkBlue-2'>privacy policy</Link>
            </div>
        </div>
    </div>
  )
}

export default Footer