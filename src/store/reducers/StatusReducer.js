import { GO_ONLINE, GO_OFFLINE } from "../actions/types";

const INITIAL_STATE = {
  isOnline: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GO_ONLINE:
      return {
        ...state,
        isOnline: true
      };
    case GO_OFFLINE:
      return {
        ...state,
        isOnline: false
      };
    default:
      return state;
  }
};
