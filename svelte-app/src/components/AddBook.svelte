<!-- AddBook.svelte -->
<script>
    import { createEventDispatcher } from "svelte";

    export let onAddSuccess;
    export let onCancel;

    let newBookTitle = "";
    let newBookAuthor = "";
    let newBookYear = "";
    let newBookPublisher = "";
    let selectedImage = null;

    const dispatch = createEventDispatcher();

    function addBook() {
        const formData = new FormData();
        formData.append("image", selectedImage);
        formData.append("title", newBookTitle);
        formData.append("author", newBookAuthor);
        formData.append("year", newBookYear);
        formData.append("publisher", newBookPublisher);

        fetch("http://localhost:3001/books", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                onAddSuccess();
                resetForm();
            })
            .catch((error) => {
                console.error("Error adding book: ", error);
            });
    }

    function resetForm() {
        newBookTitle = "";
        newBookAuthor = "";
        newBookYear = "";
        newBookPublisher = "";
        selectedImage = null;
    }

    function cancelAdd() {
        resetForm();
        onCancel();
    }

    function handleFileInputChange(event) {
        selectedImage = event.target.files[0];
    }
</script>

<div class="register-container">
    <h2 class="register-title">Adicionar livro</h2>
    <form on:submit|preventDefault={addBook}>
        <input
            class="register-input"
            type="text"
            placeholder="Título"
            bind:value={newBookTitle}
        />
        <input
            class="register-input"
            type="text"
            placeholder="Autor(a)"
            bind:value={newBookAuthor}
        />
        <input
            class="register-input"
            type="text"
            placeholder="Ano de lançamento"
            bind:value={newBookYear}
        />
        <input
            class="register-input"
            type="text"
            placeholder="Editora"
            bind:value={newBookPublisher}
        />
        <input
            class="register-input"
            type="file"
            accept="image/*"
            on:change={handleFileInputChange}
        />
        <button class="register-button" type="submit">Adicionar</button>
        <button class="register-button" type="button" on:click={cancelAdd}
            >Cancelar</button
        >
    </form>
</div>
