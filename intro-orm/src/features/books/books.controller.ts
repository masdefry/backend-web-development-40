import { Request, Response } from 'express';
import { BooksService } from './books.service';
import { validate } from '../../validators/validate';
import {
  createBookSchema,
  getBookSchema,
} from '../../validators/books.validator';

export class BooksController {
  static async create(req: Request, res: Response) {
    const { body } = validate(createBookSchema, { body: req.body });

    const createdBook = await BooksService.create({ body });

    res.status(201).json({
      success: true,
      message: `Book created successfully`,
      data: createdBook,
    });
  }

  static async get(req: Request, res: Response) {
    const { query } = validate(getBookSchema, { query: req?.query });

    const { page, total, totalPage, books, limit } = await BooksService.get({
      query,
    });

    res.status(200).json({
      success: true,
      message: `Book retrieved successfully`,
      data: books,
      meta: {
        total,
        page: page,
        totalPage,
        limit: limit,
      },
    });
  }

  static async update(req: Request, res: Response) {
    try {
      await BooksService.update();
    } catch (error) {}
  }
}
