import { INFO_SET, INFO_SET_DETAILS } from "../actions/types";

const INITIAL_STATE = {
  nome: null,
  sobrenome: null,
  email: null,
  moto: null,
  email: null,
  imgPerfil: null,
  corridas: [],
  avaliacoes: [],
  status: null
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
        nome: action.payload.data.nome,
        sobrenome: action.payload.data.sobrenome,
        email: action.payload.data.email,
        moto: action.payload.data.moto,
        corridas: action.payload.data.corridas,
        avaliacoes: action.payload.data.avaliacoes,
        imgPerfil: action.payload.data.imgPerfil,
        status: action.payload.data.status
      };
    default:
      return state;
  }
};
