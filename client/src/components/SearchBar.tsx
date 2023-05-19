import React from 'react';
import { BiSearch } from 'react-icons/bi';
import '../styles/searchBar.css';
import Project from '../types/project.type';

interface Props {
  projects: Project[];
  setSearchResult: React.Dispatch<React.SetStateAction<Project[] | null>>;
}

function SearchBar({ projects, setSearchResult }: Props) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.value) return setSearchResult(projects);

    const resultsArray = projects.filter(
      (project) =>
        project.tags?.includes(e.target.value) ||
        project.title.toLowerCase().includes(e.target.value)
    );

    setSearchResult(resultsArray);
  }

  return (
    <header>
      <form
        className='searchBar'
        onSubmit={handleSubmit}
      >
        <input
          className='searchInput'
          type='text'
          id='search'
          placeholder='Search...'
          onChange={handleSearchChange}
        ></input>
        <button
          className='searchButton'
          type='submit'
        >
          <BiSearch />
        </button>
      </form>
    </header>
  );
}

export default SearchBar;
