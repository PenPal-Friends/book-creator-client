import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import "../App.css";
import { AuthContext } from "../context/auth.context";


function Navbar() {
  const {isLoggedIn, user, logOutUser } = useContext(AuthContext);


  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <Link to="/">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Home
            </button>
          </Link>
          {isLoggedIn && (
            <>
              <Link to="/books">
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                  Books
                </button>
              </Link>
              <Link to="/mybooks">
                <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
                  My Books
                </button>
              </Link>
            </>
          )}
        </div>
        <div className="flex space-x-4">
          {!isLoggedIn ? (
            <>
              <Link to="/signup">
                <button className="bg-p-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                  Sign Up
                </button>
              </Link>
              <Link to="/login">
                <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                  Login
                </button>
              </Link>
            </>
          ) : (
            <button
              className="bg-cyan-500 shadow-lg shadow-cyan-500/50 text-white font-bold py-2 px-4 rounded"
              onClick={logOutUser}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;






