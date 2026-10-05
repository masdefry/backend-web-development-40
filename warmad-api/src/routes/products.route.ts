/*
    LAYER ROUTER: 
    1. Mendefinisikan http method
    2. Mendefinisikan route URL 
*/

import { Router } from 'express';
import { createProductsController, deleteProductsController, getProductsController, updateProductsController } from '../controllers/products.controller';

export const productsRoute = Router(); 

productsRoute.post('/products', createProductsController); 
productsRoute.get('/products', getProductsController);  
productsRoute.put('/products/:id', updateProductsController); 
productsRoute.delete('/products/:id', deleteProductsController); 