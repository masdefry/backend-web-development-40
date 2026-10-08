import { Request, Response } from 'express';
import { createAuthorService } from '../services/authors.service';

export const createAuthorController = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const author = await createAuthorService({ name });

    res.status(201).json({
      success: true,
      message: 'Author created successfully',
      data: author,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      data: {},
    });
  }
};
