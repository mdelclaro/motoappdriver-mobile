import {
  FORM_EMAIL_CHANGED,
  FORM_SENHA_CHANGED,
  FORM_NOME_CHANGED,
  FORM_SOBRENOME_CHANGED,
  FORM_MOTO_CHANGED,
  FORM_CNH_CHANGED,
  FORM_COR_CHANGED,
  FORM_PLACA_CHANGED,
  FORM_CLEAR
} from "./types";

export const emailChanged = email => {
  return {
    type: FORM_EMAIL_CHANGED,
    payload: email
  };
};

export const senhaChanged = senha => {
  return {
    type: FORM_SENHA_CHANGED,
    payload: senha
  };
};

export const nomeChanged = nome => {
  return {
    type: FORM_NOME_CHANGED,
    payload: nome
  };
};

export const sobrenomeChanged = sobrenome => {
  return {
    type: FORM_SOBRENOME_CHANGED,
    payload: sobrenome
  };
};

export const motoChanged = moto => {
  return {
    type: FORM_MOTO_CHANGED,
    payload: moto
  };
};

export const cnhChanged = cnh => {
  return {
    type: FORM_CNH_CHANGED,
    payload: cnh
  };
};

export const corChanged = cor => {
  return {
    type: FORM_COR_CHANGED,
    payload: cor
  };
};

export const placaChanged = placa => {
  return {
    type: FORM_PLACA_CHANGED,
    payload: placa
  };
};

export const clearForm = () => {
  return {
    type: FORM_CLEAR
  };
};
