import React from 'react';
import '../styles/updateProjects.css';
import { BiUser } from 'react-icons/bi';
import { ProjectChat } from '../types/project.type';

function Comments({
  sortedArr,
  comment,
  handleChange,
  handleSubmit,
}: {
  sortedArr: ProjectChat[];
  comment: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}) {
  return (
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
            <p>{msg.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Comments;
