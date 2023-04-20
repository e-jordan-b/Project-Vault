import React from 'react'
import PropTypes from 'prop-types'
import '../styles/createpost.css'

function CreatePost ({ open, onClose }) {
  if (!open) return null
  return (
    <>
    <div className='overlay'>
      <div className='createPostDiv'>
        <button onClick={ onClose }>Close</button>
        <h1>AAAAAAAAAA</h1>
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
