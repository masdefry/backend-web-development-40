import { createAuthorController } from '../controllers/authors.controller';
import { Router } from 'express';

export const authorsRoute = Router(); 

authorsRoute.post('/', createAuthorController); 