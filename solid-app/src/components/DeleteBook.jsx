// DeleteBook.jsx

import { createSignal } from 'solid-js';

const BASE_URL = 'http://localhost:3001'; // URL base da sua API

async function deleteBook(bookId) {
    try {
        const response = await fetch(`${BASE_URL}/books/${bookId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Erro ao deletar livro: ${response.status} - ${response.statusText}`);
        }

        // Apenas retornar true indicando sucesso
        return true;
    } catch (error) {
        console.error('Erro ao deletar livro:', error);
        return false;
    }
}

export default function DeleteBook({ book, onDelete, onCancel }) {
    const handleDelete = async () => {
        const deleted = await deleteBook(book._id);
        if (deleted) {
            onDelete(book._id); // Notifica o componente pai que o livro foi deletado
        }
    };

    return (
        <div className='register-container'>
            <h2 className='register-title'>Excluir livro?</h2>
            <img className='register-image' id='register-image-p'
                src={`${BASE_URL}/uploads/${book.image}`} alt={book.title} />
            <p>Título</p>
            <input className='register-input' type="text" value={book.title} disabled />
            <p>Autor</p>
            <input className='register-input' type="text" value={book.author} disabled />
            <p>Ano de lançamento</p>
            <input className='register-input' type="text" value={book.year} disabled />
            <p>Editora</p>
            <input className='register-input' type="text" value={book.publisher} disabled />
            <button className='register-button' onClick={handleDelete}>Sim</button>
            <button className='register-button' onClick={onCancel}>Cancelar</button>
        </div>
    );
}
