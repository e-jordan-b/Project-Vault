import http from '../http-common';
import User from '../types/user.type';
import Project from '../types/project.type';
import { AxiosError } from 'axios';

class ApiService {
  // update project
  updateProject(data: Project) {
    try {
      return http.post<Project>(`/projects/${data.id}`, data);
    } catch (e) {
      const error = e as AxiosError;
      console.log(error.toJSON());
    }
  }

  // create post
  createProject(data: Project) {
    try {
      return http.post<Project>('/create', data);
    } catch (e) {
      const error = e as AxiosError;
      console.log(error.toJSON());
    }
  }

  // following project
  followedProjects(userId: string) {
    try {
      return http.get<Project[]>(`/projects/following/${userId}`);
    } catch (e) {
      const error = e as AxiosError;
      console.log(error.toJSON());
    }
  }

  // home
  getAllProjects() {
    try {
      return http.get<Project[]>('/projects');
    } catch (e) {
      const error = e as AxiosError;
      console.log(error.toJSON());
    }
  }

  // login
  login(data: { email: string; password: string }) {
    try {
      return http.post<User>('/login', data);
    } catch (e) {
      const error = e as AxiosError;
      console.log(error.toJSON());
    }
  }

  // personal projects
  ownProjects(userId: string) {
    try {
      return http.get<Project[]>(`/projects/personal/${userId}`);
    } catch (e) {
      const error = e as AxiosError;
      console.log(error.toJSON());
    }
  }

  // projectinfo - get project
  getProject(id: string) {
    try {
      return http.get<Project>(`/projects/${id}`);
    } catch (e) {
      const error = e as AxiosError;
      console.log(error.toJSON());
    }
  }

  // projectinfo - follow project
  followProject(data: { project: Project; userId: string }) {
    try {
      return http.post<User>('/projects/follow', data);
    } catch (e) {
      const error = e as AxiosError;
      console.log(error.toJSON());
    }
  }
  // projewctnav
  addComment(data: { projectId: string; createdBy: string; comment: string }) {
    try {
      return http.post<Project>('/projects/comments', data);
    } catch (e) {
      const error = e as AxiosError;
      console.log(error.toJSON());
    }
  }

  // register
  register(data: {
    email: string;
    password: string;
    firstName: string;
    secondName: string;
  }) {
    try {
      return http.post<User>('/register', data);
    } catch (e) {
      const error = e as AxiosError;
      console.log(error.toJSON());
    }
  }

  // pay2
  postPayment(data: { amount: number; id: string }) {
    try {
      return http.post('/create-payment-intent', data);
    } catch (e) {
      const error = e as AxiosError;
      console.log(error.toJSON());
    }
  }
}

export default new ApiService();
