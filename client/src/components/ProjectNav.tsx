import React, { useState, useContext, useEffect } from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';
import UserContext from '../context/UserContext';
import '../styles/updateProjects.css';
import { BiUser } from 'react-icons/bi';
import http from '../services/api.service';
import Project, { ProjectChat, ProjectUpdate } from '../types/project.type';

interface ProjectNavProps {
  updates: ProjectUpdate[] | undefined;
  project: Project;
  setProject: Function;
  // handleCommentSubmit: () => void;
}

function ProjectNav({
  updates,
  project,
  setProject,
  // handleCommentSubmit,
}: ProjectNavProps) {
  const [selectedOption, setSelectedOption] = useState('updates');
  const [comment, setComment] = useState('');
  const { user } = useContext(UserContext);
  const sortedArr = project.chat ? [...project.chat].reverse() : [];

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setComment(e.target.value);
  }

  // this is for chats
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    console.log("getting there")
    
    e.preventDefault();
    const today = new Date();
    const date = today.toLocaleDateString();
    const projectId = project._id;
    const createdBy = user?.firstName + ' ' + user?.lastName;
    const postComment = { createdBy, comment, date, projectId };
    setComment('');
    const result = await http.addComment(postComment);
    console.log('result', result)
    if (result!.status === 201) {
      setProject((prevProject: Project) => {
        console.log("prevProject", prevProject)
  return {...prevProject,
        chat: [...prevProject.chat, postComment]
      }})
      // handleCommentSubmit();
    }
  }
  
  return (
    <div>
      <hr></hr>
      <button
        onClick={() => setSelectedOption('coments')}
        className='navButton'
      >
        Coments
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
          <div className='updateContainer'>
            {updates &&
              updates.map((update: ProjectUpdate) => (
                <div
                  key={update._id}
                  className='updateInfo'
                >
                  <div className='imageOrvideoDiv'>
                    {update.video ? (
                      <ReactPlayer
                        url={update.video}
                        className='video'
                      />
                    ) : (
                      <div
                        className='imageDivUpdate'
                        style={{
                          backgroundImage: `url(https://res.cloudinary.com/${process.env.REACT_APP_KEY}/image/upload/v1681997706/${update.image}.jpg)`,
                        }}
                      ></div>
                    )}
                  </div>
                  <div className='updateTitleDescription'>
                    <h1>
                      Update {updates.indexOf(update) + 1}: {update.title}
                    </h1>
                  </div>
                  <div className='updateTitleDescription'>
                    {update.description && (
                      <p
                        dangerouslySetInnerHTML={{ __html: update.description }}
                      ></p>
                    )}
                    <h3>{update.date}</h3>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className='CommentInputContainer'>
            <form
              className='postCommentForm'
              onSubmit={handleSubmit}
            >
              <input
                type='input'
                className='commentInput'
                placeholder='Add a comment'
                name='name'
                value={comment}
                onChange={handleChange}
              />
              <button
                type='submit'
                className='postButton'
              >
                Send
              </button>
            </form>
            <div className='commentsSection'>
              {sortedArr.map((msg) => (
                <>
                  <div
                    className='wholeComment'
                    key={msg._id}
                  >
                    <div className='userComment'>
                      <span>
                        <BiUser />
                      </span>
                      <span>{msg.createdBy}</span>
                    </div>
                    <h4 className='messageDate'>{msg.date}</h4>
                    <p key={msg.comment}>{msg.comment}</p>
                  </div>
                </>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

ProjectNav.propTypes = {
  update: PropTypes.array,
  project: PropTypes.object,
  handleCommentSubmit: PropTypes.func,
};

export default ProjectNav;
