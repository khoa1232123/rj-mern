import React, { useState, useEffect } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams } from 'react-router-dom';
import { getUserData } from '../api/user';
import { getExerciseData, updateExerciseData } from '../api/exercise';

const EditExercise = ({ history }) => {
  const { id } = useParams();
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const asyncFunc = async () => {
      const { data } = await getUserData();
      setUsers(data.map((user) => user.username));
      const { data: dataExercise } = await getExerciseData(id);
      if (dataExercise._id !== '') {
        setUsername(dataExercise.username);
        setDescription(dataExercise.description);
        setDuration(dataExercise.duration);
        setDate(new Date(dataExercise.date));
      }
    };
    asyncFunc();
  }, [setUsers, id, setUsername, setDescription, setDuration, setDate]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const exercise = {
      username,
      description,
      duration,
      date,
    };
    await updateExerciseData(id, exercise);
    history.push({ pathname: '/' });
  };

  return (
    <div>
      <h3>Edit Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <select
            required
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          >
            <option>--Select user--</option>
            {users.map((user) => {
              return (
                <option key={user} value={user}>
                  {user}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input
            type="text"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Duration: </label>
          <input
            type="number"
            className="form-control"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
          />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <ReactDatePicker
              className="form-control"
              selected={date}
              onChange={(e) => setDate(e)}
            />
          </div>
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create Exercise Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default EditExercise;
