import {User} from './user.type';

export default interface Project {
  id?: string | number;
  title: string;
  description: string;
  image: string;
  updates?: string[];
  author: string;
  createdBy?: User | null;
  date: string;
  chat: string[];
  tags: string[] | string;
  followers: User[] | string[] | [];
}

