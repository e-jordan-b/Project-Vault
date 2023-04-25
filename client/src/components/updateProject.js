import React, { useState } from 'react'
import PropTypes from 'prop-types'
import '../styles/update.css'
import Axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

const initialState = {
  title: '',
  description: '',
  video: ''
}

const serverURL = process.env.REACT_APP_SERVER

function Update ({ open, onClose, currentProject, getProject }) {
  if (!open) return null
  console.log(currentProject)
  const [selectedFile, setSelectedFile] = useState(initialState)
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
    formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD) // 'jhbdwgkt')

    try {
      const response = await Axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_KEY}/image/upload`, formData) // ('https://api.cloudinary.com/v1_1/dn1tvs94e/image/upload', formData)
      image = response.data.public_id
    } catch (error) {
      console.log(error)
    }

    const today = new Date()
    const date = today.toLocaleDateString()
    const id = uuidv4()
    const { title, description, video } = state
    const update = { id, title, description, image, video, date }
    console.log(update)

    fetch(`${serverURL}/update/${currentProject.id}`, { // (`http://localhost:3001/update/${currentProject.id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(update)
    })
      .then((res) => {
        if (res.ok) {
          console.log('UPDATES!')
        } else if (res.status === 401) {
          alert('error')
        }
      })
      .then(() => getProject())
      .then(onClose())
      .catch((err) => console.log(err))
  }

  return (
    <div className='updateOverlay'>
      <div className='updateProjectContainter'>
        <button onClick={ onClose }>Close</button>
        <h1>Update your project</h1>
          <form onSubmit={handleSubmit} className='updateForm'>
            <label htmlFor='title'>Update Title</label>
            <input
              type='text'
              id='title'
              name='title'
              required
              onChange={handleChange}
              ></input>

            <label htmlFor='description'>Update information</label>
              <input
              type='text'
              id='description'
              name='description'
              onChange={handleChange}
            ></input>

            <label htmlFor='image'>Image</label>
              <input
              type='file'
              id='image'
              name='image'
              onChange={handleFileInputChange}
            ></input>

            <label htmlFor='video'>Video URL</label>
              <input
              id='video'
              type='text'
              name='video'
              onChange={handleChange}
            ></input>

          <button type='submit'>Update your project</button>
          </form>
      </div>
    </div>
  )
}

Update.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  currentProject: PropTypes.object,
  getProject: PropTypes.func
}

export default Update
