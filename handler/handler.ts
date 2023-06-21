//handler/handler.ts

import { Request, Response, NextFunction } from 'express';
import jwt, { VerifyErrors, JwtPayload } from 'jsonwebtoken';
import { UsersController } from '../controller/controller';
import { TransformedUser } from '../models/models';

const SECRET_KEY = 'gauss626';

export const handleGetUsers = async (req: Request, res: Response) => {
  try {
    const users = await getUsersHandler();
    console.log(users); // Imprime la respuesta en la consola
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los usuarios' });
  }
};

export class Handler {
  private usersController: UsersController;

  constructor() {
    this.usersController = new UsersController();
  }

  getUsersHandler(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) {
        return res.status(401).json({ message: 'No se proporcionó un token de autenticación' });
      }

      jwt.verify(token, SECRET_KEY, (err: VerifyErrors | null, decodedToken: JwtPayload | undefined) => {
        if (err) {
          return res.status(401).json({ message: 'Token de autenticación inválido' });
        }

        if (!decodedToken?.userId || !decodedToken?.userRole) {
          return res.status(400).json({ message: 'Faltan campos requeridos en los headers' });
        }

        if (typeof decodedToken.userId !== 'number' || typeof decodedToken.userRole !== 'string') {
          return res.status(400).json({ message: 'Los campos userId y userRole deben tener el tipo de dato correcto' });
        }

        if (decodedToken.userRole !== 'ADMIN') {
          return res.status(403).json({ message: 'No tienes permisos para acceder a esta ruta' });
        }

        this.usersController.getUsers()
          .then((transformedUsers: TransformedUser[]) => {
            res.json(transformedUsers);
          })
          .catch((error: Error) => {
            console.error('Error al obtener los usuarios:', error);
            res.sendStatus(500);
          });
      });
    } catch (error) {
      console.error('Error al llamar a la API:', error);
      res.sendStatus(500);
    }
  }

  loginHandler(req: Request, res: Response) {
    const payload = {
      userId: 1234,
      userRole: 'ADMIN',
    };
    const token = jwt.sign(payload, SECRET_KEY);
    console.log(`Token JWT: ${token}`);
    res.json({ token });
  }
}

export default new Handler();
function getUsersHandler() {
  throw new Error('Function not implemented.');
}

