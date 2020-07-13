import React, { useEffect, useState } from "react";
import axios from 'axios';
import BacteriaLoader from '../Loaders/BacteriaLoader';
import USMapByCounty from "../Map/USMapByCounty";

const County = ( { setTooltipContent } ) => {

  useEffect(()=>{

  });

if (true) {
  return (
    <>
      <div className="country">
        {
        (true) 
          ? (
          <div>Hello state</div>
          ) : 
          null
        }
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

export default County;
