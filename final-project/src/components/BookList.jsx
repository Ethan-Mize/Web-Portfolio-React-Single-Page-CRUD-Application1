const BookList = ({ books, deleteBook, editBook }) => {
  return (
    <div className="row">
      {books.map((book) => (
        <div key={book.id} className="col-md-4 mb-4">
          <div className="card h-100 shadow-sm">
            <img
              src={book.image}
              className="card-img-top"
              alt={book.title}
              style={{ height: "250px", width: "100%", objectFit: "cover" }}
            />
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">{book.title}</h5>
              <p className="card-text text-muted">{book.author}</p>
              <p className="card-text">
                <small className="text-muted">{book.year}</small>
              </p>

              <div className="mt-auto d-flex justify-content-between">
                <button
                  className="btn btn-warning btn-sm d-flex gap-2 align-items-center"
                  onClick={() => editBook(book)}
                >
                  <i className="fas fa-pen"></i>
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm d-flex gap-2 align-items-center"
                  onClick={() => deleteBook(book.id)}
                >
                  <i className="fas fa-trash"></i>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookList;
