import { uiStartLoading, uiStopLoading } from "./UIAction";
import { GO_ONLINE, GO_OFFLINE, SET_ACCOUNT_STATUS } from "./types";
import { authGetToken } from "./AuthAction";
import { BASE_URL } from "../../config";

import { timeout } from "../../utils";

export const goOnline = () => {
  return {
    type: GO_ONLINE
  };
};

export const goOffline = () => {
  return {
    type: GO_OFFLINE
  };
};

export const getAccountStatus = idMotoqueiro => {
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
        dispatch(updateAccountStatus(res.motoqueiro.status));
        dispatch(uiStopLoading());
        return true;
      } else {
        let res = await result.json();
        dispatch(uiStopLoading());
        throw new Error(res.message);
      }
    } catch (err) {
      dispatch(uiStopLoading());
      alert(err);
      console.log("Erro: " + err);
      return false;
    }
  };
};

export const updateAccountStatus = status => {
  return {
    type: SET_ACCOUNT_STATUS,
    payload: status
  };
};
