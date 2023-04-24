import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import '../styles/createpost.css'
import UserContext from '../context/UserContext'
import Axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from 'react-router-dom'

const initialState = {
  title: '',
  description: '',
  tags: ''
}

function CreatePost ({ open, onClose }) {
  if (!open) return null
  const navigate = useNavigate()

  const [selectedFile, setSelectedFile] = useState(initialState)
  const { user } = useContext(UserContext)
  const [state, setState] = useState(initialState)

  function handleChange (e) {
    const { name, value } = e.target
    setState((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  function handleFileInputChange (e) {
    setSelectedFile(e.target.files[0])
  }

  async function handleSubmit (e) {
    e.preventDefault()
    let image = ''
    const formData = new FormData()
    formData.append('file', selectedFile)
    formData.append('upload_preset', 'jhbdwgkt')

    try {
      const response = await Axios.post('https://api.cloudinary.com/v1_1/dn1tvs94e/image/upload', formData)
      image = response.data.public_id
    } catch (error) {
      console.log(error)
    }

    const today = new Date()
    const date = today.toLocaleDateString()
    const id = uuidv4()
    const author = `${user.firstName} ${user.secondName}`
    const { title, description, tags } = state
    const post = { id, title, description, image, user, author, tags, date }

    fetch('http://localhost:3001/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post)
    })
      .then((res) => {
        if (res.ok) {
          console.log('succes')
        } else if (res.status === 401) {
          alert('error')
        }
      })
      .then(navigate(`/posts/${id}`))
      .then(onClose())
      .catch((err) => console.log(err))
  }

  return (
    <>
    <div className='overlay'>
      <div className='createPostDiv'>
        <button onClick={ onClose }>Close</button>
        <h1>Your new project</h1>
        <form onSubmit={handleSubmit} className='postForm'>
          <label>Title</label>
          <input
            type='text'
            name='title'
            required
            value={state.title}
            onChange={handleChange}>
          </input>

          <label>Description</label>
          <input
            type='text'
            name='description'
            required
            value={state.description}
            onChange={handleChange}>
          </input>

          <label>Image</label>
          <input
            type='file'
            name='image'
            required
            onChange={handleFileInputChange}>
          </input>

          <label>Tags</label>
          <input
            type='text'
            name='tags'
            required
            value={state.tags}
            onChange={handleChange}>
          </input>

          <button type='submit'>Create new project</button>
        </form>
      </div>
    </div>
    </>
  )
}

CreatePost.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func
}

export default CreatePost
