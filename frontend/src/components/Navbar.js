import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../App";

const Navbar = () => {
  const { state, dispatch } = useContext(UserContext);
  console.log(state);

  const checkstatus = async () => {
    try {
      const res = await fetch("/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      dispatch({ type: "USER", payload: true });
      if (!res.status === 200) {
        dispatch({ type: "USER", payload: false });
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkstatus();
  }, []);
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const active =
    "block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0";
  const notActive =
    "block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0";

  return (
    <nav className="bg-white w-full top-0 left-0 border-b border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="https://flowbite.com/" className="flex items-center">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8 mr-3"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            Account
          </span>
        </a>
        <div className="flex md:hidden">
          <button
            className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
            onClick={toggleMenu}
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
              {isMenuOpen ? (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M19.41 5.41L18 4L12 10L6 4L4.59 5.41L12 12.83L19.41 5.41Z"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4 6C3.45 6 3 6.45 3 7V8C3 8.55 3.45 9 4 9H20C20.55 9 21 8.55 21 8V7C21 6.45 20.55 6 20 6H4ZM20 15H4C3.45 15 3 15.45 3 16V17C3 17.55 3.45 18 4 18H20C20.55 18 21 17.55 21 17V16C21 15.45 20.55 15 20 15ZM20 12H4C3.45 12 3 12.45 3 13V14C3 14.55 3.45 15 4 15H20C20.55 15 21 14.55 21 14V13C21 12.45 20.55 12 20 12Z"
                />
              )}
            </svg>
          </button>
        </div>
        <div
       className={`${
        isMenuOpen ? "block" : "hidden"
      } md:block md:items-center md:justify-between`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
            <li onClick={()=>setIsMenuOpen(false)}>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? active : notActive)}
              >
                Home
              </NavLink>
            </li>
            <li onClick={()=>setIsMenuOpen(false)}>
              <NavLink
                to="/about"
                className={({ isActive }) => (isActive ? active : notActive)}
              >
                About
              </NavLink>
            </li>
            {!state ? (
              <>
                <li onClick={()=>setIsMenuOpen(false)}>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive ? active : notActive
                    }
                  >
                    Login
                  </NavLink>
                </li>
                <li onClick={()=>setIsMenuOpen(false)}>
                  <NavLink
                    to="/signup"
                    className={({ isActive }) =>
                      isActive ? active : notActive
                    }
                  >
                    SignUp
                  </NavLink>
                </li>
              </>
            ) : (
              <li onClick={()=>setIsMenuOpen(false)}>
                <NavLink
                  to="/logout"
                  className={({ isActive }) => (isActive ? active : notActive)}
                >
                  Logout
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
