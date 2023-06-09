import express from 'express';
import { getUsersHandler, loginHandler } from '../handler/handler';

const router = express.Router();
router.get('/users', getUsersHandler);
router.get('/login', loginHandler); // Agregar la ruta de login

export { router as routes };
