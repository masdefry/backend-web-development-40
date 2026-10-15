import {
  CreateBookInput,
  GetBookInput,
} from '../../validators/books.validator';
import { prisma } from '../../configs/prisma-client.config';
import { AppError } from '../../errors/app.error';
import { cloudinaryUpload } from '../../lib/cloudinary.lib';

export class BooksService {
  static async create({ body }: CreateBookInput, files: Express.Multer.File[]) {
    console.log(files);
    const findBookByISBN = await prisma.book.findUnique({
      where: {
        isbn: body?.isbn,
      },
    });

    /*
      ISBN SAMA, AUTHOR SAMA X
      ISBN BEDA, AUTHOR SAMA V
      ISBN SAMA, AUTHOR BEDA X
    */
    if (findBookByISBN)
      throw new AppError(409, `ISBN = ${body?.isbn} already exists`);

    const findAuthorById = await prisma.author.findUnique({
      where: {
        id: body?.authorId,
      },
    });

    if (!findAuthorById)
      throw new AppError(404, `Author with id = ${body?.authorId} not found`);

    // Untuk DiskStorage
    // const filePath = files[0]?.path?.split('\\').slice(-3).join('/');

    // Untuk ke CloudinaryUpload
    const cloudinaryUploadedUrl = await cloudinaryUpload(files[0]?.buffer);

    return await prisma.book.create({
      data: {
        title: body?.title,
        isbn: body?.isbn,
        description: body?.description,
        category: body?.category,
        authorId: body?.authorId,
        coverImageUrl: `${cloudinaryUploadedUrl}`,
      },
    });
  }

  static async get({ query }: GetBookInput) {
    const offset = (query?.page - 1) * query?.limit;

    const books = await prisma.book.findMany({
      include: {
        authors: {
          select: {
            name: true,
          },
        },
      },
      where: {
        deletedAt: null,
      },
      take: query?.limit,
      skip: offset,
    });

    const totalBooks = await prisma.book.count({
      where: {
        deletedAt: null,
      },
    });

    const totalPage = Math.ceil(totalBooks / query?.limit);

    return {
      page: query?.page,
      total: totalBooks,
      totalPage,
      limit: query?.limit,
      books,
    };
  }

  static async update() {}
}
