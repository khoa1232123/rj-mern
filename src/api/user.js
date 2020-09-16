import axios from 'axios';
import { URL_USER } from './types';

export const getUserData = async () => {
  try {
    const { data } = await axios.get(URL_USER);
    return { data };
  } catch (error) {
    console.log(error);
  }
};

export const createUserData = async (newUser) => {
  const url = URL_USER + '/add';
  try {
    const { data } = await axios.post(url, newUser);
    return { data };
  } catch (error) {
    console.log(error);
  }
};
