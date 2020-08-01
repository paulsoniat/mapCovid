import React from 'react';
import rounded from '../../utils/rounded';
const StateTotalTable = ({
  data
}) => {

  // Render Data Table UI
  if (data) {
    console.log(data)
  return (
    <>
    {data.map((item, index) => {
        if (item === 'none') {
            return <div key={index}>
                The data could not be pulled for these statistics
            </div>
        }
        return <div key={index} style={{width: "100%", display: "flex", flexDirection: "column", "backgroundColor": "black", "boxSizing": "border-box", "margin": ".5rem 0rem .5rem 0rem", "padding": "1rem", "borderRadius": ".5rem", "font-size": "1.2rem" }}>
           <div style={{color: "#ffa500"}}>
             { rounded(item.confirmedCases)} Total Cases
           </div>
           <div style={{color: "firebrick"}}>
           { item.newDeaths} New Deaths 
           </div>
           <div style={{color: "red"}}>
           { item.newCases} New Cases
           </div>
        </div>
    })}
    </>

  )
}
};

export default StateTotalTable;
