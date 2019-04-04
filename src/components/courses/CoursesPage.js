import React from "react";
import { connect } from "react-redux";
import { loadCourses } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseList from "./CourseList";
import Spinner from "../common/Spinner";

class CoursesPage extends React.Component {
  componentDidMount() {
    const { courses, authors, loadAuthors, loadCourses } = this.props;

    if (courses.length === 0) {
      loadCourses().catch(error => {
        alert("Loading courses failed" + error);
      });
    }

    if (authors.length === 0) {
      loadAuthors().catch(error => {
        alert("Loading authors failed" + error);
      });
    }
  }

  render() {
    return (
      <>
        <h2>Courses</h2>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-course"
              onClick={() => this.props.history.push("/course")}
            >
              Add Course
            </button>

            <CourseList courses={this.props.courses} />
          </>
        )}
      </>
    );
  }
}

CoursesPage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map(course => {
            return {
              ...course,
              authorName: state.authors.find(a => a.id === course.authorId).name
            };
          }),
    authors: state.authors,
    loading: state.apiStatus > 0
  };
}

const mapDispatchToProps = {
  loadCourses,
  loadAuthors
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursesPage);
