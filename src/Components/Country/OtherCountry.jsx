import React, { useEffect, useState } from "react";
import axios from 'axios';
import BacteriaLoader from '../Loaders/BacteriaLoader';
import { useParams } from 'react-router-dom';
import News from '../News/News.jsx';
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

    if (!countryData && !allDataOverTime && !newsData) {

      for (const country in countryDictionary) {
        
        if (name === countryDictionary[country]){
          setCountryCode(country);
        }
      }

      if (!allDataOverTime) {
        axios.get(`https://corona.lmao.ninja/v2/historical/${name}?lastdays=90`)
      .then((res) => {
          const timelineData = res.data.timeline;
          let everyFifthDay = allDataOverTime;
          everyFifthDay = [];
          everyFifthDay = Object.keys(res.data.timeline.cases);
          everyFifthDay = everyFifthDay.reduce((seed, key) => {
              const day = key.slice(0, -3)
              console.log(typeof(day), day, key);
              seed.push({'day': key}); 
              return seed; 
          }, []);
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
          const correctDays = []
          everyFifthDay.forEach((day, index) => {
            if (index % 5 === 0) {
              console.log(index, day)
              correctDays.push(day);
            }
          })
          console.log(correctDays);
          setAllDataOverTime(correctDays)
      }).catch((err) => {
        console.log(err);
        setAllDataOverTime('none')
      })
      .then(() => {
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
          axios.get(`https://api.smartable.ai/coronavirus/news/${countryCode ? countryCode : 'US'}`, config)
          .then((res) => {
            setNewsData(res.data.news);
          })
        })
        })
      }
    }
  });

if (name && countryData && allDataOverTime && newsData) {
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
              {allDataOverTime !== 'none' ? (
                <CountryGraphOverTime data={allDataOverTime}/>
              ) : 
                <div>
                  Can't retrieve data at this time
                </div>}
            </div>
        </div>
        <div className="country-column">
            <div className="country-full-half">
            {newsData !== null ? ( 
                <CountryNews newsData={newsData}/>
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
