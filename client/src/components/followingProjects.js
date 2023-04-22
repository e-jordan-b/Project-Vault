import React, { useContext, useState, useEffect } from 'react'
import UserContext from '../context/UserContext'
import ProjectDesign from './designProjects'
import '../styles/projectDesign.css'

function Following () {
  const { user } = useContext(UserContext)
  const [followingProjects, setFollowingProjects] = useState('')
  console.log(followingProjects, user._id)

  const getProjects = async () => {
    try {
      const response = await fetch(`http://localhost:3001/posts/following/${user._id}`)
      const data = await response.json()
      setFollowingProjects(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getProjects()
  }, [])

  return (
    <div className='followingProjectsContainer'>
      {followingProjects && followingProjects.projects.map((project) => (
        <ProjectDesign key={project.id} project={project}/>
      ))}
    </div>
  )
}

export default Following
