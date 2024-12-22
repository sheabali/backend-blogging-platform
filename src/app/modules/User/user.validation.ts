import { z } from 'zod';

export const userNameSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  middleName: z.string().optional(),
  lastName: z.string().min(1, 'Last name is required'),
});

export const createUserValidationSchema = z.object({
  body: z.object({
    name: userNameSchema,
    email: z.string().email('Invalid email format').min(1, 'Email is required'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .max(100, 'Password must not exceed 100 characters'),
    role: z.enum(['user', 'admin']).default('user'),
    isBlocked: z.boolean().default(false),
  }),
});

export const userValidation = {
  createUserValidationSchema,
};
