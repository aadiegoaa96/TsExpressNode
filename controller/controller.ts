import axios from 'axios';
import asyncRetry from 'async-retry';
import { User } from './models';
import { transformUser } from './utils';

const getUsers = async (): Promise<User[]> => {
  try {
    const response = await asyncRetry(() => axios.get('https://jsonplaceholder.typicode.com/users'));
    const transformedUsers = response.data.map(transformUser);
    return transformedUsers;
  } catch (error) {
    console.error('Error al llamar a la API:', error);
    throw error;
  }
};

export { getUsers };
