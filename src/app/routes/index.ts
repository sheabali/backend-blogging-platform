import { Router } from 'express';
import { UserRoutes } from '../modules/User/user.routes';

export const router = Router();

const moduleRoutes = [
  {
    path: '/register',
    route: UserRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
