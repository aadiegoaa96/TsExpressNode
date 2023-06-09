//  controller\controller.ts


import { usersUtil } from '../utils/utils';
import { User, Post, TransformedUser, TransformedPosts } from '../models/models';
import { TypicodeService } from '../services/services';

export class UsersController {
  async getUsers(): Promise<TransformedUser[]> {
    try {
      const users = await TypicodeService.getUsers();
      const transformedUsers = await usersUtil.transformUsers(users);
      return transformedUsers;

    } catch (error) {
      console.error('Error calling API:', error);
      throw error;
    }
  }

  async getUserPosts(userId: string): Promise<TransformedPosts[]> {
    try {
      const posts = await TypicodeService.getPostsByUserId(userId);
      const transformedPosts = usersUtil.transformUserPosts(posts);
      return transformedPosts;
    } catch (error) {
      console.error('Error calling API:', error);
      throw error;
    }
  }
}
