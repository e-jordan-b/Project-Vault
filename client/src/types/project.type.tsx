import {User} from './user.type';

export default interface Project {
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
}
