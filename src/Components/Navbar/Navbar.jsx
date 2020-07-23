import React, { useEffect } from "react";

const Navbar = () => {
  useEffect(()=>{
  });

  return (
    <>
    <div className="navbar">
              <a className="navbar__button" style={{"text-decoration": "none", "color": "black"}}href="/">
                Home
              </a>
                <a  className="navbar__button" style={{"text-decoration": "none", "color": "black"}} href="#Menu" onClick={() => {}}>
                  Menu
                </a>
              <div>
                <link href="https://fonts.googleapis.com/css?family=Lato&subset=latin,latin-ext" rel="stylesheet" />
                  <a className="bmc-button" target="_blank" href="https://www.buymeacoffee.com/paulsoniat">
                  <img src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg" alt="Buy me a coffee" />
                    Buy me a coffee
                </a>
              </div>
    </div>
    </>
  );
};

export default Navbar;
