import React from 'react';

const CountryTable = ({
  data
}) => {

  // Render Data Table UI
  if (data) {
  return (
    <>
    {data.map((item) => {
        return <div>
           { item.total_active_cases} item thing here 

        </div>
    })}
    </>

  )
}
};

export default CountryTable;
