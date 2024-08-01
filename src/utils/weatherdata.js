
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
        destinationNumber: "65",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170cd9",
        destination: "Abu Dhabi",
        countryCode: "AE",
        stationID: "41216",
        destinationNumber: "64",
        "__v": 0
    },
    // {
    //     id: "667930fea0661dc370170cda",
    //     destination: "Sharjah",
    //     countryCode: "AE",
    //     stationID: "41196",
    //     destinationNumber: "65",
    //     "__v": 0
    // },
    // {
    //     id: "667930fea0661dc370170cdb",
    //     destination: "Ajman",
    //     countryCode: "AE",
    //     stationID: "41198",
    //     destinationNumber: "65",
    //     "__v": 0
    // },
    // {
    //     id: "667930fea0661dc370170cdc",
    //     destination: "Al Ain",
    //     countryCode: "AE",
    //     stationID: "41218",
    //     destinationNumber: "65",
    //     "__v": 0
    // },
    // {
    //     id: "667930fea0661dc370170cdd",
    //     destination: "New York",
    //     countryCode: "US",
    //     stationID: "KJRB0",
    //     destinationNumber: "65",
    //     "__v": 0
    // },
    // {
    //     id: "667930fea0661dc370170cde",
    //     destination: "London",
    //     countryCode: "GB",
    //     stationID: "EGLC0",
    //     destinationNumber: "65",
    //     "__v": 0
    // },
    {
        id: "667930fea0661dc370170cdf",
        destination: "Paris",
        countryCode: "FR",
        stationID: "07156",
        destinationNumber: "21",
        "__v": 0
    },
    // {
    //     id: "667930fea0661dc370170ce0",
    //     destination: "Sydney",
    //     countryCode: "AU",
    //     stationID: "94767",
    //     destinationNumber: "65",
    //     "__v": 0
    // },
    {
        id: "667930fea0661dc370170ce1",
        destination: "Agadir",
        countryCode: "MA",
        stationID: "60250",
        destinationNumber: "45",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170ce2",
        destination: "Antalya",
        countryCode: "TR",
        stationID: "17300",
        destinationNumber: "58",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170ce3",
        destination: "Barcelona",
        countryCode: "ES",
        stationID: "08180",
        destinationNumber: "47",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170ce4",
        destination: "Benidorm",
        countryCode: "ES",
        stationID: "08359",
        destinationNumber: "48",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170ce5",
        destination: "Bodrum",
        countryCode: "TR",
        stationID: "17290",
        destinationNumber: "59",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170ce6",
        destination: "Cancun",
        countryCode: "MX",
        stationID: "76595",
        destinationNumber: "43",
        "__v": 0
    },
    // {
    //     id: "667930fea0661dc370170ce7",
    //     destination: "Cappadocia",
    //     countryCode: "TR",
    //     stationID: "17193",
    //     destinationNumber: "65",
    //     "__v": 0
    // },
    {
        id: "667930fea0661dc370170ce8",
        destination: "Corfu, Ionian Islands",
        countryCode: "GR",
        stationID: "16641",
        destinationNumber: "23",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170ce9",
        destination: "Costa Brava",
        countryCode: "ES",
        stationID: "08184",
        destinationNumber: "49",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170cea",
        destination: "Costa Del Sol (Benalmadena, Malaga, Marbella)",
        countryCode: "ES",
        stationID: "08482",
        destinationNumber: "52",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170ceb",
        destination: "Costa Dorada (Salou – Port Aventura)",
        countryCode: "ES",
        stationID: "08238",
        destinationNumber: "53",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170cec",
        destination: "Crete, Aegean Islands",
        countryCode: "GR",
        stationID: "16754",
        destinationNumber: "24",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170ced",
        destination: "Dalaman (Marmaris, Olu Deniz, Fethiye)",
        countryCode: "TR",
        stationID: "17295",
        destinationNumber: "60",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170cee",
        destination: "Dubrovnik and Islands",
        countryCode: "HR",
        stationID: "14472",
        destinationNumber: "13",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170cef",
        destination: "Fuerteventura, Canary Islands",
        countryCode: "ES",
        stationID: "60035",
        destinationNumber: "8",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170cf0",
        destination: "Gran Canaria",
        countryCode: "ES",
        stationID: "60030",
        destinationNumber: "9",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170cf1",
        destination: "Hammamet",
        countryCode: "TN",
        stationID: "60715",
        destinationNumber: "63",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170cf2",
        destination: "Hurghada",
        countryCode: "EG",
        stationID: "62463",
        destinationNumber: "19",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170cf3",
        destination: "Ibiza",
        countryCode: "ES",
        stationID: "08373",
        destinationNumber: "2",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170cf4",
        destination: "Istanbul",
        countryCode: "TR",
        stationID: "17062",
        destinationNumber: "61",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170cf5",
        destination: "Izmir (Kusadasi)",
        countryCode: "TR",
        stationID: "17220",
        destinationNumber: "62",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170cf6",
        destination: "Kos, Dodecanese Islands",
        countryCode: "GR",
        stationID: "16740",
        destinationNumber: "26",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170cf7",
        destination: "La Palma",
        countryCode: "ES",
        stationID: "60005",
        destinationNumber: "10",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170cf8",
        destination: "Lanzarote",
        countryCode: "ES",
        stationID: "60040",
        destinationNumber: "11",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170cf9",
        destination: "Larnaca",
        countryCode: "CY",
        stationID: "17609",
        destinationNumber: "16",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170cfa",
        destination: "Majorca",
        countryCode: "ES",
        stationID: "08307",
        destinationNumber: "3",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170cfb",
        destination: "Maldives",
        countryCode: "MV",
        stationID: "43588",
        destinationNumber: "41",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170cfc",
        destination: "Malta",
        countryCode: "MT",
        stationID: "LMMM0",
        destinationNumber: "40",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170cfd",
        destination: "Marrakech",
        countryCode: "MA",
        stationID: "60230",
        destinationNumber: "46",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170cfe",
        destination: "Mauritius",
        countryCode: "MU",
        stationID: "61995",
        destinationNumber: "42",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170cff",
        destination: "Menorca",
        countryCode: "ES",
        stationID: "08314",
        destinationNumber: "4",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170d00",
        destination: "Mykonos, Cyclades Islands",
        countryCode: "GR",
        stationID: "LGMK0",
        destinationNumber: "27",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170d01",
        destination: "Paphos",
        countryCode: "CY",
        stationID: "17600",
        destinationNumber: "17",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170d02",
        destination: "Punta Cana Area",
        countryCode: "DO",
        stationID: "78479",
        destinationNumber: "18",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170d03",
        destination: "Rhodes, Dodecanese Islands",
        countryCode: "GR",
        stationID: "16749",
        destinationNumber: "28",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170d04",
        destination: "Rome",
        countryCode: "IT",
        stationID: "16235",
        destinationNumber: "33",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170d05",
        destination: "Santorini",
        countryCode: "GR",
        stationID: "LGSR0",
        destinationNumber: "30",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170d06",
        destination: "Sharm El Sheikh",
        countryCode: "EG",
        stationID: "HESH0",
        destinationNumber: "20",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170d07",
        destination: "Split",
        countryCode: "HR",
        stationID: "14445",
        destinationNumber: "15",
        "__v": 0
    },
    {
        id: "667930fea0661dc370170d08",
        destination: "Tenerife",
        countryCode: "ES",
        stationID: "60025",
        destinationNumber: "12",
        "__v": 0
    }
]

export { destinations };
