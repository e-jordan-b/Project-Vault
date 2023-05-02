import React, { useState, useContext, useMemo } from 'react';
import UserContext from '../context/UserContext';
import '../styles/updateProjects.css';
import http from '../services/api.service';
import Project, { ProjectUpdate } from '../types/project.type';
import Updates from './Updates';
import Comments from './Comments';

interface ProjectNavProps {
  updates: ProjectUpdate[] | undefined;
  project: Project;
  handleCommentSubmit: () => void;
}

function ProjectNav({
  updates,
  project,
  handleCommentSubmit,
}: ProjectNavProps) {
  const [selectedOption, setSelectedOption] = useState('updates');
  const [comment, setComment] = useState('');
  const { user } = useContext(UserContext);
  const sortedArr = useMemo(
    () => (project.chat ? [...project.chat].reverse() : []),
    [project.chat]
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setComment(e.target.value);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const today = new Date();
    const date = today.toLocaleDateString();
    const projectId = project._id;
    const createdBy = user?.firstName + ' ' + user?.lastName;
    const postComment = { createdBy, comment, date, projectId };

    setComment('');

    const result = await http.addComment(postComment);
    if (result!.status === 200) {
      handleCommentSubmit();
    }
  }

  return (
    <div>
      <hr></hr>
      <button
        onClick={() => setSelectedOption('comments')}
        className='navButton'
      >
        Comments
      </button>
      <button
        onClick={() => setSelectedOption('updates')}
        className='navButton'
      >
        Updates
      </button>
      <div>
        <hr></hr>
        {selectedOption === 'updates' ? (
          <Updates updates={updates} />
        ) : (
          <Comments
            sortedArr={sortedArr}
            comment={comment}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
}

export default ProjectNav;
