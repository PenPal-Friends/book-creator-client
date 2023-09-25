// src/services/file-upload.service.js

import axios from "axios";

const api = axios.create({
  // make sure you use PORT = 5005 (the port where our server is running)
  baseURL: "http://localhost:5005/api"
  // withCredentials: true // => you might need this option if using cookies and sessions
});

const errorHandler = (err) => {
  throw err;
};

const getBooks = () => {
  return api.get("/books")
    .then((res) => res.data)
    .catch(errorHandler);
};

const uploadImage = (file) => {
  return api.post("/upload", file)
    .then(res => res.data)
    .catch(errorHandler);
};

const createMovie = (newBook) => {
  return api.post("/books", newBook)
    .then(res => res.data)
    .catch(errorHandler);
};

export default {
  getBooks,
  uploadImage,
  createBook
};
