//app.ts

import express, { Request, Response, NextFunction } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';
import { User } from './models/models';
import { usersUtil } from './utils/utils';
import { UsersController } from './controller/controller';

const port = 4000;
const secretKey = 'tu-clave-secreta'; // Reemplaza esto con tu clave secreta para JWT

const app = express();

// Middleware para verificar el token JWT en las rutas protegidas
const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]; // Obtener el JWT de los encabezados

  if (!token) {
    return res.status(401).json({ message: 'No se proporcionó un token de autenticación' });
  }

  jwt.verify(token, secretKey, (err: VerifyErrors | null) => {
    if (err) {
      return res.status(401).json({ message: 'Token de autenticación inválido' });
    }

    next(); // Continuar con la siguiente función de middleware
  });
};

// Middleware para validar los parámetros de consulta y el rol del usuario
const validateParamsAndRole = (req: Request, res: Response, next: NextFunction) => {
  const { userId, userRole } = req.query;

  if (!userId || !userRole) {
    return res.status(400).json({ message: 'Faltan campos requeridos en los parámetros de consulta' });
  }

  const userIdNumber = Number(userId);
  if (isNaN(userIdNumber) || !Number.isInteger(userIdNumber)) {
    return res.status(400).json({ message: 'El userId debe ser un número entero válido' });
  }

  if (userRole !== 'ADMIN') {
    return res.status(403).json({ message: 'No tienes permisos para acceder a esta ruta' });
  }

  next();
};



app.get('/users', authenticate, validateParamsAndRole, async (req: Request, res: Response) => {
  const { userId } = req.query;

  try {
    const usersController = new UsersController();
    const transformedUsers = await usersController.getUsers();
    res.json(transformedUsers);
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});



app.get('/login', (req: Request, res: Response) => {
  const payload = {
    userId: '1',
    userRole: 'ADMIN',
  };
  const token = jwt.sign(payload, secretKey);
  console.log(`Token JWT: ${token}`);
  res.json({ token });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
