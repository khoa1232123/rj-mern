import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getExercisesData, deleteExerciseData } from '../api/exercise';

const ExerciseItem = ({ exercise, deleteExercise }) => {
  const { username, description, duration, date, _id } = exercise;
  return (
    <tr>
      <td>{username}</td>
      <td>{description}</td>
      <td>{duration}</td>
      <td>{date}</td>
      <td>
        <Link className="btn btn-warning btn-sm" to={'/edit/' + _id}>
          Edit
        </Link>{' '}
        <button
          className="btn btn-danger btn-sm"
          onClick={() => deleteExercise(_id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

const ExercisesList = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const { data } = await getExercisesData();
      console.log(data);
      if (data.length > 0) {
        setExercises(data);
      }
    };
    getData();
  }, [setExercises]);

  const deleteExercise = async (id) => {
    await deleteExerciseData(id);
    setExercises(exercises.filter((item) => item._id !== id));
  };

  return (
    <div>
      <h3>ExercisesList ExercisesList</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {exercises.map((exercise) => {
            return (
              <ExerciseItem
                key={exercise._id}
                exercise={exercise}
                deleteExercise={deleteExercise}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ExercisesList;
