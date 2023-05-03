import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/projectInformation.css';
import UserContext from '../context/UserContext';
import Update from './updateProject';
import ProjectNav from './ProjectNav';
import Project from '../types/project.type';
import http from '../services/api.service';

const initialState: Project = {
  title: '',
  description: '',
  image: '',
  updates: [],
  author: '',
  date: '',
  chat: [],
  createdBy: null,
  tags: [],
  followers: [],
};

function ProjectInfo() {
  const { id } = useParams();
  const [project, setProject] = useState<Project>(initialState);
  const { user, setUser } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  async function getProject() {
    if (!id) return;
    const response = await http.getProject(id);
    if (response!.status === 200) setProject(response!.data);
  }

  useEffect(() => {
    getProject();
  }, [user]);


  console.log('current project ', project)
  async function handleFollowClick() {
    if (user && project._id && user.following?.includes(project._id)) return;
    if (user && project._id) {
      const res = await http.followProject({ projectId: project._id, user });
      if (res!.status === 200) {
        setUser(res!.data);
      }
    }
  }

  return (
    <div>
      <Update
        open={isOpen}
        onClose={() => setIsOpen(false)}
        currentProject={project}
        getProject={getProject}
      ></Update>
      <div className='containerFullInfo'>
        <div
          className='imgDiv'
          style={{
            backgroundImage: `url(https://res.cloudinary.com/${process.env.REACT_APP_KEY}/image/upload/v1681997706/${project.image}.jpg`,
          }}
        ></div>
        <div className='UserInfo'>
          <div className='UserDivStyle'>
            <h1 className='ProjectInfoH1'>{project.title}</h1>
            <div className='smallInfo'>
              <h3>{project.author}</h3>
              <h3>{project.date}</h3>
            </div>
          </div>
        </div>
      </div>
      <div className='descriptionContainer'>
        <div dangerouslySetInnerHTML={{ __html: project.description }}></div>
      </div>
      <nav className='navigation'>
        <div className='projectNavContainer'>
          <ProjectNav
            updates={project.updates}
            project={project}
            setProject={setProject}
          />
        </div>

        <div className='buttonContainer'>
          {user?._id === project.createdBy ? (
            <button
              onClick={() => setIsOpen(true)}
              className='updateButton'
            >
              UPDATE
            </button>
          ) : (
            <>
              <button
                className='followAndDonateButtons'
                onClick={handleFollowClick}
              >
                {user && project._id && user.following?.includes(project._id)
                  ? 'Following'
                  : 'Follow'}
              </button>
              <button
                className='followAndDonateButtons'
                onClick={() => navigate(`/donation/${project._id}`)}
              >
                Donate
              </button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}

export default ProjectInfo;
