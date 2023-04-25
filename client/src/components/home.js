import React, { useEffect, useState } from 'react'
import '../styles/home.css'
import HomeProject from './homeProject'
import SearchBar from './searchBar'

const serverURL = process.env.REACT_APP_SERVER

function Home () {
  const [projects, setProjects] = useState('')
  const [searchResults, setSearchResult] = useState([])

  const getProjects = async () => {
    try {
      const response = await fetch(`${serverURL}/posts`)
      const data = await response.json()
      setProjects(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getProjects()
  }, [])

  useEffect(() => {
    setSearchResult(projects ? [...projects.posts].reverse() : [])
  }, [projects])

  return (
    <>
    <div><SearchBar projects={projects.posts} setSearchResult={setSearchResult}/></div>
      <div>
        {searchResults && searchResults.map((project) => (
            <HomeProject key={project._id} project={project} />
        ))}
      </div>
    </>
  )
}

export default Home
