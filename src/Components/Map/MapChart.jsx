import React, { memo, useEffect, useState } from "react";
import MediaQuery from 'react-responsive';
import axios from 'axios';
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";

import { useDispatch, useSelector } from 'react-redux';
import ReactTooltip from "react-tooltip"
import MapHover from './MapHover';
import countryNameDictionary from '../../utils/Data/countryNameDictionary'

import BacteriaLoader from '../Loaders/BacteriaLoader'

import history from '../../utils/history';
import TextModal from '../Modal/TextModal'

//TODO: Break out into redux and set up store

import * as actionTypes from '../../Store/Actions/ActionTypes';

const MapChart = ({ setTooltipContent, display }) => {
  
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal);
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
              if (countryNameDictionary[geoCountry.properties.NAME] === country.Country) {
                geoCountry.properties.newCases = country.NewConfirmed;
                geoCountry.properties.countryCode = country.CountryCode;
                geoCountry.properties.slug = country.Slug;
                geoCountry.properties.newDeaths = country.NewDeaths
                geoCountry.properties.newRecovered = country.NewRecovered
                geoCountry.properties.totalConfirmed = country.TotalConfirmed
                geoCountry.properties.totalDeaths = country.TotalDeaths
                geoCountry.properties.totalRecovered = country.TotalRecovered
              }
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
console.log(modal);
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
  const modalHeaderText = "Welcome to the Covid-19 Dashboard";
  const modalBodyText = ["<div>  Hover/Click on a country to learn about the country's Covid situation.</br></br>", " I used multiple API's for data, so if it is inconsitent/missing the data might not be available for that source or updated at a different time.</br></br>", " I tried to find the largest range of free data sources with the most up to date information, they are - {COVID19-API, NovelCOVID API, the Virus Tracker, Smartable.ai, CovidTracking}.</br></br>", " Currently I am paying all costs for hosting and keeping this add free!</br></br>", "You can support the site by buying me a coffee and connect with me on <a href=/paul-linkedin> LinkedIn </a> </br></br>",]
  const handleModalClose = () => {
    dispatch({type: actionTypes.MODAL_TOGGLE});
  }

  if (modal.displayModal) {
       return (
        <TextModal handleClose={handleModalClose} displayText={modalHeaderText} textPrompt={modalBodyText}/>
      )
  }
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
};

export default memo(MapChart);
