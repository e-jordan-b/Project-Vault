import http from '../http-common';
import { User } from '../types/user.type';
import Project, {
  ProjectChat,
  ProjectResponse,
  ProjectUpdate,
} from '../types/project.type';
import { AxiosError, AxiosResponse } from 'axios';

class ApiService {
  // update project
  updateProject(
    data: ProjectUpdate
  ): Promise<AxiosResponse<Project> | undefined> | undefined | null {
    try {
      return http.post<Project>(`/projects/${data._id}`, JSON.stringify(data));
    } catch (e) {
      const error = e as AxiosError;
      // console.log(error.toJSON());
    }
  }

  // create post
  createProject(
    data: Project
  ): Promise<AxiosResponse<Project> | undefined> | undefined | null {
    // console.log('data from api fe: ', data)
    try {
      return http.post<Project>('/create', data);
    } catch (e) {
      const error = e as AxiosError;
      // console.log(error.toJSON());
    }
  }

  // following project
  followedProjects(
    userId: string
  ): Promise<AxiosResponse<Project[]> | undefined> | undefined {
    try {
      return http.get<Project[]>(`/projects/following/${userId}`);
    } catch (e) {
      const error = e as AxiosError;
      // console.log(error.toJSON());
    }
  }

  // home
  getAllProjects():
    | Promise<AxiosResponse<ProjectResponse> | undefined>
    | undefined {
    try {
      return http.get<ProjectResponse>('/projects');
    } catch (e) {
      const error = e as AxiosError;
      // console.log(error.toJSON());
    }
  }

  // login
  login(data: {
    email: string;
    password: string;
  }): Promise<AxiosResponse<User> | undefined> | undefined {
    try {
      console.log('data we send to SERVER in API service 💁🏻‍♀️', data);
      return http.post<User>('/login', JSON.stringify(data));
    } catch (e) {
      const error = e as AxiosError;
      // console.log(error.toJSON());
    }
  }

  // personal projects
  ownProjects(
    userId: string
  ): Promise<AxiosResponse<Project[]> | undefined> | undefined {
    try {
      // console.log("userId in API Service", userId)
      return http.get<Project[]>(`/projects/personal/${userId}`);
    } catch (e) {
      const error = e as AxiosError;
      // console.log(error.toJSON());
    }
  }

  // projectinfo - get project
  getProject(
    id: string
  ): Promise<AxiosResponse<Project> | undefined> | undefined {
    try {
      // console.log('id front end: ', id)
      return http.get<Project>(`/projects/${id}`);
    } catch (e) {
      const error = e as AxiosError;
      // console.log(error.toJSON());
    }
  }

  // projectinfo - follow project
  followProject(data: {
    projectId: string;
    user: User;
  }): Promise<AxiosResponse<User> | undefined> | undefined {
    try {
      return http.post<User>('/projects/follow', JSON.stringify(data));
    } catch (e) {
      const error = e as AxiosError;
      // console.log(error.toJSON());
    }
  }
  // projewctnav
  addComment(
    data: ProjectChat
  ): Promise<AxiosResponse<Project> | undefined> | undefined {
    try {
      // console.log('data from addComment',data)
      return http.post<Project>('/projects/comments', data);
    } catch (e) {
      const error = e as AxiosError;
      // console.log(error.toJSON());
    }
  }

  // register
  register(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Promise<AxiosResponse<User> | undefined> | undefined {
    try {
      return http.post<User>('/register', JSON.stringify(data));
    } catch (e) {
      const error = e as AxiosError;
      // console.log(error.toJSON());
    }
  }

  // pay2
  postPayment(data: {
    amount: number;
    id: string;
  }): Promise<AxiosResponse<User> | undefined> | undefined {
    try {
      return http.post('/create-payment-intent', JSON.stringify(data));
    } catch (e) {
      const error = e as AxiosError;
      // console.log(error.toJSON());
    }
  }
}

export default new ApiService();
