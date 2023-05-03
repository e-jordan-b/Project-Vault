import React, { MouseEventHandler, useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/update.css';
import Axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Project from '../types/project.type';
import http from '../services/api.service';

const initialState = {
  title: '',
  description: '',
  video: '',
};

type UpdateProps = {
  open: Boolean;
  onClose: () => void;
  currentProject: Project;
  getProject: Function;
};

const serverURL = process.env.REACT_APP_SERVER;

function Update({ open, onClose, currentProject, getProject }: UpdateProps) {
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const [state, setState] = useState(initialState);
  const [quillValue, setQuillValue] = useState('');

  if (!open) return null;

  function handleChange(e: any) {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleFileInputChange(e: any) {
    setSelectedFile(e.target.files[0]);
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    let image = '';
    const formData = new FormData();
    if (selectedFile instanceof Blob) {
      formData.append('file', selectedFile);
      formData.append(
        'upload_preset',
        process.env.REACT_APP_CLOUDINARY_UPLOAD as string
      );
    }
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
    const { title, video } = state;
    const update = {
      _id: currentProject._id,
      title,
      quillValue,
      image,
      video,
      date,
    };

    http
      .updateProject(update)
      ?.then((response) => {
        if (response!.status === 200) console.log('updated successfully');
      })
      .catch((error) => {
        alert('error updating, try again');
      });
  }

  return (
    <div className='updateOverlay'>
      <div className='updateProjectContainter'>
        <button onClick={() => onClose()} className='closeButton'>
          X
        </button>
        <h1 className='updateYourProject'>Update your project</h1>
        <form onSubmit={handleSubmit} className='updateForm'>
          <label htmlFor='title'>Update Title:</label>
          <input
            type='text'
            id='title'
            name='title'
            required
            onChange={handleChange}
          ></input>

          <label htmlFor='description'>Update information:</label>
          <ReactQuill
            id='update-quill'
            theme='snow'
            value={quillValue}
            onChange={setQuillValue}
            className='inputQuill'
          />

          <label htmlFor='image'>Image</label>
          <input
            type='file'
            id='image'
            name='image'
            onChange={handleFileInputChange}
          ></input>

          <label htmlFor='video'>Video URL:</label>
          <input
            id='video'
            type='text'
            name='video'
            onChange={handleChange}
          ></input>

          <button
            id='update-project'
            type='submit'
            className='createNewProjectButton'
          >
            Update your project
          </button>
        </form>
      </div>
    </div>
  );
}

Update.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  currentProject: PropTypes.object,
  getProject: PropTypes.func,
};

export default Update;
