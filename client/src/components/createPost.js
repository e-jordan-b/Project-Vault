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

const serverURL = process.env.REACT_APP_SERVER

function CreatePost ({ open, onClose }) {
  if (!open) return null
  const navigate = useNavigate()
  const [selectedFile, setSelectedFile] = useState(initialState)
  const { user } = useContext(UserContext)
  const [postInfo, setPostInfo] = useState(initialState)

  function handleChange (e) {
    const { name, value } = e.target
    setPostInfo((prev) => ({
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
    formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD)// 'jhbdwgkt')

    try {
      const response = await Axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_KEY}/image/upload`, formData)// (`https://api.cloudinary.com/v1_1/dn1tvs94e/image/upload`, formData)
      image = response.data.public_id
    } catch (error) {
      console.log(error)
    }

    const today = new Date()
    const date = today.toLocaleDateString()
    const id = uuidv4()
    const author = `${user.firstName} ${user.secondName}`
    const { title, description, tags } = postInfo
    const post = { id, title, description, image, user, author, tags, date }

    fetch(`${serverURL}/create`, { // ('http://localhost:3001/create', {
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
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            id='title'
            name='title'
            required
            value={postInfo.title}
            onChange={handleChange}>
          </input>

          <label htmlFor='description'>Description</label>
          <input
            type='text'
            id='description'
            name='description'
            required
            value={postInfo.description}
            onChange={handleChange}>
          </input>

          <label htmlFor='image'>Image</label>
          <input
            type='file'
            id='image'
            name='image'
            required
            onChange={handleFileInputChange}>
          </input>

          <label htmlFor='tags'>Tags</label>
          <input
            type='text'
            id='tags'
            name='tags'
            required
            value={postInfo.tags}
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
