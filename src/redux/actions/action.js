export const SET_CURRENT_PATH = "SET_CURRENT_PATH";
export const SET_PREV_PATH = "SET_PREV_PATH";

export const setCurrentPathNameAction = (value) => ({
  type: SET_CURRENT_PATH,
  payload: value,
});

export const setPrevPathNameAction = (value) => ({
  type: SET_PREV_PATH,
  payload: value,
});
