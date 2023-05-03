import { User } from './user.type';

export default interface Project {
  _id?: string;
  title: string;
  description: string;
  image: string;
  updates?: ProjectUpdate[] | undefined;
  author: string;
  createdBy?: User | null;
  date: string;
  chat: ProjectChat[];
  tags: string[];
  followers: User[] | string[] | [];
  donationsCents: number;
}

export interface ProjectResponse {
  projects: Project[];
}

export interface ProjectUpdate {
  _id?: string;
  title: string;
  description?: string;
  date?: string;
  image?: string;
  video?: string;
  chat?: string[];
  projectId?: string;
  donationsCents?: number;
}

export interface ProjectChat {
  _id?: string;
  createdBy: string;
  // title?: string;
  comment?: string;
  projectId?: string;
  date?: string;
}
