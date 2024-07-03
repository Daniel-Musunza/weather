import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const MoreInfo = () => {

    const holidaysData = [
        {
            title: "WARM COUNTRIES",
            hint: " WHERE TO GO ON VACATION",
            text: "Where to go on holiday in March? The 10 warmest holiday destinations in winter",
            image: "../../images/photos/Gdzie-na-wakacje-w-marcu-10-najcieplejszych-kierunkow-na-wakacje-zima-iStock.com-vovashevchuk-150x150.webp"
        },
        {
            title: "WARM COUNTRIES",
            hint: " WHERE TO GO ON VACATION",
            text: "Where to go on holiday in March? The 10 warmest holiday destinations in winter",
            image: "../../images/photos/Gdzie-na-wakacje-w-marcu-10-najcieplejszych-kierunkow-na-wakacje-zima-iStock.com-vovashevchuk-150x150.webp"
        },
        {
            title: "WARM COUNTRIES",
            hint: " WHERE TO GO ON VACATION",
            text: "Where to go on holiday in March? The 10 warmest holiday destinations in winter",
            image: "../../images/photos/Gdzie-na-wakacje-w-marcu-10-najcieplejszych-kierunkow-na-wakacje-zima-iStock.com-vovashevchuk-150x150.webp"
        },
        {
            title: "WARM COUNTRIES",
            hint: " WHERE TO GO ON VACATION",
            text: "Where to go on holiday in March? The 10 warmest holiday destinations in winter",
            image: "../../images/photos/Gdzie-na-wakacje-w-marcu-10-najcieplejszych-kierunkow-na-wakacje-zima-iStock.com-vovashevchuk-150x150.webp"
        },
        {
            title: "WARM COUNTRIES",
            hint: " WHERE TO GO ON VACATION",
            text: "Where to go on holiday in March? The 10 warmest holiday destinations in winter",
            image: "../../images/photos/Gdzie-na-wakacje-w-marcu-10-najcieplejszych-kierunkow-na-wakacje-zima-iStock.com-vovashevchuk-150x150.webp"
        },
        {
            title: "WARM COUNTRIES",
            hint: " WHERE TO GO ON VACATION",
            text: "Where to go on holiday in March? The 10 warmest holiday destinations in winter",
            image: "../../images/photos/Gdzie-na-wakacje-w-marcu-10-najcieplejszych-kierunkow-na-wakacje-zima-iStock.com-vovashevchuk-150x150.webp"
        },
        {
            title: "WARM COUNTRIES",
            hint: " WHERE TO GO ON VACATION",
            text: "Where to go on holiday in March? The 10 warmest holiday destinations in winter",
            image: "../../images/photos/Gdzie-na-wakacje-w-marcu-10-najcieplejszych-kierunkow-na-wakacje-zima-iStock.com-vovashevchuk-150x150.webp"
        },
        {
            title: "WARM COUNTRIES",
            hint: " WHERE TO GO ON VACATION",
            text: "Where to go on holiday in March? The 10 warmest holiday destinations in winter",
            image: "../../images/photos/Gdzie-na-wakacje-w-marcu-10-najcieplejszych-kierunkow-na-wakacje-zima-iStock.com-vovashevchuk-150x150.webp"
        },
    ] 

    const weatherData = [
        {
            title: "ATTRACTIONS . WEATHER",
            text: "Mauritius weather. When to go to Mauritius?",
            image: "../../images/photos/Mauritius-–-pogoda.-Kiedy-jechac-na-Mauritius-shutterstock.com-Myroslava-Bozhko-150x150.webp"
        },
        {
            title: "ATTRACTIONS . WEATHER",
            text: "Mauritius weather. When to go to Mauritius?",
            image: "../../images/photos/Mauritius-–-pogoda.-Kiedy-jechac-na-Mauritius-shutterstock.com-Myroslava-Bozhko-150x150.webp"
        },
        {
            title: "ATTRACTIONS . WEATHER",
            text: "Mauritius weather. When to go to Mauritius?",
            image: "../../images/photos/Mauritius-–-pogoda.-Kiedy-jechac-na-Mauritius-shutterstock.com-Myroslava-Bozhko-150x150.webp"
        },
        {
            title: "ATTRACTIONS . WEATHER",
            text: "Mauritius weather. When to go to Mauritius?",
            image: "../../images/photos/Mauritius-–-pogoda.-Kiedy-jechac-na-Mauritius-shutterstock.com-Myroslava-Bozhko-150x150.webp"
        },
        {
            title: "ATTRACTIONS . WEATHER",
            text: "Mauritius weather. When to go to Mauritius?",
            image: "../../images/photos/Mauritius-–-pogoda.-Kiedy-jechac-na-Mauritius-shutterstock.com-Myroslava-Bozhko-150x150.webp"
        },
        {
            title: "ATTRACTIONS . WEATHER",
            text: "Mauritius weather. When to go to Mauritius?",
            image: "../../images/photos/Mauritius-–-pogoda.-Kiedy-jechac-na-Mauritius-shutterstock.com-Myroslava-Bozhko-150x150.webp"
        },
        {
            title: "ATTRACTIONS . WEATHER",
            text: "Mauritius weather. When to go to Mauritius?",
            image: "../../images/photos/Mauritius-–-pogoda.-Kiedy-jechac-na-Mauritius-shutterstock.com-Myroslava-Bozhko-150x150.webp"
        },
    ]

    const newsData = [
        {
            title: "THE NEWS",
            text: "Greece and Thassos on lasta. Pools, beach, beautiful views and lots of sun. From PLN 1,179/person.",
            image: "../../images/photos/1652120053-1200-800-150x150.webp"
        },
        {
            title: "THE NEWS",
            text: "Greece and Thassos on lasta. Pools, beach, beautiful views and lots of sun. From PLN 1,179/person.",
            image: "../../images/photos/1652120053-1200-800-150x150.webp"
        },
        {
            title: "THE NEWS",
            text: "Greece and Thassos on lasta. Pools, beach, beautiful views and lots of sun. From PLN 1,179/person.",
            image: "../../images/photos/1652120053-1200-800-150x150.webp"
        },
        {
            title: "THE NEWS",
            text: "Greece and Thassos on lasta. Pools, beach, beautiful views and lots of sun. From PLN 1,179/person.",
            image: "../../images/photos/1652120053-1200-800-150x150.webp"
        },
        {
            title: "THE NEWS",
            text: "Greece and Thassos on lasta. Pools, beach, beautiful views and lots of sun. From PLN 1,179/person.",
            image: "../../images/photos/1652120053-1200-800-150x150.webp"
        },
        {
            title: "THE NEWS",
            text: "Greece and Thassos on lasta. Pools, beach, beautiful views and lots of sun. From PLN 1,179/person.",
            image: "../../images/photos/1652120053-1200-800-150x150.webp"
        },
        {
            title: "THE NEWS",
            text: "Greece and Thassos on lasta. Pools, beach, beautiful views and lots of sun. From PLN 1,179/person.",
            image: "../../images/photos/1652120053-1200-800-150x150.webp"
        },
        {
            title: "THE NEWS",
            text: "Greece and Thassos on lasta. Pools, beach, beautiful views and lots of sun. From PLN 1,179/person.",
            image: "../../images/photos/1652120053-1200-800-150x150.webp"
        },
    ]
  return (
    <div className="flex flex-col lg:flex-row justify-between gap-[40px] mt-[80px] ">
        <div className="flex flex-col gap-[30px]">
            <div className="flex flex-col gap-[20px]">
                <h1 className='text-[22px] font-[700] text-darkBlue-2'>Where to go on holiday:</h1>
            </div>
            <div className="flex flex-col gap-[20px]">
                {holidaysData.map((obj) => (
                    <div className="flex flex-row gap-[20px]">
                        <img src={obj.image} alt=""
                        className='h-[100px] w-[100px] rounded-[8px] '
                        />
                        <div className="flex flex-col gap-[3px] ">
                            <h2 className='text-[15px] font-[700] text-darkBlue-2 '>{obj.title}</h2>
                            <h2 className='text-[15px] font-[700] text-darkBlue-2 '>{obj.hint}</h2>
                            <p className='text-darkBlue-2 font-[400]' >{obj.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <div className="flex flex-col gap-[30px]">
            <div className="flex flex-col gap-[20px]">
                <h1 className='text-[22px] font-[700] text-darkBlue-2'>Weather:</h1>
            </div>
            <div className="flex flex-col gap-[20px]">
                {weatherData.map((obj) => (
                    <div className="flex flex-row gap-[20px]">
                        <img src={obj.image} alt=""
                        className='h-[100px] w-[100px] rounded-[8px] '
                        />
                        <div className="flex flex-col gap-[3px] ">
                            <h2 className='text-[15px] font-[700] text-darkBlue-2 '>{obj.title}</h2>
                            <p className='text-darkBlue-2 font-[400]' >{obj.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <div className="flex flex-col gap-[30px]">
            <div className="flex flex-col gap-[20px]">
                <h1 className='text-[22px] font-[700] text-darkBlue-2'>The news:</h1>
            </div>
            <div className="flex flex-col gap-[20px]">
                {newsData.map((obj) => (
                    <Link to={`/where-to-go/month/${obj.id}`} className="flex flex-row gap-[20px]">
                        <img src={obj.image} alt=""
                        className='h-[100px] w-[100px] rounded-[8px] '
                        />
                        <div className="flex flex-col gap-[3px] ">
                            <h2 className='text-[15px] font-[700] text-darkBlue-2 '>{obj.title}</h2>
                            <p className='text-darkBlue-2 font-[400]' >{obj.text}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    </div>
  )
}

export default MoreInfo