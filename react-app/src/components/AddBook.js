import React, { useState } from 'react';

const AddBook = ({ onAddSuccess, onCancel }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [publisher, setPublisher] = useState('');
  const [image, setImage] = useState(null); // Estado para armazenar a imagem selecionada

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('year', year);
    formData.append('publisher', publisher);
    formData.append('image', image); // Adicionar a imagem ao FormData

    try {
      const response = await fetch('http://localhost:3001/books', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        onAddSuccess();
      } else {
        // Trate erros de forma adequada
        console.error('Erro ao adicionar livro:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao adicionar livro:', error);
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className='register-container'>
      <h2 className='register-title'>Adicionar novo Livro</h2>
      <form onSubmit={handleSubmit}>
          <input className='register-input' placeholder='Título' type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          <input className='register-input' placeholder='Autor(a)' type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
          <input className='register-input' placeholder='Ano de lançamento' type="text" value={year} onChange={(e) => setYear(e.target.value)} />
          <input className='register-input' placeholder='Editora' type="text" value={publisher} onChange={(e) => setPublisher(e.target.value)} />
          <input className='register-input' type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
        <button className='register-button' type="submit">Adicionar</button>
        <button className='register-button' type="button" onClick={handleCancel}>Cancelar</button>
      </form>
    </div>
  );
};

export default AddBook;
