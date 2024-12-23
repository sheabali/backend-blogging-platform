import { Router } from 'express';
import { BlogRoutes } from '../modules/Blog/blog.routes';
import { UserRoutes } from '../modules/User/user.routes';

export const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: UserRoutes,
  },
  {
    path: '/blogs',
    route: BlogRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
