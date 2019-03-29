import { GO_ONLINE, GO_OFFLINE, SET_ACCOUNT_STATUS } from "./types";

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

export const updateAccountStatus = status => {
  return {
    type: SET_ACCOUNT_STATUS,
    payload: status
  };
};
