import { useState, useEffect } from "react";

const EditBookModal = ({ currentBook, updateBook, showModal, closeModal }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (currentBook) {
      setTitle(currentBook.title);
      setAuthor(currentBook.author);
      setYear(currentBook.year);
      setImage(currentBook.image);
    }
  }, [currentBook]);

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
    const updatedBook = {
      ...currentBook,
      title,
      author,
      year,
      image,
    };
    updateBook(updatedBook);
  };

  if (!currentBook) return null; // Don't render anything if no book selected

  return (
    <div
      className={`modal fade ${showModal ? "show d-block" : ""}`}
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <form onSubmit={handleSubmit} className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Book</h5>
            <button
              type="button"
              className="btn-close"
              onClick={closeModal}
            ></button>
          </div>

          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Author</label>
              <input
                type="text"
                className="form-control"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Year</label>
              <input
                type="number"
                className="form-control"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Upload New Image (optional)</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            {image && (
              <div className="mb-3 text-center">
                <img
                  src={image}
                  alt="Preview"
                  className="img-thumbnail"
                  style={{ width: "150px", height: "150px", objectFit: "cover" }}
                />
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-success">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBookModal;
