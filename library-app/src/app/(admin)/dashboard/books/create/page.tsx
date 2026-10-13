'use client';
import {
  CreateBookInput,
  createBookSchema,
} from '@/features/(admin)/dashboard/books/create/validations/createBookSchema';
import { axiosInstance } from '@/lib/axios-instance.lib';
import { PaginatedApiResponse } from '@/types/api-response.type';
import { Author } from '@/types/author.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { IoArrowBack } from 'react-icons/io5';

enum Category {
  POLITIC = 'POLITIC',
  ROMANCE = 'ROMANCE',
  HORROR = 'HORROR',
}

export default function CreateBookPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createBookSchema),
  });

  const { data: authorsData } = useQuery({
    queryKey: ['authors'],
    queryFn: async () => {
      const res = await axiosInstance.get<PaginatedApiResponse<Author[]>>(
        `/authors`,
        {
          params: {
            limit: 100,
          },
        },
      );

      return res?.data?.data;
    },
  });

  const { mutate: createBookMutation } = useMutation({
    mutationFn: async (data: CreateBookInput) => {
      await axiosInstance.post('/books', data);
    },
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <>
      <div className='p-10'>
        <div className='breadcrumbs text-sm'>
          <ul>
            <li>
              <a>Home</a>
            </li>
            <li>
              <a>Documents</a>
            </li>
            <li>Add Document</li>
          </ul>
        </div>
        <div className='flex items-center gap-3'>
          <IoArrowBack className='text-xl' />
          <div>
            <h1 className='text-3xl font-bold'>Create New Book</h1>
            <p className='text-gray-500'>
              Add a new book to the library catalog with essential book details.
            </p>
          </div>
        </div>

        {/* Section Form */}
        <div className='mt-10'>
          <div className='bg-gray-300 p-10 rounded-t-md'>
            <h1 className='text-2xl font-bold'>Book Information</h1>
            <p className='text-gray-500'>
              Core identification data for library ingestion.
            </p>
          </div>
          <form
            onSubmit={handleSubmit((data) => createBookMutation(data))}
            className='p-10 shadow-md'
          >
            <fieldset className='fieldset'>
              <legend className='fieldset-legend'>ISBN</legend>
              <input
                type='text'
                className='input w-full'
                placeholder='Type ISBN number'
                {...register('isbn')}
              />
              <p className='label text-red-600'>{errors?.isbn?.message}</p>
            </fieldset>
            <fieldset className='fieldset'>
              <legend className='fieldset-legend'>Title</legend>
              <input
                type='text'
                className='input w-full'
                placeholder='Type book title'
                {...register('title')}
              />
              <p className='label text-red-600'>{errors?.title?.message}</p>
            </fieldset>
            <fieldset className='fieldset'>
              <legend className='fieldset-legend'>Description</legend>
              <textarea
                className='textarea h-24 w-full'
                placeholder='Type description'
                {...register('description')}
              />
              <p className='label text-red-600'>
                {errors?.description?.message}
              </p>
            </fieldset>
            <fieldset className='fieldset w-full'>
              <legend className='fieldset-legend'>Author</legend>
              <select
                defaultValue=''
                className='select w-full'
                {...register('authorId')}
              >
                <option disabled={true}></option>
                {authorsData?.map((author: Author, index: number) => (
                  <option key={index} value={author?.id}>
                    {author?.name}
                  </option>
                ))}
              </select>
              <p className='label text-red-600'>{errors?.authorId?.message}</p>
            </fieldset>
            <fieldset className='fieldset w-full'>
              <legend className='fieldset-legend'>Category</legend>
              <select
                defaultValue=''
                className='select w-full'
                {...register('category')}
              >
                <option disabled={true}></option>
                {Object.values(Category)?.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <p className='label text-red-600'>{errors?.category?.message}</p>
            </fieldset>
            <div className='flex justify-end mt-5'></div>
            <button type='submit' className='btn btn-primary'>
              Save as New Book
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
