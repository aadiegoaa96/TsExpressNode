// >> app.ts

import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UsersController } from './controller/controller';

const app = express();
const port = 4000;
const secretKey = 'your-secret-key'; // Reemplaza esto con tu clave secreta para JWT

app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  // Middleware para verificar el token JWT en las rutas protegidas
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    try {
      const decoded = jwt.verify(token, secretKey);
      res.locals.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token de autenticación inválido' });
    }
  } else {
    return res.status(401).json({ message: 'No se proporcionó un token de autenticación' });
  }
});

const usersController = new UsersController();

app.get('/users', async (req: Request, res: Response) => {
  try {
    const users = await usersController.getUsers();
    res.json(users);
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

app.get('/users/:userId/posts', async (req: Request, res: Response) => {
  const userId = req.params.userId;

  try {
    const posts = await usersController.getUserPosts(userId);
    res.json(posts);
  } catch (error) {
    console.error('Error al obtener los posts del usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
  console.log(`Token JWT: ${generateToken()}`);
});

function generateToken() {
  const payload = {
    username: 'example',
    role: 'admin',
    iat: Math.floor(Date.now() / 1000)
  };

  return jwt.sign(payload, secretKey);
}