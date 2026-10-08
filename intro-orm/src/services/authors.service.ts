import { prisma } from '../configs/prisma-client.config';
import {
  AuthorCreateInput,
  AuthorUpdateInput,
} from '../generated/prisma/models';

// interface Author{
//     id?: string
//     name: string;
//     createdAt?: Date;
//     updatedAt?: Date;
//     deletedAt?: Date;
// }

export const createAuthorService = async ({ name }: AuthorCreateInput) => {
  const countAuthorName = await prisma.author.count({
    where: {
      name,
    },
  });

  if (countAuthorName >= 1) throw new Error('Author name already exists');

  return await prisma.author.create({
    data: {
      name,
    },
  });
};

export const updateAuthorService = async ({ id, name }: AuthorUpdateInput) => {
  const findId = await prisma.author.findUnique({
    where: {
      id: id as string,
    },
  });

  if (!findId) throw new Error(`Id with id=${id} not found`);

  return await prisma.author.update({
    data: {
      name,
    },
    where: {
      id: id as string,
    },
  });
};

export const deleteAuthorService = async ({ id }: AuthorUpdateInput) => {
  const findId = await prisma.author.findUnique({
    where: {
      id: id as string,
    },
  });

  if (!findId) throw new Error(`Id with id=${id} not found`);

  return await prisma.author.update({
    data: {
      deletedAt: new Date(),
    },
    where: {
      id: id as string,
    },
  });
};
