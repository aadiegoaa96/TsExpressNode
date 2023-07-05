// middleware/middleware.ts

import { Request, Response, NextFunction, Express } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const SECRET_KEY = 'gauss626';

export const JWT_MID = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No se proporcionó un token de autenticación' });
    }

    try {
      const decodedToken = jwt.verify(token, SECRET_KEY) as JwtPayload;

      if (!decodedToken?.userId || !decodedToken?.userRole) {
        return res.status(400).json({ message: 'Faltan campos requeridos en los headers' });
      }

      if (typeof decodedToken.userId !== 'number' || typeof decodedToken.userRole !== 'string') {
        return res.status(400).json({ message: 'Los campos userId y userRole deben tener el tipo de dato correcto' });
      }

      next();

    } catch (error) {
      console.error('Error al verificar el token:', error);
      res.sendStatus(500);
    }
  } catch (error) {
    console.error('Error al llamar a la API:', error);
    res.sendStatus(500);
  }
};
