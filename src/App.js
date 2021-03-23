import React from 'react'
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import Books from './components/books'
import Search from './components/search'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
    categories: []
  }

  render() {
    return (
      <div><Route path='/search' render={() => (
        <Search />
      )} />
        <Route exact path='/' render={() => ((
          <Books />
        ))} /></div>
    )
  }
}

export default BooksApp
