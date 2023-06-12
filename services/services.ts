import axios from 'axios';
import { User } from '../models/models';

export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    return response.data;
  } catch (error) {
    console.error('Error al llamar a la API:', error);
    throw error;
  }
};
