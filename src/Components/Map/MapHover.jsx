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


        <div className="map-hover__stat-title">
            <div style={{color: "yellow"}}>
                New Cases (24h)
            </div>
            <br/>

            <div style={{color: "orange"}}>
                Total Confirmed
            </div>
            <br/>

            <div style={{color: "FireBrick"}}>
                Deaths
            </div>
            <br/>

            <div style={{color: "Chartreuse"}}>
                Recovered
            </div>
            <br/>
        </div>

        <div className="map-hover__info">
            <div style={{color: "yellow"}}>
                {rounded(properties.newCases)}
            </div>
            <br/>
            
            <div style={{color: "orange"}}>
                {rounded(properties.totalConfirmed)}
            </div>
            <br/>

            <div style={{color: "FireBrick"}}>
                {rounded(properties.totalDeaths)}
            </div>
            <br />

            <div style={{color: "Chartreuse"}}>
                {rounded(properties.totalRecovered)}
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
