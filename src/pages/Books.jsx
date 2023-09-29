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
          <button className ="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">+ Create new</button>
        </Link>
      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-8 w-4/5">
        {books.map((book) => (
          <div className="bg-white p-4 shadow-md rounded-lg p-6 mb-6 transform hover:scale-105 transition-transform duration-200" key={book._id} style={{ backgroundColor: 'white', marginBottom: '20px' }}>

            <Link to={`/books/${book._id}`} className="flex flex-col items-center">
              <p><img src={book.imageUrl} alt="book" width="200" className="w-100 h-64 object-cover mb-4 rounded-lg" />  </p>
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