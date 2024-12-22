import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { userValidation } from './user.validation';

const router = express.Router();

router.post(
  '/register',
  validateRequest(userValidation.createUserValidationSchema),
  UserController.createUser,
);

export const UserRoutes = router;
