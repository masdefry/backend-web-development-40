'use client';
import { axiosInstance } from '@/lib/axios-instance.lib';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { type PropsWithChildren } from 'react';

export default function AuthProvider({ children }: PropsWithChildren) {
  const router = useRouter();
  const { error, isError } = useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      return await axiosInstance.get('/auths/me');
    },
    retry: false,
  });

  if (isError && axios.isAxiosError(error)) {
    const statusCode = error.response?.status;

    if (statusCode === 401) return router.push('/');
  }

  return <>{children}</>;
}
