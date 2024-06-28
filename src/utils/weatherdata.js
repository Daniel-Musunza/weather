
// const destinations = fetch('http://192.168.100.39:3000/api/destination')
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Network response was not ok ' + response.statusText);
//         }
//         return response.json();  // Removed the .data part
//     })
//     .then(data => {
//         console.log(data);

//         // Process the data and map to newDestinations
//         const newDestinations = data.map(x => {
//             return {
//                 id: x._id,
//                 destination: x.name,
//                 countryCode: x.countryCode,
//                 stationID: x.stationID
//             };
//         });

//         // Now you can use the newDestinations array
//         console.log(newDestinations);
//         // You can manipulate or display the newDestinations here
//     })
//     .catch(error => {
//         console.error('There has been a problem with your fetch operation:', error);
//     });

// const destinationData = fetch('192.168.100.39:3000/api/destination/667930fea0661dc370170cd8?startDate=2023-06-01&endDate=2023-06-10')
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Network response was not ok ' + response.statusText);
//         }
//         return response.json();  // Removed the .data part
//     })
//     .then(data => {
//         console.log(data);

//         // You can manipulate or display the newDestinations here
//     })
//     .catch(error => {
//         console.error('There has been a problem with your fetch operation:', error);
//     });

    
const destinations = [
    {
        id: "667930fea0661dc370170cd8",
        destination: "Dubai",
        countryCode: "AE",
        stationID: "41194",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170cd9",
        destination: "Abu Dhabi",
        countryCode: "AE",
        stationID: "41216",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170cda",
        destination: "Sharjah",
        countryCode: "AE",
        stationID: "41196",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170cdb",
        destination: "Ajman",
        countryCode: "AE",
        stationID: "41198",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170cdc",
        destination: "Al Ain",
        countryCode: "AE",
        stationID: "41218",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170cdd",
        destination: "New York",
        countryCode: "US",
        stationID: "KJRB0",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170cde",
        destination: "London",
        countryCode: "GB",
        stationID: "EGLC0",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170cdf",
        destination: "Paris",
        countryCode: "FR",
        stationID: "07156",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170ce0",
        destination: "Sydney",
        countryCode: "AU",
        stationID: "94767",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170ce1",
        destination: "Agadir",
        countryCode: "MA",
        stationID: "60250",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170ce2",
        destination: "Antalya",
        countryCode: "TR",
        stationID: "17300",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170ce3",
        destination: "Barcelona",
        countryCode: "ES",
        stationID: "08180",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170ce4",
        destination: "Benidorm",
        countryCode: "ES",
        stationID: "08359",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170ce5",
        destination: "Bodrum",
        countryCode: "TR",
        stationID: "17290",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170ce6",
        destination: "Cancun",
        countryCode: "MX",
        stationID: "76595",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170ce7",
        destination: "Cappadocia",
        countryCode: "TR",
        stationID: "17193",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170ce8",
        destination: "Corfu, Ionian Islands",
        countryCode: "GR",
        stationID: "16641",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170ce9",
        destination: "Costa Brava",
        countryCode: "ES",
        stationID: "08184",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170cea",
        destination: "Costa Del Sol (Benalmadena, Malaga, Marbella)",
        countryCode: "ES",
        stationID: "08482",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170ceb",
        destination: "Costa Dorada (Salou – Port Aventura)",
        countryCode: "ES",
        stationID: "08238",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170cec",
        destination: "Crete, Aegean Islands",
        countryCode: "GR",
        stationID: "16754",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170ced",
        destination: "Dalaman (Marmaris, Olu Deniz, Fethiye)",
        countryCode: "TR",
        stationID: "17295",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170cee",
        destination: "Dubrovnik and Islands",
        countryCode: "HR",
        stationID: "14472",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170cef",
        destination: "Fuerteventura, Canary Islands",
        countryCode: "ES",
        stationID: "60035",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170cf0",
        destination: "Gran Canaria",
        countryCode: "ES",
        stationID: "60030",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170cf1",
        destination: "Hammamet",
        countryCode: "TN",
        stationID: "60715",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170cf2",
        destination: "Hurghada",
        countryCode: "EG",
        stationID: "62463",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170cf3",
        destination: "Ibiza",
        countryCode: "ES",
        stationID: "08373",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170cf4",
        destination: "Istanbul",
        countryCode: "TR",
        stationID: "17062",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170cf5",
        destination: "Izmir (Kusadasi)",
        countryCode: "TR",
        stationID: "17220",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170cf6",
        destination: "Kos, Dodecanese Islands",
        countryCode: "GR",
        stationID: "16740",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170cf7",
        destination: "La Palma",
        countryCode: "ES",
        stationID: "60005",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170cf8",
        destination: "Lanzarote",
        countryCode: "ES",
        stationID: "60040",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170cf9",
        destination: "Larnaca",
        countryCode: "CY",
        stationID: "17609",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170cfa",
        destination: "Majorca",
        countryCode: "ES",
        stationID: "08307",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170cfb",
        destination: "Maldives",
        countryCode: "MV",
        stationID: "43588",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170cfc",
        destination: "Malta",
        countryCode: "MT",
        stationID: "LMMM0",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170cfd",
        destination: "Marrakech",
        countryCode: "MA",
        stationID: "60230",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170cfe",
        destination: "Mauritius",
        countryCode: "MU",
        stationID: "61995",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170cff",
        destination: "Menorca",
        countryCode: "ES",
        stationID: "08314",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170d00",
        destination: "Mykonos, Cyclades Islands",
        countryCode: "GR",
        stationID: "LGMK0",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170d01",
        destination: "Paphos",
        countryCode: "CY",
        stationID: "17600",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170d02",
        destination: "Punta Cana Area",
        countryCode: "DO",
        stationID: "78479",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170d03",
        destination: "Rhodes, Dodecanese Islands",
        countryCode: "GR",
        stationID: "16749",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170d04",
        destination: "Rome",
        countryCode: "IT",
        stationID: "16235",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170d05",
        destination: "Santorini",
        countryCode: "GR",
        stationID: "LGSR0",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170d06",
        destination: "Sharm El Sheikh",
        countryCode: "EG",
        stationID: "HESH0",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170d07",
        destination: "Split",
        countryCode: "HR",
        stationID: "14445",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170d08",
        destination: "Tenerife",
        countryCode: "ES",
        stationID: "60025",
        "__v": 0
    }
]

