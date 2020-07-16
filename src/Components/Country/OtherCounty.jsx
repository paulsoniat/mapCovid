import React, { useEffect, useState } from "react";
import axios from 'axios';
import BacteriaLoader from '../Loaders/BacteriaLoader';
import { useParams } from 'react-router-dom';

const Country = ( { rootPath } ) => {

  const { name } = useParams();

  useEffect(()=>{
  });

if (name) {
  return (
    <>
      <div className="country-container">
          <div className="country-table">
            Table here
          </div>
        <div className="country-column">
            <div className="country-quarter-display">
                quarter
            </div>
            <div className="country-quarter-display">
                quarter
            </div>
        </div>
        <div className="country-column">
            <div className="country-full-half">
                half
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

export default Country;
