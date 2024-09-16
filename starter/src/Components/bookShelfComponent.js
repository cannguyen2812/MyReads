import "../css/bookShelfComponent.css";
import { Book } from "./book";

export function BookShelfComponent({allBooks, shelf, updateShelf}) {
    return (
        <div className="bookshelf-books">
            <ol className="books-grid">
                {allBooks.filter(item => item.shelf === shelf).map(book => (
                    <li key={book.id}>
                        <Book book={book} updateShelf={updateShelf}/>
                    </li>
                ))}
            </ol>
        </div>
    )
}