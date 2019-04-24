import { STATUS_GO_ONLINE, STATUS_GO_OFFLINE } from "../actions/types";

const INITIAL_STATE = {
  isOnline: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case STATUS_GO_ONLINE:
      return {
        ...state,
        isOnline: true
      };
    case STATUS_GO_OFFLINE:
      return {
        ...state,
        isOnline: false
      };
    default:
      return state;
  }
};
