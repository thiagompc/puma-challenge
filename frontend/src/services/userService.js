import axios from 'axios';


const router = axios.create({
  baseURL: 'http://localhost:5000',
});

export const getAllUsers = async () => {
  try {
    const response = await router.get('/users');
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const addUser = async (username) => {
  try {
    const response = await router.post('/users', { username });
    return response.data;
  } catch (e) {
    console.error( e);
    throw e;
  }
};

export const deleteUser = async (username) => {
  try {
    await router.delete(`/users/${username}`);
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const toggleStar = async (username) => {
  try {
    await router.patch(`/users/${username}/toggle-star`);
  } catch (e) {
    console.error(e);
    throw e;
  }
};