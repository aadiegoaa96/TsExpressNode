import express from 'express';
import handler from '../handler/handler';

const router = express.Router();

router.get('/users', handler.getUsersHandler);
router.get('/login', handler.loginHandler);

export { router as routes };
