import { z } from 'zod';
const objectIdRegex = /^[a-f\d]{24}$/i;

const createBlogValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    content: z.string(),
    author: z
      .string()
      .regex(objectIdRegex, { message: 'Invalid ObjectId format' }),
    isPublished: z.boolean().optional().default(true),
  }),
});

const updateBlogValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    author: z
      .string()
      .regex(/^[a-f\d]{24}$/i)
      .optional(),
    isPublished: z.boolean().optional(),
  }),
});

export const blogValidation = {
  createBlogValidationSchema,
  updateBlogValidationSchema,
};
