
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import booksService from "../services/books.service";
// import axios from axios;

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


  useEffect(() => {
      getBooks();
    }, []);

  return (
    <div className="BooksPage">

      <h1>My books</h1>

      <div>
        <Link to="/books/create">
          <button>+ Create new</button>
        </Link>
      </div>

      {books.map((book) => (
          <div className="BookCard card" key={book._id} style={{backgroundColor: 'white', marginBottom:'20px'}}>
          
            <Link to={`/books/${book._id}`}>
              <h3>{book.title}</h3>
              <p>{book.subtitle}</p>
              <p><img src={book.imageUrl} alt="book" width="200" />  </p>
            </Link>
            
          </div>

      ))}

    </div>
  );
}

export default Books;
