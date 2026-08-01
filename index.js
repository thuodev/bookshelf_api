import express from "express";
import morgan from "morgan";

// The Bookshelf: six books, ids 1 through 6. Two are staff picks.
const books = [
  {
    id: 1,
    title: "The Cinder Vault",
    author: "Mara Quill",
    genre: "fantasy",
    featured: true,
  },
  {
    id: 2,
    title: "Static Over Neptune",
    author: "R. J. Okafor",
    genre: "sci-fi",
    featured: false,
  },
  {
    id: 3,
    title: "The Long Checkout",
    author: "Iris Vane",
    genre: "mystery",
    featured: false,
  },
  {
    id: 4,
    title: "Grimoire Lane",
    author: "Tobias Fenn",
    genre: "fantasy",
    featured: true,
  },
  {
    id: 5,
    title: "Redshift Alibi",
    author: "Nova Ashe",
    genre: "sci-fi",
    featured: false,
  },
  {
    id: 6,
    title: "The Umbrella Ledger",
    author: "Cass Marrow",
    genre: "mystery",
    featured: false,
  },
];

const app = express();
app.use(morgan("dev"));
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Welcome to the Bookshelf API");
});

app.get("/api/books", (req, res) => {
  let result = books;
  const limit = parseInt(req.query.limit);

  const { genre } = req.query;

  if (genre) {
    result = result.filter((book) => book.genre === genre);
  }
  if (!isNaN(limit)) {
    result = result.slice(0, limit);
  }

  res.json(result);
});
app.get("/api/books/featured", (req, res) => {
  const featuredBooks = books.filter((book) => book.featured);
  res.json(featuredBooks);
});

app.get("/api/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find((b) => b.id === bookId);
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ error: "Book not found" });
  }
});
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
