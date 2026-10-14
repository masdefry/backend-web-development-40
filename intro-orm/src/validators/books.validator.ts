import * as z from 'zod';
import { Categories } from '../generated/prisma/enums';

const isbn = z
  .string()
  .min(1, 'ISBN is required field')
  .max(25, 'ISBN have maximum 25 characters');

const authorId = z.string().min(1, 'Author ID is required field');

const category = z.enum(Categories);

const title = z
  .string()
  .min(1, 'Title is required field')
  .max(100, 'Title have maximum 100 characters');

const description = z
  .string()
  .min(1, 'Description is required field')
  .max(1000, 'Description have maximum 1000 characters');

export const createBookSchema = z.object({
  body: z.object({
    isbn,
    authorId,
    category,
    title,
    description,
  }),
});

export const getBookSchema = z.object({
  query: z.object({
    page: z.coerce.number().optional().default(1),
    limit: z.coerce.number().optional().default(10),
  }),
});

export type CreateBookInput = z.infer<typeof createBookSchema>;
export type GetBookInput = z.infer<typeof getBookSchema>
