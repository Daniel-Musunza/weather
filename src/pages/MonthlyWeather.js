import React from 'react'
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
  return (
    <>
      <Helmet>
       <meta charSet="utf-8" />
      <title>Monthly Weather</title>
      <link rel="canonical" href="http://localhost:3000/Mauritius" />
                   
    </Helmet>
    <NavBar/>
    <div className="mb-[100px]" >
      <div className="px-[10px] md:px-[8%] hidden xl:flex flex-row py-[30px]" style={{backgroundImage: `linear-gradient(90deg, #74ebd5, #9face6)`}}>
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
      <MainContainer />
      {/* <div className="padding-x">
        <MoreInfo/>
      </div> */}
     <BottomTabs/>
    </div>
  
    </>
  )
}

export default MonthlyWeather
