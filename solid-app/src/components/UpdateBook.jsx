import { createSignal } from 'solid-js';

const BASE_URL = 'http://localhost:3001'; // URL base da sua API

async function updateBook(updatedBook) {
  try {
      const formData = new FormData();
      formData.append('title', updatedBook.title);
      formData.append('author', updatedBook.author);
      formData.append('year', updatedBook.year);
      formData.append('publisher', updatedBook.publisher);

      // Adicione a imagem ao FormData apenas se uma nova imagem foi selecionada
      if (updatedBook.image instanceof File) {
          formData.append('image', updatedBook.image);
      }

      const response = await fetch(`${BASE_URL}/books/${updatedBook.id}`, {
          method: 'PUT',
          body: formData,
      });
      
      if (!response.ok) {
          throw new Error(`Erro ao atualizar livro: ${response.status} - ${response.statusText}`);
      }
      return true;
  } catch (error) {
      console.error('Erro ao atualizar livro:', error);
      return false;
  }
}

export function UpdateBook({ book, onUpdate, onCancel }) {
    const [updatedBook, setUpdatedBook] = createSignal(book);

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Atualize o objeto updatedBook para incluir o ID do livro
        const updatedBookWithId = { ...updatedBook(), id: book._id };
        await updateBook(updatedBookWithId);
        onUpdate(updatedBookWithId); // Atualiza localmente o livro com os novos dados
    };
    

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUpdatedBook((prevBook) => ({ ...prevBook, [name]: value }));
    };

    const handleImageChange = (event) => {
        // Define a nova imagem selecionada no estado, apenas se for uma instância de File
        const newImage = event.target.files[0];
        if (newImage instanceof File) {
            setUpdatedBook((prevBook) => ({ ...prevBook, image: newImage }));
        }
    };

    return (
        <div className='register-container'>
            <h2 className='register-title'>Editar livro</h2>
            <form onSubmit={handleSubmit}>
                {book.image && (
                    <img
                        id='register-image-p'
                        className='register-image'
                        src={`${BASE_URL}/uploads/${book.image}`}
                        alt="Book"
                    />
                )}
                <input className='register-input' type="file" accept="image/*" onChange={handleImageChange} />
                <input className='register-input' type="text" placeholder='Título' name="title" value={updatedBook().title} onInput={handleInputChange} />
                <input className='register-input' type="text" placeholder='Autor(a)' name="author" value={updatedBook().author} onInput={handleInputChange} />
                <input className='register-input' type="text" placeholder='Ano de lançamento' name="year" value={updatedBook().year} onInput={handleInputChange} />
                <input className='register-input' type="text" placeholder='Editora' name="publisher" value={updatedBook().publisher} onInput={handleInputChange} />
                <button className='register-button' type="submit">Salvar</button>
                <button className='register-button' type="button" onClick={onCancel}>Cancelar</button>
            </form>
        </div>
    );
}
