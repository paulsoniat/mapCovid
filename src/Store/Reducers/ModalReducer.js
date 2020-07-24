import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  loadingText: '',
  displayModal: true,
};

const generalReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TEXT_MODAL_TOGGLE: {
      return {
        ...state,
        displayModal: !state.displayModal,
      };
    }
    default:
      return state;
  }
};

export default generalReducer;
