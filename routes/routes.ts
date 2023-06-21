//routes/routes.ts


// routes/routes.ts

import express from 'express';
import { Handler } from '../handler/handler';

const router = express.Router();
const handler = new Handler();

router.get('/users', handler.getUsersHandler.bind(handler));
router.get('/login', handler.loginHandler.bind(handler));

export { router as routes };
