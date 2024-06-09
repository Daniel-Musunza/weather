import React from 'react'
import NavBar from './NavBar'
import icons from '../utils/icons'
import SearchBar from './SearchBar'
import WeatherDisplay from './WeatherDisplay'
import SearchForm from './SearchForm'
import BottomTabs from './ButtomTabs'
import MoreInfo from './MoreInfo'
import Footer from './Footer'
import MainContainer from './MainContainer'

const Home = () => {
  return (
    <>
    <NavBar/>
    <div className=" mt-[40px] mb-[100px]">
      <div className="padding-x hidden xl:flex flex-row items-center justify-center bg-darkBlue py-[30px]">
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
     
    </div>
  
    </>
  )
}

export default Home
