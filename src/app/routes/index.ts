import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.routes';
import { AuthRoutes } from '../modules/auth/auth.route';


export const router = Router();

const moduleRoutes = [
  {
    path: '/user',
    route: UserRoutes, 
  },
  {
    path: '/auth',
    route: AuthRoutes, 
  },
  // {
  //     path: "/tour",
  //     route: TourRoutes
  // },
];

moduleRoutes.forEach(route => {
  if (route.route) {
    router.use(route.path, route.route);
  }
});
