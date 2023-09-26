
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import booksService from "../services/books.service";

function Books() {
  const [books, setBooks] = useState([]);

  const getBooks = async () => {
    try {
      const response = await booksService.getAllBooks();
      const bookList = response.data;
      setBooks(bookList);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  // Fetch books when the component mounts
  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div className="BooksPage">

      <h1>My books</h1>

      {books.map((book) => (

          <div className="BookCard card" key={book._id}>
            <Link to={`/books/${book._id}`}>
              <h3>{book.title}</h3>
              <p>Subtitle: {book.subtitle}</p>
              <p>Genre: {book.genre}</p>
            </Link>
          </div>

      ))}

      <div>
        <Link to="/books/create">
          <button >+ Create new</button>
        </Link>
      </div>

    </div>
  );
}

export default Books;