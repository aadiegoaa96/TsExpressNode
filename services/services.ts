// services/services.ts
import axios from 'axios';
import { User, NewPost } from '../models/models';
import retry from 'async-retry';

export class TypicodeService {
  static async getUsers(): Promise<User[]> {
    try {
      const response = await retry(async () => {
        const result = await axios.get('https://jsonplaceholder.typicode.com/users');
        return result.data;
      });
      return response;
    } catch (error) {
      console.error('Error calling API:', error);
      throw error;
    }
  }

  static async getPostsByUserId(userId: string): Promise<NewPost[]> {
    try {
      const response = await retry(async () => {
        const result = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
        return result.data;
      });
      return response;
    } catch (error) {
      console.error('Error calling API:', error);
      throw error;
    }
  }
}
