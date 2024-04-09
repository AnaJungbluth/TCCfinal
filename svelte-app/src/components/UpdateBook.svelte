<script>
    export let id;
    export let bookData;
    export let onUpdateSuccess;
    export let onCancel;
    export let imageUrl; // Adicione a propriedade imageUrl

  
    let title = "";
    let author = "";
    let year = "";
    let publisher = "";
    let imageFile = null;
    let titleInput;
    let authorInput;
    let yearInput;
    let publisherInput;
  
    $: {
      if (bookData) {
        title = bookData.title;
        author = bookData.author;
        year = bookData.year;
        publisher = bookData.publisher;
      }
    }
  
    const updateBook = async () => {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("author", author);
      formData.append("year", year);
      formData.append("publisher", publisher);
      if (imageFile) {
        formData.append("image", imageFile);
      }
  
      try {
        const response = await fetch(`http://localhost:3001/books/${id}`, {
          method: "PUT",
          body: formData,
        });
  
        if (response.ok) {
          onUpdateSuccess(); // Chame a função de sucesso passada como prop
        } else {
          console.error("Falha ao atualizar o livro:", response.statusText);
        }
      } catch (error) {
        console.error("Erro ao atualizar o livro:", error);
      }
    };
  
    function handleTitleInput(event) {
      title = event.target.value;
    }
  
    function handleAuthorInput(event) {
      author = event.target.value;
    }
  
    function handleYearInput(event) {
      year = event.target.value;
    }
  
    function handlePublisherInput(event) {
      publisher = event.target.value;
    }
  
    function handleFileInputChange(event) {
      const file = event.target.files[0];
      imageFile = file;
    }
  
    function cancelUpdate() {
      onCancel();
    }
  </script>
  
  <div class="register-container">
    <h2 class="register-title">Editar livro</h2>
    <img
      class="register-image"
      id="register-image-p"
      src={imageUrl}
      alt="Imagem atual"
    />
    <input
      class="register-input"
      type="file"
      accept="image/*"
      on:change={handleFileInputChange}
    />
    <input
      class="register-input"
      type="text"
      placeholder="Título"
      bind:this={titleInput}
      on:input={handleTitleInput}
      value={title}
    />
    <input
      class="register-input"
      type="text"
      placeholder="Autor(a)"
      bind:this={authorInput}
      on:input={handleAuthorInput}
      value={author}
    />
    <input
      class="register-input"
      type="text"
      placeholder="Ano de lançamento"
      bind:this={yearInput}
      on:input={handleYearInput}
      value={year}
    />
    <input
      class="register-input"
      type="text"
      placeholder="Editora"
      bind:this={publisherInput}
      on:input={handlePublisherInput}
      value={publisher}
    />
    <button class="register-button" on:click={() => updateBook(id)}>Salvar</button
    >
    <button class="register-button" type="button" on:click={cancelUpdate}
      >Cancelar</button
    >
  </div>
  