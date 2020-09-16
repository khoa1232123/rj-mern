import axios from 'axios';
import { URL_EXERCISE } from './types';

export const getExercisesData = async () => {
  try {
    const { data } = await axios.get(URL_EXERCISE);
    return { data };
  } catch (error) {
    console.log(error);
  }
};

export const getExerciseData = async (id) => {
  try {
    const { data } = await axios.get(URL_EXERCISE + '/' + id);
    return { data };
  } catch (error) {
    console.log(error);
  }
};

export const createExerciseData = async (newExercise) => {
  const url = URL_EXERCISE + '/add';
  try {
    const { data } = await axios.post(url, newExercise);
    return { data };
  } catch (error) {
    console.log(error);
  }
};

export const updateExerciseData = async (id, newExercise) => {
  const url = URL_EXERCISE + '/update/' + id;
  try {
    await axios.post(url, newExercise);
    console.log('Updated!!!');
  } catch (error) {
    console.log(error);
  }
};

export const deleteExerciseData = async (id) => {
  try {
    await axios.delete(URL_EXERCISE + '/' + id);
    console.log('Deleted!!!');
  } catch (error) {
    console.log(error);
  }
};
