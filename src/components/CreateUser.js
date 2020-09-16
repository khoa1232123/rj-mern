import React, { useState } from 'react';
import { createUserData } from '../api/user';

const CreateUser = () => {
  const [username, setUsername] = useState('');
  const onSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username,
    };
    console.log(newUser);
    await createUserData(newUser);
    setUsername('');
  };
  return (
    <div>
      <h3>Create New User</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create User"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
