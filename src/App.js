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
    console.log("moving")
    console.log(id)
    await BooksAPI.update(id, shelf).then(res => {
      this.setState({
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
    console.log(this.state.books)
    return (
      <LoadingOverlay
        active={this.state.loading}
        spinner
        text='Loading your books...'
      >
        <div><Route path='/search' render={() => (
          <Search />
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
