import React, { useContext, useState, useEffect } from 'react'
import UserContext from '../context/UserContext'

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
    <div>
      {followingProjects && followingProjects.projects.map((project) => (
        <h1 key={project.id}>{project.title}</h1>
      ))}
    </div>
  )
}

export default Following
