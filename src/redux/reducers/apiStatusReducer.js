import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function apiStatusReducer(
  state = initialState.apiCallsInProgress,
  action
) {
  if (action.type === actionTypes.BEGIN_API_CALL) {
    return state + 1;
  } else if (
    action.type.endsWith("_SUCCESS") ||
    action.type === actionTypes.END_API_CALL
  ) {
    return state - 1;
  } else {
    return state;
  }
}
