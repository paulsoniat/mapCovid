import React from 'react';
import rounded from '../../utils/rounded';
const CountryTable = ({
  data
}) => {

  // Render Data Table UI
  if (data) {
  return (
    <>
    {data.map((item, index) => {
        if (item === 'none') {
            return <div key={index}>
                The data could not be pulled for these statistics
            </div>
        }
        return <div key={index} style={{width: "100%", display: "flex", flexDirection: "column", "font-size":"1.2rem", "backgroundColor": "black", "boxSizing": "border-box", "margin": ".5rem", "padding": "1rem", "borderRadius": ".5rem" }}>
           <div style={{color: "#ffa500"}}>
             { rounded((item.total_cases))} Total Cases
           </div>
           <div style={{color: "firebrick"}}>
           { rounded(item.total_deaths)} Total Deaths 
           </div>
           <div style={{color: "Chartreuse"}}>
           { rounded(item.total_recovered)} Total Recovered
           </div>
           <div style={{color: "red"}}>
           { rounded(item.total_serious_cases)} Serious Cases
           </div>
        </div>
    })}
    </>

  )
}
};

export default CountryTable;
