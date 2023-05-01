import { User } from './user.type';

export default interface Project {
  _id?: string;
  title: string;
  description: string;
  image: string;
  updates?: ProjectUpdate[];
  author: string;
  createdBy?: User | null;
  date: string;
  chat: ProjectChat[];
  tags: string[];
  followers: User[] | string[] | [];
  quillValue?: string;
}

export interface ProjectResponse {
  project: Project[];
}

export interface ProjectUpdate {
  _id?: string;
  title: string;
  description?: string;
  date?: string;
  image?: string;
  video?: string;
  chat?: string[];
}

export interface ProjectChat {
  _id?: string;
  createdBy: string;
  title?: string;
  comment?: string;
  projectId: string;
  date?: string;
}
