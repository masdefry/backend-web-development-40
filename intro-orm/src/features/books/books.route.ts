import { Router } from 'express';
import { BooksController } from './books.controller';
import { uploadMiddleware } from '../../middlewares/upload.middleware';
import { authenticate, authorize } from '../../middlewares/auth.middleware';

// export class BooksRoute {
//   private route: Router;
//   private BooksController;

//   constructor() {
//     this.route = Router();
//     this.BooksController = new BooksController();
//     this.InitializeRoutes();
//   }

//   private InitializeRoutes() {
//     this.route.post('/', this.BooksController.create);
//   }

//   getRoutes(){
//     return this.route;
//   }
// }

export const BooksRoute = Router();

BooksRoute.post(
  '/',
  authenticate, 
  authorize(['STAFF']), 
  uploadMiddleware(['jpg', 'jpeg', 'png', 'svg', 'webp'], 'MEMORY').fields([
    { name: 'coverImage', maxCount: 1 },
  ]),
  BooksController.create,
);
BooksRoute.put('/:isbn', BooksController.update);
BooksRoute.get('/', BooksController.get);
