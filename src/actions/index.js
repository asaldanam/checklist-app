
import { SET_FILTER } from "../constants/action-types";

export const setFilter = filterParam => ({
  type: SET_FILTER,
  payload: filterParam
})