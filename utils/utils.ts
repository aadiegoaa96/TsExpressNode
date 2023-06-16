//utils/utils.ts

// >> utils\utils.ts

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
  transformUsers(users: User[]): TransformedUser[] {
    return users.map((user) => {
      const nameParts = user.name.split(' '); // Dividir el nombre en partes
      const firstName = nameParts.slice(validPrefixes.includes(nameParts[0]) ? 1 : 0, -1).join(' '); // Unir los nombres restantes en el primer nombre, excluyendo el apellido
      const prefix = validPrefixes.includes(nameParts[0]) ? nameParts[0] : ''; // Obtener el prefijo si existe, de lo contrario, dejarlo vacío
      const lastName = nameParts[nameParts.length - 1] || ''; // Obtener el apellido si existe, de lo contrario, dejarlo vacío
      const companyName = user.company.name || ''; // Obtener el nombre de la compañía si existe, de lo contrario, dejarlo vacío

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