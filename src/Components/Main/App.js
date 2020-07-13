import React, { useState} from "react";
import ReactTooltip from "react-tooltip";
import ProjectRouter from '../Router/ProjectRouter';
import { Router } from 'react-router-dom';
import history from '../../utils/history';
import '../Navbar/Navbar';

import "../../index.css";
import Navbar from "../Navbar/Navbar";

function App() {
  const [content, setContent] = useState("");
  console.log(content, 'this is content')
  return (
    <div>
      <Navbar />
      <Router history={history}>
      <ProjectRouter setTooltipContent={setContent}>
      </ProjectRouter>
      </Router>
      <ReactTooltip className="tooltip">{content}</ReactTooltip>
    </div>
  );
}

export default App;