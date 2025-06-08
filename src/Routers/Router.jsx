import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import AddFood from "../Pages/AddFood/AddFood";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Fridge from "../Pages/Fridge/Fridge";
import MyItems from "../Pages/MyItems/MyItems";
import Loader from "../Components/Laoder/Loader";
import PrivateRoutes from "./PrivateRoute";
import FoodDetails from "../Pages/FoodDetails/FoodDetails";

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
        path: "/fridge",
        Component: Fridge,
        loader:()=>fetch("http://localhost:3000/foods"),
        hydrateFallbackElement:<Loader></Loader>
      },
      {
        path: "/add-food",
        element: <PrivateRoutes><AddFood></AddFood></PrivateRoutes>,
      },
      {
        path:"/food-details/:id",
        element:<PrivateRoutes><FoodDetails></FoodDetails></PrivateRoutes>,
        loader:({params})=>fetch(`http://localhost:3000/foods/${params.id}`),
        hydrateFallbackElement:<Loader></Loader>
      },
      {
        path: "/my-items",
        element: <PrivateRoutes><MyItems></MyItems></PrivateRoutes>,
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
    errorElement: <ErrorPage></ErrorPage>,
  },
]);
