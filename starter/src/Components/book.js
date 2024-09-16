import "../css/book.css"

export function Book({book, updateShelf }) {
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

    return (
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
                    <select defaultValue={ book.shelf ? book.shelf : 'none' } onChange={(event) => updateShelf(book, event)}>
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
            <div className="book-authors">{book.authors ? book.authors[0] : ''}</div>
        </div>
    )
}