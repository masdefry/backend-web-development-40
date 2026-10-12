import { prisma } from '../../configs/prisma-client.config';
import {
  BookCreateInput,
  BookUncheckedCreateInput,
} from '../../generated/prisma/models';

export class BooksService {
  static async create({
    title,
    isbn,
    description,
    category,
    authorId,
  }: BookUncheckedCreateInput) {
    const findBookByISBN = await prisma.book.findUnique({
      where: {
        isbn,
      },
    });

    /*
      ISBN SAMA, AUTHOR SAMA X
      ISBN BEDA, AUTHOR SAMA V
      ISBN SAMA, AUTHOR BEDA X
    */
    if (findBookByISBN) throw new Error(`ISBN = ${isbn} already exists`);

    const findAuthorById = await prisma.author.findUnique({
      where: {
        id: authorId,
      },
    });

    if (!findAuthorById)
      throw new Error(`Author with id = ${authorId} not found`);

    return await prisma.book.create({
      data: {
        title,
        isbn,
        description,
        category,
        authorId,
      },
    });
  }

  static async get(page: number) {
    const LIMIT = 2; 
    const offset = (page - 1) * LIMIT; 

    const books = await prisma.book.findMany({
      include: {
        authors: {
          select: {
            name: true,
          },
        },
      },
      where: {
        deletedAt: null
      }, 
      take: LIMIT, 
      skip: offset, 
    });

    const totalBooks = await prisma.book.count({
      where: {
        deletedAt: null
      }
    }); 

    const totalPage = Math.ceil(totalBooks/LIMIT); 

    return{
      total: totalBooks, 
      totalPage, 
      limit: LIMIT, 
      books, 
    }
  }

  static async update() {}
}
