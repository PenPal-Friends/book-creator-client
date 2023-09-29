import React from 'react';

function MyBooks() {
  return (
    <div className="container mx-auto mt-10 px-4">
      <div className="border-b-2 border-blue-500 pb-4">
        <h1 className="text-3xl font-bold text-blue-500">My Books</h1>
      </div>
      <div className="bg-gray-200 p-8 rounded-lg mt-6">
        <p className="text-2xl font-bold">You have no books yet!!</p>
        <p className="text-lg font-semibold mt-4">
          Start writing today; you'll be surprised! We promise.
        </p>
      </div>
      <button className="bg-blue-500 text-white font-semibold py-2 px-4 mt-6 rounded-lg hover:bg-blue-700">
        Create New
      </button>
    </div>
  );
}

export default MyBooks;
