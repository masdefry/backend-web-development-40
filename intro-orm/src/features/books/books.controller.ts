import { Request, Response } from "express";
import { BooksService } from "./books.service";

export class BooksController{
    static async create(req: Request, res: Response){
        req.body; 
        req.params;
        req.query; 

        await BooksService.create();
    }

    static async update(req: Request, res: Response){
        await BooksService.update();
    }
}