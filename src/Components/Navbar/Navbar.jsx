import React, { useEffect } from "react";

const Navbar = () => {
  useEffect(()=>{
  });

  return (
    <>
    <div className="navbar">
        <ul>
            <li><a href="/" onClick={() => {console.log('clicked home')}}>Home</a></li>
            <li><a href="#news" onClick={() => {console.log('clicked home')}}>News</a></li>
            <li><a href="#contact" onClick={() => {console.log('clicked home')}}>Contact</a></li>
            <li><a href="#about" onClick={() => {console.log('clicked home')}}>About</a></li>
        </ul>
    </div>
    </>
  );
};

export default Navbar;
