import React from 'react'
import Book from './book'
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
