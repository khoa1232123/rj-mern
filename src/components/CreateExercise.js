import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getUserData } from '../api/user';

const CreateExercise = ({ history }) => {
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const { data } = await getUserData();
      console.log(data);
      setUsers(data.map((user) => user.username));
      setUsername(data[0].username);
    };
    getData();
  }, [setUsers]);

  const onSubmit = (e) => {
    e.preventDefault();
    const exercise = {
      username,
      description,
      duration,
      date,
    };
    console.log(exercise);
    axios
      .post('http://localhost:5000/api/exercises/add', exercise)
      .then((res) => {
        console.log(res.data);
        history.push({ pathname: '/' });
      });
  };

  return (
    <div>
      <h3>Create New Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <select
            required
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          >
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

export default CreateExercise;
