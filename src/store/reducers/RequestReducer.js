import {
  SET_CORRIDA,
  SET_CLIENTE,
  SET_DISTANCIA,
  CLEAR_CORRIDA
} from "../actions/types";

const INITIAL_STATE = {
  corrida: null,
  cliente: null,
  distancia: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CORRIDA:
      return {
        ...state,
        corrida: action.payload
      };
    case SET_CLIENTE:
      return {
        ...state,
        cliente: action.payload
      };
    case SET_DISTANCIA:
      return {
        ...state,
        distancia: action.payload
      };
    case CLEAR_CORRIDA:
      return {
        ...state,
        corrida: null,
        cliente: null,
        distancia: null
      };
    default:
      return state;
  }
};
