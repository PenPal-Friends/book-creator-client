import { useState } from "react";
// import React from "react";
import LoginPage from "./pages/LoginPage";
import HomePage from "./components/HomePage";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Navbar from "./components/Navbar";
import Books from "./pages/Books";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="Book writing App">
      <Navbar />
      <Routes>
      <Route 
        path="/" 
        element={ <HomePage /> } 
        />
        <Route path="/Books" element={<Books />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/SignUp" element={<SignUp />} />
      </Routes>
    </div>
  );
}
export default App;
