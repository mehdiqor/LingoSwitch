import { UserAuthController } from '../../http/controllers/user/user.controller.js';
import { Router } from 'express';
export const UserRoutes = Router();

UserRoutes.post('/register', UserAuthController.signup);
UserRoutes.post('/login', UserAuthController.signin);
UserRoutes.get('/logout', UserAuthController.signout);
UserRoutes.get('/refreshToken', UserAuthController.refreshToken);
