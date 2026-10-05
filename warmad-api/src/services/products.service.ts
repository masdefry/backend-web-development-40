enum Category {
  PERKAKAS,
  SEMBAKO,
  LAINNYA,
}

interface Products {
  id?: number;
  title: string;
  price: number;
  description: string;
  stock: number;
  category: Category;
  created_at?: Date;
  updated_at?: Date;
}

import pool from '../configs/pool-connection.config';

export const createProductsService = async ({
  title,
  price,
  description,
  stock,
  category
}: Products) => {
  // Query Replacement 
  await pool.query(
    `insert into warmad_products.product(title, price, description, stock, category) values($1, $2, $3, $4, $5)`,
    [title, price, description, stock, category]
  );
};

export const getProductsService = async() => {
  
}

export const updateProductsService = async({title, description, id, price, category, stock}: Products) => {
  await pool.query(`update warmad_products.product set title=$1, description=$2, price=$3, stock=$4, category=$5 where id=$6`, 
    [title, description, price, stock, category, id]
  )
}