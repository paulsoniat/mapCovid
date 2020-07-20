import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { useTable } from 'react-table';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import BacteriaLoader from '../Loaders/BacteriaLoader';
import StateTable from './StateTable';
import stateDictionary from '../../utils/Data/stateDictionary';
import stateCountyColumns from '../../utils/stateCountyColumns';

const State = () => {
  const [selectedCounties, setSelectedCounties] = useState([]);

  const { name } = useParams();
  
  useEffect(() => {
    // setSelectedState(name);
      axios.get('https://covid19-us-api.herokuapp.com/county')
      .then((res) => {
        let stateCounties = [];
        res.data.message.forEach((county) => {
          if (county.state_name === name) {
            stateCounties.push(county);
          }
        })
        setSelectedCounties(stateCounties);
      });
  }, []);
  
    if (selectedCounties.length) {
      return (
       <StateTable data={selectedCounties} columns={stateCountyColumns}/>
      );
    } else {
      return <BacteriaLoader />
    }
};

export default State;
