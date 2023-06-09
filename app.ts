import express, { Request, Response, NextFunction } from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import { routes } from './routes/routes';
import jwt from 'jsonwebtoken';

const app = express();
const port = 3000;
const SECRET_KEY = 'gauss626';
const MONGO_URL = 'mongodb://127.0.0.1:27017/mydatabase';
const COLLECTION_NAME = 'log-collection';

app.use(express.json());

app.use(async (req: Request, res: Response, next: NextFunction) => {
  // ... código de middleware para guardar el log ...
  console.log('Server started');
  next();
});

app.use('/', routes);

// Generar el token JWT y mostrarlo en la consola
const generateJWT = () => {
  const payload = {
    username: 'example',
    role: 'admin'
  };

  const token = jwt.sign(payload, SECRET_KEY);
  console.log('Token JWT:', token);
};

// Llamada a la función para generar el token JWT
generateJWT();

// Conectar a la base de datos de MongoDB
mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  } as ConnectOptions)
  .then(async () => {
    // ... código para crear la colección "log-collection" ...

    // Configurar la aplicación Express para escuchar en el puerto especificado
    app.listen(port, () => {
      console.log(`Servidor escuchando en http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar a MongoDB:', error);
  });

export { app };
