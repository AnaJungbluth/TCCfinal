<!-- ViewBook.svelte -->
<script>
  export let bookData;
  export let onCancel;
</script>

<div class="register-container">
  <h2 class="register-title">Detalhes do livro</h2>
  {#if bookData && bookData.imageUrl}
    <img
      class="register-image"
      id="register-image-p"
      src={bookData.imageUrl}
      alt="Imagem do livro"
    />
  {/if}
  <p>Título</p>
  <input class="register-input" type="text" value={bookData.title} disabled />
  <p>Autor</p>
  <input class="register-input" type="text" value={bookData.author} disabled />
  <p>Ano de lançamento</p>
  <input class="register-input" type="text" value={bookData.year} disabled />
  <p>Editora</p>
  <input
    class="register-input"
    type="text"
    value={bookData.publisher}
    disabled
  />
  <button class="register-button" on:click={onCancel}>Voltar</button>
</div>
