import http from '../http-common';
import { User } from '../types/user.type';
import Project, {
  ProjectChat,
  ProjectResponse,
  ProjectUpdate,
} from '../types/project.type';
import { AxiosError, AxiosResponse } from 'axios';

class ApiService {
  updateProject(
    data: ProjectUpdate
  ): Promise<AxiosResponse<Project> | undefined> | undefined | null {
    try {
      return http.post<Project>(`/update/${data._id}`, JSON.stringify(data));
    } catch (e) {
      const error = e as AxiosError;
    }
  }

  createProject(
    data: Project
  ): Promise<AxiosResponse<Project> | undefined> | undefined | null {
    try {
      return http.post<Project>('/create', data);
    } catch (e) {
      const error = e as AxiosError;
    }
  }

  followedProjects(
    userId: string
  ): Promise<AxiosResponse<Project[]> | undefined> | undefined {
    try {
      return http.get<Project[]>(`/projects/following/${userId}`);
    } catch (e) {
      const error = e as AxiosError;
    }
  }

  getAllProjects():
    | Promise<AxiosResponse<ProjectResponse> | undefined>
    | undefined {
    try {
      return http.get<ProjectResponse>('/projects');
    } catch (e) {
      const error = e as AxiosError;
    }
  }

  login(data: {
    email: string;
    password: string;
  }): Promise<AxiosResponse<User> | undefined> | undefined {
    try {
      return http.post<User>('/login', JSON.stringify(data));
    } catch (e) {
      const error = e as AxiosError;
    }
  }

  ownProjects(
    userId: string
  ): Promise<AxiosResponse<Project[]> | undefined> | undefined {
    try {
      return http.get<Project[]>(`/projects/personal/${userId}`);
    } catch (e) {
      const error = e as AxiosError;
    }
  }

  getProject(
    id: string
  ): Promise<AxiosResponse<Project> | undefined> | undefined {
    try {
      return http.get<Project>(`/projects/${id}`);
    } catch (e) {
      const error = e as AxiosError;
    }
  }

  followProject(data: {
    projectId: string;
    user: User;
  }): Promise<AxiosResponse<User> | undefined> | undefined {
    try {
      return http.post<User>('/projects/follow', JSON.stringify(data));
    } catch (e) {
      const error = e as AxiosError;
    }
  }
  addComment(
    data: ProjectChat
  ): Promise<AxiosResponse<Project> | undefined> | undefined {
    try {
      return http.post<Project>('/projects/comments', data);
    } catch (e) {
      const error = e as AxiosError;
    }
  }

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
    }
  }

  postPayment(data: {
    amount: number;
    id: string;
  }): Promise<AxiosResponse<User> | undefined> | undefined {
    try {
      return http.post('/create-payment-intent', JSON.stringify(data));
    } catch (e) {
      const error = e as AxiosError;
    }
  }
}

export default new ApiService();
