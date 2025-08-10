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
import Profile from "../Pages/Profile/Profile";
import About from "../Pages/About/About";
import DashboardHome from "../Pages/DashboardHome/DashboardHome";
import Dashboard from "../Layout/Dashboard";
import AllFoods from "../Pages/AllFoods/AllFoods";
import FAQ from "../Pages/FAQ/FAQ";
import TermsPrivacy from "../Pages/TermsPrivacy/TermsPrivacy";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
        loader: () =>
          fetch(
            "https://ph-assignment-11-server-omega.vercel.app/food/expiring-soon"
          ),
      },
      {
        path: "/fridge",
        Component: Fridge,
        loader: () =>
          fetch("https://ph-assignment-11-server-omega.vercel.app/foods"),
        hydrateFallbackElement: <Loader></Loader>,
      },
      {
        path: "/about",
        Component: About,
      },
      {
        path: "/faq",
        Component: FAQ,
      },
      {
        path: "/terms-privacy",
        Component: TermsPrivacy,
      },
      {
        path: "/food-details/:id",
        element: <FoodDetails></FoodDetails>,
        loader: ({ params }) =>
          fetch(
            `https://ph-assignment-11-server-omega.vercel.app/foods/${params.id}`
          ),
        hydrateFallbackElement: <Loader></Loader>,
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
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <Dashboard></Dashboard>
      </PrivateRoutes>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoutes>
            <DashboardHome></DashboardHome>
          </PrivateRoutes>
        ),
      },
      {
        path: "/dashboard/my-profile",
        element: (
          <PrivateRoutes>
            <Profile></Profile>
          </PrivateRoutes>
        ),
      },
      {
        path: "/dashboard/add-food",
        element: (
          <PrivateRoutes>
            <AddFood></AddFood>
          </PrivateRoutes>
        ),
      },
      {
        path: "/dashboard/my-items",
        element: (
          <PrivateRoutes>
            <MyItems></MyItems>
          </PrivateRoutes>
        ),
      },
      {
        path: "/dashboard/all-foods",
        element: (
          <PrivateRoutes>
            <AllFoods></AllFoods>
          </PrivateRoutes>
        ),
      },
    ],
  },
]);
