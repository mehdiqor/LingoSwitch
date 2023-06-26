import { LanguageRoutes } from './language/language.router.js';
import { UserRoutes } from './user/user.router.js';
import { Router } from 'express';
export const AllRoutes = Router();

AllRoutes.get('/', (req, res) => {
  res.send({
    'supported languages': ['English', 'Français', 'Deutsch', 'فارسی'],
  });
});
AllRoutes.use('/user', UserRoutes);
AllRoutes.use('/language', LanguageRoutes);
