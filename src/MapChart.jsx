import React, { memo, useEffect, useState } from "react";
import axios from 'axios';
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";
import { render } from "@testing-library/react";
import ReactTooltip from "react-tooltip"

import history from './utils/history';

//this is where the map data comes from

const covidApi =  "https://api.covid19api.com/summary"


const rounded = num => {
  if (num > 1000000000) {
    return Math.round(num / 100000000) / 10 + "Bn";
  } else if (num > 1000000) {
    return Math.round(num / 100000) / 10 + "M";
  } else {
    return Math.round(num / 100) / 10 + "K";
  }
};


// want to make an axios call here or something to then map through and add (instead of pop est) data from the covid api

const MapChart = ({ setTooltipContent, display }) => {
  const testMouse = num => {
    setTooltipContent(num);
  };
  let covidData = [];

  const [yearlyData, setYearlyData] = useState(null);
  
  useEffect(()=>{
    if(!yearlyData) {
      console.log('this is useeffect')
      let countries;
      let geoData;
      let geoUrlRes;
      let geoUrl;
      axios.get('https://api.covid19api.com/summary')
      .then((res, err) => {
        countries = res.data.Countries;
      })
      .then(() => {
        axios.get('https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json')
        .then((res, err) => {
          geoUrlRes = res.data;
          geoData = res.data.objects.ne_110m_admin_0_countries.geometries;
          geoData = geoData.map((geoCountry, geoIndex) => {
            countries.map((country, countryIndex) => {
              if (geoCountry.properties.NAME === country.Country) {
                geoCountry.properties.newCases = country.NewConfirmed;
                console.log(geoCountry.properties.NAME, country.Country, 'matched name')
              }
              else {
              }
            })
          })
          const allGeoData = geoUrlRes
          geoUrl = allGeoData;
          setYearlyData(geoUrl);
        })
      })
    }
  }, [yearlyData]);
  if (display === "none") {
    return (
      null
    )
  } else {
    return (
      <>
      { // Check if year exists
        (yearlyData && yearlyData.arcs)
          ? (
        <ComposableMap data-tip="" width={980}
        height={551}
        style={{
           width: "100%",
           height: "auto",
           display: display
        }} projectionConfig={{ scale: 200 }}>
          <ZoomableGroup>
            <Geographies geography={yearlyData}>
              {({ geographies }) =>
                geographies.map(geo => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => {
                      history.push(`/country/${123}`);
                    }}
                    data-tip={''}
                    onMouseEnter={() => {
                      ReactTooltip.rebuild(); 
                      const { newCases, NAME } = geo.properties;
                      console.log('entered');
                      setTooltipContent(`${NAME} - ${newCases}`);
                    }}
                    onMouseLeave={() => {
                      setTooltipContent("");
                    }}
                    style={{
                      default: {
                        fill: "#D6D6DA",
                        outline: "none"
                      },
                      hover: {
                        fill: "#F53",
                        outline: "none"
                      },
                      pressed: {
                        fill: "#E42",
                        outline: "none"
                      }
                    }}
                  />
                ))
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
          )
          : <div>Loading...</div>
      }
      </>
    );
  }
};

export default memo(MapChart);
