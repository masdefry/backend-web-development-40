import * as z from 'zod';

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'svg'];

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
  coverImage: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, 'At least one image is required')
    .refine((files) => files.length <= 3, 'Maximum 3 images are allowed')
    .transform((files) => Array.from(files))
    .refine(
      (files) => files.every((file) => file.size <= MAX_FILE_SIZE),
      'Each image must not exceed 2 MB',
    )
    .refine(
      (files) =>
        files.every((file) => {
          const extension = file.name.split('.').pop()?.toLowerCase();
          return extension && ALLOWED_EXTENSIONS.includes(extension);
        }),
      'Only JPG, JPEG, PNG, WEBP, and AVIF files are allowed',
    ),
});

export type CreateBookInput = z.input<typeof createBookSchema>;
export type CreateBookOutput = z.output<typeof createBookSchema>;