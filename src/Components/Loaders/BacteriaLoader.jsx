import React from "react";
import bacteriaLoader from '../../Assets/bacteria-load.svg';

const BacteriaLoader = () => {
  return (
    <>
        <img className = "baceria-loader" src={bacteriaLoader} alt="Loading..." />
        <div className="baceria-loader__text"> Loading... </div>
    </>
  )
};

export default BacteriaLoader;
