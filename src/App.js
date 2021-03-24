import React from 'react'
import { Route } from 'react-router-dom';
import LoadingOverlay from 'react-loading-overlay';
import * as BooksAPI from './BooksAPI'
import Books from './components/books'
import Search from './components/search'
import './App.css'

class BooksApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      books: [],
      categories: [],
      loading: true
    }
  }
  componentDidMount() {
    this.populateData()
  }
  moveBook = async (book, shelf) => {

    this.setState({ loading: true })
    await BooksAPI.update(book, shelf).then(res => {
      var found = false
      for (let i = 0; i < this.state.books.length; i++) {
        if (this.state.books[i].id === book.id) {
          found = true
          break
        }
      }
      if (found) {
        this.setState({
          loading: false,
          books: this.state.books.map(Book => {
            if (Book.id === book.id) {
              Book.shelf = shelf
            }
            return Book;
          })
        })
      }
      else {
        book.shelf = shelf
        this.setState({
          loading: false,
          books: [...this.state.books, book]
        })
      }

    })
  }

  render() {
    return (
      <LoadingOverlay
        active={this.state.loading}
        spinner
        text='Loading...'
      >
        <div><Route path='/search' render={() => (
          <Search moveBook={this.moveBook} books={this.state.books} />
        )} />
          <Route exact path='/' render={() => ((
            <Books books={this.state.books} moveBook={this.moveBook} />
          ))} /></div>

      </LoadingOverlay>

    )
  }

  async populateData() {

    const books = await BooksAPI.getAll();

    this.setState({ books, loading: false })

  }
}

export default BooksApp