const daily_weather = [
    {
        destination: "Dubai",
        date: "30/06/2024",
        temperature: 24,
        water_temperature: 20,
        humidity: 25,
        condition: 'Rainy',
        condition_hours: 5,
    },
    {
        destination: "Dubai",
        date: "28/06/2024",
        temperature: 18,
        water_temperature: null,
        humidity: 60,
        condition: 'Cloudy',
        condition_hours: 3,
    },
    {
        destination: "Dubai",
        date: "29/06/2024",
        temperature: 22,
        water_temperature: null,
        humidity: 55,
        condition: 'Sunny',
        condition_hours: 10,
    },
    {
        destination: "Dubai",
        date: "22/07/2024",
        temperature: 26,
        water_temperature: null,
        humidity: 70,
        condition: 'Rainy',
        condition_hours: 7,
    },
    {
        destination: "Dubai",
        date: "23/07/2024",
        temperature: 20,
        water_temperature: 22,
        humidity: 50,
        condition: 'Cloudy',
        condition_hours: 6,
    },
    {
        destination: "Dubai",
        date: "22/08/2024",
        temperature: 26,
        water_temperature: null,
        humidity: 30,
        condition: 'Rainy',
        condition_hours: 7,
    },
    {
        destination: "Dubai",
        date: "23/09/2024",
        temperature: 24,
        water_temperature: 22,
        humidity: 40,
        condition: 'Cloudy',
        condition_hours: 6,
    },
    {
        destination: "Abu Dhabi",
        date: "22/06/2024",
        temperature: 24,
        water_temperature: 21,
        humidity: 25,
        condition: 'Rainy',
        condition_hours: 2,
    },
    {
        destination: "Abu Dhabi",
        date: "23/06/2024",
        temperature: 27,
        water_temperature: null,
        humidity: 20,
        condition: 'Cloudy',
        condition_hours: 1,
    },
    {
        destination: "Mombasa",
        date: "24/06/2024",
        temperature: 32,
        water_temperature: null,
        humidity: 45,
        condition: 'Sunny',
        condition_hours: 10,
    },
    {
        destination: "Sharjah",
        date: "22/07/2024",
        temperature: 22,
        water_temperature: null,
        humidity: 71,
        condition: 'Rainy',
        condition_hours: 4,
    },
    {
        destination: "Sharjah",
        date: "23/07/2024",
        temperature: 25,
        water_temperature: 22,
        humidity: 10,
        condition: 'Cloudy',
        condition_hours: 2,
    },
    {
        destination: "Ajman",
        date: "22/08/2024",
        temperature: 19,
        water_temperature: null,
        humidity: 34,
        condition: 'Rainy',
        condition_hours: 8,
    },
    {
        destination: "Al Ain",
        date: "23/09/2024",
        temperature: 23,
        water_temperature: 21,
        humidity: 30,
        condition: 'Cloudy',
        condition_hours: 4,
    }
]

