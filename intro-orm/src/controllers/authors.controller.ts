import { Request, Response } from 'express';
import {
  createAuthorService,
  deleteAuthorService,
  updateAuthorService,
} from '../services/authors.service';

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
    if (error instanceof Error)
      return res.status(500).json({
        success: false,
        message: error?.message,
        data: {},
      });
  }
};

export const updateAuthorController = async (req: Request, res: Response) => {
  try {
    const { id } = req?.params;
    const { name } = req?.body;

    const author = await updateAuthorService({ id: id as string, name });

    res.status(200).json({
      success: true,
      message: 'Author updated successfully',
      data: author,
    });
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({
        success: false,
        message: error?.message,
        data: {},
      });
  }
};

export const deleteAuthorController = async (req: Request, res: Response) => {
  try {
    const { id } = req?.params;

    const deletedAuthor = await deleteAuthorService({ id: id as string });

    return res.status(200).json({
      success: true,
      message: `Author with id = ${id} deleted successfully`,
      data: deletedAuthor,
    });
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({
        success: false,
        message: error?.message,
        data: {},
      });
  }
};
