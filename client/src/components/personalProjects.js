import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../context/UserContext'
import ProjectDesign from './designProjects'

const serverURL = process.env.REACT_APP_SERVER

function PersonalProjects () {
  const { user } = useContext(UserContext)
  const [personalProjects, setPersonalProjects] = useState('')

  const getProjects = async () => {
    try {
      const response = await fetch(`${serverURL}/posts/personal/${user._id}`)
      const data = await response.json()
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
      {personalProjects && personalProjects.projects.map((project) => (
        <ProjectDesign key={project.id} project={project}/>
      ))}
    </div>
  )
}

export default PersonalProjects
