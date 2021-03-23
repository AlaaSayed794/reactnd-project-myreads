import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './book'


class search extends Component {
    state = {
        query: ''
    }
    updateQuery = (query) => {
        this.setState(() => ({
            query: query.trim()
        }))
    }
    clearQuery = () => {
        this.updateQuery('')
    }
    render() {
        const { query } = this.state
        const { books } = this.props

        const showingBooks = query === ''
            ? books
            : books.filter((b) => (
                //filter by name or author 
                b.title.toLowerCase().includes(query.toLowerCase()) || b.authors.toString().toLowerCase().includes(query.toLowerCase())
            ))
        console.log(books.length)
        console.log(showingBooks.length)
        return (

            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author"
                            onChange={(event) => this.updateQuery(event.target.value)}
                            value={query} />

                    </div>
                </div>
                {showingBooks.length !== books.length && (
                    <div className="search-books-results">
                        <span>Now showing {showingBooks.length} of {books.length}</span>
                        <button onClick={this.clearQuery}>Show all</button>
                    </div>
                )}
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
