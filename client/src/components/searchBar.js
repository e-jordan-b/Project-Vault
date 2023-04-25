import React from 'react'
import PropTypes from 'prop-types'
import { BiSearch } from 'react-icons/bi'
import '../styles/searchBar.css'

function SearchBar ({ projects, setSearchResult }) {
  function handleSubmit (e) {
    e.preventDefault()
  }

  function handleSearchChange (e) {
    if (!e.target.value) return setSearchResult(projects)

    const resultsArray = projects.filter(project =>
      project.tags.includes(e.target.value) || project.title.toLowerCase().includes(e.target.value))

    setSearchResult(resultsArray)
  }

  return (
    <header>
      <form className='searchBar' onSubmit={handleSubmit}>
        <input
          className='searchInput'
          type='text'
          id='search'
          placeholder='Search...'
          onChange={handleSearchChange}></input>
          <span className='searchButton' type='submit'><BiSearch/></span>
      </form>
    </header>
  )
}

SearchBar.propTypes = {
  projects: PropTypes.array,
  setSearchResult: PropTypes.func
}

export default SearchBar
