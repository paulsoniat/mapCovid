import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import BacteriaLoader from '../Loaders/BacteriaLoader';
import StateTable from './StateTable';
import stateCountyColumns from '../../utils/stateCountyColumns';
import StateTotalTable from '../../Components/State/StateTotalTable'
import News from '../News/News.jsx'
import stateDictionary from '../../utils/Data/stateDictionary';

const State = () => {
  const [selectedCounties, setSelectedCounties] = useState(null);

  const { name } = useParams();
  const [countyData, setCountyData] = useState(null);
  const [newsData, setNewsData] = useState(null);
  
  useEffect(() => {

      let stateAbr = null;

      for (const stateAbrev in stateDictionary) {
        if (stateDictionary[stateAbrev] === name) {
          stateAbr = stateAbrev;
        }
      }

      axios.get('https://covid19-us-api.herokuapp.com/county')
      .then((res) => {
        let stateCounties = [];
        const countyData = {newDeaths: 0, confirmedCases: 0, newCases:0}
        res.data.message.forEach((county) => {
          if (county.state_name === name) {
            countyData.newDeaths = countyData.newDeaths += county.death;
            countyData.confirmedCases = countyData.confirmedCases += county.confirmed;
            countyData.newCases = countyData.newCases += county.new;
            stateCounties.push(county);
          }
        })
        axios.post('https://covid19-us-api.herokuapp.com/news', {
          "state": `${stateAbr}`,
          "topic": "Coronavirus"
      }).then((res) => {
        if (!newsData) {
          setNewsData (res.data);
          setCountyData([countyData])
          setSelectedCounties(stateCounties);
        }
      })
      });
  });
  
    if (selectedCounties && countyData && newsData) {
      return (
        <>
        <div className="state-container">
          <div className="state-table-container">

        <StateTable data={selectedCounties} columns={stateCountyColumns}/>
          </div>
        <div className="column-container">
        <div className="state-column">
            <div className="state-quarter-display">
                <StateTotalTable data={countyData} />
            </div>
        </div>
        <div className="state-column">
            <div className="state-full-half">
            {newsData !== null ? ( 
                <News newsData={newsData}/>
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
    } else {
      return <BacteriaLoader />
    }
};

export default State;
