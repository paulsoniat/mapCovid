import React, { useEffect, useState } from "react";
import axios from 'axios';
import BacteriaLoader from '../Loaders/BacteriaLoader';
import { useParams } from 'react-router-dom';
import CountryTable from '../Tables/CountryTable.jsx';
import stateCountyColumns from '../../utils/stateTableColumns'
import CountryGraphOverTime from './CountryGraphOverTime';
import countryDictionary from '../../utils/Data/countryDictionary';
import CountryStatChart from './CountryStatChart';
import CountryNews from "../News/CountryNews";

const OtherCountry = ( { rootPath } ) => {

  const { name } = useParams();
  const [countryData, setCountryData] = useState(null);
  const [allDataOverTime, setAllDataOverTime] = useState(null);
  const [countryCode, setCountryCode] = useState(null);
  
  const [newsData, setNewsData] = useState(null);

  useEffect(()=>{

    if (!countryData && !newsData) {

      for (const country in countryDictionary) {
        
        if (name === countryDictionary[country]){
          setCountryCode(country);
        }
      }
          try {
            let countryShortCode;
            for (const country in countryDictionary) {
        
              if (name === countryDictionary[country]){
                countryShortCode = country;
              }
            }
            axios.get(`https://api.thevirustracker.com/free-api?countryTotal=${countryCode}`)
            .then((res) => {
              let countryStatisticsResults;
              res.data.countrydata === 'none' ? countryStatisticsResults = 'none' : countryStatisticsResults = res.data.countrydata;
              setCountryData(countryStatisticsResults);
            }).then(()=> {
              let config = {
                headers : {
                  'Subscription-Key': '3009d4ccc29e4808af1ccc25c69b4d5d' 
                }
              }
              if (countryCode) {
                axios.get(`https://api.smartable.ai/coronavirus/news/${countryCode}`, config)
                .then((res) => {
                  setNewsData(res.data.news);
                })
                .catch((err) => {
                  
                  setNewsData([])
                })
              }
            })
          }
          catch(err) {
            setAllDataOverTime('none');
          }
        }
  }, [countryData, newsData, name, countryCode]);

if (name && countryData && newsData) {
  return (
    <>
      <div className="country-container">
          <div className="country-table">
            <CountryTable data={countryData} columns={stateCountyColumns} />
          </div>
    <div className="column-container">
        <div className="country-column">
            <div className="country-quarter-display">
                <CountryStatChart data={countryData} />
            </div>
            <div className="country-quarter-display-sticky">
            </div>
        </div>
        <div className="country-column">
            <div className="country-full-half">
            {newsData !== null ? ( 
                <CountryNews newsData={newsData} country={name}/>
              ) : 
                <div>
                  Can't retrieve data at this time
                </div>}
            </div>
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
