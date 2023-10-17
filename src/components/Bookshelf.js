import React from "react";
import Book from "./Book";
import ShelfImage from "../media/wooden_selves.png";
const Bookshelf = ({ books, title, setBooks }) => { // Destructuring props directly

  const renderBooks = () => {
    return books.map((book, index) => (
      <li key={index}>
        <Book
          title={book.title}
          authors={book.authors}
          imageUrl={book.imageLinks && book.imageLinks.thumbnail}
          bookshelf={book.shelf}
          book={book}
          setBooks={setBooks}
        />
      </li>
    ));
  };

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books && renderBooks()}
          {/* Calling a function to render books for cleaner code structure */}
        </ol>
        <img
          className="shelf-image"
          src={ShelfImage}
          alt="Wooden Shelf"
        />
      </div>
    </div>
  );
};

export default Bookshelf;
