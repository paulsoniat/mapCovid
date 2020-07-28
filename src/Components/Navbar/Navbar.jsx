import React, { useEffect } from "react";
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  useEffect(()=>{
  });

  return (
    <>
    <div className="navbar">
              <NavLink className="navbar__button" style={{"text-decoration": "none", "color": "black"}}to="/">
                Home
              </NavLink>
              <div>
                <link href="https://fonts.googleapis.com/css?family=Lato&subset=latin,latin-ext" rel="stylesheet" />
                  <a className="bmc-button" target="_blank" href="https://www.buymeacoffee.com/paulsoniat">
                  <img src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"  />
                    Buy me a coffee
                </a>
              </div>
    </div>
    </>
  );
};

export default Navbar;
