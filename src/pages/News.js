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

const News = () => {

  const [metaData, setMetadata] = useState(null);

  return (
    <>
        <Helmet>
        <meta charSet="utf-8" />
        <title>{metaData?.metaTitle ? `${metaData?.metaTitle }` : 'News'}</title>
        <link rel="canonical" href={metaData?.id ? `http://localhost:3000/news/news/${metaData?.id}` : 'http://localhost:3000/'} />
        {metaData?.metaDescription && <meta name="description" content={metaData.metaDescription} />}
        {metaData?.metaKeyWords && <meta name="keywords" content={metaData.metaKeyWords} />}
      </Helmet>
      <NavBar />
      <div className="mb-[100px]" >
        <div className="px-[10px] lg:px-[8%] hidden xl:flex flex-row py-[30px]" style={{ backgroundImage: `linear-gradient(90deg, #74ebd5, #9face6)` }}>
          <SearchBar />
        </div>
       
        <MainContainer setMetadata={setMetadata} />
      
        <BottomTabs />
      </div>
      <Footer />
    </>
  )
}

export default News
