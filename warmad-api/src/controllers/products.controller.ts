/*
    LAYER CONTROLLER: 
    1. Menghandle request dan response
*/

import { Request, Response } from 'express';
import {
  createProductsService,
  updateProductsService,
} from '../services/products.service';

export const createProductsController = async (req: Request, res: Response) => {
  try {
    const { title, price, category, stock, description } = req.body;

    await createProductsService({ title, price, category, stock, description });

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: {
        title,
        price,
        category,
        stock,
        description,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error,
      data: {},
    });
  }
};

export const getProductsController = async (req: Request, res: Response) => {};

export const updateProductsController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, price, category, stock } = req.body;
    await updateProductsService({
      id: Number(id),
      title,
      description,
      price,
      category,
      stock,
    });

    res.status(200).json({
      success: true,
      message: `Product with id = ${id} updated successfully`,
      data: { title, description, price, category, stock },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error,
      data: {},
    });
  }
};

export const deleteProductsController = (req: Request, res: Response) => {
  const { id } = req.params;
};
