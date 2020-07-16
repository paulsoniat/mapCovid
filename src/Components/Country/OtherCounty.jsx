import React, { useEffect, useState } from "react";
import axios from 'axios';
import BacteriaLoader from '../Loaders/BacteriaLoader';
import { useParams } from 'react-router-dom';
import News from '../News/News.jsx';
import CountryTable from '../Tables/CountryTable.jsx';
import stateCountyColumns from '../../utils/stateCountyColumns'

const OtherCountry = ( { rootPath } ) => {

  const { name } = useParams();

  useEffect(()=>{
    axios.get('https://api.thevirustracker.com/free-api?countryTotal=US')
    .then((res) => {
      console.log(res);
    })
  });

if (name) {
  return (
    <>
      <div className="country-container">
          <div className="country-table">
            
          </div>
        <div className="country-column">
            <div className="country-quarter-display">
                Stat Chart
            </div>
            <div className="country-quarter-display">
                Statistic Chart
            </div>
        </div>
        <div className="country-column">
            <div className="country-full-half">
                <News />
            </div>
        </div>
      </div>
    </>
  );
}
else {
  return (
    <BacteriaLoader />
  )
}
};

export default OtherCountry;