const destination_info = [
    {
        destination: "Dubai",
        weather_description: "Dubai has a hot desert climate, characterized by extremely hot summers and mild winters. Precipitation is rare, and the city enjoys a lot of sunny days.",
        more_information: `<div> <h2 class='text-[22px] font-[600] text-darkBlue-2' >Temperatures and climate in Dubai</h2>
            <div class="flex flex-col  gap-[5px]">
                <img src="https://tour-dubai.com/TourDubai_admin/images/blog/64e3255e59b8a.png" className='w-full' alt=""
                class='rounded-[20px] h-[300px] md:h-[350px] lg:h-[400px] xl:h-[500px]'
                />
                <p class='flex flex-row justify-center items-center'>Dubai weather / Serenity-H / shutterstock.com</p>
            </div>
            <p className='text-[14px] text-darkBlue-2'>
                Paradise islands at the end of the world are perfect travel destinations for people looking for exoticism, sun and extraordinary landscapes. One of them is Dubai - a small island located in the Indian Ocean about a thousand kilometers from Madagascar. Tourists from all over the world will find everything they need for a perfect holiday here. When to go to Dubai? It is worth checking what the weather on the island is like over the course of twelve months. Dubai is located far from the most popular tourist destinations, which means that it is still a bit wild, untrodden and simply beautiful. The island was perfectly described by Mark Twain, who stated that God first created Dubai, and only then paradise. Virtually everything is paradise on the island - the extraordinary sandy beaches of Dubai, crystalline, azure water and unique, exotic nature. If we don't know when is the best time to go to Dubai, it is good to gain some knowledge about the climate on the island.
            </p></div>`,
    },
    {
        destination: "Paris",
        weather_description: "Paris has a temperate oceanic climate, with warm summers and cool winters. Rainfall is evenly distributed throughout the year.",
        more_information: `<div><img src="https://example.com/paris.jpg" alt="Paris"><br/><p>Paris, known as the City of Light, is famed for its art, fashion, gastronomy, and culture. Landmarks such as the Eiffel Tower and the Notre-Dame Cathedral are iconic.</p></div>`,
    },
    {
        destination: "New York",
        weather_description: "New York City experiences a humid subtropical climate, with hot, humid summers and cold winters. Snow is common in winter.",
        more_information: `<div><img src="https://example.com/newyork.jpg" alt="New York"><br/><p>New York City is known for its skyscrapers, Broadway shows, and bustling Times Square. It is a major cultural and financial center.</p></div>`,
    },
    {
        destination: "Tokyo",
        weather_description: "Tokyo has a humid subtropical climate, with hot, humid summers and mild winters. The city experiences a rainy season in June and typhoons in late summer.",
        more_information: `<div><img src="https://example.com/tokyo.jpg" alt="Tokyo"><br/><p>Tokyo is a bustling metropolis known for its skyscrapers, shopping, and entertainment. It is also rich in cultural and historical landmarks.</p></div>`,
    },
    {
        destination: "Sydney",
        weather_description: "Sydney has a humid subtropical climate, with warm summers and mild winters. Rainfall is fairly evenly spread throughout the year.",
        more_information: `<div><img src="https://example.com/sydney.jpg" alt="Sydney"><br/><p>Sydney is known for its iconic Sydney Opera House and Harbour Bridge. The city offers beautiful beaches and vibrant cultural events.</p></div>`,
    }
]

