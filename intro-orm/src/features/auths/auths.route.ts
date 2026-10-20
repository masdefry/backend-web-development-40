import { Router } from 'express';
import { AuthsController } from './auths.controller';
import { authenticate } from '../../middlewares/auth.middleware';

export const AuthsRoute = Router();

AuthsRoute.post('/register', AuthsController.register);
AuthsRoute.post('/login', AuthsController.login); 
AuthsRoute.get('/me', authenticate, AuthsController.me); 
