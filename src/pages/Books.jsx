import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import booksService from "../services/books.service";


function Books() {
  const [books, setBooks] = useState([]);

  const getBooks = async () => {
    try {
      const response = await booksService.getAllBooks();
      const bookList = response.data;
      // Reverse the array to display newest on top
      const reverseBookList = bookList.reverse();
      setBooks(reverseBookList);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };


  useEffect(() => {
      getBooks();
    }, []);

  return (
    <div className="BooksPage flex flex-col items-center bg-gray-200 py-10 min-h-screen">

      <h1 className="text-4xl mb-8">My books</h1>

      <div className="mb-8">
        <Link to="/books/create">
          <button className ="bg-[#24978F] text-white font-semibold text-base uppercase py-3 px-5 rounded-full hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-24978F">+ Create new</button>
        </Link>
      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-8 w-4/5">
        {books.map((book) => (
          <div className="bg-white p-4 shadow-md rounded-lg p-6 mb-6 transform hover:scale-105 transition-transform duration-200" key={book._id} style={{ backgroundColor: 'white', marginBottom: '20px' }}>

            <Link to={`/books/${book._id}`} className="flex flex-col items-center">
              <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
              <p className="text-gray-600">{book.subtitle}</p>
            </Link>

          </div>
        ))}
      </div>

    </div>
  );
}

export default Books;