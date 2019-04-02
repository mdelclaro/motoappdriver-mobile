import { LOCATION_SET_LOCATION } from "../actions/types";

const INITIAL_STATE = {
  lat: null,
  long: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOCATION_SET_LOCATION:
      return {
        ...state,
        lat: action.payload.lat,
        long: action.payload.long
      };
    default:
      return state;
  }
};
