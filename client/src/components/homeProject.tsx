import React from 'react';
import PropTypes from 'prop-types';
import '../styles/homeproject.css';
import { useNavigate } from 'react-router-dom';
import { BiUser } from 'react-icons/bi';
import Project from '../types/project.type';

type HomeProjectProps = {
  project: Project;
};

function HomeProject({ project }: HomeProjectProps) {
  const navigate = useNavigate();
  const truncatedText =
    project.description.length > 400
      ? project.description.substring(0, 400) + ' ...'
      : project.description;
  return (
    <div className='projectContainer'>
      <div
        className='imageDiv'
        style={{
          backgroundImage: `url(https://res.cloudinary.com/${process.env.REACT_APP_KEY}/image/upload/v1681997706/${project.image}.jpg`,
        }}
      ></div>
      <div className='projectInformation'>
        <div className='nameDonationsContainer'>
          <h1>{project.title}</h1>
          <div className='donationsContainerHome'>
            <p>
              Donations received: <b>{project.donationsCents / 100} €</b>
            </p>
          </div>
        </div>
        <div className='userInfo'>
          <div className='userSomething'>
            <BiUser className='userIcon' />
            <h3 className='userName'>{project.author}</h3>
          </div>
          <div>
            <span className='date'>{project.date}</span>
          </div>
        </div>
        <p
          dangerouslySetInnerHTML={{ __html: truncatedText }}
          className='homeProjectTruncatedText'
        ></p>
        <div className='extraInfo'>
          <p>{project.tags.join('# ') + '#'}</p>
          <button
            id={project.title}
            className='readMoreButton'
            onClick={() => navigate(`/projects/${project._id}`)}
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomeProject;
