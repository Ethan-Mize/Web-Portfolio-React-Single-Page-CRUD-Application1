import { useState } from "react";

const AddBook = ({ addBook }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [image, setImage] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && author && year && image) {
      const newBook = {
        id: Date.now(),
        title,
        author,
        year,
        image,
      };
      addBook(newBook);
      setTitle("");
      setAuthor("");
      setYear("");
      setImage(null);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
    } else {
      alert("Please fill out all fields and upload an image!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-4 shadow-sm mb-5">
      <h2 className="card-title text-center mb-4">Add New Book</h2>

      {showAlert && (
        <div className="alert alert-success" role="alert">
          Book added successfully!
        </div>
      )}

      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          type="text"
          className="form-control"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Author</label>
        <input
          type="text"
          className="form-control"
          placeholder="Author Name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Year</label>
        <input
          type="number"
          className="form-control"
          placeholder="Year Published"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Upload Image</label>
        <input
          type="file"
          className="form-control"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>

      {image && (
        <div className="mb-3">
          <img
            src={image}
            alt="Preview"
            className="img-thumbnail"
            style={{ width: "150px", height: "150px", objectFit: "cover" }}
          />
        </div>
      )}

      <button type="submit" className="btn btn-primary">
        Add Book
      </button>
    </form>
  );
};

export default AddBook;
