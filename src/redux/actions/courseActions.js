import * as actionTypes from "./actionTypes";
import * as courseApi from "../../api/courseApi";
import { beginApiCall, endApiCall } from "./apiStatusActions";

export function loadCoursesSucess(courses) {
  return { type: actionTypes.LOAD_COURSES_SUCCESS, courses };
}

export function updateCoursesSucess(course) {
  return { type: actionTypes.UPDATE_COURSES_SUCCESS, course };
}

export function createCoursesSucess(course) {
  return { type: actionTypes.CREATE_COURSES_SUCCESS, course };
}

export function deleteCourseOptomisitic(course) {
  return { type: actionTypes.DELETE_COURSE_OPTOMISTIC, course };
}

export function deleteCourse(course) {
  return function(dispatch) {
    dispatch(deleteCourseOptomisitic(course));
    return courseApi.deleteCourse(course.id);
  };
}

export function loadCourses() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return courseApi
      .getCourses()
      .then(courses => {
        dispatch(loadCoursesSucess(courses));
      })
      .catch(err => {
        dispatch(endApiCall(err));
        throw err;
      });
  };
}

export function saveCourse(course) {
  return function(dispatch, getState) {
    dispatch(beginApiCall());
    return courseApi
      .saveCourse(course)
      .then(savedCourse => {
        dispatch(
          course.id
            ? updateCoursesSucess(savedCourse)
            : createCoursesSucess(savedCourse)
        );
      })
      .catch(err => {
        dispatch(endApiCall(err));
        throw err;
      });
  };
}
