
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
  // const fetchBooks = ()=> {
  //   fetch (API)
  //   .then ((response)=> response.json())
  //   .then ((data) => setBooks(data))
  // }


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
              <p>Title: {book.title}</p>
              <p>Subtitle: {book.subtitle}</p>
              <p>Description: {book.description}</p>
              <p>Image: <img src={book.imageUrl} alt="book" width="200" />  </p>
       
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
