// handler/handler.ts
import { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UsersController } from '../controller/controller';
import { TransformedUser, transformedNewPost } from '../models/models';

const SECRET_KEY = 'gauss626';

export class Handler {
  private usersController: UsersController;

  constructor() {
    this.usersController = new UsersController();
  }

  usersHandler = async (req: Request, res: Response) => {
    try {
      const getUsersHandler = async (): Promise<TransformedUser[]> => {
        try {
          const users = await this.usersController.getUsers();
          return users;
        } catch (error) {
          throw new Error('Error al obtener los usuarios');
        }
      };

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

  postHandler = async (req: Request, res: Response) => {
    const userId: string = req.params.userId;

    try {
      const userPosts = await this.usersController.getUserPosts(userId);
      res.json(userPosts);
    } catch (error) {
      console.error('Error al obtener los posts del usuario:', error);
      res.sendStatus(500);
    }
  };
}

export default new Handler();