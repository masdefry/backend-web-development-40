'use client';

import { axiosInstance } from '@/lib/axios-instance.lib';
import { useQuery } from '@tanstack/react-query';
import { type PropsWithChildren } from 'react';

export default function AuthProvider({ children }: PropsWithChildren) {
  useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const res = await axiosInstance.get('/auths/me');
      return res.data;
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  return <>{children}</>;
}
