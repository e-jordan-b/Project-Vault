import React, { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import '../styles/projectInformation.css'
import UserContext from '../context/UserContext'
import Update from './updateProject'
import ProjectNav from './projectNav'

const serverURL = process.env.REACT_APP_SERVER

function Project() {
  const { id } = useParams()
  const [project, setProject] = useState({})
  const { user, setUser } = useContext(UserContext)
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  function getProject() {
    fetch(`${serverURL}/posts/${id}`)
      .then((response) => response.json())
      .then((data) => setProject(data.post))
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    getProject()
  }, [])

  function handleCommentSubmit() {
    getProject()
  }

  async function handleFollowClick() {
    if (user.following.includes(project.id)) return

    const response = await fetch(`${serverURL}/posts/follow`, {
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
      <div>
        <Update
          open={isOpen}
          onClose={() => setIsOpen(false)}
          currentProject={project}
          getProject={getProject}
        ></Update>
        <div className='containerFullInfo'>
          <div
            className='imgDiv'
            style={{
              backgroundImage: `url(https://res.cloudinary.com/dn1tvs94e/image/upload/v1681997706/${project.image}.jpg)`
            }}
          ></div>
          <div className='UserInfo'>
            <div className='UserDivStyle'>
              <h1 className='ProjectInfoH1'>{project.title}</h1>
              <div className='smallInfo'>
                <h3>{project.author}</h3>
                <h3>{project.date}</h3>
              </div>
            </div>
          </div>
        </div>
        <div className='descriptionContainer'>
          <div dangerouslySetInnerHTML={{ __html: project.description }}></div>
        </div>
        <nav className='navigation'>
          <div className='projectNavContainer'>
            <ProjectNav
              update={project.updates}
              project={project}
              handleCommentSubmit={handleCommentSubmit}
            />
          </div>
          <div className='buttonContainer'>
            {user._id === project.createdBy ? (
              <button
                onClick={() => setIsOpen(true)}
                className='updateButton'
              >
                UPDATE
              </button>
            ) : (
              <>
                <button
                  className='followAndDonateButtons'
                  onClick={handleFollowClick}
                >
                  {user.following.includes(project.id) ? 'Following' : 'Follow'}
                </button>
                <button
                  className='followAndDonateButtons'
                  onClick={() => navigate('/donation')}
                >
                  Donate
                </button>
              </>
            )}
          </div>
        </nav>
      </div>
    </>
  )
}

export default Project
