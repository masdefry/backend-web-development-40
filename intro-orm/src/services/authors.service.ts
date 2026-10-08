import { prisma } from '../configs/prisma-client.config';
import { AuthorCreateInput } from '../generated/prisma/models';

// interface Author{
//     id?: string
//     name: string;
//     createdAt?: Date;
//     updatedAt?: Date;
//     deletedAt?: Date;
// }

export const createAuthorService = async ({ name }: AuthorCreateInput) => {
  return await prisma.author.create({
    data: {
      name,
    },
  });
};
