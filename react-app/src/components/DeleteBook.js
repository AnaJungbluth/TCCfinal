import React from 'react';

const DeleteBook = ({ book, onDeleteSuccess, onCancel }) => {
  const handleDelete = () => {
    fetch(`http://localhost:3001/books/${book._id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          console.log('Book deleted successfully');
          onDeleteSuccess(); // Chama a função de retorno de chamada de sucesso
        } else {
          throw new Error('Failed to delete book');
        }
      })
      .catch(error => {
        console.error('Error deleting book: ', error);
        // Adicione qualquer lógica adicional de tratamento de erro aqui
      });
  };

  const handleCancel = () => {
    onCancel(); // Chama a função de retorno de chamada de cancelamento
  };

  return (
    <div className='register-container'>
      <h2 className='register-title'>Excluir Livro?</h2>
      <img className='register-image' id='register-image-p'
        src={`http://localhost:3001/uploads/${book.image}`} alt="Book" />
      <p>Título</p>
      <input className='register-input' type="text" value={book.title} disabled />
      <p>Autor</p>
      <input className='register-input' type="text" value={book.author} disabled />
      <p>Ano de lançamento</p>
      <input className='register-input' type="text" value={book.year} disabled />
      <p>Editora</p>
      <input className='register-input' type="text" value={book.publisher} disabled />
      <button className='register-button' onClick={handleDelete}>Sim</button>
      <button className='register-button' onClick={handleCancel}>Cancelar</button>
    </div>
  );
};

export default DeleteBook;
