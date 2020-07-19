import React from 'react';

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
        return <div key={index}>
           { item.total_cases} Total Cases
           <br/>
           { item.total_deaths} Total Deaths 
           <br/>
           { item.total_recovered} Total Recovered
           <br/>
           { item.total_serious_cases} Serious Cases
           <br/>
        </div>
    })}
    </>

  )
}
};

export default CountryTable;
