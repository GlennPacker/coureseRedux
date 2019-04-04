import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function courseReducer(state = initialState.authors, action) {
  switch (action.type) {
    case actionTypes.CREATE_COURSES_SUCCESS:
      return [...state, { ...action.course }];
    case actionTypes.DELETE_COURSE_OPTOMISTIC:
      return state.filter(course => course.id !== action.course.id);
    case actionTypes.UPDATE_COURSES_SUCCESS:
      return state.map(course =>
        course.id === action.course.id ? action.course : course
      );
    case actionTypes.LOAD_COURSES_SUCCESS:
      return action.courses;
    default:
      return state;
  }
}
