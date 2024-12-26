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
router.get('/', BlogController.getAllBlog);

router.patch(
  '/:id',
  validateRequest(blogValidation.updateBlogValidationSchema),
  BlogController.updateBlog,
);

router.delete('/:id', BlogController.deleteBlog);

export const BlogRoutes = router;
