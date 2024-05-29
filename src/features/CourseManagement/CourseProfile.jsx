import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RECENT_PROGRAMS } from '../../utils/dummyData';

const CourseProfile = () => {
  const { id } = useParams();
  const selectedCourse = RECENT_PROGRAMS.find((course) => course.id === id);

  if (!selectedCourse) {
    return <div>Course not found!</div>;
  }

  return (
    <>
      <div className="grid place-content-center">
        <h1>{selectedCourse.Course}</h1>
        <p>{selectedCourse.Status}</p>
      </div>
    </>
  );
};

export default CourseProfile;
