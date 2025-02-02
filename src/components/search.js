import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './book'
import PropTypes from 'prop-types';
import * as BooksAPI from '../BooksAPI'

class search extends Component {
    state = {
        showingBooks: []
    }
    searchBooks = async (query) => {
        if (query) {
            const books = await BooksAPI.search(query)
            let booksWithShelves = books.map(b => {
                if (this.props.books.some(item => item.id === b.id)) {
                    console.log("book in my shelf")
                    b.shelf = this.props.books.find(x => x.id === b.id).shelf
                }
                return b
            });
            this.setState(() => ({
                showingBooks: books && (!books.error) ? books : []
            }))
        }
        //user cleared search query
        else {
            this.setState(() => ({
                showingBooks: []
            }))
        }

    }
    render() {
        const { showingBooks } = this.state
        return (

            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author"
                            onChange={(event) => this.searchBooks(event.target.value)} />

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">{
                        showingBooks.map(book => (<Book moveBook={this.props.moveBook} key={book.id} book={book} />)
                        )
                    }

                    </ol>
                </div>


            </div>
        )
    }
}

export default search;

search.propTypes = {
    books: PropTypes.array.isRequired,
    moveBook: PropTypes.func.isRequired
}