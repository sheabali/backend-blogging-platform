import { z } from 'zod';

export const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string(),
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
