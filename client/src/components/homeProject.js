import React from 'react'
import PropTypes from 'prop-types'
import { Image } from 'cloudinary-react'
import '../styles/homeproject.css'
import { useNavigate } from 'react-router-dom'

function HomeProject ({ project }) {
  const navigate = useNavigate()

  return (
    <div className='projectContainer'>
      <Image
        className="image"
        cloudName='dn1tvs94e'
        publicId={`https://res.cloudinary.com/dn1tvs94e/image/upload/v1681997706/${project.image}.jpg`}
      />
      <h1>{project.title}</h1>
      <div className='userAndDate'>
        <h3> {project.author}</h3>
        <h3>{project.date}</h3>
      </div>
      <p>{project.description}</p>
      <div>
        <button onClick={() => navigate(`/posts/${project.id}`)}>
          Read More
        </button>
      </div>
    </div>
  )
}

HomeProject.propTypes = {
  project: PropTypes.object
}

export default HomeProject
