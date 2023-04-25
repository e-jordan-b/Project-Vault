import React, { useContext, useState, useEffect } from 'react'
import UserContext from '../context/UserContext'
import ProjectDesign from './designProjects'
import '../styles/projectDesign.css'

const serverURL = process.env.REACT_APP_SERVER

function Following () {
  const { user } = useContext(UserContext)
  const [followingProjects, setFollowingProjects] = useState('')

  const getProjects = async () => {
    try {
      const response = await fetch(`${serverURL}/posts/following/${user._id}`)
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
