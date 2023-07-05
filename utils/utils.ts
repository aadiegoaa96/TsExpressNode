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
      const firstNameIndex = validPrefixes.includes(nameParts[0]) ? 1 : 0;
      const firstName = nameParts.slice(firstNameIndex, -1).join(' ');
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
};

export const postUtil = {
  async transformPost(userId: string, post: any, user: any): Promise<any> {
    const transformedPost: any = {
      userId: userId,
      name: `${user.firstName} ${user.lastName}`, // Corregido
      email: user.email,
      postId: post.id,
      title: post.title,
      body: post.body
    };

    return transformedPost;
  },
};
