import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BlogController } from './blog.controller';
import { blogValidation } from './blog.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(blogValidation.createBlogValidationSchema),
  BlogController.createBlog,
);

export const BlogRoutes = router;
