import {User} from './user.type';

export default interface Project {
  id?: string;
  title: string;
  description: string;
  image: string;
  updates?: string[];
  author: string;
  createdBy?: User | null;
  date: string;
  chat: string[];
  tags: string[];
  followers: User[] | string[] | [];
  quillValue?: string,
}

