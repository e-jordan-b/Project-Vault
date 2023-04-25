import React from 'react'
import PropTypes from 'prop-types'
import '../styles/projectDesign.css'
import { BiUser } from 'react-icons/bi'
import { Link } from 'react-router-dom'

function ProjectDesign ({ project }) {
  const truncatedText = project.description.length > 100 ? project.description.substring(0, 100) + ' ...' : project.description
  return (
    <Link to = {`/posts/${project.id}`} className='link'>
      <div className='projectDesignContainer'>
        <div className='imageProjectDesign'
        style={{ backgroundImage: `url(https://res.cloudinary.com/${process.env.REACT_APP_KEY}/image/upload/v1681997706/${project.image}.jpg)` }}>
        </div>
        <div className='ShortInformation'>
          <h2>{project.title}</h2>
          <p>{truncatedText}</p>
          <div className='authorOfProject'>
            <div className='userIconName'>
              <BiUser className='userIcon'/>
              <h3 className='userName'>{project.author}</h3>
            </div>
            <div>
              <span>{project.date}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

ProjectDesign.propTypes = {
  project: PropTypes.object
}

export default ProjectDesign
