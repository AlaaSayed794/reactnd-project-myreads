import React from 'react'
import PropTypes from 'prop-types';

export default function book(props) {
    const onChange = (e) => {

        props.moveBook(props.book, e.target.value)

    }
    let authors = ""
    try {
        authors = props.book.authors.join(",").replace(/(^,)|(,$)/g, "")
    } catch {
        authors = ""
    }
    let url = ""
    try {
        url = props.book.imageLinks.thumbnail
    }
    catch {
        url = ""
    }
    return (
        <li key={props.book.id}>
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${url})` }}></div>
                    <div className="book-shelf-changer">
                        <select defaultValue={props.book.shelf ? props.book.shelf : "none"} onChange={onChange}>
                            <option value="move" disabled >Move to...</option>
                            <option disabled={props.book.shelf === "currentlyReading"} value="currentlyReading">Currently Reading</option>
                            <option disabled={props.book.shelf === "wantToRead"} value="wantToRead">Want to Read</option>
                            <option disabled={props.book.shelf === "read"} value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{props.book.title}</div>
                <div className="book-authors">{authors}</div>
            </div>
        </li>
    )
}

book.propTypes = {
    book: PropTypes.object.isRequired
    , moveBook: PropTypes.func.isRequired
}