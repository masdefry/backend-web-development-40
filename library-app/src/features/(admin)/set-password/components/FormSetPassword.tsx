'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  SetPasswordInput,
  setPasswordSchema,
} from '@/features/(admin)/set-password/validations/setPasswordSchema';
import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '@/lib/axios-instance.lib';

interface FormSetPasswordProps {
  userId: string;
}

export default function FormSetPassword({ userId }: FormSetPasswordProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SetPasswordInput>({
    resolver: zodResolver(setPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const { mutate: setPasswordMutation } = useMutation({
    mutationFn: async (data: SetPasswordInput) => {
      return await axiosInstance.patch(`/auths/set-password/${userId}`, data);
    },
    onSuccess: (res) => {
      alert(res?.data?.message); 
    },
  });

  return (
    <main className='flex min-h-screen items-center justify-center bg-base-200 px-4 py-10'>
      <div className='card w-full max-w-md bg-base-100 shadow-xl'>
        <div className='card-body gap-5'>
          <div className='text-center'>
            <div className='mb-4 flex justify-center'>
              <div className='flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-8 w-8'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M16.5 10.5V6.75a4.5 4.5 0 0 0-9 0v3.75m-.75 0h10.5A2.25 2.25 0 0 1 19.5 12.75v6A2.25 2.25 0 0 1 17.25 21h-10.5A2.25 2.25 0 0 1 4.5 18.75v-6A2.25 2.25 0 0 1 6.75 10.5Z'
                  />
                </svg>
              </div>
            </div>

            <h1 className='text-2xl font-bold'>Set Your Password</h1>

            <p className='mt-2 text-sm text-base-content/60'>
              Create a strong password to secure your account.
            </p>
          </div>

          <form
            onSubmit={handleSubmit((data) => setPasswordMutation(data))}
            className='space-y-4'
          >
            {/* Password */}
            <div className='form-control'>
              <label htmlFor='password' className='label'>
                <span className='label-text font-medium'>New Password</span>
              </label>

              <div className='relative'>
                <input
                  id='password'
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Enter your new password'
                  autoComplete='new-password'
                  className={`input input-bordered w-full pr-20 ${
                    errors.password ? 'input-error' : ''
                  }`}
                  {...register('password')}
                />

                <button
                  type='button'
                  className='btn btn-ghost btn-sm absolute right-1 top-1/2 -translate-y-1/2'
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>

              {errors.password ? (
                <p className='mt-1 text-sm text-error'>
                  {errors.password.message}
                </p>
              ) : (
                <p className='mt-1 text-xs text-base-content/60'>
                  Must be at least 8 characters.
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className='form-control'>
              <label htmlFor='confirmPassword' className='label'>
                <span className='label-text font-medium'>Confirm Password</span>
              </label>

              <div className='relative'>
                <input
                  id='confirmPassword'
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder='Re-enter your password'
                  autoComplete='new-password'
                  className={`input input-bordered w-full pr-20 ${
                    errors.confirmPassword ? 'input-error' : ''
                  }`}
                  {...register('confirmPassword')}
                />

                <button
                  type='button'
                  className='btn btn-ghost btn-sm absolute right-1 top-1/2 -translate-y-1/2'
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? 'Hide' : 'Show'}
                </button>
              </div>

              {errors.confirmPassword && (
                <p className='mt-1 text-sm text-error'>
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type='submit'
              className='btn btn-primary w-full'
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className='loading loading-spinner loading-sm' />
                  Setting Password...
                </>
              ) : (
                'Set Password'
              )}
            </button>
          </form>

          <p className='text-center text-xs text-base-content/50'>
            Make sure your password is secure and not easy to guess.
          </p>
        </div>
      </div>
    </main>
  );
}
