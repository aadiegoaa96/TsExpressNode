import { transformUser } from '../utils/utils';
import { getUsers } from '../services/services';
import { User } from '../models/models';

const getUsersController = async (): Promise<User[]> => {
  try {
    const users = await getUsers();
    const transformedUsers = users.map(transformUser);
    return transformedUsers;
  } catch (error) {
    console.error('Error al llamar a la API:', error);
    throw error;
  }
};

export { getUsersController };
