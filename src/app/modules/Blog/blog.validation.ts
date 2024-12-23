import { z } from 'zod';

const createBlogValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    content: z.string(),
    author: z.string().regex(/^[a-f\d]{24}$/i),
    isPublished: z.boolean().optional().default(true),
  }),
});

export const blogValidation = {
  createBlogValidationSchema,
};
