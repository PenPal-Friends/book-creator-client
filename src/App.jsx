import { useState } from "react";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import HomePage from "./components/HomePage";
import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Navbar from "./components/Navbar";

import Books from "./pages/Books";
import Book from "./pages/Book";

import Chapter from "./pages/Chapter";



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
        <Route path="/books" element={<Books />} />
        <Route path="/books/create" element={<Book />} />
        <Route path="/books/:bookId" element={<Book />} />

        <Route path="/chapters/create" element={<Chapter />} />
        <Route path="/chapters/:chapterId" element={<Chapter />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}
export default App;


