import { useState, useEffect } from "react";
import AddBook from "./components/AddBook";
import BookList from "./components/BookList";
import EditBookModal from "./components/EditBookModal";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./app.css"

const initialBooks = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    year: 1925,
    image: "/assets/gatsby.jpg",
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    year: 1949,
    image: "/assets/1984.jpg",
  },
  {
    id: 3,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    year: 1960,
    image: "/assets/mockingbird.webp",
  },
];

function App() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [currentBook, setCurrentBook] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem("books"));
    if (storedBooks && storedBooks.length > 0) {
      setBooks(storedBooks);
    } else {
      setBooks(initialBooks);
      localStorage.setItem("books", JSON.stringify(initialBooks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  const addBook = (book) => {
    setBooks([...books, book]);
  };

  const deleteBook = (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      setBooks(books.filter((book) => book.id !== id));
    }
  };

  const openEditModal = (book) => {
    setCurrentBook(book);
    setShowModal(true);
  };

  const closeEditModal = () => {
    setShowModal(false);
    setCurrentBook(null);
  };

  const updateBook = (updatedBook) => {
    setBooks(books.map((book) => (book.id === updatedBook.id ? updatedBook : book)));
    closeEditModal();
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase()) ||
    book.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">📚 Book Manager</h1>

      <AddBook addBook={addBook} />

      <div className="mb-4 d-flex gap-2 align-items-center border px-2 rounded">
      <i className="fas fa-search"></i>
        <input
          type="text"
          placeholder="Search by title or author..."
          className="form-control border-0"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredBooks.length > 0 ? (
        <BookList books={filteredBooks} deleteBook={deleteBook} editBook={openEditModal} />
      ) : (
        <p className="text-center">No books found.</p>
      )}

      {/* Modal always rendered, just hidden or shown */}
      <EditBookModal
        currentBook={currentBook}
        updateBook={updateBook}
        showModal={showModal}
        closeModal={closeEditModal}
      />
    </div>
  );
}

export default App;
