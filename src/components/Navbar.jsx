import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import "../App.css";
import { AuthContext } from "../context/auth.context";


function Navbar() {
  const {isLoggedIn, user, logOutUser } = useContext(AuthContext);
  return (
    <nav>
      <Link to="/">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Home
          </button>
      </Link>

      {/*    UPDATE     */}
      {isLoggedIn && (
        <>
          <Link to="/books">
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"> 
              Books 
            </button>
          </Link>
          <button 
           className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={logOutUser} 
          >Logout
          </button>
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link to="/signup">
            <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
              Sign Up</button>
          </Link>
          <Link to="/login">
            <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
              Login
              </button>
          </Link>
        </>
      )}
      <br/><br/>
    </nav>
  );
}

export default Navbar;
