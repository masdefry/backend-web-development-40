'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { format } from 'date-fns';

export default function AuthorsPage() {
  const { data, isError, error } = useQuery({
    queryKey: ['authors'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:8000/api/v1/authors');

      return res?.data?.data
    },
  });
  console.log(data); 
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
              {data?.map((item: any, index: number) => {
                return (
                  <tr key={index}>
                    <th>{item?.id}</th>
                    <td>{item?.name}</td>
                    <td>{format(item?.createdAt, 'yyyy-MMMM-dd HH:mm:ss')}</td>
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
