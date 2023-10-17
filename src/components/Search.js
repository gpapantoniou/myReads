import React, { useState, useEffect } from "react";
import Book from "./Book";
import Footer from "./Footer";
import * as BooksAPI from "../BooksAPI";

const Search = ({ navigateTo }) => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);

  const updateQuery = event => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    if (query) {
      BooksAPI.search(query).then(results => {
        if (results && !results.error) {
          BooksAPI.getAll().then(myBooks => {
            const updatedBooks = results.map(book => {
              const foundBook = myBooks.find(myBook => myBook.id === book.id);
              return foundBook ? { ...book, shelf: foundBook.shelf } : { ...book, shelf: "none" };
            });
            setBooks(updatedBooks);
          });
        } else {
          setBooks([]);
        }
      });
    } else {
      setBooks([]);
    }
  }, [query]);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <button className="close-search" onClick={() => navigateTo("/")}>
          Close
        </button>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title or author"
            value={query}
            onChange={updateQuery}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {books.map((book, index) => (
            <li key={index}>
              <Book
                title={book.title}
                authors={book.authors}
                imageUrl={book.imageLinks && book.imageLinks.thumbnail}
                bookshelf={book.shelf}
                book={book}
                isSearching
              />
            </li>
          ))}
        </ol>
      </div>
      <Footer />
    </div>
  );
};

export default Search;
