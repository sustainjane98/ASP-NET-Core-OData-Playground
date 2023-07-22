import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routingConfig } from "../configs/routing-config";

const br = createBrowserRouter(routingConfig);

export const Router = () => {
  return <RouterProvider router={br} />;
};