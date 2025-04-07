import React, { useState, useEffect } from 'react';
import UpdateBook from './UpdateBook';
import AddBook from './AddBook';
import DeleteBook from './DeleteBook';
import ViewBook from './ViewBook';
import './styles/styles.css'

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3001/books')
      .then(response => response.json())
      .then(data => {
        setBooks(data);
      })
      .catch(error => {
        console.error('Error fetching books: ', error);
      });
  }, []);

  const handleUpdateBook = (book) => {
    setSelectedBook(book);
    setShowUpdateForm(true);
  };

  const handleUpdateSuccess = () => {
    setShowUpdateForm(false);
    setSelectedBook(null);
    fetch('http://localhost:3001/books')
      .then(response => response.json())
      .then(data => {
        setBooks(data);
      })
      .catch(error => {
        console.error('Error fetching books: ', error);
      });
  };

  const handleCancelUpdate = () => {
    setShowUpdateForm(false);
  };

  const handleCancelAdd = () => {
    setShowAddForm(false);
  };

  const handleAddSuccess = () => {
    fetch('http://localhost:3001/books')
      .then(response => response.json())
      .then(data => {
        setBooks(data);
        setShowAddForm(false);
      })
      .catch(error => {
        console.error('Error fetching books: ', error);
      });
  };

  const handleDeleteBook = (book) => {
    setSelectedBook(book);
    setShowDeleteForm(true);
  };

  const handleDeleteSuccess = () => {
    setShowDeleteForm(false);
    setSelectedBook(null);
    fetch('http://localhost:3001/books')
      .then(response => response.json())
      .then(data => {
        setBooks(data);
      })
      .catch(error => {
        console.error('Error fetching books: ', error);
      });
  };

  const handleCancelDelete = () => {
    setShowDeleteForm(false);
  };

  const handleViewDetails = (book) => {
    console.time("getBooksID")
    setSelectedBook(book);
    setShowDetails(true);
    console.timeEnd("getBooksID")
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
  };

  return (
    <div>
      {showUpdateForm ? (
        <UpdateBook
          book={selectedBook}
          onUpdateSuccess={handleUpdateSuccess}
          onCancel={handleCancelUpdate} />
      ) : showAddForm ? (
        <AddBook onAddSuccess={handleAddSuccess} onCancel={handleCancelAdd} />
      ) : showDeleteForm ? (
        <DeleteBook
          book={selectedBook}
          onDeleteSuccess={handleDeleteSuccess}
          onCancel={handleCancelDelete} />
      ) : showDetails ? (
        <ViewBook book={selectedBook}
          onClose={handleCloseDetails} />
      ) : (
        <div className='app-container'>
          <h1>Lista de Livros</h1>
          <ul className='register-li'>
            {books.map(book => (
              <li key={book._id} className='register-book'>
                <div>
                  <img className='register-image'
                    src={`http://localhost:3001/uploads/${book.image}`} alt={book.title} />
                </div>
                <div>
                  {book.title}
                  <br />
                  {book.year}
                  <br />
                  <button className='register-button' onClick={() => handleUpdateBook(book)}>Editar</button>
                  <button className='register-button' onClick={() => handleDeleteBook(book)}>Excluir</button>
                  <button className='register-button' onClick={() => handleViewDetails(book)}>Visualizar</button>
                </div>
              </li>
            ))}
          </ul>
          <button className='register-button' id='button-add' onClick={() => setShowAddForm(true)}>Adicionar Livro</button>
        </div>
      )}
    </div>
  );
};

export default BookList;
