import React from 'react'

export default function book(props) {
    const onChange = (e) => {
        if (e.target.value != "move") {
            props.moveBook(props.book.id, e.target.value)
        }
    }

    return (
        <li key={props.book.id}>
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${props.book.imageLinks.thumbnail})` }}></div>
                    <div className="book-shelf-changer">
                        <select onChange={onChange}>
                            <option value="move" >Move to...</option>
                            <option disabled={props.book.shelf === "currentlyReading"} value="currentlyReading">Currently Reading</option>
                            <option disabled={props.book.shelf === "wantToRead"} value="wantToRead">Want to Read</option>
                            <option disabled={props.book.shelf === "read"} value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{props.book.title}</div>
                <div className="book-authors">{props.book.authors.join(",").replace(/(^,)|(,$)/g, "")}</div>
            </div>
        </li>
    )
}
