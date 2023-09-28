import React from 'react';

function MyBooks() {
  const parentDivStyle = {
    display: 'block', // Display the parent div
    padding: '15px',
    border: '2px solid #333',
    textAlign: 'center',
    padding : '20px'
  };
  const childDivStyle = {
    backgroundColor: 'GREY',
    padding: '40px',
    display: 'block', // Display the child div
  };
  const headerStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    border: '1px solid #007bff',
  };
  const buttonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    marginTop: '20px',
  };

  return (
    <div style={parentDivStyle}>
      <h1 style={headerStyle}>My Books</h1>
      <div style={childDivStyle}>
      <p style={{fontSize: '20px' , fontWeight: 'bold' }}>You have no books yet!!</p>
      <p style={{fontSize: '15px' , fontWeight: 'bold' }} > Start writing today; you'll be surprised! We promise.</p>
      </div>
      <button style={buttonStyle}>Create New</button>
   
    </div>
  );
}

export default MyBooks;
