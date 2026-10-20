import * as z from 'zod';

export const loginAdminSchema = z.object({
  email: z.email('Email format is invalid').min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required'),
});

export type LoginAdminInput = z.infer<typeof loginAdminSchema>;
