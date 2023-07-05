// routes/routes

import express from 'express';
import { JWT_MID } from '../middleware/middleware';
import handler from '../handler/handler';
import { TypicodeService } from '../services/services';

const router = express.Router();

router.get('/users', JWT_MID, handler.usersHandler);
router.get('/login', handler.loginHandler);

router.get('/users/:userId/posts', JWT_MID, async (req, res) => {
    try {
      const userId = req.params.userId;
      const posts = await TypicodeService.getPostsByUserId(userId);
      res.json(posts);
    } catch (error) {
      console.error('Error al obtener los posts:', error);
      res.sendStatus(500);
    }
  });
  
export default router;