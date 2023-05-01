import React, { useState } from 'react'
import PropTypes from 'prop-types'
import '../styles/update.css'
import Axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const initialState = {
  title: '',
  description: '',
  video: ''
}

const serverURL = process.env.REACT_APP_SERVER

function Update ({ open, onClose, currentProject, getProject }) {
  if (!open) return null

  const [selectedFile, setSelectedFile] = useState(initialState)
  const [state, setState] = useState(initialState)
  const [quillValue, setQuillValue] = useState('')

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
    formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD)

    try {
      const response = await Axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_KEY}/image/upload`, formData)
      image = response.data.public_id
    } catch (error) {
      console.log(error)
    }

    const today = new Date()
    const date = today.toLocaleDateString()
    const id = uuidv4()
    const { title, video } = state
    const update = { id, title, quillValue, image, video, date }

    fetch(`${serverURL}/update/${currentProject.id}`, {
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
        <button onClick={ onClose } className='closeButton'>X</button>
        <h1 className='updateYourProject'>Update your project</h1>
          <form onSubmit={handleSubmit} className='updateForm'>
            <label htmlFor='title'>Update Title:</label>
            <input
              type='text'
              id='title'
              name='title'
              required
              onChange={handleChange}
              ></input>

            <label htmlFor='description'>Update information:</label>
            <ReactQuill theme='snow' value={quillValue} onChange={setQuillValue} className='inputQuill'/>

            <label htmlFor='image'>Image</label>
              <input
              type='file'
              id='image'
              name='image'
              onChange={handleFileInputChange}
            ></input>

            <label htmlFor='video'>Video URL:</label>
              <input
              id='video'
              type='text'
              name='video'
              onChange={handleChange}
            ></input>

          <button type='submit' className='createNewProjectButton'>Update your project</button>
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
