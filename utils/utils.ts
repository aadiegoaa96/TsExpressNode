// utils/utils.ts
import { User, NewPost, TransformedUser, transformedNewPost } from '../models/models';

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
  'Bro',
];

export const usersUtil = {
  transformUsers(users: User[]): TransformedUser[] {
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
        companyName,
      };

      return transformedUser;
    });
  },
};

export const postsUtil = {
  transformUserPosts(posts: NewPost[]): transformedNewPost[] {
    return posts.map((post) => {
      return {
        postId: post.postId,
        userId: post.userId,
        firstName: post.firstName,
        lastName: post.lastName,
        email: post.email,
        title: post.title,
        body: post.body,
      };
    });
  },
};
