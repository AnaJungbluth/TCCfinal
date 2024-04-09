<!-- BookList.svelte -->
<script>
  import AddBook from "./AddBook.svelte";
  import UpdateBook from "./UpdateBook.svelte";
  import DeleteBook from "./DeleteBook.svelte"; // Importe o componente DeleteBook
  import ViewBook from "./ViewBook.svelte";
  import { createEventDispatcher } from "svelte";
  import "./styles/styles.css";
  import { construct_svelte_component } from "svelte/internal";

  let showAddForm = false;
  let showUpdateForm = false;
  let showDeleteForm = false; // Variável para controlar a exibição do formulário de deleção
  let books = [];
  let selectedBookId = null;
  let selectedBookData = null;
  let showViewBook = false;
  let selectedBook = null;

  const dispatch = createEventDispatcher();

  async function fetchBooks() {
    const response = await fetch("http://localhost:3001/books");
    books = await response.json();
    // Adicionando a URL completa da imagem a cada livro
    books = books.map((book) => ({
      ...book,
      imageUrl: `http://localhost:3001/uploads/${book.image}`,
    }));
  }
  fetchBooks();

  async function handleAddSuccess() {
    await fetchBooks();
    toggleAddForm();
  }

  function toggleAddForm() {
    showAddForm = !showAddForm;
    if (showAddForm) {
      dispatch("addFormOpened");
    } else {
      dispatch("addFormClosed");
    }
  }

  function handleAddCancel() {
    toggleAddForm();
  }

  function toggleUpdateForm() {
    showUpdateForm = !showUpdateForm;
    if (showUpdateForm) {
      dispatch("updateFormOpened");
    } else {
      dispatch("updateFormClosed");
    }
  }

  function toggleDeleteForm() {
    showDeleteForm = !showDeleteForm;
    if (showDeleteForm) {
      dispatch("deleteFormOpened");
    } else {
      dispatch("deleteFormClosed");
    }
  }

  function toggleViewBook() {
    showViewBook = !showViewBook;
    if (showViewBook) {
      dispatch("viewBookOpened");
    } else {
      dispatch("viewBookClosed");
    }
  }

  function handleUpdateBook(book) {
    const id = book._id;
    selectedBookId = id;
    selectedBookData = book;
    toggleUpdateForm();
  }

  function handleUpdateCancel() {
    showUpdateForm = false;
    selectedBookId = null;
  }

  async function handleUpdateSuccess() {
    await fetchBooks();
    toggleUpdateForm();
  }

  async function deleteBook(book) {
    const id = book._id;
    selectedBookId = id;
    selectedBookData = book;
    toggleDeleteForm(); // Abre o formulário de deleção ao clicar no botão de deletar
  }

  async function handleDeleteSuccess() {
    await fetchBooks();
    toggleDeleteForm();
  }

  function handleDeleteCancel() {
    toggleDeleteForm();
  }

  async function handleViewBook(book) {
    selectedBook = {
      ...book,
      imageUrl: `http://localhost:3001/uploads/${book.image}`, // Substitua "image" pelo nome correto da propriedade
    };
    showViewBook = true;
  }

  function handleViewCancel() {
    toggleViewBook();
  }
</script>

<div>
  {#if showAddForm}
    <AddBook onAddSuccess={handleAddSuccess} onCancel={handleAddCancel} />
  {:else if showUpdateForm}
    <UpdateBook
      id={selectedBookId}
      imageUrl={selectedBookData.imageUrl}
      bookData={selectedBookData}
      onUpdateSuccess={handleUpdateSuccess}
      onCancel={handleUpdateCancel}
    />
  {:else if showDeleteForm}
    <DeleteBook
      id={selectedBookId}
      bookData={selectedBookData}
      imageUrl={selectedBookData.imageUrl}
      onDeleteSuccess={handleDeleteSuccess}
      onCancel={handleDeleteCancel}
    />
  {:else if showViewBook}
    <ViewBook bookData={selectedBook} onCancel={handleViewCancel} />
  {:else}
    <div class="app-container">
      <h1>Lista de Livros</h1>
      <ul class="register-li">
        {#each books as book}
          <li class="register-book">
            {#if book.imageUrl}
              <img
                class="register-image"
                src={book.imageUrl}
                alt={book.title}
              />
            {/if}
            <br />
            {book.title}
            <br />
            {book.year}
            <br />
            <button
              class="register-button"
              on:click={() => handleUpdateBook(book)}>Editar</button
            >
            <button class="register-button" on:click={() => deleteBook(book)}
              >Excluir</button
            >
            <button
              class="register-button"
              on:click={() => handleViewBook(book)}>Visualizar</button
            >
          </li>
        {/each}
      </ul>
      <button class="register-button" on:click={toggleAddForm}
        >Adicionar Livro</button
      >
    </div>
  {/if}
</div>
