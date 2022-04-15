import { SET_CURRENT_PATH, SET_PREV_PATH } from "../actions/action.js";
import { initialState } from "../store/store.js";

export const CurrentPathREducer = (state = initialState.path, action) => {
  switch (action.type) {
    case SET_CURRENT_PATH: {
      return {
        ...state,
        current: action.payload,
      };
    }
    case SET_PREV_PATH: {
      return {
        ...state,
        prevPath: action.payload,
      };
    }

    default:
      return state;
  }
};
