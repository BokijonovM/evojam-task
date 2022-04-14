import { SET_CURRENT_PATH } from "../actions/action.js";
import { initialState } from "../store/store.js";

export const CurrentPathREducer = (state = initialState.path, action) => {
  switch (action.type) {
    case SET_CURRENT_PATH: {
      return {
        ...state,
        path: action.payload,
      };
    }

    default:
      return state;
  }
};
