import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import Layout from '../shared/Layout'

const Books = props => {
  // constructor (props) {
  //   super(props)

  //   this.state = {
  //     books: []
  //   }
  // }
  const [books, setBooks] = useState([])

  useEffect(() => {
    axios(`${apiUrl}/books`)
      .then(res => setBooks(res.data.books))
      .catch(console.error)
  }, [])

  // componentDidMount () {
  //   axios(`${apiUrl}/books`)
  //     .then(res => this.setState({ books: res.data.books }))
  //     .catch(console.error)
  // }

  const books2 = books.map(book => (
    <li key={book._id}>
      <Link to={`/books/${book._id}`}>{book.title}</Link>
    </li>
  ))

  return (
    <Layout>
      <h4>Books</h4>
      <ul>
        {books2}
      </ul>
    </Layout>
  )
}

export default Books
