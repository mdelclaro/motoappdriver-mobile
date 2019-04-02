import {
  REQUEST_SET_CORRIDA,
  REQUEST_SET_CLIENTE,
  REQUEST_SET_DISTANCIA,
  REQUEST_CLEAR_CORRIDA
} from "../actions/types";

const INITIAL_STATE = {
  corrida: null,
  cliente: null,
  distancia: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_SET_CORRIDA:
      return {
        ...state,
        corrida: action.payload
      };
    case REQUEST_SET_CLIENTE:
      return {
        ...state,
        cliente: action.payload
      };
    case REQUEST_SET_DISTANCIA:
      return {
        ...state,
        distancia: action.payload
      };
    case REQUEST_CLEAR_CORRIDA:
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
