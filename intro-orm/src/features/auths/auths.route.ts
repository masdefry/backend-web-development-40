import { Router } from 'express';
import { AuthsController } from './auths.controller';
import { authenticate, authorize } from '../../middlewares/auth.middleware';

export const AuthsRoute = Router();

AuthsRoute.post(
  '/register',
  authenticate,
  authorize(['MANAGER']),
  AuthsController.register,
);
AuthsRoute.post('/login', AuthsController.login);
AuthsRoute.get('/me', authenticate, AuthsController.me);
AuthsRoute.patch('/set-password/:userId', AuthsController.setPassword);
