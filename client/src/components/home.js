import React, { useEffect, useState } from 'react'
// import UserContext from '../context/UserContext'
import '../styles/home.css'
import HomeProject from './homeProject'

function Home () {
  const [projects, setProjects] = useState('')

  const getProjects = async () => {
    try {
      const response = await fetch('http://localhost:3001/posts')
      const data = await response.json()
      setProjects(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getProjects()
  }, [])

  return (
      <div>
        {projects && projects.posts.map((project) => (
            <HomeProject key={project._id} project={project} />
        ))}
      </div>
  )
}

export default Home
