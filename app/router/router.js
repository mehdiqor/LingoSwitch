import { setLanguage } from '../http/middlewares/set-language.middleware.js';
import { verifyAccessToken } from '../http/middlewares/auth.middleware.js';
import { LanguageRoutes } from './language/language.router.js';
import { BlogRoutes } from './blog/blog.router.js';
import { UserRoutes } from './user/user.router.js';
import { Router } from 'express';
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
AllRoutes.use('/user', setLanguage, UserRoutes);
AllRoutes.use('/language', LanguageRoutes);
AllRoutes.use(
  '/blog',
  verifyAccessToken,
  setLanguage,
  BlogRoutes,
);
