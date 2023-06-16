// >> services\services.ts

import axios from 'axios';
import { User, Post } from '../models/models';

export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    return response.data;
  } catch (error) {
    console.error('Error calling API:', error);
    throw error;
  }
};

export const getPostsByUserId = async (userId: string): Promise<Post[]> => {
  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error calling API:', error);
    throw error;
  }
};
