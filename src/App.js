import React, { useState, Component } from "react";
import ReactTooltip from "react-tooltip";

import "./index.css";

import MapChart from "./MapChart";

import axios from 'axios';

function App() {
  const [content, setContent] = useState("");
  return (
    <div>
      <MapChart setTooltipContent={setContent} />
      <ReactTooltip>{content}</ReactTooltip>
    </div>
  );
}

export default App;