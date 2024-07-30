import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import NavBar from '../components/NavBar';
import SearchBar from '../components/SearchBar';
import MainContainer from '../components/MainContainer';
import Footer from '../components/Footer';

const Beaches = () => {
  const [metaData, setMetadata] = useState(null);

  return (
    <>
     <Helmet>


        <meta charSet="utf-8" />
        <title>{metaData?.destination ? `${metaData.destination} Weather` : 'Beaches'}</title>
        <link rel="canonical" href={metaData?.destination ? `http://localhost:3000/${metaData.destination}` : 'http://localhost:3000/'} />
        {metaData?.destinationMetaDescription && <meta name="description" content={metaData.destinationMetaDescription} />}
        {metaData?.destinationMetaKeyWords && <meta name="keywords" content={metaData.destinationMetaKeyWords} />}
      </Helmet>

      <NavBar />
      <div className="mb-[100px]">
        <div className="px-[10px] md:px-[8%] hidden xl:flex flex-row py-[30px]" style={{ backgroundImage: `linear-gradient(90deg, #74ebd5, #9face6)` }}>
          <SearchBar />
        </div>
        <MainContainer setMetadata={setMetadata} />
      </div>
      <Footer />
    </>
  );
};

export default Beaches;
