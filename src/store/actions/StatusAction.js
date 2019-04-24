import { STATUS_GO_ONLINE, STATUS_GO_OFFLINE } from "./types";

export const goOnline = () => {
  return {
    type: STATUS_GO_ONLINE
  };
};

export const goOffline = () => {
  return {
    type: STATUS_GO_OFFLINE
  };
};
