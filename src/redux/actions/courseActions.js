import * as actionTypes from "./actionTypes";
import * as courseApi from "../../api/courseApi";

export function loadCoursesSucess(courses) {
  return { type: actionTypes.LOAD_COURSES_SUCCESS, courses };
}

export function updateCoursesSucess(course) {
  return { type: actionTypes.UPDATE_COURSES_SUCCESS, course };
}

export function createCoursesSucess(course) {
  return { type: actionTypes.CREATE_COURSES_SUCCESS, course };
}

export function loadCourses() {
  return function(dispatch) {
    return courseApi.getCourses().then(courses => {
      dispatch(loadCoursesSucess(courses));
    });
  };
}

export function saveCourse(course) {
  return function(dispatch, getState) {
    return courseApi.saveCourse(course).then(savedCourse => {
      dispatch(
        course.id
          ? updateCoursesSucess(savedCourse)
          : createCoursesSucess(savedCourse)
      );
    });
  };
}
