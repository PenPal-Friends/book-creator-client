// import axios from 'axios';

// class ChaptersService {
//   constructor() {
//     this.api = axios.create({
//       baseURL: import.meta.env.SERVER_URL || 'http://localhost:5005'
//     });

//     // Automatically set JWT token in the headers for every request
//     this.api.interceptors.request.use(config => {
//       // Retrieve the JWT token from the local storage
//       const storedToken = localStorage.getItem('authToken');

//       if (storedToken) {
//         config.headers = { Authorization: `Bearer ${storedToken}` };
//       }

//       return config;
//     });
//   }

//   // POST /api/books/:bookId/chapters
//   createChapter = requestBody => {
//     return this.api.post('/api/books/:bookId/chapters', requestBody);
//   };

//   // GET /api/books/:bookId/chapters ?
//   getChapterList = () => {
//     return this.api.get('/api/books/:bookId/chapters');
//   };

//   // GET /api/books/:bookId/chapters/:chapterId ??
//   getChapter = id => {
//     return this.api.get(`/api/books/:bookId/chapters/:chapterId`);
//   };

//   // PUT /api/books/:bookId/chapters/:chapterId ??
//   updateChapter = (id, requestBody) => {
//     return this.api.put(`/api/books/:bookId/chapters/:chapterId`, requestBody);
//   };

//   // PUT /api/books/:bookId/chapters/:chapterId ??
//   updateChapter = (id, requestBody) => {
//     return this.api.put(`/api/books/:bookId/chapters/:chapterId`, requestBody);
//   };

//   // DELETE /api/books/books/:bookId/chapters/:chapterId ??
//   deleteChapter = id => {
//     return this.api.delete(`/api/books/books/:bookId/chapters/:chapterId`);
//   };
// }

// // Create one instance object
// const chaptersService = new ChaptersService();

// export default chaptersService;