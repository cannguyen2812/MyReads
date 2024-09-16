import { useState } from "react";
import "../css/searchComponent.css";
import { search } from "../utils/BooksAPI";
import { useNavigate } from "react-router-dom";
import { Book } from "./book";

export function Search({allBooks ,updateShelf}) {
    const [dataSearched, setDataSearched] = useState([]);
    const [time, setTime] = useState();
    let navigate = useNavigate();
    const handleSearch = (event) => {
        if(time) {
            const timeOut = clearTimeout(time);
            setTime(timeOut)
        }
        const timeOut = setTimeout(() => {
            if(event.target.value.length > 0) {
                search(event.target.value, 50).then(data => {
                    if (data?.error) {
                        setDataSearched([]);
                    } else {
                        if(data) {
                            setDataSearched(data);
                        } else {
                            setDataSearched([]);
                        }
                    }
                })
            } else {
                setDataSearched([]);
            }
        }, 1000)
        setTime(timeOut);
    }

    const backToMain = () => {
        navigate("/")
    }

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <button
                    className="close-search"
                    onClick={() => backToMain()}
                >
                    Close
                </button>
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
                            <Book book={allBooks.find(item => item.id === book.id) ?? book} updateShelf={updateShelf}/>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    )
}