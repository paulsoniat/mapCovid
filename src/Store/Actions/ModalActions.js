import * as actionTypes from './ActionTypes';

export const ToggleModal = () => (dispatch) => {
  dispatch({ type: actionTypes.MODAL_TOGGLE })
  console.log('text toggled');
};
