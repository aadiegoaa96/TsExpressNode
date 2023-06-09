import { Request, Response } from 'express';
import { getUsers } from '../controller/controller';
import jwt from 'jsonwebtoken'; // Importar el módulo jsonwebtoken

const SECRET_KEY = 'gauss626';

const getUsersHandler = async (req: Request, res: Response) => {
  try {
    const transformedUsers = await getUsers();
    res.json(transformedUsers);
  } catch (error) {
    console.error('Error al llamar a la API:', error);
    res.sendStatus(500); // Internal Server Error
  }
};

const loginHandler = (req: Request, res: Response) => {
  // Generar y devolver el token JWT en la respuesta
  const payload = {
    username: 'example',
    role: 'admin'
  };

  const token = jwt.sign(payload, SECRET_KEY);
  res.json({ token });
};

export { getUsersHandler, loginHandler };
