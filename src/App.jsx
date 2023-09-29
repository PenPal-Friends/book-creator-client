import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import SignUp from "./pages/SignUp";
import Navbar from "./components/Navbar";

import Books from "./pages/Books";
import Book from "./pages/Book";
import Chapter from "./pages/Chapter";
// import MyBooks from "./pages/MyBooks";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="Book writing App">
      <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />

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

        {/* <Route path= "/mybooks" element= {<MyBooks/>}/> */}
      </Routes>

    </div>
  );
}
export default App;