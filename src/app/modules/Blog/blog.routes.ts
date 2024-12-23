import express from 'express';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/register',
  validateRequest(blogValidation.createBlogValidationSchema),
  BlogController.createBlog,
);

export const BlogRoutes = router;
