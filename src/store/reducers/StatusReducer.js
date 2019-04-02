import {
  STATUS_GO_ONLINE,
  STATUS_GO_OFFLINE,
  STATUS_SET_ACCOUNT_STATUS
} from "../actions/types";

const INITIAL_STATE = {
  isOnline: false,
  accountStatus: null
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
    case STATUS_SET_ACCOUNT_STATUS:
      return {
        ...state,
        accountStatus: action.payload
      };
    default:
      return state;
  }
};
