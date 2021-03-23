import React from 'react'
import { Link } from 'react-router-dom';
import Category from './bookCategoryList'
export default function books(props) {
    return (
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
                                <Category filter="currentlyReading" books={props.books} />
                            </ol>
                        </div>
                    </div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Want to Read</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                <Category filter="wantToRead" books={props.books} />
                            </ol>
                        </div>
                    </div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Read</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                <Category filter="read" books={props.books} />
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <div >
                <Link className="open-search" to="/search">Add a book</Link>
            </div>
        </div>
    )
}
