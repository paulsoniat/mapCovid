import React, { useEffect, useState } from "react";
import axios from 'axios';
import BacteriaLoader from '../Loaders/BacteriaLoader';
import { useParams } from 'react-router-dom';
import News from '../News/News.jsx';
import CountryTable from '../Tables/CountryTable.jsx';
import stateCountyColumns from '../../utils/stateTableColumns'
import CountryGraphOverTime from './CountryGraphOverTime';

const OtherCountry = ( { rootPath } ) => {

  const { name } = useParams();
  const [countryData, setCountryData] = useState(null);
  let [allDataOverTime, setAllDataOverTime] = useState(null);
  useEffect(()=>{

    if (!countryData && !allDataOverTime) {
      axios.get('https://api.thevirustracker.com/free-api?countryTotal=US')
      .then((res) => {
        console.log(res.data)
        setCountryData([
          {
             "info":{
            "ourid":167,
            "title":"USA",
            "code":"US",
            "source":"https://thevirustracker.com/usa-coronavirus-information-us"
             },
             "total_cases":3771101,
             "total_recovered":1741626,
             "total_unresolved":0,
             "total_deaths":142080,
             "total_new_cases_today":1089,
             "total_new_deaths_today":16,
             "total_active_cases":393,
             "total_serious_cases":1887395,
             "total_danger_rank":1}]);
      })
      axios.get(`https://corona.lmao.ninja/v2/historical/${name}?lastdays=90`)
    .then((res) => {
        const timelineData = res.data.timeline;
        allDataOverTime = [];
        allDataOverTime = Object.keys(res.data.timeline.cases);
        allDataOverTime = allDataOverTime.reduce((seed, key) => {
            
            seed.push({'day': key}); 
            return seed; 
        }, [])
        console.log(timelineData)
        allDataOverTime = allDataOverTime.map((key) => {
            for (const caseData in timelineData.cases) {
                if (caseData === key.day) {
                    key.cases = timelineData.cases[key.day]
                }
            }
            for (const deathData in timelineData.deaths) {
              if (deathData === key.day) {
                  key.deaths = timelineData.deaths[key.day]
              }
          }
            return key;
        });
        setAllDataOverTime(allDataOverTime)
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
                Stat Chart
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
