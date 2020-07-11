import React, { useState, Component } from "react";
import ReactTooltip from "react-tooltip";
import ProjectRouter from './ProjectRouter';
import { Router } from 'react-router-dom';
import history from './utils/history';

import "./index.css";

import MapChart from "./MapChart.jsx";

import axios from 'axios';

function App() {
  const [content, setContent] = useState("");
  console.log(content)
  return (
    <div>
      <Router history={history}>
      <ProjectRouter setTooltipContent={setContent}>
      </ProjectRouter>
      </Router>
      <MapChart display={"none"} setTooltipContent={setContent} />
      <ReactTooltip>{content}</ReactTooltip>
    </div>
  );
}

export default App;