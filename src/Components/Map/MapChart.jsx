import React, { memo, useEffect, useState } from "react";
import MediaQuery from 'react-responsive';
import axios from 'axios';
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";
import ReactTooltip from "react-tooltip"
import MapHover from './MapHover';

import BacteriaLoader from '../Loaders/BacteriaLoader'

import history from '../../utils/history';

const MapChart = ({ setTooltipContent, display }) => {

  const [yearlyData, setYearlyData] = useState(null);
  
  useEffect(()=>{
    if(!yearlyData) {
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
                geoCountry.properties.countryCode = country.CountryCode;
                geoCountry.properties.slug = country.Slug;
                geoCountry.properties.newDeaths = country.NewDeaths
                geoCountry.properties.newRecovered = country.NewRecovered
                geoCountry.properties.totalConfirmed = country.TotalConfirmed
                geoCountry.properties.totalDeaths = country.TotalDeaths
                geoCountry.properties.totalRecovered = country.TotalRecovered
              }
              else {
              }
            })
          })
          const allGeoData = geoUrlRes
          geoUrl = allGeoData;
          setTimeout(() => {
            setYearlyData(geoUrl)
          }, 1500)
        })
      })
    }
  }, [yearlyData]);



const h = window.innerHeight - 60
|| document.documentElement.clientHeight -60
|| document.body.clientHeight - 60;
  const colorPicker = (newCases) => {

    let color;
    if (newCases > 10000) {
      color = "#ff0000";
    }
    if (newCases <= 10000 & newCases >= 5000) {
      color = "#ff1919";
    }
    if (newCases <= 5000 & newCases >=  2500) {
      color = "#ff3232";
    }
    if (newCases <= 2500 & newCases >= 2000) {
      color = "#ff4c4c";
    }
    if (newCases <= 2000 & newCases >= 1500) {
      color = "#ff6666"
    }
    if (newCases <= 1500 & newCases >= 1000) {
      color = "#ff7f7f"
    }
    if (newCases <= 1000 & newCases >= 500) {
      color = "#ff9999"
    }
    if (newCases <= 500 & newCases >= 250) {
      color = "#ffb2b2"
    }
    if (newCases <= 250 || newCases === undefined) {
      color = "#ffcccc"
    }
    return color;
  }

  if (display === "none") {
    return (
      null
    )
  } else {
    return (
      <>
      {
        (yearlyData && yearlyData.arcs)
          ? (
            <>
            <MediaQuery minDeviceWidth={1224}>
              <ComposableMap data-tip=""
                height={h}
                className="map-chart" 
                projectionConfig={{ scale: 200 }}>
                  <ZoomableGroup>
                    <Geographies geography={yearlyData}>
                      {({ geographies }) =>
                        geographies.map(geo => (
                          <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            onClick={() => {
                              history.push(`/country/${geo.properties.NAME}`);
                            }}
                            data-tip={''}
                            onMouseEnter={() => {
                              ReactTooltip.rebuild(); 
                              setTooltipContent(<MapHover countryData={geo} />);
                            }}
                            onMouseLeave={() => {
                              setTooltipContent("");
                            }}
                            style={{
                              default: {
                                fill: `${colorPicker(geo.properties.newCases)}`,
                                stroke: "#191919",
                                outline: 'none',
                              },
                              hover: {
                                fill: "#a9a9a9",
                                stroke: "#191919",
                                outline: 'none',
                              },
                              pressed: {
                                fill: "none",
                                stroke: "none",
                                outline: 'none',
                              }
                            }}
                          />
                        ))
                      }
                  </Geographies>
                </ZoomableGroup>
              </ComposableMap>
            </MediaQuery>
            <MediaQuery maxDeviceWidth={1224}>
            <ComposableMap data-tip=""
              height={h}
              className="map-chart" 
              projectionConfig={{ scale: 200 }}>
                <ZoomableGroup>
                  <Geographies geography={yearlyData}>
                    {({ geographies }) =>
                      geographies.map(geo => (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          data-tip={''}
                          onMouseEnter={() => {
                            history.push(`/country/${geo.properties.NAME}`);
                          }}
                          onMouseLeave={() => {
                            setTooltipContent("");
                          }}
                          style={{
                            default: {
                              fill: `${colorPicker(geo.properties.newCases)}`,
                              stroke: "#191919",
                              outline: 'none',
                            },
                            hover: {
                              fill: "#a9a9a9",
                              stroke: "#191919",
                              outline: 'none',
                            },
                            pressed: {
                              fill: "none",
                              stroke: "none",
                              outline: 'none',
                            }
                          }}
                        />
                      ))
                    }
                </Geographies>
              </ZoomableGroup>
            </ComposableMap>
          </MediaQuery>
          </>
          )
          : <BacteriaLoader />
      }
      </>
    );
  }
};

export default memo(MapChart);
