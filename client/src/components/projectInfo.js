import React, { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
// import { Image } from 'cloudinary-react'
import '../styles/projectInformation.css'
import UserContext from '../context/UserContext'
import Update from './updateProject'
import ProjectNav from './projectNav'

function Project () {
  const { id } = useParams()
  const [project, setProject] = useState({})
  const { user, setUser } = useContext(UserContext)
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  function getProject () {
    fetch(`http://localhost:3001/posts/${id}`)
      .then(response => response.json())
      .then(data => setProject(data.post))
      .catch(error => console.log(error))
  }

  useEffect(() => {
    getProject()
  }, [])

  function handleCommentSubmit () {
    getProject()
  }

  async function handleFollowClick () {
    if (user.following.includes(project.id)) return

    const response = await fetch('http://localhost:3001/posts/follow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user,
        project
      })
    })
    const data = await response.json()
    setUser(data.user)
  }

  return (
    <>
    {/* <div className='ProjectInformation'>
      <div>
        <Image
          cloudName='dn1tvs94e'
          publicId={`https://res.cloudinary.com/dn1tvs94e/image/upload/v1681997706/${project.image}.jpg`}
        />
      </div>
      <div>
        <h1>{project.title}</h1>
        <h3>{project.author}</h3>
        <p>{project.description}</p>
          { user._id === project.createdBy
            ? (
              <>
                <button onClick={() => setIsOpen(true)}>UPDATE</button>
              </>
              )
            : <>
            <button className='followAndDonateButtons'
            onClick={handleFollowClick}>{user.following.includes(project.id) ? 'Following' : 'Follow'}</button>
            <button className='followAndDonateButtons'>Donate</button>
          </>
          }
      </div>
      <Update open={isOpen} onClose={() => setIsOpen(false)} currentProject = {project}></Update>
    </div>
    <div>
      <ProjectNav/>
    </div> */}
  <Update open={isOpen} onClose={() => setIsOpen(false)} currentProject = {project} getProject={getProject}></Update>
  <div>
    <div className='containerFullInfo'>
      <div className="imgDiv"
        style={{ backgroundImage: `url(https://res.cloudinary.com/dn1tvs94e/image/upload/v1681997706/${project.image}.jpg)` }}>
      </div>
      <div className='UserInfo'>
          <h1>{project.title}</h1>
          <div className='smallInfo'>
            <h3>{project.author}</h3>
            <h3>{project.date}</h3>
          </div>
      </div>
    </div>
      <div className='descriptionContainer'>
        <h1>Project description</h1>
        <p>{project.description}</p>

      </div>
      <nav className='navigation'>
        <div className='projectNavContainer'>
          <ProjectNav update={project.updates} project={project} handleCommentSubmit={handleCommentSubmit}/>
        </div>
      <div className='buttonContainer'>
          { user._id === project.createdBy
            ? (
                <>
                  <button onClick={() => setIsOpen(true)} className='updateButton'>UPDATE</button>
                </>
              )
            : <>
              <button className='followAndDonateButtons'
              onClick={handleFollowClick}>{user.following.includes(project.id) ? 'Following' : 'Follow'}</button>
              <button className='followAndDonateButtons' onClick={() => navigate('/donation')}>Donate</button>
            </>
            }
        </div>
      </nav>
    </div>
    </>
  )
}

export default Project
