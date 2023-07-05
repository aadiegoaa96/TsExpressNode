// services/services.ts

import axios from 'axios';
import { User, Post } from '../models/models';
import retry from 'async-retry';
import { postUtil } from '../utils/utils';

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

 
static async getPostsByUserId(userId: string): Promise<any> {
  try {
    const getUserResponse = await axios.get('https://jsonplaceholder.typicode.com/users');
    const user = getUserResponse.data.find((user: any) => user.id === parseInt(userId));
    if (!user) {
      throw new Error(`User with id ${userId} not found`);
    }

    const getPostsResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    const posts = getPostsResponse.data;

    const transformedPosts = await Promise.all(posts.map(async (post: any) => {
      const transformedPost = await postUtil.transformPost(userId, post, user);
      return transformedPost;
    }));

    console.log(transformedPosts);
    return transformedPosts;
  } catch (error) {
    console.error('Error calling API:', error);
    throw error;
  }
}
}