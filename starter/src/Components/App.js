import "../css/App.css";
import { BookShelfComponent } from "./bookShelfComponent";
import { getAll, update } from "../utils/BooksAPI";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Search } from "./searchComponent";

function App() {
  const [allBooks, setAllBooks] = useState([]);
  const [test , setTest] = useState('hello')
  let navigate = useNavigate();
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

  const clickOpenSearch = () => {
    navigate("/search")
  }
  return (
    <Routes>
      <Route 
        path="/"
        element={
           <div className="app">
             <div className="list-books">
               <div className="list-books-title">
                 <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                 <div>
                  <div className="bookshelf">
                     <h2 className="bookshelf-title">Currently Reading</h2>
                     <BookShelfComponent allBooks={allBooks} shelf={'currentlyReading'} updateShelf={updateShelf}/>
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Want to Read</h2>
                    <BookShelfComponent allBooks={allBooks} shelf={'wantToRead'} updateShelf={updateShelf}/>
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Read</h2>
                    <BookShelfComponent allBooks={allBooks} shelf={'read'} updateShelf={updateShelf}/>
                  </div>
                </div>
              </div>
              <div className="open-search">
                <button onClick={clickOpenSearch}>Add a book</button>
              </div>
            </div>
          </div>
        }
      />

      <Route 
        path="/search"
        element={
          <Search updateShelf={updateShelf} allBooks={allBooks}/>
        }
      />
    </Routes>
    
  );
}

export default App;
