import React from "react";
import * as BooksAPI from "../BooksAPI";

const Book = ({
  title,
  authors,
  imageUrl,
  book,
  setBooks,
  isSearching,
  bookshelf
}) => {

  const updateBooks = (newShelf) => {
    BooksAPI.update(book, newShelf).then(() => {
      if (!isSearching) {
        BooksAPI.getAll().then(newBooks => setBooks(newBooks));
      }
    });
  };

  const handleShelfChange = event => {
    const newShelf = event.target.value;
    if (newShelf !== "move") {
      updateBooks(newShelf);
    }
  };

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url("${imageUrl}")`
          }}
        ></div>
        <div className="book-shelf-changer">
          <select
            onChange={handleShelfChange}
            defaultValue={bookshelf}
          >
            <option value="move" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">
        {authors && authors.join(', ')}
      </div>
    </div>
  );
};

export default Book;
