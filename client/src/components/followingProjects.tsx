import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../context/UserContext';
import ProjectDesign from './designProjects';
import '../styles/projectDesign.css';
import Project from '../types/project.type';
import http from '../services/api.service';

function Following() {
  const { user } = useContext(UserContext);
  const [followedProjects, setFollowedProjects] = useState<Project[]>([]);

  async function resetFollowedProjects() {
    if (user && user._id) {
      const res = await http.followedProjects(user._id);
      // console.log('what did we receive from the back end?', res!.data);
      if (res!.status === 200) {
        setFollowedProjects(res!.data);
        // console.log('have we set it correctly?', followedProjects);
      }
    }
  }

  useEffect(() => {
    resetFollowedProjects();
  }, []);

  return (
    <div className='followingProjectsContainer'>
      {followedProjects &&
        followedProjects.map((project: Project) => (
          <ProjectDesign key={project._id} project={project} />
        ))}
    </div>
  );
}

export default Following;
