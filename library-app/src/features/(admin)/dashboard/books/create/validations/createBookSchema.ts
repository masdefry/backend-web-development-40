import * as z from 'zod';

export const createBookSchema = z.object({
  isbn: z
    .string()
    .min(1, 'ISBN is required')
    .max(25, 'ISBN have maximum 25 characters'),
  title: z
    .string()
    .min(1, 'Title is required')
    .max(100, 'Title have maximum 100 characters'),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(1000, 'Description have maximum 1000 characters'),
  authorId: z.string().min(1, 'Author ID is required'),
  category: z.string().min(1, 'Category is required'),
});

export type CreateBookInput = z.infer<typeof createBookSchema>