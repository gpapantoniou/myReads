import React, { useState, useEffect } from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Footer from "./components/Footer";
import Bookshelf from "./components/Bookshelf";
import Search from "./components/Search";

const shelves = [
  { title: "Currently Reading", id: "currentlyReading" },
  { title: "Want to Read", id: "wantToRead" },
  { title: "Read", id: "read" }
];

const App = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(window.location.pathname);

  const navigate = (path) => {
    window.history.pushState(null, "", path);
    setCurrentPage(path);
  };

  window.onpopstate = () => {
    setCurrentPage(window.location.pathname);
  };

  useEffect(() => {
    BooksAPI.getAll().then(fetchedBooks => {
      setBooks(fetchedBooks);
    });
  }, []);

  if (currentPage === "/search") {
    return <Search navigateTo={navigate} />;
  }

  return (
    <div className="app">
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {shelves.map((shelf) => (
            <Bookshelf
              key={shelf.id}
              title={shelf.title}
              books={books.filter(book => book.shelf === shelf.id)}
              setBooks={setBooks}
            />
          ))}
        </div>
        <div className="open-search">
          <button onClick={() => navigate("/search")}>Add a book</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
