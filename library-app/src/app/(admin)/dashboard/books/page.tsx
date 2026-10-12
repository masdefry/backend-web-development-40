'use client';

import { axiosInstance } from '@/lib/axios-instance.lib';
import { PaginatedApiResponse } from '@/types/api-response.type';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Author } from '../authors/page';
type Book = {
  isbn: string;
  title: string;
  authorId: string;
  category: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};

type BookWithAuthor = Book & {
  authors: Pick<Author, 'name'>
}

export default function AuthorsPage() {
  const { data: booksData } = useQuery({
    queryKey: ['books'],
    queryFn: async () => {
      const res =
        await axiosInstance.get<PaginatedApiResponse<BookWithAuthor[]>>('/books');

      return res?.data?.data;
    },
  });

  return (
    <>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-2xl font-bold'>Books Managament</h1>
          <span className='text-xs'>
            Oversee and organize the books library.
          </span>
        </div>
        <button className='btn btn-primary'>Create New Book</button>
      </div>
      <div className='mt-10'>
        <div className='overflow-x-auto rounded-box border border-base-content/5 bg-base-100'>
          <table className='table'>
            {/* head */}
            <thead>
              <tr>
                <th>ISBN</th>
                <th>Title</th>
                <th>Description</th>
                <th>Author Name</th>
                <th>Category</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {booksData?.map((book: BookWithAuthor, index: number) => {
                return (
                  <tr key={index}>
                    <td>{book?.isbn}</td>
                    <td>{book?.title}</td>
                    <td>{book?.description}</td>
                    <td>{book?.authors?.name}</td>
                    <td>{book?.category}</td>
                    <td>{format(book?.createdAt, 'yyyy-MMMM-dd HH:mm:ss')}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className='flex justify-between items-center'>
          <span className='text-xs'>Showing 1 to 5 of 500 results</span>
          <div className='join mt-3'>
            <button className='join-item btn btn-sm'>1</button>
            <button className='join-item btn btn-sm btn-active'>2</button>
            <button className='join-item btn btn-sm'>3</button>
            <button className='join-item btn btn-sm'>4</button>
          </div>
        </div>
      </div>
    </>
  );
}
