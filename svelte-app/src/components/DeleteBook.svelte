<!-- DeleteBook.svelte -->
<script>
    export let id;
    export let bookData;
    export let onDeleteSuccess;
    export let onCancel;
    export let imageUrl; // Adicione a propriedade imageUrl

    async function deleteBook() {
        const response = await fetch(`http://localhost:3001/books/${id}`, {
            method: "DELETE"
        });
        if (response.ok) {
            onDeleteSuccess(); // Chama a função de sucesso passada pelo componente pai
            console.log("Livro excluído com sucesso");
        } else {
            console.error("Erro ao excluir o livro:", error);
        }
    }
</script>

<div class="register-container">
    <h2 class="register-title">Excluir livro?</h2>
    {#if imageUrl}
        <img
            class="register-image"
            id="register-image-p"
            src={imageUrl}
            alt="Imagem atual"
        />
    {/if}
    <p>Título</p>
      <input class='register-input' type="text" value={bookData.title} disabled />
      <p>Autor</p>
      <input class='register-input' type="text" value={bookData.author} disabled />
      <p>Ano de lançamento</p>
      <input class='register-input' type="text" value={bookData.year} disabled />
      <p>Editora</p>
      <input class='register-input' type="text" value={bookData.publisher} disabled />
    <button class="register-button" on:click={deleteBook}>Sim</button>
    <button class="register-button" on:click={onCancel}>Cancelar</button>
</div>
