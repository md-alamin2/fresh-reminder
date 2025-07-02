import React, { useEffect, useState } from "react";
import logo from "../../assets/imgs/as-11-logo.png";
import useAuth from "../../Hooks/useAuth";
import { Link, NavLink } from "react-router";
import { MdOutlineLogout } from "react-icons/md";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Tooltip } from "react-tooltip";

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const active = "font-semibold bg-[#64b843] text-white";

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? active : "font-medium")}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/fridge"
          className={({ isActive }) => (isActive ? active : "font-medium")}
        >
          Fridge
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/About"
          className={({ isActive }) => (isActive ? active : "font-medium")}
        >
          About
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink
              to="/add-food"
              className={({ isActive }) => (isActive ? active : "font-medium")}
            >
              Add Food
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-items"
              className={({ isActive }) => (isActive ? active : "font-medium")}
            >
              My Items
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") === "light" ? "light" : "dark"
  );

  // Load theme from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setTheme(savedTheme);
    document.querySelector("html").setAttribute("data-theme", savedTheme);
  }, [theme]);

  // Toggle theme function
  const handleThemeChange = (event) => {
    const newTheme = event.target.checked ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // logout
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to logout!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        logoutUser()
          .then(() => {
            Swal.fire({
              title: "Logout!",
              text: "User logout successfully",
              icon: "success",
            });
          })
          .catch((error) => {
            const errorMessage = error.code;
            toast.error(`Login failed ${errorMessage}`, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          });
      }
    });
  };

  return (
    <div className="navbar p-0 w-11/12 lg:container mx-auto py-4">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="lg:hidden cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Link to="/" className=" flex items-center gap-2 md:text-2xl font-bold">
          <img className="w-10 md:w-14" src={logo} alt="logo" /> FreshReminder
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-2 px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {/* theme controller */}
        <div id="theme-toggle">
          <label className="toggle text-base-content mr-5">
            <input
              type="checkbox"
              value="dark"
              className=" theme-controller"
              checked={theme === "dark"}
              onChange={handleThemeChange}
            />

            <svg
              aria-label="sun"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 2v2"></path>
                <path d="M12 20v2"></path>
                <path d="m4.93 4.93 1.41 1.41"></path>
                <path d="m17.66 17.66 1.41 1.41"></path>
                <path d="M2 12h2"></path>
                <path d="M20 12h2"></path>
                <path d="m6.34 17.66-1.41 1.41"></path>
                <path d="m19.07 4.93-1.41 1.41"></path>
              </g>
            </svg>

            <svg
              aria-label="moon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
              </g>
            </svg>
          </label>
        </div>
        <Tooltip anchorSelect="#theme-toggle" place="left">
          Change Theme
        </Tooltip>

        {user ? (
          <div className="flex items-center gap-2">
            <div className="dropdown dropdown-hover dropdown-end lg:dropdown-start">
              <img
                tabIndex={0}
                className="w-14 bg-[#64b843] p-1 rounded-full cursor-pointer"
                src={`${user.photoURL}`}
                alt="user"
              />
              <ul
                tabIndex={0}
                className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
              >
                <li>
                  <p>{user.displayName}</p>
                </li>
                <li>
                  <Link to="/user-profile">Profile</Link>
                </li>
                <li className="md:hidden">
                  <button
                    className="text-red-500 flex items-center"
                    onClick={handleLogout}
                  >
                    Logout <MdOutlineLogout size={20} />
                  </button>
                </li>
              </ul>
            </div>
            <button
              className="btn btn-error btn-outline md:flex items-center gap-1 hidden"
              onClick={handleLogout}
            >
              {" "}
              Logout
              <MdOutlineLogout size={20} />
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="/register" className="btn hidden md:flex bg-[#64b843]">
              Register
            </Link>
            <Link to="/login" className="btn bg-[#64b843]">
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
