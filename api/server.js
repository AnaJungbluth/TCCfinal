const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose'); // Importando o mongoose

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Configurando conexão com o MongoDB
mongoose.connect('mongodb://localhost:27017/tcc')
  .then(() => {
    console.log('Conectado ao MongoDB');
  })
  .catch((error) => {
    console.error('Erro ao conectar ao MongoDB:', error);
    process.exit(1);
  });


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// Definindo o esquema do livro
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  year: String,
  publisher: String,
  image: String
});

const Book = mongoose.model('Book', bookSchema);

// Método GET para buscar todos os livros
app.get('/books', (req, res) => {
  console.time("getBooks");
  Book.find({})
    .then((books) => {
      res.json(books);
      console.timeEnd("getBooks");
    })
    .catch((error) => {
      console.error('Erro ao buscar livros:', error);
      res.status(500).send('Erro ao buscar livros');
    });
});

// Método POST para adicionar um livro
app.post('/books', upload.single('image'), (req, res) => {
  console.time("postBook");
  const { title, author, year, publisher } = req.body;
  const image = req.file;

  const newBook = new Book({
    title,
    author,
    year,
    publisher,
    image: image.filename
  });

  newBook.save()
    .then((savedBook) => {
      console.log('Livro salvo no MongoDB:', savedBook);
      res.status(201).json(savedBook);
      console.timeEnd("postBook");
    })
    .catch((error) => {
      console.error('Erro ao salvar livro:', error);
      res.status(500).send('Erro ao salvar livro');
    });
});

// Método PUT para atualizar um livro
app.put('/books/:id', upload.single('image'), (req, res) => {
  console.time("putBook");
  const id = req.params.id;
  const updatedBook = req.body;
  const image = req.file; // A nova imagem enviada

  // Verificar se o ID é válido
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send('ID de livro inválido');
  }

  // Atualizar o livro no banco de dados
  Book.findByIdAndUpdate(id, { ...updatedBook, image: image ? image.filename : undefined }, { new: true })
    .then((updatedBook) => {
      if (!updatedBook) {
        return res.status(404).send('Livro não encontrado');
      }
      console.log('Livro atualizado com sucesso:', updatedBook);
      res.send('Livro atualizado com sucesso');
      console.timeEnd("putBook");
    })
    .catch((error) => {
      console.error('Erro ao atualizar livro:', error);
      res.status(500).send('Erro ao atualizar livro');
    });
});

// Método DELETE para remover um livro
app.delete('/books/:id', (req, res) => {
  console.time("deleteBook");
  const id = req.params.id;

  Book.findByIdAndDelete(id)
    .then((deletedBook) => {
      if (!deletedBook) {
        return res.status(404).send('Livro não encontrado');
      }
      console.log('Livro removido com sucesso:', deletedBook);
      res.send('Livro removido com sucesso');
      console.timeEnd("deleteBook");
    })
    .catch((error) => {
      console.error('Erro ao remover livro:', error);
      res.status(500).send('Erro ao remover livro');
    });
});

// Configuração do express.static para servir arquivos estáticos na pasta "uploads"
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
