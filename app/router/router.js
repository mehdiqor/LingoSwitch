import { UserRoutes } from './user/user.router.js';
import { Router } from 'express';
export const AllRoutes = Router();

AllRoutes.get('/', (req, res) => {
  res.send('hello world');
});
AllRoutes.use('/user', UserRoutes);
