import { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UsersController } from '../controller/controller';
import { TransformedUser } from '../models/models';
import { JWT_MID } from '../middleware/middleware';

const SECRET_KEY = 'gauss626';

async function getUsersHandler(): Promise<TransformedUser[]> {
  try {
    const usersController = new UsersController();
    const users = await usersController.getUsers();
    return users;
  } catch (error) {
    throw new Error('Error al obtener los usuarios');
  }
}

export class Handler {
  private usersController: UsersController;

  constructor() {
    this.usersController = new UsersController();
  }

  jwtMiddleware = async (req: Request, res: Response) => {
    try {
      const transformedUsers: TransformedUser[] = await getUsersHandler();
      res.json(transformedUsers);
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
      res.sendStatus(500);
    }
  };

  loginHandler = (req: Request, res: Response) => {
    const payload: JwtPayload = {
      userId: 1234,
      userRole: 'ADMIN',
    };
    const token = jwt.sign(payload, SECRET_KEY);
    console.log(`Token JWT: ${token}`);
    res.json({ token });
  };
}

export default new Handler();
