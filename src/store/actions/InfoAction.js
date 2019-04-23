import { uiStartLoading, uiStopLoading } from "./UIAction";
import { authGetToken } from "./AuthAction";
import { updateAccountStatus } from "./StatusAction";
import { INFO_SET, INFO_SET_DETAILS } from "./types";
import { BASE_URL } from "../../config";

import { timeout } from "../../utils";

export const updateInfo = (cnh1, cnh2, moto, placa, idMotoqueiro) => {
  return async dispatch => {
    dispatch(uiStartLoading());
    try {
      const token = await dispatch(authGetToken());
      let formData = new FormData();
      formData.append("cnh1", { uri: cnh1, type: "image/jpg", name: "cnh1" });
      formData.append("cnh2", { uri: cnh2, type: "image/jpg", name: "cnh2" });
      formData.append("moto", moto);
      formData.append("placa", placa);

      const result = await timeout(
        fetch(`${BASE_URL}usuario/motoqueiro/${idMotoqueiro}`, {
          method: "PUT",
          body: formData,
          headers: {
            Authorization: "Bearer " + token
          }
        })
      );

      if (result.ok) {
        let res = await result.json();
        await dispatch(updateAccountStatus(res.motoqueiro.status));
        dispatch(uiStopLoading());
        return true;
      } else {
        let res = await result.json();
        console.log(result);
        dispatch(uiStopLoading());
        throw new Error(res.message);
      }
    } catch (err) {
      dispatch(uiStopLoading());
      alert("Erro ao atualizar as informações");
      console.log("Erro: " + err);
      return false;
    }
  };
};

export const updateAccountInfo = (
  email = null,
  senha = null,
  imgPerfil = null,
  idMotoqueiro
) => {
  return async dispatch => {
    dispatch(uiStartLoading());
    try {
      const token = await dispatch(authGetToken());
      let formData = new FormData();

      if (email) {
        formData.append("email", email);
      }

      if (senha) {
        formData.append("senha", senha);
      }

      if (imgPerfil) {
        formData.append("imgPerfil", {
          uri: imgPerfil,
          type: "image/jpg",
          name: "imgPerfil"
        });
      }

      const result = await timeout(
        fetch(`${BASE_URL}usuario/motoqueiro/${idMotoqueiro}`, {
          method: "PUT",
          body: formData,
          headers: {
            Authorization: "Bearer " + token
          }
        })
      );

      if (result.ok) {
        let res = await result.json();
        let { imgPerfil, email } = res.motoqueiro;

        // sanitize uri
        if (imgPerfil) {
          imgPerfil = imgPerfil.split("images")[1];
          imgPerfil = imgPerfil.replace("/", "");
          imgPerfil = imgPerfil.replace("\\", "");
        } else {
          imgPerfil = "avatar.png";
        }

        await dispatch(setInfo(email, imgPerfil));
        dispatch(uiStopLoading());
        return true;
      } else {
        let res = await result.json();
        console.log(res);
        dispatch(uiStopLoading());
        throw new Error(res.message);
      }
    } catch (err) {
      dispatch(uiStopLoading());
      alert("Erro ao atualizar as informações");
      console.log("Erro: " + err);
      return false;
    }
  };
};

export const setInfo = (
  email = store.getState().info.email,
  imgPerfil = store.getState().info.imgPerfil
) => {
  return {
    type: INFO_SET,
    payload: {
      email,
      imgPerfil
    }
  };
};

export const getDetails = idMotoqueiro => {
  return async dispatch => {
    dispatch(uiStartLoading());
    const token = await dispatch(authGetToken());
    try {
      const result = await timeout(
        fetch(`${BASE_URL}usuario/motoqueiro/${idMotoqueiro}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
          }
        })
      );

      if (result.ok) {
        let res = await result.json();
        console.log(res);
        const { nome, sobrenome, moto, corridas, avaliacoes } = res.motoqueiro;
        await dispatch(setDetails(nome, sobrenome, moto, corridas, avaliacoes));
        dispatch(uiStopLoading());
        return true;
      } else {
        let res = await result.json();
        console.log(res);
        dispatch(uiStopLoading());
        alert("Ocorreu um erro ao avaliar o motoqueiro");
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

export const setDetails = (nome, sobrenome, moto, corridas, avaliacoes) => {
  return {
    type: INFO_SET_DETAILS,
    payload: {
      nome,
      sobrenome,
      moto,
      corridas,
      avaliacoes
    }
  };
};
