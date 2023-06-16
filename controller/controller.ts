// >> controller\controller.ts

import { usersUtil } from '../utils/utils';
import { getUsers, getPostsByUserId } from '../services/services';
import { User, Post, TransformedUser, TransformedPosts } from '../models/models';

export class UsersController {
  constructor() {}

  async getUsers(): Promise<TransformedUser[]> {
    try {
      const users = await getUsers();
      const transformedUsers = usersUtil.transformUsers(users);

      return transformedUsers;
    } catch (error) {
      console.error('Error calling API:', error);
      throw error;
    }
  }

  async getUserPosts(userId: string): Promise<TransformedPosts[]> {
    try {
      const posts = await getPostsByUserId(userId);
      const transformedPosts = usersUtil.transformUserPosts(posts);

      return transformedPosts;
    } catch (error) {
      console.error('Error calling API:', error);
      throw error;
    }
  }
}