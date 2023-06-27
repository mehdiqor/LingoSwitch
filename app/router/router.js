import { LanguageRoutes } from './language/language.router.js';
import { BlogRoutes } from './blog/blog.router.js';
import { UserRoutes } from './user/user.router.js';
import { Router } from 'express';
import { authenticateToken } from '../http/middlewares/auth.middleware.js';
export const AllRoutes = Router();

AllRoutes.get('/', (req, res) => {
  res.send({
    'supported languages': [
      'English',
      'Français',
      'Deutsch',
      'فارسی',
    ],
  });
});
AllRoutes.use('/user', UserRoutes);
AllRoutes.use(
  '/language',
  authenticateToken,
  LanguageRoutes,
);
AllRoutes.use('/blog', authenticateToken, BlogRoutes);
