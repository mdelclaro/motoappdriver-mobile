import { uiStartLoading, uiStopLoading } from "./UIAction";
import { authGetToken } from "./AuthAction";
import { baseUrl } from "../../config";
import { AUTH_SET_ACCOUNT_STATUS } from "./types";

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

      const result = await fetch(
        `${baseUrl}usuario/motoqueiro/${idMotoqueiro}`,
        {
          method: "PUT",
          body: formData,
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );

      if (result.ok) {
        let res = await result.json();
        console.log(res);
        dispatch(updateAccountStatus(res.motoqueiro.status));
        dispatch(uiStopLoading());

        return true;
      } else {
        let res = await result.json();
        alert(res.message);
        console.log(result);
        dispatch(uiStopLoading());
        throw new Error(result.message);
      }
    } catch (err) {
      dispatch(uiStopLoading());
      alert("Erro ao atualizar as informações");
      console.log("Erro: " + err);
      return false;
    }
  };
};

export const updateAccountStatus = status => {
  return {
    type: AUTH_SET_ACCOUNT_STATUS,
    payload: status
  };
};
