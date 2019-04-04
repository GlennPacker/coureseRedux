import { combineReducers } from "redux";
import courses from "./courseReducer";
import authors from "./authorReducer";
import apiStatus from "./apiStatusReducer";

const rootReducer = combineReducers({
  apiStatus,
  authors,
  courses
});

export default rootReducer;
