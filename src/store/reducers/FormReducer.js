import {
  FORM_EMAIL_CHANGED,
  FORM_SENHA_CHANGED,
  FORM_NOME_CHANGED,
  FORM_SOBRENOME_CHANGED,
  FORM_MOTO_CHANGED,
  FORM_CNH1_CHANGED,
  FORM_CNH2_CHANGED,
  FORM_COR_CHANGED,
  FORM_PLACA_CHANGED,
  FORM_CLEAR
} from "../actions/types";

const INITIAL_STATE = {
  email: "",
  senha: "",
  nome: "",
  sobrenome: "",
  cnh1: null,
  cnh2: null,
  moto: "",
  placa: "",
  cor: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FORM_EMAIL_CHANGED:
      return {
        ...state,
        email: action.payload
      };
    case FORM_SENHA_CHANGED:
      return {
        ...state,
        senha: action.payload
      };
    case FORM_NOME_CHANGED:
      return {
        ...state,
        nome: action.payload
      };
    case FORM_SOBRENOME_CHANGED:
      return {
        ...state,
        sobrenome: action.payload
      };
    case FORM_MOTO_CHANGED:
      return {
        ...state,
        moto: action.payload
      };
    case FORM_CNH1_CHANGED:
      return {
        ...state,
        cnh1: action.payload
      };
    case FORM_CNH2_CHANGED:
      return {
        ...state,
        cnh2: action.payload
      };
    case FORM_COR_CHANGED:
      return {
        ...state,
        cor: action.payload
      };
    case FORM_PLACA_CHANGED:
      return {
        ...state,
        placa: action.payload
      };
    case FORM_CLEAR:
      return {
        ...state,
        nome: "",
        sobrenome: "",
        email: "",
        senha: ""
      };
    default:
      return state;
  }
};
