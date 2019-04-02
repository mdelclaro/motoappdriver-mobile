import { authGetToken } from "./AuthAction";
import { BASE_URL } from "../../config";

import { timeout } from "../../utils";

export const updateLocation = (coords, idMotoqueiro) => {
  return async dispatch => {
    const location = { lat: coords.latitude, long: coords.longitude };
    const token = await dispatch(authGetToken());
    try {
      await timeout(
        fetch(`${BASE_URL}localizacao/`, {
          method: "POST",
          body: JSON.stringify({
            location,
            idMotoqueiro
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
          }
        })
      );

      // if (result.ok) {
      //   return true;
      // } else {
      //   let res = await result.json();
      //   console.log(res);
      //   return false;
      // }
    } catch (err) {
      console.log("Erro: " + err);
    }
  };
};
