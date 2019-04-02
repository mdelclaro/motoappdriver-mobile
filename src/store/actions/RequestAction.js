import {
  REQUEST_SET_CORRIDA,
  REQUEST_SET_CLIENTE,
  REQUEST_SET_DISTANCIA,
  REQUEST_CLEAR_CORRIDA
} from "../actions/types";
import { uiStartLoading, uiStopLoading } from "./UIAction";
import { authGetToken } from "./AuthAction";
import { BASE_URL } from "../../config";

import { timeout } from "../../utils";

export const acceptCorrida = data => {
  const { idCorrida, idMotoqueiro, cliente, distancia } = data;
  return async dispatch => {
    dispatch(uiStartLoading());
    const token = await dispatch(authGetToken());
    try {
      const result = await timeout(
        fetch(`${BASE_URL}corrida/${idCorrida}`, {
          method: "PUT",
          body: JSON.stringify({
            idMotoqueiro,
            status: 1
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
          }
        })
      );

      if (result.ok) {
        let res = await result.json();
        dispatch(setCorrida(res.corrida));
        dispatch(setCliente(cliente));
        dispatch(setDistancia(distancia));
        dispatch(uiStopLoading());
        return true;
      } else {
        let res = await result.json();
        console.log(res);
        dispatch(uiStopLoading());
        alert("Ocorreu um erro ao aceitar a corrida");
        return false;
      }
    } catch (err) {
      dispatch(uiStopLoading());
      alert("Ocorreu um erro");
      console.log("Erro: " + err);
      return false;
    }
  };
};

export const startCorrida = idCorrida => {
  console.log(idCorrida);
  // idCorrida = "5c9528711f2f8b11c4defe01";
  return async dispatch => {
    dispatch(uiStartLoading());
    const token = await dispatch(authGetToken());
    try {
      const result = await timeout(
        fetch(`${BASE_URL}corrida/${idCorrida}`, {
          method: "PUT",
          body: JSON.stringify({
            status: 2
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
          }
        })
      );

      if (result.ok) {
        let res = await result.json();
        dispatch(setCorrida(res.corrida));
        dispatch(uiStopLoading());
        return true;
      } else {
        let res = await result.json();
        console.log(res);
        dispatch(uiStopLoading());
        alert("Ocorreu um erro ao iniciar a corrida");
        return false;
      }
    } catch (err) {
      dispatch(uiStopLoading());
      alert("Ocorreu um erro");
      console.log("Erro: " + err);
      return false;
    }
  };
};

export const finishCorrida = idCorrida => {
  // idCorrida = "5c9528711f2f8b11c4defe01";
  return async dispatch => {
    dispatch(uiStartLoading());
    const token = await dispatch(authGetToken());
    try {
      const result = await timeout(
        fetch(`${BASE_URL}corrida/${idCorrida}`, {
          method: "PUT",
          body: JSON.stringify({
            status: 3
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
          }
        })
      );

      if (result.ok) {
        let res = await result.json();
        dispatch(clearCorrida());
        dispatch(uiStopLoading());
        return true;
      } else {
        let res = await result.json();
        console.log(res);
        dispatch(uiStopLoading());
        alert("Ocorreu um erro ao finalizar a corrida");
        return false;
      }
    } catch (err) {
      dispatch(uiStopLoading());
      alert("Ocorreu um erro");
      console.log("Erro: " + err);
      return false;
    }
  };
};

export const setCorrida = corrida => {
  return {
    type: REQUEST_SET_CORRIDA,
    payload: corrida
  };
};

export const setCliente = cliente => {
  return {
    type: REQUEST_SET_CLIENTE,
    payload: cliente
  };
};

export const setDistancia = distancia => {
  return {
    type: REQUEST_SET_DISTANCIA,
    payload: distancia
  };
};

export const clearCorrida = () => {
  return {
    type: REQUEST_CLEAR_CORRIDA
  };
};
