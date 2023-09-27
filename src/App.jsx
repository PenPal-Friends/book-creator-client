import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import SignUp from "./pages/SignUp";
import Navbar from "./components/Navbar";

import Books from "./pages/Books";
import Book from "./pages/Book";
import Chapter from "./pages/Chapter";



function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="Book writing App">
      <ToastContainer />

      <Navbar />
      <Routes>
        <Route path="/" element={<Index />} />

        <Route path="/books" element={<Books />} />
        <Route path="/books/create" element={<Book />} />
        <Route path="/books/:bookId" element={<Book />} />

        <Route path="/books/:bookId/chapters/create" element={<Chapter />} />
        <Route path="/books/:bookId/chapters/:chapterId" element={<Chapter />} />
        {/* ":bookId" actually creates a parameter to be used elsewhere */}

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>

    </div>
  );
}
export default App;