import React, { useEffect, useState } from "react";
import { geoCentroid } from "d3-geo";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation
} from "react-simple-maps";
import history from '../../utils/history';
import allStates from "../../utils/Data/allstates.json";
import stateDictionary from '../../utils/Data/stateDictionary';
import MediaQuery from 'react-responsive';
import axios from 'axios';
import BacteriaLoader from "../Loaders/BacteriaLoader";
import Legend from '../Legend/Legend';

const offsets = {
  VT: [50, -8],
  NH: [34, 2],
  MA: [30, -1],
  RI: [28, 2],
  CT: [35, 10],
  NJ: [34, 1],
  DE: [33, 0],
  MD: [47, 10],
  DC: [49, 21]
};


const colorPicker = (newCases) => {

    let color;
if (newCases > 10000) {
    color = "#ff0000";
  }
  if (newCases <= 10000 & newCases >= 5000) {
    color = "#ff3232";
  }
  if (newCases <= 5000 & newCases >= 1000) {
    color = "#ff4c4c"
  }
  if (newCases <= 1000 & newCases >= 250) {
    color = "#ff9999"
  }
  if (newCases <= 250 || newCases === undefined) {
    color = "#ffcccc"
  }
  return color;
}


const h = window.innerHeight - 300
|| document.documentElement.clientHeight -300
|| document.body.clientHeight - 300;

const UsMapByCountry = ({ setToolTip }) => {
    
    const [stateData, setStateData] = useState(null);

    useEffect (() => {
        if (!stateData) {
            axios.get('https://covidtracking.com/api/states')
            .then((stateResults) => {
                axios.get('https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json')
                .then((res) => {
                    const allData = res;
                    let mapData = res.data;
                    mapData = mapData.objects.states.geometries
                    console.log(mapData)
                    mapData.forEach((mapState) => {
                        stateResults.data.forEach((dataState) => {
                            if (stateDictionary[dataState.state] === mapState.properties.name) {
                                mapState.properties.positiveIncrease = dataState.positiveIncrease
                            } else {
                            }
                        })
                    })
                    allData.data.objects.states.geometries = mapData;
                    setTimeout(() => {
                        setStateData(allData);
                      }, 1000)
                })
            })
        }
    }, [stateData]);


    if (stateData) {
        return (
            <>
              <MediaQuery minDeviceWidth={1224}>
                  <Legend loaded={stateData} />
              <ComposableMap projection="geoAlbersUsa"
              height={h}
              className="US-map-chart" 
              data-tip="">
              
                <Geographies geography={stateData.data}>
                  {({ geographies }) => (
                    <>
                      {geographies.map(geo => (
                        <Geography
                        data-tip={''}
                          key={geo.rsmKey}
                          stroke="#FFF"
                          geography={geo}
                          onClick={() => {
                              history.push(`/state/${geo.properties.name}`);
                          }}
                          style={{
                                default: {
                                  fill: `${colorPicker(geo.properties.positiveIncrease)}`,
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
                                }}}
                        />
                      ))}
                      {geographies.map(geo => {
                        const centroid = geoCentroid(geo);
                        const cur = allStates.find(s => s.val === geo.id);
                        return (
                          <g key={geo.rsmKey + "-name"}>
                            {cur &&
                              centroid[0] > -160 &&
                              centroid[0] < -67 &&
                              (Object.keys(offsets).indexOf(cur.id) === -1 ? (
                                <Marker coordinates={centroid}>
                                  <text y="2" fontSize={14} textAnchor="middle">
                                    {cur.id}
                                  </text>
                                </Marker>
                              ) : (
                                <Annotation
                                  subject={centroid}
                                  dx={offsets[cur.id][0]}
                                  dy={offsets[cur.id][1]}
                                >
                                  <text x={4} fontSize={14} alignmentBaseline="middle">
                                    {cur.id}
                                  </text>
                                </Annotation>
                              ))}
                          </g>
                        );
                      })}
                    </>
                  )}
                </Geographies>
              </ComposableMap>
              </MediaQuery>
        
              <MediaQuery maxDeviceWidth={1224}>
                <Legend />
              <ComposableMap projection="geoAlbersUsa"
              height={h}
              className="US-map-chart" 
              data-tip="">
        
                <Geographies geography={stateData.data}>
                  {({ geographies }) => (
                    <>
                      {geographies.map(geo => (
                        <Geography
                        data-tip={''}
                          key={geo.rsmKey}
                          stroke="#FFF"
                          geography={geo}
                          fill="#DDD"
                          onClick={() => {
                            history.push(`/state/${geo.properties.name}`);
                          }}
                          onMouseEnter={() => {
                            history.push(`/state/${geo.properties.name}`);
                          }}
                          style={{
                                default: {
                                  fill: `${colorPicker(geo.properties.positiveIncrease)}`,
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
                                }}}
                        />
                      ))}
                      {geographies.map(geo => {
                        const centroid = geoCentroid(geo);
                        const cur = allStates.find(s => s.val === geo.id);
                        return (
                          <g key={geo.rsmKey + "-name"}>
                            {cur &&
                              centroid[0] > -160 &&
                              centroid[0] < -67 &&
                              (Object.keys(offsets).indexOf(cur.id) === -1 ? (
                                <Marker coordinates={centroid}>
                                  <text y="2" fontSize={14} textAnchor="middle">
                                    {cur.id}
                                  </text>
                                </Marker>
                              ) : (
                                <Annotation
                                  subject={centroid}
                                  dx={offsets[cur.id][0]}
                                  dy={offsets[cur.id][1]}
                                >
                                  <text x={4} fontSize={14} alignmentBaseline="middle">
                                    {cur.id}
                                  </text>
                                </Annotation>
                              ))}
                          </g>
                        );
                      })}
                    </>
                  )}
                </Geographies>
              </ComposableMap>
              </MediaQuery>
        </>
          )
    } else {
        return <BacteriaLoader />
    }
};

export default UsMapByCountry;
