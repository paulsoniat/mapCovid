import React, { useEffect, useState } from "react";
import axios from 'axios';
import BacteriaLoader from '../Loaders/BacteriaLoader';
import { useParams } from 'react-router-dom';
import News from '../News/News.jsx';
import CountryTable from '../Tables/CountryTable.jsx';
import stateCountyColumns from '../../utils/stateTableColumns'
import CountryGraphOverTime from './CountryGraphOverTime';
import countryDictionary from '../../utils/Data/countryDictionary';
import Country from "../News/News.jsx";
import CountryStatChart from './CountryStatChart';

const OtherCountry = ( { rootPath } ) => {

  const { name } = useParams();
  const [countryData, setCountryData] = useState(null);
  const [allDataOverTime, setAllDataOverTime] = useState(null);
  const [countryCode, setCountryCode] = useState(null);

  useEffect(()=>{

    if (!countryData && !allDataOverTime) {

      for (const country in countryDictionary) {
        
        if (name === countryDictionary[country]){
          console.log(country);
          setCountryCode(country);
          console.log(countryCode, 'couintry code!@!@#!@#')
        }
      }

      
      axios.get(`https://corona.lmao.ninja/v2/historical/${name}?lastdays=90`)
    .then((res) => {
        const timelineData = res.data.timeline;
        let everyFifthDay = allDataOverTime;
        everyFifthDay = [];
        everyFifthDay = Object.keys(res.data.timeline.cases);
        everyFifthDay = everyFifthDay.reduce((seed, key) => {
            
            seed.push({'day': key}); 
            return seed; 
        }, [])
        console.log(timelineData)
        everyFifthDay = everyFifthDay.map((key) => {
            for (const caseData in timelineData.cases) {
                if (caseData === key.day) {
                    key.cases = timelineData.cases[key.day]
                }
            }
            for (const deathData in timelineData.deaths) {
              if (deathData === key.day) {
                /*
                  key.day = key.day.slice(0, -3)
                  console.log(typeof(key.day), key.day)*/
                  key.deaths = timelineData.deaths[key.day]
              }
          }
            return key;
        });
        everyFifthDay.forEach((day, index) => {
          if (index % 5 === 0) {
            everyFifthDay.push(day);
          }
        })
        setAllDataOverTime(everyFifthDay)
    })
    .then(() => {
      axios.get(`https://api.thevirustracker.com/free-api?countryTotal=${countryCode}`)
      .then((res) => {
        let countryStatisticsResults;
        res.data.countrydata === 'none' ? countryStatisticsResults = 'none' : countryStatisticsResults = res.data.countrydata;
        console.log(res.data.countrydata, 'this is data')
        setCountryData(countryStatisticsResults);
      });
    })
    }
  });

if (name && countryData && allDataOverTime) {
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
                <CountryGraphOverTime data={allDataOverTime}/>
            </div>
        </div>
        <div className="country-column">
            <div className="country-full-half">
                <News />
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
