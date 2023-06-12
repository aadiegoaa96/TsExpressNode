import axios from 'axios';

class UserService {
  async getUsers() {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      return response.data;
    } catch (error) {
      console.error('Error al llamar a la API:', error);
      throw error;
    }
  }
}

export default new UserService();
