import React, { useState } from 'react'
import PropTypes from 'prop-types'
import '../styles/update.css'
import Axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

const initialState = {
  title: '',
  description: ''
}

function Update ({ open, onClose, currentProject }) {
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
    const { title, description } = state
    const update = { id, title, description, image, date }
    console.log(update)

    fetch(`http://localhost:3001/update/${currentProject.id}`, {
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
      .catch((err) => console.log(err))
  }

  return (
    <div className='updateOverlay'>
      <div className='updateProjectContainter'>
        <button onClick={ onClose }>Close</button>
        <h1>Update your project</h1>
          <form onSubmit={handleSubmit} className='updateForm'>
            <label>Update Title</label>
            <input
              type='text'
              name='title'
              required
              onChange={handleChange}
              ></input>

            <label>Update information</label>
              <input
              type='text'
              name='description'
              onChange={handleChange}
            ></input>

            <label>Image</label>
              <input
              type='file'
              name='image'
              required
              onChange={handleFileInputChange}
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
  currentProject: PropTypes.object
}

export default Update
