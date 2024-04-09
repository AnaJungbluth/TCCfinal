
import { createSignal, on, onMount } from 'solid-js';
import AddBook from './AddBook';
import { UpdateBook } from './UpdateBook';
import DeleteBook from './DeleteBook';
import ViewBook from './ViewBook';
import './styles/styles.css'

const BASE_URL = 'http://localhost:3001'; // URL base da sua API

async function fetchBooks() {
    try {
        const response = await fetch(`${BASE_URL}/books`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar livros:', error);
        return [];
    }
}


export default function BookList() {
    const [books, setBooks] = createSignal([]);
    const [showAddBook, setShowAddBook] = createSignal(false);
    const [showUpdateBook, setShowUpdateBook] = createSignal(false);
    const [selectedBook, setSelectedBook] = createSignal(null);
    const [showDeleteBook, setShowDeleteBook] = createSignal(false);
    const [showViewBook, setShowViewBook] = createSignal(false); // Novo estado para visualização do livro

    const loadBooks = async () => {
        const fetchedBooks = await fetchBooks();
        setBooks(fetchedBooks);
    };

    onMount(loadBooks);

    const handleBookAdded = async (newBook) => {
        const createdBook = await createBook(newBook);
        if (createdBook) {
            // Adiciona o novo livro à lista apenas se a adição for bem-sucedida
            setBooks((prevBooks) => [...prevBooks, createdBook]);
            setShowAddBook(false);
        }
    };

    const handleShowAddBook = () => {
        setShowAddBook(true); // Mostra o formulário de adição de livro
    };

    const handleHideAddBook = () => {
        setShowAddBook(false);
        loadBooks()
    };

    const handleUpdateBook = (book) => {
        setSelectedBook(book);
        setShowUpdateBook(true);
    };

    const handleCancelUpdate = () => {
        setSelectedBook(null);
        setShowUpdateBook(false);
    };

    const handleBookUpdated = (updatedBook) => {
        // Atualiza o estado books com a lista atualizada de livros
        const updatedBooks = books().map((book) =>
        
            book === updatedBook ? updatedBook : book
            
        );
        setBooks(updatedBooks);
        onMount(loadBooks);
        handleCancelUpdate();
    };

    const handleDeleteBook = async () => {
        setBooks(books().filter((book) => book.id !== selectedBook().id));
        setSelectedBook(null);
        setShowDeleteBook(false)
        onMount(loadBooks)
    };

    const handleViewBook = book => {
        setSelectedBook(book);
        setShowViewBook(true);
    };

    return (
        <div>
            {showAddBook() ? (
                <AddBook onBookAdded={handleBookAdded} onHideForm={handleHideAddBook} onCancel={handleHideAddBook} />
            ) : null}
            {showUpdateBook() && selectedBook() ? (
                <UpdateBook book={selectedBook()} onUpdate={handleBookUpdated} onCancel={handleCancelUpdate} />
            ) : null}
            {showDeleteBook() && selectedBook() ? (
                <DeleteBook book={selectedBook()} onDelete={handleDeleteBook} onCancel={() => setShowDeleteBook(false)} />
            ) : null}
            {showViewBook() && selectedBook() ? (
                <ViewBook book={selectedBook()} onCancel={() => setShowViewBook(false)} />
            ) : (
                !showAddBook() && !showUpdateBook() && !showDeleteBook() && (
                    <div className='app-container'>
                        <h1>Lista de Livros</h1>
                        <ul className='register-li'>
                            {books().map((book) => (
                                <li key={book.id} className='register-book'>
                                    {book.image && <img
                                        key={`image-${book.id}`} // Adicione um key único aqui
                                        className="register-image"
                                        src={`http://localhost:3001/uploads/${book.image}?${Date.now()}`}
                                        alt={book.title}
                                    />}
                                    <br></br>
                                    {book.title}
                                    <br></br>
                                    {book.year}
                                    <br></br>
                                    <button className='register-button' onClick={() =>
                                        handleUpdateBook(book)}>Editar</button>
                                    <button className='register-button' onClick={() => { setSelectedBook(book); setShowDeleteBook(true); }}>Excluir</button>
                                    <button className='register-button' onClick={() => { handleViewBook(book); }}>Visualizar</button>
                                </li>
                            ))}

                        </ul>
                        <button className='register-button' onClick={handleShowAddBook}>Adicionar Livro</button>
                    </div>
                )
            )}
        </div>
    );
}    