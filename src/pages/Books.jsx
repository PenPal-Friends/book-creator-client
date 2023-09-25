
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
        <Link to="/chapters">
          <button>+ Create new</button>
        </Link>
      </div>

    </div>
  );
}

export default Books;


/*
import { useState, useEffect } from "react";
// import axios from "axios";

import booksService from "../services/books.service";
import { Link, useParams } from "react-router-dom";

const storedToken = localStorage.getItem("authToken");
const API_URL = "http://localhost:5005";

function Books() {
  const [books, setBooks] = useState([]);
  const { bookId } = useParams();

  const getBooks = () => {
  //  axios
      // .get(`${API_URL}/api/books`, {headers: { Authorization: `Bearer ${storedToken}`}})
      // .then((response) =>{console.log(response)
      //    setBooks(response.data)})
      // .catch((error) => console.log(error));
     
      booksService.getAllBooks()
      .then((response) => {
        const oneBook = response.data;
        setBooks(oneBook);
       console.log("ONE BOOOK *****8"+oneBook.title);
      })
      .catch((error) => console.log(error));

  };
console.log("IN the Get books*******---- 1");

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getBooks();
  }, []);

  console.log("IN the Get books*******---- 21"+setBooks.length);
  console.log("IN the Get books*******---- 22"+setBooks.title);
  return (
    
    <div className="BooksPage">
        <p>WE ARE IN BOOKS</p>
      {books && books.map((book) => {
        return (
          <div className="BookCard card" key={book._id}>
            <Link to={`/books/${book._id}`}>
              <h3>{book.title}</h3>
             
            </Link>
          </div>
        );
      })}
    </div>
  );
}

console.log("IN the Get books*******---- 3sss");

export default Books;
*/