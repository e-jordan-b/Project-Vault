import React, { useState, useContext, Requireable } from 'react';
import '../styles/createProject.css';
import UserContext from '../context/UserContext';
import { UserContextType } from '../types/user.type';
import Axios from 'axios';
import { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
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
  quillValue: '',
};


interface CreateProjectProps {
  open: boolean | Requireable<boolean>,
  onClose: () => void
}

const CreateProject: React.FC<CreateProjectProps> = ({ open, onClose }) => {
  if (!open) return null;
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File>(); // We might not need an initial state here
  const { user } = useContext<UserContextType>(UserContext);
  const [projectInfo, setProjectInfo] = useState<Project>(initialState);
  const [quillValue, setQuillValue] = useState<string>('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setProjectInfo(prev => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleFileInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) setSelectedFile(e.target.files[0]);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let image: string = '';
    const formData = new FormData();
    if (selectedFile) {
      formData.append('file', selectedFile);
      formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD!); // 'jhbdwgkt')
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

    const project: Project = initialState;
    project.date = new Date().toLocaleDateString();
    project.author = `${user?.firstName} ${user?.lastName}`;
    project.title = projectInfo.title;
    project.tags = projectInfo.tags;
    project.quillValue = quillValue;
    project.image = image;
    project.createdBy = user;

    const response: AxiosResponse<Project> | undefined = await http.createProject(project); //project should be stringified, review api.service
    if (response!.status > 400) {
      alert('Error creating Project');
      return;
    } else {
      navigate(`/posts/${project.id}`);
      onClose();
    }
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
              value={projectInfo.title}
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
              value={projectInfo.tags}
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

export default CreateProject;
