import transformUser from '../utils/utils';
import Handler from '../handler/handler';
import axios from 'axios';
import asyncRetry from 'async-retry';

const getUsers = async (): Promise<any[]> => {
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
