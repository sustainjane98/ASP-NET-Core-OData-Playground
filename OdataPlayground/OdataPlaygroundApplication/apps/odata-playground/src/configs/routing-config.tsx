import { RouteObject, Navigate } from 'react-router-dom';
import IndexPage from '../pages';
import { SomethingWentWrong } from '@odata-playground/odata/common';

export const routingConfig = [
  {
    path: '/',
    element: <IndexPage />,
    errorElement: <SomethingWentWrong />,
  },
  { path: '*', element: <Navigate to={'/'} /> },
] as RouteObject[];
