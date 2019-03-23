import { GO_ONLINE, GO_OFFLINE } from "./types";

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
