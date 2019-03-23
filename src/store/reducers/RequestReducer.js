import { SET_CORRIDA, CLEAR_CORRIDA } from "../actions/types";

const INITIAL_STATE = {
  corrida: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CORRIDA:
      return {
        ...state,
        corrida: action.payload
      };
    case CLEAR_CORRIDA:
      return {
        ...state,
        corrida: null
      };
    default:
      return state;
  }
};
