import { Request, Response } from 'express';
import { BooksService } from './books.service';

export class BooksController {
  static async create(req: Request, res: Response) {
    try {
      const { title, isbn, description, category, authorId } = req?.body;

      const createdBook = await BooksService.create({
        title,
        isbn,
        description,
        category,
        authorId,
      });

      res.status(201).json({
        success: true,
        message: `Book created successfully`,
        data: createdBook,
      });
    } catch (error) {
      if (error instanceof Error)
        return res.status(500).json({
          success: false,
          message: error?.message,
          data: {},
        });
    }
  }

  static async get(req: Request, res: Response) {
    try {
      const books = await BooksService.get();

      res.status(200).json({
        success: true,
        message: `Book retrieved successfully`,
        data: books,
      });
    } catch (error) {
      if (error instanceof Error)
        return res.status(500).json({
          success: false,
          message: error?.message,
          data: {},
        });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      await BooksService.update();
    } catch (error) {}
  }
}
