import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import BookForm from '../shared/BookForm'
import Layout from '../shared/Layout'

const BookEdit = props => {
  // constructor (props) {
  //   super(props)

  //   this.state = {
  //     book: {
  //       title: '',
  //       author: ''
  //     },
  //     updated: false
  //   }
  // }
  const [updated, setUpdated] = useState(false)
  const [book, setBook] = useState({ title: '', author: '' })

  useEffect(() => {
    axios(`${apiUrl}/books/${props.match.params.id}`)
      .then(res => setBook(res.data.book))
      .catch(console.error)
  }, []) // not sure if the array should be blank!!!!!!!

  // componentDidMount () {
  //   axios(`${apiUrl}/books/${this.props.match.params.id}`)
  //     .then(res => this.setState({ book: res.data.book }))
  //     .catch(console.error)
  // }

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
      url: `${apiUrl}/books/${props.match.params.id}`,
      method: 'PATCH',
      data: { book }
    })
      .then(() => setUpdated(true))
      .catch(console.error)
  }

  // unnecessary destructuring syntax
  // const { book, updated } = this.state
  // const { handleChange, handleSubmit } = this

  if (updated) {
    return <Redirect to={`/books/${props.match.params.id}`} />
  }

  return (
    <Layout>
      <BookForm
        book={book}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath={`/books/${props.match.params.id}`}
      />
    </Layout>
  )
}

export default BookEdit
