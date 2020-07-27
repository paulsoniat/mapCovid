import * as actionTypes from '../Actions/ActionTypes';

const initialState = {
  displayModal: true,
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.MODAL_TOGGLE: {
      return {
        ...state,
        displayModal: !state.displayModal,
      };
    }
    default:
      return state;
  }
};

export default modalReducer;
