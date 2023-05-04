import React, { useEffect, useState } from 'react';
import '../styles/home.css';
import HomeProject from './homeProject';
import SearchBar from './SearchBar';
import Project from '../types/project.type';
import http from '../services/api.service';

interface ProjectResponse {
  project: Project[];
}

function Home() {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [searchResults, setSearchResult] = useState<Project[] | null>(null);

  useEffect(() => {
    (async () => {
      const response = await http.getAllProjects();
      if (response!.status === 200) {
        setProjects(response!.data.projects);
      } else {
        alert('Something went wrong, home getAllProjects');
      }
    })();
  }, []);

  useEffect(() => {
    setSearchResult(projects ? [...projects].reverse() : []);
  }, [projects]);

  return (
    <>
      <div>
        <SearchBar
          projects={projects ? projects : []}
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
