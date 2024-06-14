const destination= "Dubai"

const daily_weather = [
    {
        destination: "Dubai",
        date: "14/06/2024",
        temperature: 24,
        water_temperature: 20,
        humidity: 25,
        condition: 'Rainy',
        condition_hours: 5,
    },
    {
        destination: "Dubai",
        date: "15/06/2024",
        temperature: 18,
        water_temperature: null,
        humidity: 60,
        condition: 'Cloudy',
        condition_hours: 3,
    },
    {
        destination: "Dubai",
        date: "16/06/2024",
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
    }
];

const destination_info = [
    {
        destination: "Dubai",
        weather_description: "Dubai has a hot desert climate, characterized by extremely hot summers and mild winters. Precipitation is rare, and the city enjoys a lot of sunny days.",
        more_information: `<div><img src="https://example.com/dubai.jpg" alt="Dubai"><br/><p>Dubai is known for its modern architecture, luxurious shopping, and vibrant nightlife. It is a global city and business hub of the Middle East.</p></div>`,
    },
    {
        destination: "Dubai",
        weather_description: "Dubai has a temperate oceanic climate, with warm summers and cool winters. Rainfall is evenly distributed throughout the year.",
        more_information: `<div><img src="https://example.com/Dubai.jpg" alt="Dubai"><br/><p>Dubai, known as the City of Light, is famed for its art, fashion, gastronomy, and culture. Landmarks such as the Eiffel Tower and the Notre-Dame Cathedral are iconic.</p></div>`,
    },
    {
        destination: "Dubai",
        weather_description: "Dubai City experiences a humid subtropical climate, with hot, humid summers and cold winters. Snow is common in winter.",
        more_information: `<div><img src="https://example.com/newyork.jpg" alt="Dubai"><br/><p>Dubai City is known for its skyscrapers, Broadway shows, and bustling Times Square. It is a major cultural and financial center.</p></div>`,
    },
    {
        destination: "Dubai",
        weather_description: "Dubai has a humid subtropical climate, with hot, humid summers and mild winters. The city experiences a rainy season in June and typhoons in late summer.",
        more_information: `<div><img src="https://example.com/Dubai.jpg" alt="Dubai"><br/><p>Dubai is a bustling metropolis known for its skyscrapers, shopping, and entertainment. It is also rich in cultural and historical landmarks.</p></div>`,
    },
    {
        destination: "Dubai",
        weather_description: "Dubai has a humid subtropical climate, with warm summers and mild winters. Rainfall is fairly evenly spread throughout the year.",
        more_information: `<div><img src="https://example.com/Dubai.jpg" alt="Dubai"><br/><p>Dubai is known for its iconic Dubai Opera House and Harbour Bridge. The city offers beautiful beaches and vibrant cultural events.</p></div>`,
    }
];

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
];

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
];

const monthly_weather_description = [
    {
        destination: "Dubai",
        weather_description: "June is one of the hottest months in Dubai, with temperatures soaring above 40°C. It is best to avoid outdoor activities during the midday heat.",
        more_information: `<div><img src="https://example.com/dubai_june.jpg" alt="Dubai in June"><br/><p>Dubai in June is extremely hot. It is advisable to stay hydrated and avoid the sun during peak hours. Indoor activities and shopping in air-conditioned malls are popular.</p></div>`,
    },
    {
        destination: "Dubai",
        weather_description: "June in Dubai is pleasant, with temperatures ranging from 15-25°C. It is an ideal time for sightseeing and outdoor activities.",
        more_information: `<div><img src="https://example.com/Dubai_june.jpg" alt="Dubai in June"><br/><p>June in Dubai offers warm and pleasant weather, perfect for exploring the city's parks, gardens, and outdoor cafes. Major events like the French Open also take place in June.</p></div>`,
    },
    {
        destination: "Dubai",
        weather_description: "June in Dubai is warm, with temperatures between 18-27°C. It's a great time for outdoor events and exploring the city.",
        more_information: `<div><img src="https://example.com/newyork_june.jpg" alt="Dubai in June"><br/><p>Dubai in June is lively, with many outdoor concerts, street fairs, and cultural festivals. The pleasant weather makes it a great time to visit Central Park and other outdoor attractions.</p></div>`,
    },
    {
        destination: "Dubai",
        weather_description: "June marks the beginning of the rainy season in Dubai, with high humidity and frequent rain showers.",
        more_information: `<div><img src="https://example.com/Dubai_june.jpg" alt="Dubai in June"><br/><p>In June, Dubai experiences a lot of rain. It's a good time to explore indoor attractions such as museums, shopping malls, and traditional tea houses.</p></div>`,
    },
    {
        destination: "Dubai",
        weather_description: "June in Dubai is winter, with cool and mild weather. Temperatures range from 10-18°C.",
        more_information: `<div><img src="https://example.com/Dubai_june.jpg" alt="Dubai in June"><br/><p>Winter in Dubai is mild, making it a good time to visit for those who prefer cooler weather. The city's cultural events and indoor attractions are popular during this time.</p></div>`,
    }
];

export { destination, daily_weather, destination_info, faqs, monthly_faqs, monthly_weather_description };
