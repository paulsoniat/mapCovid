import React from "react";
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

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

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


const h = window.innerHeight - 300
|| document.documentElement.clientHeight -300
|| document.body.clientHeight - 300;

const UsMapByCountry = ({ setToolTip }) => {
  return (
    <ComposableMap projection="geoAlbersUsa"
    height={h}
    className="US-map-chart" 
    data-tip="">
    
      <Geographies geography={geoUrl}>
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
                    console.log(geo)
                    history.push(`/county/${geo.properties.name}`);
                }}
                style={{
                      default: {
                        fill: `${colorPicker(1500)}`,
                        stroke: "#191919",
                      },
                      hover: {
                        fill: "#a9a9a9",
                        stroke: "#191919"
                      },
                      pressed: {
                        fill: "none",
                        stroke: "none"
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
  );
};

export default UsMapByCountry;
