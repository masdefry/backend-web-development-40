'use client';
import { HiOutlineMail } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';
import {
  LoginAdminInput,
  loginAdminSchema,
} from '@/features/(admin)/auth/validations/loginAdminSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '@/lib/axios-instance.lib';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginAdminInput>({
    resolver: zodResolver(loginAdminSchema),
  });

  const { mutate: loginMutation } = useMutation({
    mutationFn: async (data: LoginAdminInput) => {
      const res = await axiosInstance.post('/auths/login', data); 
    },
    onSuccess: (res) => {
      router?.push('/dashboard'); 
    }, 
    onError: (err) => {

    }
  });

  return (
    <>
      <div className='flex justify-center items-center h-screen'>
        <div className='fieldset bg-base-200 border-base-300 rounded-box w-lg border p-10'>
          <h1 className='text-2xl font-bold'>Authentication User</h1>
          <span className='text-gray-500 text-sm'>
            Please enter your credentials to access admin dashboard
          </span>
          <form onSubmit={handleSubmit((data) => loginMutation(data))}>
            <fieldset className='fieldset mt-5'>
              <legend className='fieldset-legend'>Email Address</legend>
              <label className='input w-full'>
                <HiOutlineMail />
                <input
                  type='text'
                  className='grow w-full'
                  placeholder='admin@gmail.com'
                  {...register('email')}
                />
              </label>
              <p className='label text-red-500'>{errors?.email?.message}</p>
            </fieldset>
            <fieldset className='fieldset'>
              <legend className='fieldset-legend'>Password</legend>
              <label className='input w-full'>
                <RiLockPasswordLine />
                <input
                  type='password'
                  className='grow w-full'
                  placeholder='abc12345'
                  {...register('password')}
                />
              </label>
              <p className='label  text-red-500'>{errors?.password?.message}</p>
            </fieldset>
            <button className='btn bg-blue-800 text-white mt-4 w-full'>
              Login to Dashboard
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
