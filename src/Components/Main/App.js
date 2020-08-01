import React, { useState} from "react";
import ReactTooltip from "react-tooltip";
import ProjectRouter from '../Router/ProjectRouter';
import { Router } from 'react-router-dom';
import ReactGA from 'react-ga';
import history from '../../utils/history';
import thunk from 'redux-thunk';
import {
  createStore,
  applyMiddleware,
  combineReducers,
} from 'redux';

import { Provider } from 'react-redux';

import modalReducer from '../../Store/Reducers/ModalReducer';

import '../Navbar/Navbar';

import "../../index.css";
import Navbar from "../Navbar/Navbar";

const rootReducer = combineReducers({
  modal: modalReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk),
);

function App() {
  const [content, setContent] = useState("");
  return (
    <div>
      <Provider store={store}>
      <Router history={history}>
      <Navbar />
      <ProjectRouter setTooltipContent={setContent}>
      </ProjectRouter>
      </Router>
      <ReactTooltip className="tooltip">{content}</ReactTooltip>
      </Provider>
    </div>
  );
}

export default App;