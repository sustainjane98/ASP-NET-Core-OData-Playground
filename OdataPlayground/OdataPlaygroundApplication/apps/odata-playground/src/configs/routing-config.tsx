import { RouteObject, Navigate } from 'react-router-dom';
import IndexPage from '../pages';

export const routingConfig = [
  { path: '/', element: <IndexPage /> },
  { path: '*', element: <Navigate to={'/'} /> },
] as RouteObject[];
