'use client';
import { axiosInstance } from '@/lib/axios-instance.lib';
import { PaginatedApiResponse } from '@/types/api-response.type';
import { Author } from '@/types/author.type';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';

export default function AuthorsPage() {
  const { data: authorsData } = useQuery({
    queryKey: ['authors'],
    queryFn: async () => {
      const res =
        await axiosInstance.get<PaginatedApiResponse<Author[]>>('/authors');

      return res?.data?.data;
    },
  });

  return (
    <>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-2xl font-bold'>Authors Managament</h1>
          <span className='text-xs'>
            Oversee and organize the books author.
          </span>
        </div>
        <button className='btn btn-primary'>Create New Author</button>
      </div>
      <div className='mt-10'>
        <div className='overflow-x-auto rounded-box border border-base-content/5 bg-base-100'>
          <table className='table'>
            {/* head */}
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {authorsData?.map((author: Author, index: number) => {
                return (
                  <tr key={index}>
                    <th>{author?.id}</th>
                    <td>{author?.name}</td>
                    <td>{format(author?.createdAt, 'yyyy-MMMM-dd HH:mm:ss')}</td>
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
















/*
  CHALLENGE: 
  1. Lengkapi end-point get books (tambahkan pagination meta: page, limit, total, totalPage)
  2. Buat halaman dashboard > books dan lakukan get books untuk di tampilkan ke list tabel 
*/