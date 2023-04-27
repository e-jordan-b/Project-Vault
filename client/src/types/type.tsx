export interface Project {
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
  followers: string[];
}

export interface User {
  firstName: string;
  secondName: string;
  email: string;
  password: string;
  picturepath: string;
  following: string[];
  createdProjects: string[];
}
