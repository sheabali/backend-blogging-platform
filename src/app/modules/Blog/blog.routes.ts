import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../User/user.constant';
import { BlogController } from './blog.controller';
import { blogValidation } from './blog.validation';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(blogValidation.createBlogValidationSchema),
  BlogController.createBlog,
);
router.get('/', BlogController.getAllBlog);

router.patch(
  '/:id',
  auth(USER_ROLE.user),
  validateRequest(blogValidation.updateBlogValidationSchema),
  BlogController.updateBlog,
);

router.delete('/:id', auth(USER_ROLE.user), BlogController.deleteBlog);

export const BlogRoutes = router;
