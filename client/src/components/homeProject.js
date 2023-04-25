import React from 'react'
import PropTypes from 'prop-types'
import '../styles/homeproject.css'
import { useNavigate } from 'react-router-dom'
import { BiUser } from 'react-icons/bi'

function HomeProject ({ project }) {
  const navigate = useNavigate()
  const truncatedText = project.description.length > 400 ? project.description.substring(0, 400) + ' ...' : project.description

  return (
    <div className='projectContainer'>
      <div className="imageDiv"
        style={{ backgroundImage: `url(https://res.cloudinary.com/${process.env.REACT_APP_KEY}/image/upload/v1681997706/${project.image}.jpg` }}
      ></div>
      <div className='projectInformation'>
        <h1>{project.title}</h1>
        <div className='userInfo'>
          <div className='userSomething'>
            <BiUser className='userIcon'/>
            <h3 className='userName'>{project.author}</h3>
          </div>
          <div>
            <span className='date'>{project.date}</span>
          </div>
        </div>
        <p dangerouslySetInnerHTML={{ __html: truncatedText }} className='homeProjectTruncatedText'></p>
        <div className='extraInfo'>
          <p>{project.tags.join('# ') + '#'}</p>
          <button className='readMoreButton' onClick={() => navigate(`/posts/${project.id}`)}>
            Read More
          </button>
        </div>
      </div>
    </div>
  )
}

HomeProject.propTypes = {
  project: PropTypes.object
}

export default HomeProject
