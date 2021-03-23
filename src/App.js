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
  moveBook = async (id, shelf) => {

    this.setState({ loading: true })
    await BooksAPI.update(id, shelf).then(res => {
      this.setState({
        loading: false,
        books: this.state.books.map(book => {
          if (book.id === id) {
            book.shelf = shelf
          }
          return book;
        })
      })
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
