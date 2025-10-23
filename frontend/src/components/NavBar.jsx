import React, { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { AppContext } from "../context/AppContext";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, handleLogout } = useContext(AppContext);

  return (
    <nav className="bg-white shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <NavLink to="/" className="text-2xl font-bold text-blue-500 hover:text-blue-500">
          Pix<span className="text-gray-500">MATE</span>
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          {["/", "/tools","/faq","/about","/contact"].map((path, idx) => {
            const name = path === "/" ? "Home" : path.slice(1).charAt(0).toUpperCase() + path.slice(2);
            return (
              <NavLink
                key={idx}
                to={path}
                className={({ isActive }) =>
                  `text-gray-700 hover:text-blue-600 transition ${isActive ? "font-semibold underline underline-offset-4" : ""}`
                }
              >
                {name}
              </NavLink>
            );
          })}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex space-x-4">
          {!user ? (
            <>
              <Link to="/login" className="px-4 py-2 text-sm font-medium text-blue-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition">
                Login
              </Link>
              <Link to="/register" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="px-2 py-1 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 text-2xl focus:outline-none">
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg px-6 py-4 flex flex-col space-y-3">
          <NavLink to="/" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-blue-600 transition">
            Home
          </NavLink>
          <NavLink to="/tools" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-blue-600 transition">
            Tools
          </NavLink>
           <NavLink to="/faq" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-blue-600 transition">
            FAQ
          </NavLink>
          <NavLink to="/about" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-blue-600 transition">
            About
          </NavLink>

          {!user ? (
            <>
              <Link to="/login" onClick={() => setIsOpen(false)} className="px-4 py-2 text-sm font-medium text-blue-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition">
                Login
              </Link>
              <Link to="/register" onClick={() => setIsOpen(false)} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="px-2 py-1 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
