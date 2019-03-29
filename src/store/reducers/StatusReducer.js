import { GO_ONLINE, GO_OFFLINE, SET_ACCOUNT_STATUS } from "../actions/types";

const INITIAL_STATE = {
  isOnline: false,
  accountStatus: null
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
    case SET_ACCOUNT_STATUS:
      return {
        ...state,
        accountStatus: action.payload
      };
    default:
      return state;
  }
};
