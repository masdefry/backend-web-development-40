import { Router } from 'express';
import { BooksController } from './books.controller';

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

BooksRoute.post('/', BooksController.create);
BooksRoute.put('/', BooksController.update);
BooksRoute.get('/', BooksController.get); 