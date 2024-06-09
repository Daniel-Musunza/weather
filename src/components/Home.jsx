import React from 'react'
import NavBar from './NavBar'
import icons from '../utils/icons'
import SearchBar from './SearchBar'
import WeatherDisplay from './WeatherDisplay'
import SearchForm from './SearchForm'
import BottomTabs from './ButtomTabs'

const Home = () => {
  return (
    <>
    <NavBar/>
    <div className="mt-[40px]">
      <div className="padding-x hidden xl:flex flex-row items-center justify-center bg-darkBlue py-[30px]">
        <SearchBar/>
      </div>
      <div className="padding-x flex flex-col gap-[10px] mt-[30px]">
        <h1 className='text-darkBlue-2 font-[900] text-[35px]'>Mauritius weather</h1>
        <div className="flex flex-row items-center gap-[10px]">
          <p className='bg-[#11009E] px-[20px] py-[5px] text-white text-[13px] font-[800] rounded-[8px]'>WEATHER</p>
          <span>
            <img src="../../images/icons/angle-right.svg" alt=""
            className='h-[20px] w-[20px]'
             />
          </span>
          <p className='bg-[#11009E] px-[20px] py-[5px] text-white text-[13px] font-[800] rounded-[8px]'>MAURITIUS</p>
        </div>
      </div>
      <div className="padding-x flex flex-col xl:flex-row justify-center gap-[30px]  mt-[40px] w-[100%] ">
          <div className="w-[100%] xl:w-[70%]">
              <WeatherDisplay />
          </div>
          <div className="w-[100%] xl:w-[30%] ">
              <SearchForm />
          </div>
      </div>
      <BottomTabs/>
    </div>
    </>
  )
}

export default Home
