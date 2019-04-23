import { INFO_SET, INFO_SET_DETAILS } from "../actions/types";

const INITIAL_STATE = {
  nome: null,
  sobrenome: null,
  moto: null,
  email: null,
  imgPerfil: null,
  corridas: [],
  avaliacoes: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INFO_SET:
      return {
        ...state,
        email: action.payload.email,
        imgPerfil: action.payload.imgPerfil
      };
    case INFO_SET_DETAILS:
      return {
        ...state,
        nome: action.payload.nome,
        sobrenome: action.payload.sobrenome,
        moto: action.payload.moto,
        corridas: action.payload.corridas,
        avaliacoes: action.payload.avaliacoes
      };
    default:
      return state;
  }
};
