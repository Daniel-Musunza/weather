import React from 'react'
import NavBar from './NavBar'
import icons from '../utils/icons'

const Home = () => {
  return (
    <>
    <NavBar/>
    <div className="">
      <div className="flex flex-row items-center">
        <form action="">
          <div className="flex flex-col">
            <label htmlFor="">Direction</label>
            <div className="relative w-full">
            <input
                  type="text"
                  className="w-full pl-3 pr-10 py-2 border-[2px] border-[#7286D3] focus:outline-none rounded-[10px]"
                  placeholder="Search..."
              />
              <div className="absolute inset-y-0 left-0 flex items-center pr-3">
                  <div className="flex items-center justify-center bg-[#7286D3] w-8 h-8 rounded-[10px]">
                      <span className='text-white'>{icons.search}</span>
                  </div>
              </div>
          </div>
          </div>
        </form>
      </div>
    </div>
    </>
  )
}

export default Home
