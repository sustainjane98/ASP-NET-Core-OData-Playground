import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routingConfig } from '../configs/routing-config';

// eslint-disable-next-line no-restricted-globals
const path = location?.pathname;

const br = createBrowserRouter(routingConfig, { basename: path });

export const Router = () => {
  return <RouterProvider router={br} />;
};
