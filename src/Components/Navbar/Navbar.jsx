import React, { useEffect } from "react";

const Navbar = () => {
  useEffect(()=>{
  });

  return (
    <>
    <div className="navbar">
        <ul>
            <li className="home">
              <a href="/">
                Home
              </a>
            </li>

            <div className="menu-items">
              <li className="menu-item">
                <a href="#Menu" onClick={() => {console.log('menu')}}>
                  Menu
                </a>
              </li>
              <li className="menu-item">
                <link href="https://fonts.googleapis.com/css?family=Lato&subset=latin,latin-ext" rel="stylesheet" />
                  <a className="bmc-button" target="_blank" href="https://www.buymeacoffee.com/paulsoniat">
                  <img src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg" alt="Buy me a coffee" />
                    <span>Buy me a coffee</span> 
                </a>
              </li>

            </div>
        </ul>
    </div>
    </>
  );
};

export default Navbar;
