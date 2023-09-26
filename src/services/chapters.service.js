import axios from 'axios';

class ChaptersService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5005'
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


  createChapter = requestBody => {
    return this.api.post(`/api/books/${bookId}/chapters`, requestBody);
  };

  getChapter = id => {
    return this.api.get(`/api/books/${bookId}/chapters/${_id}`);
  };

  updateChapter = (id, requestBody) => {
    return this.api.put(`/api/books/${bookId}/chapters/${_id}`, requestBody);
  };

  deleteChapter = id => {
    return this.api.delete(`/api/books/${bookId}/chapters/${_id}`);
  };
}

// Create one instance object
const chaptersService = new ChaptersService();

export default chaptersService;