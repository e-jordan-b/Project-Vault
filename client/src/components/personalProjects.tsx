import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../context/UserContext';
import ProjectDesign from './designProjects';
import Project from '../types/project.type';
import http from '../services/api.service';

function PersonalProjects() {
  const { user } = useContext(UserContext);
  const [personalProjects, setPersonalProjects] = useState<Project[]>([]);

  useEffect(() => {
    (async () => {
      console.log('🐷 user', user)
      if (user && user._id) {
      const response = await http.ownProjects(user!._id);
      console.log('👉', response)
      setPersonalProjects(response!.data)
    }
      })()
  }, []);

  return (
    <div className='followingProjectsContainer'>
      {personalProjects &&
        personalProjects.map((project: Project) => (
          <ProjectDesign
            key={project._id}
            project={project}
          />
        ))}
    </div>
  );
}

export default PersonalProjects;
