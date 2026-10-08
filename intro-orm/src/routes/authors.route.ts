import { createAuthorController, deleteAuthorController, updateAuthorController } from '../controllers/authors.controller';
import { Router } from 'express';

export const authorsRoute = Router(); 

authorsRoute.post('/', createAuthorController); 
authorsRoute.put('/:id', updateAuthorController); 
authorsRoute.delete('/:id', deleteAuthorController); 