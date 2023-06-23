// utils/utils.ts



import { User, Post, TransformedUser, TransformedPosts } from '../models/models';

const validPrefixes = [
  'Mr.',
  'Mrs.',
  'Miss',
  'Dr.',
  'Prof.',
  'Eng.',
  'Lic.',
  'Rev.',
  'Fr.',
  'Bro'
];

export const usersUtil = {
  async transformUsers(users: User[]): Promise<TransformedUser[]> {
    return users.map((user) => {
      const nameParts = user.name.split(' ');
      const firstName = nameParts.slice(validPrefixes.includes(nameParts[0]) ? 1 : 0, -1).join(' ');
      const prefix = validPrefixes.includes(nameParts[0]) ? nameParts[0] : '';
      const lastName = nameParts[nameParts.length - 1] || '';
      const companyName = user.company.name || '';

      const transformedUser: TransformedUser = {
        id: user.id,
        prefix,
        firstName,
        lastName,
        email: user.email,
        address: `${user.address.street} ${user.address.suite} ${user.address.city} ${user.address.zipcode}`,
        geolocation: `(${user.address.geo.lat}, ${user.address.geo.lng})`,
        companyName
      };

      return transformedUser;
    });
  },

  transformUserPosts(posts: Post[]): TransformedPosts[] {
    return posts.map((post) => {
      return {
        postId: post.postId,
        userId: post.userId,
        title: post.title,
        body: post.body
      };
    });
  }
};
