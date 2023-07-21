import { RouteObject } from "react-router-dom";
import IndexPage from "../pages";

export const routingConfig = [
  { path: "/", element: <IndexPage /> },
] as RouteObject[];
