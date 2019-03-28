import { AsyncStorage } from "react-native";
import { AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN } from "./types";
import { uiStartLoading, uiStopLoading } from "./UIAction";
import { baseUrl } from "../../config";

import startApp from "../../App";

let _accountStatus;

export const authAutoSignIn = () => {
  return async dispatch => {
    try {
      const token = await dispatch(authGetToken());
      startApp(_accountStatus);
    } catch (err) {}
  };
};

export const tryAuth = (email, senha) => {
  return async dispatch => {
    dispatch(uiStartLoading());
    try {
      const result = await fetch(`${baseUrl}auth/motoqueiro/`, {
        method: "POST",
        body: JSON.stringify({
          email,
          senha
        }),
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (result.ok) {
        let res = await result.json();
        const { token, refreshToken, userId, expiryDate, accountStatus } = res;
        _accountStatus = accountStatus;

        dispatch(
          storeAuth(token, refreshToken, userId, expiryDate, accountStatus)
        );
        startApp(_accountStatus);
        dispatch(uiStopLoading());
      } else {
        let res = await result.json();
        alert(res.message);
        console.log(result);
        dispatch(uiStopLoading());
      }
    } catch (err) {
      dispatch(uiStopLoading());
      alert("Não foi possível fazer o login");
      console.log("Erro: " + err);
    }
  };
};

export const storeAuth = (
  jwt,
  refreshToken,
  userId,
  expiryDate,
  accountStatus
) => {
  return async dispatch => {
    dispatch(authSetToken(jwt, expiryDate, userId, accountStatus));
    AsyncStorage.setItem("ap:auth:jwt", jwt);
    AsyncStorage.setItem("ap:auth:refreshToken", refreshToken);
    AsyncStorage.setItem("ap:auth:expiryDate", expiryDate);
    AsyncStorage.setItem("ap:auth:userId", userId);
    AsyncStorage.setItem("ap:auth:accountStatus", accountStatus);
  };
};

export const authSetToken = (jwt, expiryDate, userId, accountStatus) => {
  return {
    type: AUTH_SET_TOKEN,
    payload: {
      jwt,
      expiryDate,
      userId,
      accountStatus
    }
  };
};

export const authGetToken = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.jwt;
    const stateExpiryDate = getState().auth.expiryDate;
    // verificar se token do state eh valido
    if (!token || new Date(stateExpiryDate) <= new Date()) {
      try {
        const fetchedToken = await AsyncStorage.getItem("ap:auth:jwt");
        const expiryDate = await AsyncStorage.getItem("ap:auth:expiryDate");
        const userId = await AsyncStorage.getItem("ap:auth:userId");
        const accountStatus = await AsyncStorage.getItem(
          "ap:auth:accountStatus"
        );

        // verificar se token do storage eh valido
        if (!fetchedToken || new Date(expiryDate) <= new Date()) {
          //needs to be refreshed
          const refreshToken = await AsyncStorage.getItem(
            "ap:auth:refreshToken"
          );
          const result = await fetch(
            `${baseUrl}auth/motoqueiro/refreshToken/`,
            {
              method: "POST",
              body: JSON.stringify({
                refreshToken
              }),
              headers: {
                "Content-Type": "application/json"
              }
            }
          );

          if (result.ok) {
            let res = await result.json();
            const {
              token,
              refreshToken,
              userId,
              expiryDate,
              accountStatus
            } = res;

            dispatch(
              storeAuth(token, refreshToken, userId, expiryDate, accountStatus)
            );
            return token;
          } else {
            error = new Error("Realizar login");
            throw Error();
          }
        } else {
          dispatch(
            authSetToken(fetchedToken, expiryDate, userId, accountStatus)
          );
          return fetchedToken;
        }
      } catch (err) {
        throw err;
      }
    } else {
      return token;
    }
  };
};

export const authClearStorage = () => {
  return () => {
    AsyncStorage.removeItem("ap:auth:token");
    AsyncStorage.removeItem("ap:auth:expiryDate");
    AsyncStorage.removeItem("ap:auth:refreshToken");
    AsyncStorage.removeItem("ap:auth:userId");
    AsyncStorage.removeItem("ap:auth:accountStatus");
  };
};

export const authLogout = () => {
  return async dispatch => {
    await dispatch(authClearStorage());
    dispatch(authRemoveToken());
  };
};

export const authRemoveToken = () => {
  return {
    type: AUTH_REMOVE_TOKEN
  };
};
