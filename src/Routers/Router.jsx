import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import AddFood from "../Pages/AddFood/AddFood";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/add-food",
        element: <AddFood></AddFood>,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
]);
