import axios from 'axios';

const getPostsByUserId = async (userId: string) => {
  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error al llamar a la API:', error);
    throw error;
  }
};

export { getPostsByUserId };
