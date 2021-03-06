import {
  FORM_EMAIL_CHANGED,
  FORM_SENHA_CHANGED,
  FORM_NOME_CHANGED,
  FORM_SOBRENOME_CHANGED,
  FORM_MOTO_CHANGED,
  FORM_CNH1_CHANGED,
  FORM_CNH2_CHANGED,
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

export const cnh1Changed = cnh => {
  return {
    type: FORM_CNH1_CHANGED,
    payload: cnh
  };
};

export const cnh2Changed = cnh => {
  return {
    type: FORM_CNH2_CHANGED,
    payload: cnh
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
