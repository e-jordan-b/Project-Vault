import React, { useState, useContext } from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';
import UserContext from '../context/UserContext';
import '../styles/updateProjects.css';
import { BiUser } from 'react-icons/bi';
import http from '../services/api.service';
import Project, { ProjectChat, ProjectUpdate } from '../types/project.type';

interface Props {
  update: ProjectUpdate[];
  project: Project;
  handleCommentSubmit: () => void;
}

function ProjectNav({ update, project, handleCommentSubmit }: Props) {
  const [selectedOption, setSelectedOption] = useState('updates');
  const [comment, setComment] = useState('');
  const { user } = useContext(UserContext);
  const sortedArr = project.chat ? [...project.chat].reverse() : [];

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setComment(e.target.value);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const today = new Date();
    const date = today.toLocaleDateString();
    const ProjectId = project._id;
    const createdBy = user?.firstName + ' ' + user?.lastName;
    const postComment = { createdBy, comment, date, ProjectId };

    setComment('');

    const comments = await http.updateProject(postComment);

    fetch(`${serverURL}/posts/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postComment),
    })
      .then((res) => {
        if (res.ok) {
          console.log('succes');
        } else if (res.status === 401) {
          alert('error');
        }
      })
      .then(() => handleCommentSubmit())
      .catch((err) => console.log(err));
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
            {update &&
              update.map((el: ProjectUpdate) => (
                <div
                  key={el._id}
                  className='updateInfo'
                >
                  <div className='imageOrvideoDiv'>
                    {el.video ? (
                      <ReactPlayer
                        url={el.video}
                        className='video'
                      />
                    ) : (
                      <div
                        className='imageDivUpdate'
                        style={{
                          backgroundImage: `url(https://res.cloudinary.com/${process.env.REACT_APP_KEY}/image/upload/v1681997706/${el.image}.jpg)`,
                        }}
                      ></div>
                    )}
                  </div>
                  <div className='updateTitleDescription'>
                    <h1>
                      Update {update.indexOf(el) + 1}: {el.title}
                    </h1>
                  </div>
                  <div className='updateTitleDescription'>
                    {el.description && (
                      <p
                        dangerouslySetInnerHTML={{ __html: el.description }}
                      ></p>
                    )}
                    <h3>{el.date}</h3>
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
