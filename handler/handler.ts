import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { getUsersController } from '../controller/controller';
import { User } from '../models/models';

const SECRET_KEY = 'gauss626';

export class Handler {
  async getUsersHandler(req: Request, res: Response) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'No se proporcionó un token de autenticación' });
      }

      jwt.verify(token, SECRET_KEY, async (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'Token de autenticación inválido' });
        }

        const transformedUsers: User[] = await getUsersController();
        res.json(transformedUsers);
      });
    } catch (error) {
      console.error('Error al llamar a la API:', error);
      res.sendStatus(500);
    }
  }

  loginHandler(req: Request, res: Response) {
    const payload = {
      username: 'example',
      role: 'admin'
    };
    const token = jwt.sign(payload, SECRET_KEY);
    res.json({ token });
  }
}
