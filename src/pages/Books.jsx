import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const storedToken = localStorage.getItem("authToken");

const API_URL = "http://localhost:5005";

function Books() {
  const [books, setBooks] = useState([]);

  const getBooks = () => {
    axios
      .get(`${API_URL}/api/books`, {headers: { Authorization: `Bearer ${storedToken}`}})
      .then((response) =>{console.log(response)
         setBooks(response.data)})
      .catch((error) => console.log(error));
  };

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div className="BooksPage">
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

export default Books;
