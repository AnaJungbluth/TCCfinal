import React, { useState, useEffect } from 'react';

const UpdateBook = ({ book, onUpdateSuccess, onCancel }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [publisher, setPublisher] = useState('');
  const [image, setImage] = useState(null); // Estado para armazenar a nova imagem selecionada

  useEffect(() => {
    // Atualiza os estados com os dados do livro quando eles mudam
    setTitle(book.title);
    setAuthor(book.author);
    setYear(book.year);
    setPublisher(book.publisher);
  }, [book]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('year', year);
    formData.append('publisher', publisher);

    // Adicione a nova imagem ao FormData apenas se uma nova imagem foi selecionada
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await fetch(`http://localhost:3001/books/${book._id}`, {
        method: 'PUT',
        body: formData
      });

      if (response.ok) {
        onUpdateSuccess();
      } else {
        // Trate erros de forma adequada
        console.error('Erro ao atualizar livro:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao atualizar livro:', error);
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  const handleImageChange = (event) => {
    // Define a nova imagem selecionada no estado
    const newImage = event.target.files[0];
    setImage(newImage);
  
    // Exibe a nova imagem no formulário
    const reader = new FileReader();
    reader.onload = () => {
      document.getElementById('register-image-p').src = reader.result;
    };
    reader.readAsDataURL(newImage);
  };
  

  return (
    <div className='register-container'>
      <h2 className='register-title'>Atualizar livro</h2>
      <form onSubmit={handleSubmit}>
        {book.image && <img id='register-image-p' className='register-image'
          src={`http://localhost:3001/uploads/${book.image}`} alt="Book" />}
        <input className='register-input' type="file" accept="image/*" onChange={handleImageChange} />
        <input className='register-input' type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input className='register-input' type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
        <input className='register-input' type="text" value={year} onChange={(e) => setYear(e.target.value)} />
        <input className='register-input' type="text" value={publisher} onChange={(e) => setPublisher(e.target.value)} />
        <button className='register-button' type="submit">Atualizar</button>
        <button className='register-button' type="button" onClick={handleCancel}>Cancelar</button>
      </form>
    </div>
  );
};

export default UpdateBook;
