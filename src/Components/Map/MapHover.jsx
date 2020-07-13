import React, { useEffect } from "react";
import BacteriaLoader from '../Loaders/BacteriaLoader';

import rounded from '../../utils/rounded';

const MapHover = ({countryData}) => {

    const { properties } = countryData;
    
  useEffect(()=>{

  });

if (properties) {
  return (
    <>
        <div className="map-hover__title">
            {properties.NAME}
        </div>

    <div className="map-hover">


        <div className="map-hover__title">
            <div style={{color: "yellow"}}>
                New Cases (24h) - {rounded(properties.newCases)}
            </div>
            <br/>

            <div style={{color: "orange"}}>
                Total Confirmed - {rounded(properties.totalConfirmed)}
            </div>
            <br/>

            <div style={{color: "FireBrick"}}>
                Deaths - {rounded(properties.totalDeaths)}
            </div>
            <br/>

            <div style={{color: "Chartreuse"}}>
                Recovered - {rounded(properties.totalRecovered)}
            </div>
            <br/>
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

export default MapHover;
