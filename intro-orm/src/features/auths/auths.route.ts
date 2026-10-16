import { Router } from 'express';
import { AuthsController } from './auths.controller';

export const AuthsRoute = Router();

AuthsRoute.post('/register', AuthsController.register);
