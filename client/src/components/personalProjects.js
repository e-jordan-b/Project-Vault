import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../context/UserContext'
import ProjectDesign from './designProjects'

function PersonalProjects () {
  const { user } = useContext(UserContext)
  const [personalProjects, setPersonalProjects] = useState('')
  console.log(personalProjects)
  const getProjects = async () => {
    try {
      const response = await fetch(`http://localhost:3001/posts/personal/${user._id}`)
      const data = await response.json()
      console.log(data)
      setPersonalProjects(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getProjects()
  }, [])

  return (
    <div className='followingProjectsContainer'>
      <h1>Your projects: </h1>
      {personalProjects && personalProjects.projects.map((project) => (
        <ProjectDesign key={project.id} project={project}/>
      ))}
    </div>
  )
}

export default PersonalProjects
