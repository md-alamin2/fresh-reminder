import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigation } from "react-router";
import Logo from "../Components/Logo/Logo";
import Loader from "../Components/Laoder/Loader";
import useAuth from "../Hooks/useAuth";

const Dashboard = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  // Load theme from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setTheme(savedTheme);
    document.querySelector("html").setAttribute("data-theme", savedTheme);
  }, [theme]);
  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* navbar */}
          <div className="navbar bg-base-300 w-full lg:hidden">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-2"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-6 w-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="mx-2 flex-1 px-2 lg:hidden">Dashboard</div>
          </div>
          {/* Page content here */}
          <div>
            {navigation.state === "loading" ? (
              <Loader></Loader>
            ) : (
              <Outlet></Outlet>
            )}
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 space-y-3">
            {/* Sidebar content here */}
            <Logo></Logo>
            <li className="mt-5">
              <NavLink to="/dashboard" className="font-semibold">
                Dashboard
              </NavLink>
            </li>
            <li className="">
              <NavLink to="/dashboard/my-profile" className="font-semibold">
                My Profile
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/add-food" className="font-semibold">
                Add Food
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/my-items" className="font-semibold">
                My Items
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
