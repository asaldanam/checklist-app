import { SET_FILTER } from "../constants/action-types";

const initialState = {
  articles: [],
  filter: ''
};

const rootReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case SET_FILTER:
      return {
        ...prevState,
        filter: action.payload
      }
    default:
      return prevState;
  }
};

export default rootReducer;