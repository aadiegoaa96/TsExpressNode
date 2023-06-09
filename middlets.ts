import express, { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import asyncRetry from 'async-retry';
import jwt from 'jsonwebtoken';
import mongoose, { ConnectOptions } from 'mongoose';

const app = express();
const port = 3000;
const SECRET_KEY = 'gauss626';
const MONGO_URL = 'mongodb://127.0.0.1:27017/mydatabase';
const COLLECTION_NAME = 'log-collection';

// Definir el esquema de los logs
const logSchema = new mongoose.Schema({
  resourceAccessed: String,
  userId: String,
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

// Modelo de los logs
const Log = mongoose.model('Log', logSchema);

app.use(async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.headers;
  const logEntry = {
    resourceAccessed: req.path,
    userId: userId || '', // Capturar el valor de userId del encabezado de la solicitud
  };

  try {
    const log = await Log.create(logEntry);
    const formattedLog = log.toObject(); // Transformar el objeto a un formato plano
    console.log('Registro de log guardado:', formattedLog);
  } catch (error) {
    console.error('Error al guardar el log en MongoDB:', error);
  }

  next();
});



// Middleware para verificar la autorización del token JWT
const checkAuthorization = (req: Request, res: Response, next: NextFunction) => {
  const { userId, userRole } = req.headers;

  if (!userId || userRole !== 'ADMIN') {
    return res.sendStatus(401); // Unauthorized
  }

  next();
};

// Transformar los datos del usuario según el formato requerido
const transformUser = (user: any) => ({
  userId: user.id,
  name: user.name,
  email: user.email,
  postId: "",
  title: "",
  body: ""
});

// Ruta GET /users
app.get('/users', async (req: Request, res: Response) => {
  try {
    const response = await asyncRetry(() => axios.get('https://jsonplaceholder.typicode.com/users'));

    const transformedUsers = response.data.map(transformUser);

    res.json(transformedUsers);
  } catch (error) {
    console.error('Error al llamar a la API:', error);
    res.sendStatus(500); // Internal Server Error
  }
});

// Ruta GET /users/:userId/posts
app.get('/users/:userId/posts', async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const response = await asyncRetry(() => axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`));

    const filteredPosts = response.data.filter((post: any) => post.body.length > 120);

    res.json(filteredPosts);
  } catch (error) {
    console.error('Error al llamar a la API:', error);
    res.sendStatus(500); // Internal Server Error
  }
});

// Generar el token JWT y mostrarlo en la consola
const generateJWT = () => {
  const payload = { userId: 'exampleUserId', userRole: 'ADMIN' };
  const token = jwt.sign(payload, SECRET_KEY);
  console.log('JWT generado:', token);
};

// Llamada a la función para generar el token JWT
generateJWT();

// Conectar a la base de datos de MongoDB
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
} as ConnectOptions)
  .then(async () => {
    // Crear la colección "log-collection" si no existe
    const collectionExists = await mongoose.connection.db.listCollections({ name: COLLECTION_NAME }).hasNext();
    if (!collectionExists) {
      await mongoose.connection.db.createCollection(COLLECTION_NAME, {
        validator: {
          $jsonSchema: {
            bsonType: 'object',
            required: ['resourceAccessed', 'userId', 'dateCreated'],
            properties: {
              resourceAccessed: {
                bsonType: 'string',
                description: 'REST path accessed'
              },
              userId: {
                bsonType: 'string',
                description: 'User ID'
              },
              dateCreated: {
                bsonType: 'date',
                description: 'Date created'
              }
            }
          }
        }
      });
      console.log(`Colección "${COLLECTION_NAME}" creada exitosamente`);
    }

    // Configurar la aplicación Express para escuchar en el puerto especificado
    app.listen(port, () => {
      console.log(`Servidor escuchando en http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar a MongoDB:', error);
  });
