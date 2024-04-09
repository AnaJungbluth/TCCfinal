import { createSignal } from 'solid-js';

export async function createBook(newBook) {
    const BASE_URL = 'http://localhost:3001'; // URL base da sua API

    try {
        const response = await fetch(`${BASE_URL}/books`, {
            method: 'POST',
            body: newBook,
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao criar livro:', error);
        return null;
    }
}

export default function AddBook({ onBookAdded, onHideForm, onCancel }) {
    const [newBook, setNewBook] = createSignal({ title: '', author: '', year: '', publisher: '', image: null });

    const handleAddBook = async () => {
        const formData = new FormData();
        formData.append('title', newBook().title);
        formData.append('author', newBook().author);
        formData.append('year', newBook().year);
        formData.append('publisher', newBook().publisher);
        formData.append('image', newBook().image);

        const createdBook = await createBook(formData);
        if (createdBook) {
            onBookAdded(createdBook); // Passa o novo livro como argumento para a função de retorno
            setNewBook({ title: '', author: '', year: '', publisher: '', image: null }); // Limpa os campos após adicionar o livro
            onHideForm(); // Oculta o formulário após adicionar o livro
        }
    };

    const handleCancel = () => {
        onCancel(); // Chama a função de cancelar
    };

    const handleImageChange = (event) => {
        // Define a imagem selecionada no estado
        setNewBook({ ...newBook(), image: event.target.files[0] });
    };

    return (
        <div className='register-container'>
            <h2 className='register-title'>Adicionar novo livro</h2>
            <input className='register-input' type="text" placeholder="Título"
                value={newBook().title} onInput={(e) => setNewBook({ ...newBook(), title: e.target.value })} />
            <input className='register-input' type="text" placeholder="Autor(a)"
                value={newBook().author} onInput={(e) => setNewBook({ ...newBook(), author: e.target.value })} />
            <input className='register-input' type="text" placeholder="Ano de lançamento"
                value={newBook().year} onInput={(e) => setNewBook({ ...newBook(), year: e.target.value })} />
            <input className='register-input' type="text" placeholder="Editora"
                value={newBook().publisher} onInput={(e) => setNewBook({ ...newBook(), publisher: e.target.value })} />
            <input className='register-input' type="file" accept="image/*" onChange={handleImageChange} />
            <button className='register-button' onClick={handleAddBook}>Adicionar</button>
            <button className='register-button' onClick={handleCancel}>Cancelar</button>
        </div>
    );
}
