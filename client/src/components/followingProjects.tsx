import React, { useContext, useState, useEffect } from 'react'
import UserContext from '../context/UserContext'
import ProjectDesign from './designProjects'
import '../styles/projectDesign.css'
import Project from '../types/project.type'
import http from '../services/api.service'

const serverURL = process.env.REACT_APP_SERVER

function Following () {
  const { user } = useContext(UserContext)
  const [followingProjects, setFollowingProjects] = useState<Project[]>([])

  useEffect(() => {
    if (user && user._id) {
    const response = http.followedProjects(user._id);
    }
  }, [])

  return (
    <div className='followingProjectsContainer'>
      {followingProjects && followingProjects.map((project: Project) => (
        <ProjectDesign key={project.id} project={project}/>
      ))}
    </div>
  )
}

export default Following
