import React from 'react'
import NavBar from './NavBar'
import icons from '../utils/icons'
import SearchBar from './SearchBar'

const Home = () => {
  return (
    <>
    <NavBar/>
    <div className="mt-[40px]">
      <div className="padding-x flex flex-row items-center justify-center bg-darkBlue py-[30px]">
        <SearchBar/>
      </div>
    </div>
    </>
  )
}

export default Home
