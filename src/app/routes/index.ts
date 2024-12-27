import { Router } from 'express';
import { AdminRoutes } from '../modules/Admin/admin.routes';
import { AuthRoutes } from '../modules/Auth/auth.routes';
import { BlogRoutes } from '../modules/Blog/blog.routes';

export const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/blogs',
    route: BlogRoutes,
  },
  {
    path: '/admin',
    route: AdminRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