const faqs = [
    {
        destination: "Dubai",
        question: "What is the best time to visit Dubai?",
        answer: "The best time to visit Dubai is from November to March when the weather is cooler and more comfortable for outdoor activities.",
    },
    {
        destination: "Dubai",
        question: "What should I pack for a trip to Dubai?",
        answer: "Pack comfortable walking shoes, a mix of warm and cool clothing depending on the season, and a stylish outfit for dining out.",
    },
    {
        destination: "Dubai",
        question: "How do I get around Dubai City?",
        answer: "Dubai City has an extensive public transportation system, including subways and buses. Taxis and ride-sharing services are also widely available.",
    },
    {
        destination: "Dubai",
        question: "Is it easy to find English speakers in Dubai?",
        answer: "While not everyone in Dubai speaks English, many people, especially in tourist areas, can communicate in basic English. Signage in English is also common.",
    },
    {
        destination: "Dubai",
        question: "What are some must-see attractions in Dubai?",
        answer: "Must-see attractions in Dubai include the Dubai Opera House, Dubai Harbour Bridge, Bondi Beach, and Taronga Zoo.",
    }
]

const monthly_faqs = [
    {
        month: "June",
        destination: "Dubai",
        question: "What is the weather like in Dubai in June?",
        answer: "June in Dubai is extremely hot, with temperatures often exceeding 40°C. It is advisable to stay indoors during the peak heat hours.",
    },
    {
        month: "June",
        destination: "Dubai",
        question: "What events are happening in Dubai in June?",
        answer: "In June, Dubai hosts the Fête de la Musique, a city-wide music festival, and various outdoor events and exhibitions.",
    },
    {
        month: "June",
        destination: "Dubai",
        question: "Is June a good time to visit Dubai?",
        answer: "Yes, June is a great time to visit Dubai as the weather is warm and many outdoor events and activities are available.",
    },
    {
        month: "July",
        destination: "Dubai",
        question: "What should I expect in Dubai in July?",
        answer: "July is the rainy season in Dubai, so expect frequent showers and high humidity. It's a good idea to carry an umbrella.",
    },
    {
        month: "July",
        destination: "Dubai",
        question: "How is the weather in Dubai in July?",
        answer: "July in Dubai is winter, with mild temperatures around 13-18°C. It is a good time to visit if you prefer cooler weather.",
    }
]

const monthly_weather_description = [
    {
        destination: "Dubai",
        month: "June",
        weather_description: "June is one of the hottest months in Dubai, with temperatures soaring above 40°C. It is best to avoid outdoor activities during the midday heat.",
        more_information: `<div><img src="https://example.com/dubai_june.jpg" alt="Dubai in June"><br/><p>Dubai in June is extremely hot. It is advisable to stay hydrated and avoid the sun during peak hours. Indoor activities and shopping in air-conditioned malls are popular.</p></div>`,
    },
    {
        destination: "Dubai",
        month: "July",
        weather_description: "July in Dubai is pleasant, with temperatures ranging from 15-25°C. It is an ideal time for sightseeing and outdoor activities.",
        more_information: `<div><img src="https://example.com/Dubai_june.jpg" alt="Dubai in June"><br/><p>July in Dubai offers warm and pleasant weather, perfect for exploring the city's parks, gardens, and outdoor cafes. Major events like the French Open also take place in June.</p></div>`,
    },
    {
        destination: "Dubai",
        month: "September",
        weather_description: "September in Dubai is warm, with temperatures between 18-27°C. It's a great time for outdoor events and exploring the city.",
        more_information: `<div><img src="https://example.com/newyork_june.jpg" alt="Dubai in June"><br/><p>Dubai in September is lively, with many outdoor concerts, street fairs, and cultural festivals. The pleasant weather makes it a great time to visit Central Park and other outdoor attractions.</p></div>`,
    }
]

export { destinations, daily_weather, destination_info, faqs, monthly_faqs, monthly_weather_description };
