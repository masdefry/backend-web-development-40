import { Role } from '../generated/prisma/enums';
import * as z from 'zod';

const fullName = z
  .string()
  .min(1, 'Full name is required field')
  .max(100, 'Full name have maximum 100 characters');

const email = z
  .string()
  .min(1, 'Email is required field')
  .email('Email format is invalid');

const phoneNumber = z
  .string()
  .min(1, 'Phone number is required field')
  .max(15, 'Phone number have maximum 15 characters');

const password = z
  .string()
  .min(1, 'Password is required field')
  .max(25, 'Password have maximum 25 characters');

const confirmPassword = z.string().min(1, 'Confirm password is required field');

const branchId = z.string().min(1, 'Branch ID is required field');

const shiftId = z.string().min(1, 'Shift ID is required field');

const role = z.enum(Role);

export const registerStaffSchema = z.object({
  body: z.object({
    fullName,
    email,
    phoneNumber,
    password,
    branchId,
    shiftId,
    role,
  }),
});

export const loginStaffSchema = z.object({
  body: z.object({
    email,
    password,
  }),
});

export const setPasswordStaffSchema = z.object({
  params: z.object({
    userId: z.string().min(1, 'User ID is required field'),
  }),
  body: z
    .object({
      password,
      confirmPassword,
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    }),
});

export type RegisterStaffInput = z.infer<typeof registerStaffSchema>;
export type LoginStaffInput = z.infer<typeof loginStaffSchema>;
export type SetPasswordStaffInput = z.infer<typeof setPasswordStaffSchema>;
