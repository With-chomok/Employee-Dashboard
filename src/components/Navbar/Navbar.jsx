// import React, { useContext } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
// import AuthContext from "../../context/AuthContext";


const Navbar = () => {
  const [user, setUser]=useState(false)
  // const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    // logout();
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow-md bg-white">

      {/* Logo */}
      <h1 className="text-xl font-bold">
        Employee <span className="text-blue-500">Dashboard</span>
      </h1>

      {/* Navigation Links */}
      <div className="flex gap-6 font-semibold">

        <Link
          to="/list"
          className="hover:text-blue-500"
        >
          Employees
        </Link>

        <Link
          to="/analytics"
          className="hover:text-blue-500"
        >
          Analytics
        </Link>

      </div>

      {/* User Actions */}
      <div className="flex items-center gap-4">

      

        <button
          onClick={handleLogout}
          className="px-3 py-1 bg-red-500 text-white rounded"
        >
          {user? "Logout" : " Login"}
        </button>

      </div>

    </nav>
  );
};

export default Navbar;