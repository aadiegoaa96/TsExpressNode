//routes/routes

import express from 'express';
import { JWT_MID } from '../middleware/middleware';
import handler from '../handler/handler';

const router = express.Router();

router.get('/users', JWT_MID, handler.usersHandler);
router.get('/login', handler.loginHandler);

export default router;
