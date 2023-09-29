import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import "../App.css";
import { AuthContext } from "../context/auth.context";


function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  console.log("Is Logged In:", isLoggedIn);

  return (
    <nav className="bg-white py-4 px-8" key={isLoggedIn ? 'logged-in' : 'logged-out'}>
      <div className="container flex justify-between">
        <div className="flex space-x-4">
        <Link to="/books">
                <button className="text-2xl font-bold text-[#333333] pt-1 pb-2 px-4 rounded-full hover:text-opacity-80">
                  PenPal
                </button>
              </Link>
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
                <button className="text-[#333333] font-semibold text-base uppercase py-2 px-4 rounded-full hover:text-opacity-80"
                >
                  Login ›
                </button>
              </Link>
            </>
          ) : (
            <button className="text-[#333333] font-semibold text-base uppercase py-2 px-4 rounded-full hover:text-opacity-80"
              onClick={logOutUser}
            >
              Logout ›
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;






