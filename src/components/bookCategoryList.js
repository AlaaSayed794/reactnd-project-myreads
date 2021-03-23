import React from 'react'
import Book from './book'
import PropTypes from 'prop-types';
export default function bookCategory(props) {
    return (
        props.books.filter(book => {
            return (book.shelf === props.filter)
        }).map(book => {
            return (
                <Book moveBook={props.moveBook} key={book.id} book={book} />
            )
        })

    )
}
bookCategory.propTypes = {
    books: PropTypes.array.isRequired
    , moveBook: PropTypes.func.isRequired,
    filter: PropTypes.string.isRequired
}