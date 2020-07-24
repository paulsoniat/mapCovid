import axios from 'axios';

import * as actionTypes from './actionTypes';
import history from '../../utils/history';
/*
export const getTeamHeader = (teamId, token) => (dispatch) => {
  dispatch({ type: actionTypes.RESET_TEAM_INFO });
  dispatch({ type: actionTypes.START_LOADING, loadingText: 'Fetching team information' });
  axios.get(`${process.env.REACT_APP_BACKENDURL}/teams/header/${teamId}`, {
    headers: {
      Authorization: token,
    },
  }).then((res) => {
    dispatch({ type: actionTypes.TEAM_HEADER_LOADED, teamHeader: res.data[0] });
    dispatch({ type: actionTypes.STOP_LOADING });
  }).catch((err) => {
    dispatch({ type: actionTypes.RESET_TEAM_HEADER });
    dispatch({ type: actionTypes.STOP_LOADING });
    if (err.response.status === 404) {
      history.replace('/pageNotFound');
    }
    if (!err.response) {
      dispatch({ type: actionTypes.USER_MESSAGE, message: 'An unknown error occured', severity: 'Error' });
    } else {
      dispatch({ type: actionTypes.USER_MESSAGE, message: err.response.data, severity: 'Error' });
    }
  });
};

export const getTeamSalary = (teamId, token) => (dispatch) => {
  dispatch({ type: actionTypes.TEAM_SALARY_LOADED, salary: 'loading' });
  axios.get(`${process.env.REACT_APP_BACKENDURL}/teams/salary/${teamId}`, {
    headers: {
      Authorization: token,
    },
  }).then((res) => {
    dispatch({ type: actionTypes.TEAM_SALARY_LOADED, salary: res.data });
  }).catch((err) => {
    dispatch({ type: actionTypes.TEAM_SALARY_LOADED, salary: {} });
    if (!err.response) {
      dispatch({ type: actionTypes.USER_MESSAGE, message: 'An unknown error occured', severity: 'Error' });
    } else {
      dispatch({ type: actionTypes.USER_MESSAGE, message: err.response.data, severity: 'Error' });
    }
  });
};
*/