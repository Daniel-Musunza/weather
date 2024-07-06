
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

export { destinations };
