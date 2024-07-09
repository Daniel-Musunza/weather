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

const News = () => {
  return (
    <>
      <NavBar />
      <div className="mb-[100px]" >
        <div className="px-[10px] md:px-[8%] hidden xl:flex flex-row py-[30px]" style={{ backgroundImage: `linear-gradient(90deg, #74ebd5, #9face6)` }}>
          <SearchBar />
        </div>
       
        <MainContainer />
      
        <BottomTabs />
      </div>
    </>
  )
}

export default News
