
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import booksService from "../services/books.service";
// import axios from axios;
import jsPDF from "jspdf";


// const doc = new jsPDF();

// function generatePDF(){
  
//   //var doc = new jsPDF ();
//   doc.text(20,20, bookTitle);
// //SAVE the PDF
// doc.save('document.pdf');
// }

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

  function generatePDF(book) {
    const doc = new jsPDF();
    doc.text(20, 20, `Title: ${book.title}`);
    doc.text(20, 30, `Subtitle: ${book.subtitle}`);
    doc.text(20, 40, `Description: ${book.description}`);
    doc.save(`${book.title}.pdf`);
  }
  // useEffect(() => {
  //   service.getBooks()
  //     .then((data) => {
  //       // console.log("data", data);
  //       setBooks(data);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);
  
 
  // Fetch books when the component mounts
  // const fetchBooks = ()=> {
  //   fetch (API)
  //   .then ((response)=> response.json())
  //   .then ((data) => setBooks(data))
  // }

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

      <div>
        <Link to="/chapters">
          <button>+ Create new</button>
       
        </Link>
      </div>
      <button onClick={generatePDF}>Generate PDF</button>
    </div>
  );
}

export default Books;
