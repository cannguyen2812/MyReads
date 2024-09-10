import "./App.css";
import { getAll, search, update } from "./BooksAPI";
import { useEffect, useState } from "react";

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [allBooks, setAllBooks] = useState([]);
  const [dataSearched, setDataSearched] = useState([]);
  const shelfs = [
    {
      value: 'currentlyReading',
      content: 'Currently Reading'
    },
    {
      value: 'wantToRead',
      content: 'Want to Read'
    },
    {
      value: 'read',
      content: 'Read'
    },
    {
      value: 'none',
      content: 'None'
    }
  ];
  useEffect(() => {
    getAll().then(data => {
      setAllBooks(data);
    })
  }, [])


  const updateShelf = (book, event) => {
    update(book, event.target.value).then(_ => {
      getAll().then(data => {
        setAllBooks(data);
      })
    })
  }

  const handleSearch = (event) => {
    search(event.target.value,50).then(data => {
      console.log(data);
      if(data) {
        setDataSearched(data);
      } else {
        setDataSearched([]);
      }
    })
  }

  const clickOpenSearch = () => {
    setShowSearchpage(!showSearchPage);
    setDataSearched([]);
  }
  return (
    <div className="app">
      {showSearchPage ? (
        <div className="search-books">
          <div className="search-books-bar">
            <a
              className="close-search"
              onClick={() => setShowSearchpage(!showSearchPage)}
            >
              Close
            </a>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
                onChange={handleSearch}
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {dataSearched.map(book => (
                <li key={book.id}>
                  <div className="book">
                    <div className="book-top">
                      <div
                        className="book-cover"
                        style={{
                          width: 128,
                          height: 193,
                          backgroundImage:
                            `url("${book.imageLinks ? book.imageLinks.thumbnail : ''}")`,
                        }}
                      ></div>
                      <div className="book-shelf-changer">
                        <select defaultValue={book.shelf ? book.shelf : 'none'} onChange={(event) => updateShelf(book, event)}>
                          <option value="none" disabled>
                            Move to...
                          </option>
                          {shelfs.map(val => (
                            <option value={val.value}>
                              {val.content}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors? book.authors[0] : ''}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      ) : (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {allBooks.filter(item => item.shelf === 'currentlyReading').map(book => (
                      <li key={book.id}>
                        <div className="book">
                          <div className="book-top">
                            <div
                              className="book-cover"
                              style={{
                                width: 128,
                                height: 193,
                                backgroundImage:
                                  `url("${book.imageLinks.thumbnail}")`,
                              }}
                            ></div>
                            <div className="book-shelf-changer">
                              <select defaultValue={book.shelf} onChange={(event) => updateShelf(book, event)}>
                                <option value="none" disabled>
                                  Move to...
                                </option>
                                {shelfs.map(val => (
                                  <option key={val.value} value={val.value}>
                                    {val.content}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.authors[0]}</div>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {allBooks.filter(item => item.shelf === 'wantToRead').map(book => (
                      <li key={book.id}>
                        <div className="book">
                          <div className="book-top">
                            <div
                              className="book-cover"
                              style={{
                                width: 128,
                                height: 193,
                                backgroundImage:
                                  `url("${book.imageLinks.thumbnail}")`,
                              }}
                            ></div>
                            <div className="book-shelf-changer">
                              <select defaultValue={book.shelf} onChange={(event) => updateShelf(book, event)}>
                                <option value="none" disabled>
                                  Move to...
                                </option>
                                {shelfs.map(val => (
                                  <option key={val.value} value={val.value}>
                                    {val.content}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.authors[0]}</div>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {allBooks.filter(item => item.shelf === 'read').map(book => (
                      <li key={book.id}>
                        <div className="book">
                          <div className="book-top">
                            <div
                              className="book-cover"
                              style={{
                                width: 128,
                                height: 193,
                                backgroundImage:
                                  `url("${book.imageLinks.thumbnail}")`,
                              }}
                            ></div>
                            <div className="book-shelf-changer">
                              <select defaultValue={book.shelf} onChange={(event) => updateShelf(book, event)}>
                                <option value="none" disabled>
                                  Move to...
                                </option>
                                {shelfs.map(val => (
                                  <option key={val.value} value={val.value}>
                                    {val.content}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.authors[0]}</div>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="open-search">
            <a onClick={clickOpenSearch}>Add a book</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
