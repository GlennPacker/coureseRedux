import * as actionTypes from "./actionTypes";
import * as courseApi from "../../api/courseApi";

export function createCourse(course) {
  return { type: actionTypes.CREATE_COURSE, course };
}

export function loadCoursesSucess (courses) {
  return { type: actionTypes.LOAD_COURSES_SUCCESS, courses }
}

export function loadCourses () {
  return function (dispatch) {
    return courseApi.getCourses().then(courses => {
      dispatch(loadCoursesSucess(courses));
    })
  }
}