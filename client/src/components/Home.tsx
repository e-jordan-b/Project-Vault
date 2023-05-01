import React, { useEffect, useState } from 'react';
import '../styles/home.css';
import HomeProject from './homeProject';
import SearchBar from './searchBar';
import Project from '../types/project.type';
import http from '../services/api.service';

interface ProjectResponse {
  project: Project[];
}

function Home() {
  const [projects, setProjects] = useState<ProjectResponse | null>(null);
  const [searchResults, setSearchResult] = useState<Project[] | null>(null);

  useEffect(() => {
    (async () => {
      const response = await http.getAllProjects();
      if (response!.status === 200) {
        setProjects(response!.data);
      } else {
        alert('Something went wrong');
      }
    })();
  }, []);

  useEffect(() => {
    setSearchResult(projects ? [...projects.project].reverse() : []);
  }, [projects]);

  return (
    <>
      <div>
        <SearchBar
          projects={projects ? projects.project : []}
          setSearchResult={setSearchResult}
        />
      </div>
      <div>
        {searchResults &&
          searchResults.map((project) => (
            <HomeProject
              key={project._id}
              project={project}
            />
          ))}
      </div>
    </>
  );
}

export default Home;
