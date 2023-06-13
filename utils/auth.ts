// utils/auth.ts

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'gauss626';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]; // Obtener el JWT de los encabezados

  if (!token) {
    return res.status(401).json({ message: 'No se proporcionó un token de autenticación' });
  }

  jwt.verify(token, SECRET_KEY, (err) => {
    if (err) {
      return res.status(401).json({ message: 'Token de autenticación inválido' });
    }

    next(); // Continuar con la siguiente función de middleware
  });
};
