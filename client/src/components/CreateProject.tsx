import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import '../styles/createpost.css';
import UserContext from '../context/UserContext';
import { UserContextType } from '../types/user.type';
import Axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Project from '../types/project.type';

const initialState: Project = {
  id?: string | number;
  title: string;
  description: string;
  image: string;
  updates: string[];
  author: string;
  createdBy?: string;
  createdById?: string;
  date: string;
  chat: string[];
  tags: string[];
  followers: User[] | string[] | [];
};

const serverURL: string = process.env.REACT_APP_SERVER!;

interface CreateProjectProps {
  open: boolean,
  onClose?: () => void
}

const CreateProject: React.FC<CreateProjectProps> = ({ open, onClose }) => {
  if (!open) return null;
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(initialState);
  const { user } = useContext<UserContextType>(UserContext);
  const [postInfo, setPostInfo] = useState(initialState);
  const [quillValue, setQuillValue] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setPostInfo(prev=> ({
      ...prev,
      [name]: value,
    }));
  }

  function handleFileInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) setSelectedFile(e.target.files[0]);
  }

  async function handleSubmit(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    let image = '';
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD); // 'jhbdwgkt')

    try {
      const response = await Axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_KEY}/image/upload`,
        formData
      );
      image = response.data.public_id;
    } catch (error) {
      console.log(error);
    }

    const today = new Date();
    const date = today.toLocaleDateString();
    const id = uuidv4();
    const author = `${user.firstName} ${user.lastName}`;
    const { title, tags } = postInfo;
    const post = { id, title, quillValue, image, user, author, tags, date };

    fetch(`${serverURL}/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    })
      .then((res) => {
        if (res.ok) {
          console.log('succes');
        } else if (res.status === 401) {
          alert('error');
        }
      })
      .then(navigate(`/posts/${id}`))
      .then(onClose())
      .catch((err) => console.log(err));
  }

  return (
    <>
      <div className='overlay'>
        <div className='CreateProjectDiv'>
          <button
            onClick={onClose}
            className='closeButton'
          >
            X
          </button>
          <h1>Your new project</h1>
          <form
            onSubmit={handleSubmit}
            className='postForm'
          >
            <label htmlFor='title'>Title:</label>
            <input
              type='text'
              id='title'
              name='title'
              required
              value={postInfo.title}
              onChange={handleChange}
            ></input>

            <label htmlFor='description'>Description:</label>
            <ReactQuill
              theme='snow'
              value={quillValue}
              className='inputQuill'
              onChange={setQuillValue}
            />

            <label
              htmlFor='image'
              className='imageInputCreateLabel'
            >
              Image:
            </label>
            <input
              type='file'
              id='image'
              name='image'
              required
              className='imageInputCreate'
              onChange={handleFileInputChange}
            ></input>

            <label htmlFor='tags'>Tags:</label>
            <input
              type='text'
              id='tags'
              name='tags'
              required
              value={postInfo.tags}
              onChange={handleChange}
            ></input>

            <button
              type='submit'
              className='createNewProjectButton'
            >
              Create new project
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

CreateProject.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default CreateProject;
