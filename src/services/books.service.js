import axios from 'axios';

class BooksService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.SERVER_URL || 'http://localhost:5005'
    });

    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use(config => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem('authToken');

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  // POST /api/projects
  createBook = requestBody => {
    return this.api.post('/api/books', requestBody);
  };

  // GET /api/projects
  getAllBooks = () => {
    return this.api.get('/api/books');
  };

  // GET /api/books/:id
  getBook = id => {
    return this.api.get(`/api/books/${id}`);
  };

  // PUT /api/books/:id
  updateBook = (id, requestBody) => {
    return this.api.put(`/api/books/${id}`, requestBody);
  };

  // DELETE /api/projects/:id
  deleteBook = id => {
    return this.api.delete(`/api/books/${id}`);
  };
}

// Create one instance object
const booksService = new BooksService();

export default BooksService;
