import React, { useState} from "react";
import ReactTooltip from "react-tooltip";
import ProjectRouter from '../Router/ProjectRouter';
import { Router } from 'react-router-dom';
import history from '../../utils/history';
import '../Navbar/Navbar';

import "../../index.css";

import MapChart from "../Map/MapChart.jsx";
import Navbar from "../Navbar/Navbar";

function App() {
  const [content, setContent] = useState("");
  return (
    <div>
      <Navbar />
      <Router history={history}>
      <ProjectRouter setTooltipContent={setContent}>
      </ProjectRouter>
      </Router>
      <MapChart display={"none"} setTooltipContent={setContent} />
      <ReactTooltip className="tooltip">{content}</ReactTooltip>
    </div>
  );
}

export default App;