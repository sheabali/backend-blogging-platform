import express from 'express';
import { AdminControllers } from './admin.controller';

const router = express.Router();

router.patch('/:id');

router.delete('/:blogId', AdminControllers.deleteBlog);

export const AdminRoutes = router;
