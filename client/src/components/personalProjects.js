import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../context/UserContext'

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
    <div>
    {personalProjects && personalProjects.projects.map((project) => (
      <h1 key={project.id}>{project.title}</h1>
    ))}
    </div>
  )
}

export default PersonalProjects
