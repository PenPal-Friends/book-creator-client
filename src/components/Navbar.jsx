import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import "../App.css";
import { AuthContext } from "../context/auth.context";


function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  console.log("Is Logged In:", isLoggedIn);

  return (
    <nav className="bg-white py-4 px-8 w-full" key={isLoggedIn ? 'logged-in' : 'logged-out'}>
      <div className="container flex justify-between w-full">
        <div className="flex space-x-4">
        <Link to="/books">
                <button className="text-2xl font-bold text-[#333333] pt-1 pb-2 px-4 rounded-full hover:text-opacity-80">
                  PenPal
                </button>
              </Link>
        </div>

        <div className="flex space-x-4 justify-end">
          {!isLoggedIn ? (
            <>

              <Link to="/signup">
                <button className="text-[#333333] font-semibold text-base uppercase py-2 px-4 rounded-full hover:text-opacity-80">
                  Sign Up ›
                </button>
              </Link>

              <Link to="/login">
                <button className="text-[#333333] font-semibold text-base uppercase py-2 px-4 rounded-full hover:text-opacity-80">
                  Login ›
                </button>
              </Link>
              
            </>
          ) : (
            <Link  to="/" className="text-[#333333] font-semibold text-base uppercase py-2 px-4 rounded-full hover:text-opacity-80"
              onClick={logOutUser}
            >
              Logout ›
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
