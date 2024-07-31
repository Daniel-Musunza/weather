import React, { useState } from 'react';
import NavBar from '../components/NavBar'
import icons from '../utils/icons'
import SearchBar from '../components/SearchBar'
import WeatherDisplay from '../components/WeatherDisplay'
import SearchForm from '../components/SearchForm'
import BottomTabs from '../components/ButtomTabs'
import MoreInfo from '../components/MoreInfo'
import Footer from '../components/Footer'
import MainContainer from '../components/MainContainer'
import {Helmet} from "react-helmet";

const MonthlyWeather = () => {

  const [metaData, setMetadata] = useState(null);
  
  return (
    <>
 <Helmet>


<meta charSet="utf-8" />
<title>{metaData?.month ? `${metaData.month} Weather ${metaData.destination}` : 'Monthly Weather Information'}</title>
<link rel="canonical" href={metaData?.destination ? `http://localhost:3000/${metaData.destination}/${metaData.month}` : 'http://localhost:3000/'} />
{metaData?.monthlyMetaDescription && <meta name="description" content={metaData.monthlyMetaDescription} />}
{metaData?.monthlyMetaKeyWords && <meta name="keywords" content={metaData.monthlyMetaKeyWords} />}
</Helmet>
    <NavBar/>
    <div className="mb-[100px]" >
      <div className="px-[10px] lg:px-[8%] hidden xl:flex flex-row py-[30px]" style={{backgroundImage: `linear-gradient(90deg, #74ebd5, #9face6)`}}>
        <SearchBar/>
      </div>
      {/* <div className="padding-x flex flex-col xl:flex-row justify-center gap-[30px]  mt-[40px] w-[100%] ">
          <div className="w-[100%] xl:w-[70%] ">
              <WeatherDisplay />
          </div>
          <div className="w-[100%] xl:w-[30%]  ">
              <SearchForm />
          </div>
      </div> */}
 <MainContainer setMetadata={setMetadata} />
      {/* <div className="padding-x">
        <MoreInfo/>
      </div> */}
     <BottomTabs/>
    </div>
    <Footer />
    </>
  )
}

export default MonthlyWeather
