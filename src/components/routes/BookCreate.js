import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import BookForm from '../shared/BookForm'
import Layout from '../shared/Layout'

const BookCreate = props => {
  // constructor (props) {
  //   super(props)

  //   this.state = {
  //     book: {
  //       title: '',
  //       author: ''
  //     },
  //     createdBookId: null
  //   }
  // }
  const [createdBookId, setCreatedBookId] = useState(null)
  const [book, setBook] = useState({ title: '', author: '' })

  const handleChange = event => {
    event.persist()

    // this.setState will turn into setBook
    // to maintain syntax, prevState becomes prevBook
    setBook(prevBook => {
      const updatedField = { [event.target.name]: event.target.value }

      const editedBook = Object.assign({}, prevBook, updatedField)

      return editedBook
    })
  }

  const handleSubmit = event => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/books`,
      method: 'POST',
      data: { book }
    })
      .then(res => setCreatedBookId(res.data.book._id))
      .catch(console.error)
  }

  // no longer need destructuring syntax
  // const { handleChange, handleSubmit } = this
  // const { createdBookId, book } = this.state

  if (createdBookId) {
    return <Redirect to={`/books/${createdBookId}`} />
  }

  return (
    <Layout>
      <BookForm
        book={book}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath="/"
      />
    </Layout>
  )
}

export default BookCreate
