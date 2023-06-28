// controller/controller.ts
import { usersUtil, postsUtil } from '../utils/utils';
import { User, NewPost, TransformedUser, transformedNewPost } from '../models/models';
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

  async getUserPosts(userId: string): Promise<transformedNewPost[]> {
    try {
      const posts = await TypicodeService.getPostsByUserId(userId);
      const transformedPosts = postsUtil.transformUserPosts(posts);
      return transformedPosts;
    } catch (error) {
      console.error('Error calling API:', error);
      throw error;
    }
  }
}