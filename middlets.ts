// [

//     1. will generate route for GET /users.
//     2. the user data will be transformed so that the response looks like: (use the array function .map to the response)
//     {
    
//     "id": 1,
//     "prefix":  "",
//     "firstName": "",
//     "lastName": "",
//     "email": "",
//     "address": " {Street} {Suite} {City} {ZipCode} ",
//     "geolocation": "(lat, lang) ",
//     "companyName": ""
    
//     }
//     3. call the api with Axios with async-retry implemented.
//     4. can only call the APls if the JWT token authorization header has a userld AND a userRole = 'ADMIN' 
//     Implement this using ExpressJS Middleware
    
//     ]



import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import asyncRetry from 'async-retry';

const app = express();
const SECRET_KEY = 'gauss626'; // Reemplaza con tu propia clave secreta

interface User {
  id: number;
  prefix: string;
  firstName: string;
  lastName: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipCode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  companyName: string;
}

// Middleware para verificar la autorización del token JWT
const checkAuthorization = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.sendStatus(401); // Unauthorized
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { userld: string; userRole: string };
    const { userld, userRole } = decoded;

    if (userld && userRole === 'ADMIN') {
      next();
    } else {
      res.sendStatus(401); // Unauthorized
    }
  } catch (error) {
    console.error('Error al verificar el token JWT:', error);
    res.sendStatus(401); // Unauthorized
  }
};

// Ruta GET /users
app.get('/users', checkAuthorization, async (req: Request, res: Response) => {
  try {
    const response = await asyncRetry(() => axios.get('http://localhost:3000/users/'), {
      retries: 3, // Número de intentos de reintentos
      minTimeout: 1000, // Tiempo mínimo entre reintentos en milisegundos
      factor: 2, // Factor de multiplicación para el tiempo de espera entre reintentos
    });

    const transformedUsers = response.data.map((user: User) => ({
      id: user.id,
      prefix: '',
      firstName: '',
      lastName: '',
      email: '',
      address: `${user.address.street} ${user.address.suite} ${user.address.city} ${user.address.zipCode}`,
      geolocation: `(${user.address.geo.lat}, ${user.address.geo.lng})`,
      companyName: '',
    }));

    res.json(transformedUsers);
  } catch (error) {
    console.error('Error al llamar a la API:', error);
    res.sendStatus(500); // Internal Server Error
  }
});

// Generar y devolver un nuevo token JWT
app.get('/login', (req: Request, res: Response) => {
  const user = {
    userld: 'tu_userld',
    userRole: 'ADMIN',
  };

  const token = jwt.sign(user, SECRET_KEY);
  res.json({ token });
});

// Puerto en el que escucha el servidor
const port = 3000;

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
