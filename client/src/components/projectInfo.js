import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { Image } from 'cloudinary-react'
import '../styles/projectInformation.css'
import UserContext from '../context/UserContext'

function Project () {
  const { id } = useParams()
  const [project, setProject] = useState({})
  const { user, setUser } = useContext(UserContext)

  useEffect(() => {
    fetch(`http://localhost:3001/posts/${id}`)
      .then(response => response.json())
      .then(data => setProject(data.post))
      .catch(error => console.log(error))
  }, [id])

  async function handleFollowClick () {
    const response = await fetch('http://localhost:3001/posts/follow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user,
        project
      })
    })
    const data = await response.json()
    console.log(data.user)
    setUser(data.user)
  }

  return (
    <div className='ProjectInformation'>
      <div>
        <Image
          style={{ width: 500, height: 500 }}
          cloudName='dn1tvs94e'
          publicId={`https://res.cloudinary.com/dn1tvs94e/image/upload/v1681997706/${project.image}.jpg`}
        />
      </div>
      <div>
        <h1>{project.title}</h1>
        <h3>{project.author}</h3>
        <p>{project.description}</p>
        <div className='buttons'>
          <button className='followAndDonateButtons'
          onClick={handleFollowClick}>Follow</button>
          <button className='followAndDonateButtons'>Donate</button>
        </div>
      </div>
    </div>
  )
}

export default Project
